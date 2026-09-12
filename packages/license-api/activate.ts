// Aurora Ember Bio Lab — License API: Activate
// POST /api/license/activate

import { NextRequest, NextResponse } from 'next/server';
import {
  validateLicenseKeyFormat,
  extractKeyInfo,
  validateHWID,
  activateLicenseCore,
} from '../../../shared/license-core';
import { ProjectKey, isValidPrefix } from '../../../shared/project-config';

interface ActivateRequest {
  key: string;
  hwid: string;
  project?: ProjectKey;
}

export async function POST(request: NextRequest) {
  try {
    const body: ActivateRequest = await request.json();
    const { key, hwid, project } = body;

    // Validate input
    if (!key || !hwid) {
      return NextResponse.json(
        { error: 'Missing required fields: key, hwid' },
        { status: 400 }
      );
    }

    // Validate HWID format
    if (!validateHWID(hwid)) {
      return NextResponse.json(
        { error: 'Invalid HWID format. Expected 16-character hex string.' },
        { status: 400 }
      );
    }

    // Validate key format
    if (!validateLicenseKeyFormat(key)) {
      return NextResponse.json(
        { error: 'Invalid license key format. Expected: XXXX-XXXX-XXXX-XXXX-XXXX' },
        { status: 400 }
      );
    }

    // Extract project from key if not provided
    const keyInfo = extractKeyInfo(key);
    if (!keyInfo) {
      return NextResponse.json(
        { error: 'Could not parse license key' },
        { status: 400 }
      );
    }

    const targetProject = project || keyInfo.project;
    if (!targetProject) {
      return NextResponse.json(
        { error: 'Could not determine project from license key' },
        { status: 400 }
      );
    }

    // Validate project exists
    if (!isValidPrefix(targetProject)) {
      return NextResponse.json(
        { error: `Invalid project: ${targetProject}` },
        { status: 400 }
      );
    }

    // Activate license
    const result = await activateLicenseCore({
      key,
      hwid,
      project: targetProject,
    });

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // TODO: Log activation to database
    // TODO: Send activation email
    // TODO: Update user subscription status

    return NextResponse.json({
      success: true,
      license: result.license,
      message: 'License activated successfully',
      hwid,
      project: targetProject,
    });
  } catch (error) {
    console.error('License activation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
