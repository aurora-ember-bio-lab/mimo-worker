// Aurora Ember Bio Lab — License Core Functions

import crypto from 'crypto';
import {
  License,
  LicenseTier,
  LicenseValidationResult,
  LicenseActivationRequest,
  LicenseTransferRequest,
  LicenseGenerationRequest,
  TIER_CODES,
  TIER_LIMITS,
  LICENSE_KEY_PATTERN,
  LicenseRow,
  rowToLicense,
} from './license-types';
import {
  PROJECT_PREFIXES,
  ProjectKey,
  getProjectByPrefix,
  isValidPrefix,
} from './project-config';

// Generate license key
export function generateLicenseKey(
  project: ProjectKey,
  tier: LicenseTier
): string {
  const prefix = PROJECT_PREFIXES[project];
  if (!prefix) {
    throw new Error(`Invalid project: ${project}`);
  }

  const serial = crypto.randomBytes(2).toString('hex').toUpperCase();
  const tierCode = TIER_CODES[tier];
  const device = crypto.randomBytes(2).toString('hex').toUpperCase();
  const checksum = crypto.randomBytes(2).toString('hex').toUpperCase();

  return `${prefix}-${serial}-${tierCode}-${device}-${checksum}`;
}

// Validate license key format
export function validateLicenseKeyFormat(key: string): boolean {
  return LICENSE_KEY_PATTERN.test(key);
}

// Extract info from license key
export function extractKeyInfo(key: string): {
  prefix: string;
  serial: string;
  tierCode: string;
  device: string;
  checksum: string;
  project?: ProjectKey;
} | null {
  if (!validateLicenseKeyFormat(key)) {
    return null;
  }

  const parts = key.split('-');
  const prefix = parts[0];
  const serial = parts[1];
  const tierCode = parts[2];
  const device = parts[3];
  const checksum = parts[4];

  const projectEntry = Object.entries(PROJECT_PREFIXES).find(
    ([, v]) => v === prefix
  );

  return {
    prefix,
    serial,
    tierCode,
    device,
    checksum,
    project: projectEntry ? (projectEntry[0] as ProjectKey) : undefined,
  };
}

// Get features for tier
export function getFeaturesForTier(tier: LicenseTier, features: Record<string, string[]>): string[] {
  return features[tier] || features.free || [];
}

// Get limits for tier
export function getLimitsForTier(tier: LicenseTier) {
  return TIER_LIMITS[tier] || TIER_LIMITS.free;
}

// Validate HWID format
export function validateHWID(hwid: string): boolean {
  return /^[A-F0-9]{16}$/.test(hwid);
}

// Generate HWID from components (for server-side verification)
export function generateHWID(components: {
  cpu?: string;
  bios?: string;
  mac?: string;
  disk?: string;
}): string {
  const raw = [components.cpu, components.bios, components.mac, components.disk]
    .filter(Boolean)
    .join('|');
  
  const hash = crypto.createHash('sha256').update(raw).digest('hex');
  return hash.substring(0, 16).toUpperCase();
}

// Validate license (core logic)
export async function validateLicenseCore(
  key: string,
  hwid?: string,
  project?: ProjectKey
): Promise<LicenseValidationResult> {
  // 1. Validate format
  if (!validateLicenseKeyFormat(key)) {
    return { valid: false, error: 'Invalid license key format' };
  }

  // 2. Extract key info
  const keyInfo = extractKeyInfo(key);
  if (!keyInfo) {
    return { valid: false, error: 'Could not parse license key' };
  }

  // 3. Validate project
  if (project && keyInfo.project !== project) {
    return { valid: false, error: `License key is not for ${project}` };
  }

  // 4. Validate HWID format
  if (hwid && !validateHWID(hwid)) {
    return { valid: false, error: 'Invalid HWID format' };
  }

  // 5. Check database (placeholder - will be implemented with actual DB)
  // const license = await db.getLicenseByKey(key);
  // if (!license) {
  //   return { valid: false, error: 'License not found' };
  // }

  // 6. Check expiration
  // if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
  //   return { valid: false, error: 'License expired', license };
  // }

  // 7. Check HWID binding
  // if (hwid && license.hwid && license.hwid !== hwid) {
  //   return { valid: false, error: 'License bound to different device', license };
  // }

  // 8. Check activation limit
  // if (license.activationCount >= license.maxDevices) {
  //   return { valid: false, error: 'Activation limit reached', license };
  // }

  return { valid: true, warning: 'Database validation not implemented' };
}

// Create license (core logic)
export async function createLicenseCore(
  request: LicenseGenerationRequest
): Promise<License> {
  const key = generateLicenseKey(request.project, request.tier);
  const limits = getLimitsForTier(request.tier);

  // Placeholder - will be implemented with actual DB
  const license: License = {
    id: crypto.randomUUID(),
    project: request.project,
    userId: request.userId || 'system',
    key,
    tier: request.tier,
    features: [],
    maxDevices: request.maxDevices || limits.maxDevices,
    activationCount: 0,
    createdAt: new Date(),
    isActive: true,
    status: 'active',
  };

  return license;
}

// Activate license (core logic)
export async function activateLicenseCore(
  request: LicenseActivationRequest
): Promise<LicenseValidationResult> {
  // 1. Validate
  const validation = await validateLicenseCore(request.key, request.hwid, request.project);
  if (!validation.valid) {
    return validation;
  }

  // 2. Activate (placeholder - will be implemented with actual DB)
  // await db.activateLicense(request.key, request.hwid);

  return {
    valid: true,
    license: validation.license,
    warning: 'Database activation not implemented',
  };
}

// Transfer license (core logic)
export async function transferLicenseCore(
  request: LicenseTransferRequest
): Promise<LicenseValidationResult> {
  // 1. Validate new HWID
  if (!validateHWID(request.newHwid)) {
    return { valid: false, error: 'Invalid new HWID format' };
  }

  // 2. Transfer (placeholder - will be implemented with actual DB)
  // await db.transferLicense(request.licenseId, request.newHwid);

  return {
    valid: true,
    warning: 'Database transfer not implemented',
  };
}

// Revoke license (core logic)
export async function revokeLicenseCore(
  licenseId: string
): Promise<boolean> {
  // Placeholder - will be implemented with actual DB
  // await db.revokeLicense(licenseId);
  return true;
}

// Get user licenses (core logic)
export async function getUserLicensesCore(
  userId: string,
  project?: ProjectKey
): Promise<License[]> {
  // Placeholder - will be implemented with actual DB
  // return db.getUserLicenses(userId, project);
  return [];
}

// Check feature access
export function hasFeature(license: License, feature: string): boolean {
  return license.features.includes(feature);
}

// Check if license allows more devices
export function canActivateDevice(license: License): boolean {
  return license.activationCount < license.maxDevices;
}

// Get license status message
export function getLicenseStatusMessage(license: License): string {
  if (!license.isActive) return 'License is inactive';
  if (license.status === 'revoked') return 'License has been revoked';
  if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
    return 'License has expired';
  }
  if (!license.hwid) return 'License not activated on any device';
  return `Active on device ${license.hwid}`;
}
