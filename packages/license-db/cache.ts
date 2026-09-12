// Aurora Ember Bio Lab — Redis Caching Layer for Licenses

import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Redis client singleton
let redis: Redis | null = null;

function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    redis.on('error', (err) => {
      console.error('Redis error:', err);
    });

    redis.on('connect', () => {
      console.log('Redis connected');
    });
  }
  return redis;
}

// Cache keys
const CACHE_KEYS = {
  license: (key: string) => `license:${key}`,
  licenseByHwid: (hwid: string) => `license:hwid:${hwid}`,
  userLicenses: (userId: string) => `user:licenses:${userId}`,
  validation: (key: string, hwid?: string) => 
    hwid ? `validation:${key}:${hwid}` : `validation:${key}`,
  rateLimit: (ip: string) => `ratelimit:${ip}`,
} as const;

// Cache TTLs (in seconds)
const CACHE_TTLS = {
  license: 300,        // 5 minutes
  validation: 300,     // 5 minutes
  userLicenses: 60,    // 1 minute
  rateLimit: 3600,     // 1 hour
} as const;

// ============================================
// CACHE OPERATIONS
// ============================================

// Get license from cache
export async function getCachedLicense(key: string): Promise<Record<string, unknown> | null> {
  try {
    const redis = getRedisClient();
    const cached = await redis.get(CACHE_KEYS.license(key));
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

// Set license in cache
export async function setCachedLicense(key: string, license: Record<string, unknown>): Promise<void> {
  try {
    const redis = getRedisClient();
    await redis.setex(
      CACHE_KEYS.license(key),
      CACHE_TTLS.license,
      JSON.stringify(license)
    );
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

// Get license by HWID from cache
export async function getCachedLicenseByHwid(hwid: string): Promise<Record<string, unknown> | null> {
  try {
    const redis = getRedisClient();
    const cached = await redis.get(CACHE_KEYS.licenseByHwid(hwid));
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

// Set license by HWID in cache
export async function setCachedLicenseByHwid(hwid: string, license: Record<string, unknown>): Promise<void> {
  try {
    const redis = getRedisClient();
    await redis.setex(
      CACHE_KEYS.licenseByHwid(hwid),
      CACHE_TTLS.license,
      JSON.stringify(license)
    );
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

// Get cached validation result
export async function getCachedValidation(key: string, hwid?: string): Promise<boolean | null> {
  try {
    const redis = getRedisClient();
    const cached = await redis.get(CACHE_KEYS.validation(key, hwid));
    if (cached !== null) {
      return cached === 'true';
    }
    return null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

// Set cached validation result
export async function setCachedValidation(key: string, hwid: string | undefined, valid: boolean): Promise<void> {
  try {
    const redis = getRedisClient();
    await redis.setex(
      CACHE_KEYS.validation(key, hwid),
      CACHE_TTLS.validation,
      valid.toString()
    );
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

// Invalidate license cache
export async function invalidateLicenseCache(key: string): Promise<void> {
  try {
    const redis = getRedisClient();
    await redis.del(CACHE_KEYS.license(key));
    await redis.del(CACHE_KEYS.validation(key));
  } catch (error) {
    console.error('Cache invalidate error:', error);
  }
}

// Get user licenses from cache
export async function getCachedUserLicenses(userId: string): Promise<Record<string, unknown>[] | null> {
  try {
    const redis = getRedisClient();
    const cached = await redis.get(CACHE_KEYS.userLicenses(userId));
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

// Set user licenses in cache
export async function setCachedUserLicenses(userId: string, licenses: Record<string, unknown>[]): Promise<void> {
  try {
    const redis = getRedisClient();
    await redis.setex(
      CACHE_KEYS.userLicenses(userId),
      CACHE_TTLS.userLicenses,
      JSON.stringify(licenses)
    );
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

// ============================================
// RATE LIMITING
// ============================================

// Check rate limit
export async function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  try {
    const redis = getRedisClient();
    const key = `ratelimit:${identifier}`;
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - windowSeconds;

    // Remove old entries
    await redis.zremrangebyscore(key, 0, windowStart);

    // Count current requests
    const count = await redis.zcard(key);

    if (count >= maxRequests) {
      const oldest = await redis.zrange(key, 0, 0, 'WITHSCORES');
      const resetAt = oldest.length > 0 ? parseInt(oldest[1]) + windowSeconds : now + windowSeconds;
      return {
        allowed: false,
        remaining: 0,
        resetAt,
      };
    }

    // Add current request
    await redis.zadd(key, now.toString(), `${now}-${Math.random()}`);
    await redis.expire(key, windowSeconds);

    return {
      allowed: true,
      remaining: maxRequests - count - 1,
      resetAt: now + windowSeconds,
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // Fail open - allow request if Redis is down
    return {
      allowed: true,
      remaining: maxRequests,
      resetAt: Date.now() / 1000 + windowSeconds,
    };
  }
}

// ============================================
// CLEANUP
// ============================================

// Close Redis connection
export async function closeRedis(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}

// Clear all license caches
export async function clearAllLicenseCaches(): Promise<void> {
  try {
    const redis = getRedisClient();
    const keys = await redis.keys('license:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Cache clear error:', error);
  }
}
