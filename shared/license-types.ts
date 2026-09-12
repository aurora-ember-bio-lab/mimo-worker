// Aurora Ember Bio Lab — License Types

import { ProjectKey } from './project-config';

// License Tiers
export type LicenseTier = 'free' | 'starter' | 'pro' | 'studio' | 'lifetime' | 'enterprise';

// Tier Codes (for license key format)
export const TIER_CODES: Record<LicenseTier, string> = {
  free: 'FREE',
  starter: 'STRT',
  pro: 'PRO_',
  studio: 'STUD',
  lifetime: 'LIFE',
  enterprise: 'ENTE',
};

// Reverse mapping
export function tierFromCode(code: string): LicenseTier {
  const entry = Object.entries(TIER_CODES).find(([, v]) => v === code);
  return entry ? (entry[0] as LicenseTier) : 'free';
}

// License Status
export type LicenseStatus = 'active' | 'expired' | 'revoked' | 'transferred' | 'pending';

// License Interface
export interface License {
  id: string;
  project: ProjectKey;
  userId: string;
  key: string;
  tier: LicenseTier;
  hwid?: string;
  features: string[];
  expiresAt?: Date;
  isActive: boolean;
  maxDevices: number;
  activationCount: number;
  createdAt: Date;
  lastValidated?: Date;
  status: LicenseStatus;
}

// License Validation Result
export interface LicenseValidationResult {
  valid: boolean;
  license?: License;
  error?: string;
  warning?: string;
}

// License Activation Request
export interface LicenseActivationRequest {
  key: string;
  hwid: string;
  project: ProjectKey;
  userId?: string;
}

// License Transfer Request
export interface LicenseTransferRequest {
  licenseId: string;
  newHwid: string;
  reason?: string;
}

// License Generation Request (Admin)
export interface LicenseGenerationRequest {
  project: ProjectKey;
  tier: LicenseTier;
  userId?: string;
  maxDevices?: number;
  expiresInDays?: number;
}

// Tier Limits
export interface TierLimits {
  maxProjects: number;
  maxTokens?: number;
  maxDevices: number;
  maxTeamMembers?: number;
  supportLevel: 'community' | 'email' | 'priority' | 'dedicated';
}

// Tier Configuration
export const TIER_LIMITS: Record<LicenseTier, TierLimits> = {
  free: {
    maxProjects: 3,
    maxDevices: 1,
    supportLevel: 'community',
  },
  starter: {
    maxProjects: 20,
    maxDevices: 2,
    supportLevel: 'email',
  },
  pro: {
    maxProjects: 50,
    maxDevices: 3,
    supportLevel: 'priority',
  },
  studio: {
    maxProjects: 100,
    maxDevices: 5,
    maxTeamMembers: 5,
    supportLevel: 'dedicated',
  },
  lifetime: {
    maxProjects: 9999,
    maxDevices: 10,
    supportLevel: 'dedicated',
  },
  enterprise: {
    maxProjects: 9999,
    maxDevices: 9999,
    maxTeamMembers: 9999,
    supportLevel: 'dedicated',
  },
};

// Tier Pricing (EUR)
export const TIER_PRICING: Record<LicenseTier, { monthly: number; yearly: number; lifetime: number }> = {
  free: { monthly: 0, yearly: 0, lifetime: 0 },
  starter: { monthly: 18, yearly: 180, lifetime: 499 },
  pro: { monthly: 29, yearly: 290, lifetime: 799 },
  studio: { monthly: 59, yearly: 590, lifetime: 1499 },
  lifetime: { monthly: 0, yearly: 0, lifetime: 1999 },
  enterprise: { monthly: 0, yearly: 0, lifetime: 0 }, // Custom pricing
};

// License Key Format: {PREFIX}-{SERIAL}-{TIER}-{DEVICE}-{CHECKSUM}
// Example: ATGN-A1B2-STRT-C3D4-E5F6
export const LICENSE_KEY_PATTERN = /^[A-Z]{4}-[A-F0-9]{4}-(FREE|STRT|PRO_|STUD|LIFE|ENTE)-[A-F0-9]{4}-[A-F0-9]{4}$/;

// Database Row (matches PostgreSQL schema)
export interface LicenseRow {
  id: string;
  project: string;
  user_id: string;
  key: string;
  tier: string;
  hwid: string | null;
  features: string;
  expires_at: string | null;
  is_active: boolean;
  max_devices: number;
  activation_count: number;
  created_at: string;
  last_validated: string | null;
  status: string;
}

// Convert database row to License
export function rowToLicense(row: LicenseRow): License {
  return {
    id: row.id,
    project: row.project as ProjectKey,
    userId: row.user_id,
    key: row.key,
    tier: row.tier as LicenseTier,
    hwid: row.hwid || undefined,
    features: JSON.parse(row.features),
    expiresAt: row.expires_at ? new Date(row.expires_at) : undefined,
    isActive: row.is_active,
    maxDevices: row.max_devices,
    activationCount: row.activation_count,
    createdAt: new Date(row.created_at),
    lastValidated: row.last_validated ? new Date(row.last_validated) : undefined,
    status: row.status as LicenseStatus,
  };
}
