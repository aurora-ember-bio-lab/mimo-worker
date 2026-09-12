// Aurora Ember Bio Lab — License API: Revoke
// POST /api/license/revoke

import { NextRequest, NextResponse } from 'next/server';
import { revokeLicenseCore } from '../../../shared/license-core';

interface RevokeRequest {
  licenseId: string;
  reason?: string;
  revokedBy?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RevokeRequest = await request.json();
    const { licenseId, reason, revokedBy } = body;

    // Validate input
    if (!licenseId) {
      return NextResponse.json(
        { error: 'Missing required field: licenseId' },
        { status: 400 }
      );
    }

    // TODO: Check if user has admin permissions
    // TODO: Check if license is already revoked
    // TODO: Log revocation reason and admin who revoked

    // Revoke license
    const success = await revokeLicenseCore(licenseId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to revoke license' },
        { status: 500 }
      );
    }

    // TODO: Send revocation notification email
    // TODO: Invalidate all device sessions
    // TODO: Update user subscription status

    return NextResponse.json({
      success: true,
      message: 'License revoked successfully',
      licenseId,
      reason,
    });
  } catch (error) {
    console.error('License revocation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
