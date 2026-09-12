// Aurora Ember Bio Lab — License API: Transfer
// POST /api/license/transfer

import { NextRequest, NextResponse } from 'next/server';
import {
  validateLicenseKeyFormat,
  validateHWID,
  transferLicenseCore,
} from '../../../shared/license-core';

interface TransferRequest {
  licenseId: string;
  newHwid: string;
  reason?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: TransferRequest = await request.json();
    const { licenseId, newHwid, reason } = body;

    // Validate input
    if (!licenseId || !newHwid) {
      return NextResponse.json(
        { error: 'Missing required fields: licenseId, newHwid' },
        { status: 400 }
      );
    }

    // Validate new HWID format
    if (!validateHWID(newHwid)) {
      return NextResponse.json(
        { error: 'Invalid new HWID format' },
        { status: 400 }
      );
    }

    // TODO: Check if user owns this license
    // TODO: Check transfer limits (max 3 per month)
    // TODO: Log transfer reason

    // Transfer license
    const result = await transferLicenseCore({
      licenseId,
      newHwid,
      reason,
    });

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // TODO: Send transfer confirmation email
    // TODO: Invalidate old device sessions

    return NextResponse.json({
      success: true,
      license: result.license,
      message: 'License transferred successfully',
      newHwid,
    });
  } catch (error) {
    console.error('License transfer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
