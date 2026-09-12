// Aurora Ember Bio Lab — Rate Limiting Middleware

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from './cache';

// Rate limit configurations
export const RATE_LIMITS = {
  // License operations
  activate: {
    maxRequests: 10,
    windowSeconds: 3600, // 1 hour
    message: 'Too many activation attempts. Please try again later.',
  },
  validate: {
    maxRequests: 100,
    windowSeconds: 60, // 1 minute
    message: 'Too many validation requests. Please slow down.',
  },
  transfer: {
    maxRequests: 3,
    windowSeconds: 2592000, // 30 days
    message: 'Transfer limit reached. Max 3 transfers per month.',
  },
  revoke: {
    maxRequests: 5,
    windowSeconds: 3600, // 1 hour
    message: 'Too many revocation requests.',
  },
  // General API
  api: {
    maxRequests: 100,
    windowSeconds: 60, // 1 minute
    message: 'Rate limit exceeded. Please slow down.',
  },
} as const;

export type RateLimitType = keyof typeof RATE_LIMITS;

// Get client IP from request
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}

// Rate limit middleware
export async function rateLimit(
  request: NextRequest,
  type: RateLimitType
): Promise<{ allowed: boolean; response?: NextResponse }> {
  const config = RATE_LIMITS[type];
  const clientIp = getClientIp(request);
  const identifier = `${type}:${clientIp}`;

  const result = await checkRateLimit(
    identifier,
    config.maxRequests,
    config.windowSeconds
  );

  if (!result.allowed) {
    const response = NextResponse.json(
      {
        error: config.message,
        rateLimit: {
          limit: config.maxRequests,
          remaining: 0,
          resetAt: result.resetAt,
        },
      },
      { status: 429 }
    );

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', '0');
    response.headers.set('X-RateLimit-Reset', result.resetAt.toString());
    response.headers.set('Retry-After', Math.ceil(result.resetAt - Date.now() / 1000).toString());

    return { allowed: false, response };
  }

  return { allowed: true };
}

// License-specific rate limits
export async function licenseRateLimit(
  request: NextRequest,
  action: 'activate' | 'validate' | 'transfer' | 'revoke'
): Promise<{ allowed: boolean; response?: NextResponse }> {
  return rateLimit(request, action);
}

// Wrapper for API routes with rate limiting
export function withRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  type: RateLimitType = 'api'
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const { allowed, response } = await rateLimit(request, type);
    
    if (!allowed && response) {
      return response;
    }

    return handler(request);
  };
}

// License API rate limiter
export function withLicenseRateLimit(
  handler: (request: NextRequest) => Promise<NextResponse>,
  action: 'activate' | 'validate' | 'transfer' | 'revoke'
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const { allowed, response } = await licenseRateLimit(request, action);
    
    if (!allowed && response) {
      return response;
    }

    // Add rate limit headers to successful responses
    const result = await handler(request);
    
    // You could add rate limit headers here if needed
    // result.headers.set('X-RateLimit-Remaining', '...');
    
    return result;
  };
}

// CORS headers for license API
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-License-Key',
  'Access-Control-Max-Age': '86400',
};

// Handle CORS preflight
export function handleCors(request: NextRequest): NextResponse | null {
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }
  return null;
}
