// Aurora Ember Bio Lab — License API: Validate
// POST /api/license/validate

import { NextRequest, NextResponse } from 'next/server';
import {
  validateLicenseKeyFormat,
  extractKeyInfo,
  validateHWID,
  validateLicenseCore,
} from '../../../shared/license-core';
import { ProjectKey } from '../../../shared/project-config';

interface ValidateRequest {
  key: string;
  hwid?: string;
  project?: ProjectKey;
}

export async function POST(request: NextRequest) {
  try {
    const body: ValidateRequest = await request.json();
    const { key, hwid, project } = body;

    // Validate input
    if (!key) {
      return NextResponse.json(
        { error: 'Missing required field: key' },
        { status: 400 }
      );
    }

    // Validate key format
    if (!validateLicenseKeyFormat(key)) {
      return NextResponse.json(
        { error: 'Invalid license key format' },
        { status: 400 }
      );
    }

    // Validate HWID if provided
    if (hwid && !validateHWID(hwid)) {
      return NextResponse.json(
        { error: 'Invalid HWID format' },
        { status: 400 }
      );
    }

    // Validate license
    const result = await validateLicenseCore(key, hwid, project);

    // TODO: Log validation attempt
    // TODO: Check rate limiting

    return NextResponse.json({
      valid: result.valid,
      license: result.license,
      error: result.error,
      warning: result.warning,
    });
  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
