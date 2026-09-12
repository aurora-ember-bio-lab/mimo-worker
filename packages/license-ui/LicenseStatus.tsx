'use client';

import { useState, useEffect } from 'react';

interface LicenseStatusProps {
  apiUrl?: string;
  project?: string;
}

interface LicenseData {
  key: string;
  tier: string;
  features: string[];
  expiresAt?: string;
  hwid?: string;
  isActive: boolean;
  status: string;
}

const TIER_COLORS: Record<string, string> = {
  free: 'bg-gray-600',
  starter: 'bg-blue-600',
  pro: 'bg-purple-600',
  studio: 'bg-yellow-600',
  lifetime: 'bg-green-600',
  enterprise: 'bg-red-600',
};

const TIER_NAMES: Record<string, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  studio: 'Studio',
  lifetime: 'Lifetime',
  enterprise: 'Enterprise',
};

export default function LicenseStatus({
  apiUrl = 'https://api.aurora-ember-bio-lab.com',
  project,
}: LicenseStatusProps) {
  const [license, setLicense] = useState<LicenseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLicense = async () => {
      try {
        // In production, this would fetch from the API
        // For now, we'll use localStorage
        const stored = localStorage.getItem(`license_${project || 'default'}`);
        if (stored) {
          setLicense(JSON.parse(stored));
        }
      } catch (err) {
        setError('Failed to load license status');
      } finally {
        setLoading(false);
      }
    };

    fetchLicense();
  }, [project]);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-4 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-500 rounded-xl p-4">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!license) {
    return (
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            🔓
          </div>
          <div>
            <p className="font-bold">No License</p>
            <p className="text-sm text-gray-400">Activate a license to unlock features</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${TIER_COLORS[license.tier] || 'bg-gray-600'} rounded-full flex items-center justify-center text-white font-bold`}>
            {license.tier.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold">{TIER_NAMES[license.tier] || license.tier} License</p>
            <p className="text-sm text-gray-400 font-mono">{license.key}</p>
          </div>
        </div>
        
        <div className="text-right">
          <span className={`px-2 py-1 rounded text-xs ${
            license.isActive ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
          }`}>
            {license.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-4">
        <p className="text-sm text-gray-400 mb-2">Enabled Features:</p>
        <div className="flex flex-wrap gap-2">
          {license.features.map((feature) => (
            <span
              key={feature}
              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Expiry */}
      {license.expiresAt && (
        <div className="mt-4 text-sm text-gray-400">
          Expires: {new Date(license.expiresAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
