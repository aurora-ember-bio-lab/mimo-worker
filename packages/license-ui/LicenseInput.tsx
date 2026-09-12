'use client';

import { useState, useEffect } from 'react';

interface LicenseInputProps {
  onActivate?: (license: LicenseData) => void;
  onError?: (error: string) => void;
  project?: string;
  apiUrl?: string;
}

interface LicenseData {
  key: string;
  hwid: string;
  project: string;
  tier: string;
  features: string[];
  expiresAt?: string;
}

export default function LicenseInput({
  onActivate,
  onError,
  project,
  apiUrl = 'https://api.aurora-ember-bio-lab.com',
}: LicenseInputProps) {
  const [licenseKey, setLicenseKey] = useState('');
  const [hwid, setHwid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Format license key input (auto-add dashes)
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    
    // Auto-format: add dashes every 4 characters
    if (value.length > 0 && !value.includes('-')) {
      const parts = value.match(/.{1,4}/g);
      if (parts) {
        value = parts.join('-');
      }
    }
    
    // Limit to 19 characters (XXXX-XXXX-XXXX-XXXX-XXXX)
    if (value.length <= 19) {
      setLicenseKey(value);
    }
  };

  // Generate HWID on mount
  useEffect(() => {
    // In browser, we'd use a different method
    // For now, we'll use a placeholder
    const generateBrowserHWID = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Aurora Ember Bio Lab', 2, 2);
      }
      const fingerprint = canvas.toDataURL();
      
      // Simple hash
      let hash = 0;
      for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      
      return Math.abs(hash).toString(16).toUpperCase().padStart(16, '0').substring(0, 16);
    };

    setHwid(generateBrowserHWID());
  }, []);

  const handleActivate = async () => {
    if (licenseKey.length !== 19) {
      setError('License key must be 19 characters (XXXX-XXXX-XXXX-XXXX-XXXX)');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`${apiUrl}/api/license/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: licenseKey,
          hwid,
          project,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        onActivate?.(data.license);
      } else {
        setError(data.error || 'Activation failed');
        onError?.(data.error);
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      onError?.('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Activate License</h3>
      
      <div className="space-y-4">
        {/* License Key Input */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">License Key</label>
          <input
            type="text"
            value={licenseKey}
            onChange={handleKeyChange}
            placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
            className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            maxLength={19}
          />
        </div>

        {/* HWID Display */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Your Hardware ID</label>
          <div className="bg-gray-700/50 rounded-lg px-4 py-3 font-mono text-gray-300">
            {hwid || 'Generating...'}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg px-4 py-3 text-red-400">
            ❌ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-900/50 border border-green-500 rounded-lg px-4 py-3 text-green-400">
            ✅ License activated successfully!
          </div>
        )}

        {/* Activate Button */}
        <button
          onClick={handleActivate}
          disabled={loading || licenseKey.length !== 19}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          {loading ? 'Activating...' : 'Activate License'}
        </button>
      </div>
    </div>
  );
}
