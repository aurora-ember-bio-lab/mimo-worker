'use client';

import { useState } from 'react';
import LicenseInput from './LicenseInput';

interface ActivationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: (license: LicenseData) => void;
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

export default function ActivationDialog({
  isOpen,
  onClose,
  onActivate,
  project,
  apiUrl,
}: ActivationDialogProps) {
  const [step, setStep] = useState<'intro' | 'activate' | 'success'>('intro');
  const [license, setLicense] = useState<LicenseData | null>(null);

  if (!isOpen) return null;

  const handleActivate = (data: LicenseData) => {
    setLicense(data);
    setStep('success');
    onActivate(data);
  };

  const handleClose = () => {
    setStep('intro');
    setLicense(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🔑</div>
          <h2 className="text-2xl font-bold">Activate License</h2>
          <p className="text-gray-400 mt-2">
            Enter your license key to unlock all features
          </p>
        </div>

        {/* Step: Intro */}
        {step === 'intro' && (
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold mb-2">What you get:</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>✅ Access to all premium features</li>
                <li>✅ No more limitations</li>
                <li>✅ Priority support</li>
                <li>✅ Free updates</li>
              </ul>
            </div>
            
            <button
              onClick={() => setStep('activate')}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Enter License Key
            </button>
            
            <p className="text-center text-sm text-gray-500">
              Don't have a license?{' '}
              <a href="/pricing" className="text-purple-400 hover:underline">
                Get one here
              </a>
            </p>
          </div>
        )}

        {/* Step: Activate */}
        {step === 'activate' && (
          <LicenseInput
            onActivate={handleActivate}
            onError={(err) => console.error(err)}
            project={project}
            apiUrl={apiUrl}
          />
        )}

        {/* Step: Success */}
        {step === 'success' && license && (
          <div className="space-y-4">
            <div className="bg-green-900/50 border border-green-500 rounded-lg p-4 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-green-400">License Activated!</h3>
              <p className="text-green-300 mt-2">
                Your license has been bound to this device
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Key:</span>
                <span className="font-mono">{license.key}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tier:</span>
                <span className="capitalize">{license.tier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">HWID:</span>
                <span className="font-mono text-sm">{license.hwid}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
