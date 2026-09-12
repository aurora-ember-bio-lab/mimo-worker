#!/usr/bin/env node
// Aurora Ember Bio Lab — CLI Tool Template
// Usage: npx @aurora-ember/cli <command> [options]

import { Command } from 'commander';
import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

// ============================================
// CONFIGURATION
// ============================================

interface CLIConfig {
  name: string;
  version: string;
  projectName: string;
  projectPrefix: string;
  apiUrl: string;
  description: string;
}

const DEFAULT_CONFIG: CLIConfig = {
  name: 'aurora-cli',
  version: '2.0.0',
  projectName: 'Aurora Ember Bio Lab',
  projectPrefix: 'AURORA',
  apiUrl: 'https://api.aurora-ember-bio-lab.com',
  description: 'Aurora Ember Bio Lab CLI - Manage your licenses and projects',
};

// ============================================
// HWID GENERATION
// ============================================

function getHWID(): string {
  const platform = process.platform;
  
  try {
    if (platform === 'win32') {
      // Windows: Use PowerShell to get HWID
      const cpu = execSync('wmic cpu get ProcessorId /value', { encoding: 'utf-8' });
      const bios = execSync('wmic bios get SerialNumber /value', { encoding: 'utf-8' });
      const mac = execSync('getmac /fo csv /nh', { encoding: 'utf-8' });
      
      const cpuId = cpu.split('ProcessorId=')[1]?.trim() || 'NOCPU';
      const biosId = bios.split('SerialNumber=')[1]?.trim() || 'NOBIOS';
      const macId = mac.split(',')[0]?.replace(/"/g, '') || 'NOMAC';
      
      const raw = `${cpuId}|${biosId}|${macId}`;
      return generateHash(raw);
    } else if (platform === 'darwin') {
      // macOS
      const serial = execSync('system_profiler SPHardwareDataType | grep Serial', { encoding: 'utf-8' });
      const mac = execSync('ifconfig en0 | grep ether', { encoding: 'utf-8' });
      
      const raw = `${serial}|${mac}`;
      return generateHash(raw);
    } else {
      // Linux
      const cpu = execSync('cat /proc/cpuinfo | grep "model name" | head -1', { encoding: 'utf-8' });
      const mac = execSync('cat /sys/class/net/$(ip route show default | awk \'/default/ {print $5}\')/address', { encoding: 'utf-8' });
      
      const raw = `${cpu}|${mac}`;
      return generateHash(raw);
    }
  } catch (error) {
    // Fallback: generate from hostname + username
    const raw = `${process.env.COMPUTERNAME || 'unknown'}|${process.env.USERNAME || 'unknown'}`;
    return generateHash(raw);
  }
}

function generateHash(input: string): string {
  // Simple hash for demo - use crypto.createHash('sha256') in production
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).toUpperCase().padStart(16, '0').substring(0, 16);
}

// ============================================
// LICENSE OPERATIONS
// ============================================

async function activateLicense(key: string, project?: string): Promise<void> {
  const hwid = getHWID();
  
  console.log('');
  console.log('========================================');
  console.log(`  ${DEFAULT_CONFIG.projectName}`);
  console.log('  License Activation');
  console.log('========================================');
  console.log('');
  console.log(`  License Key: ${key}`);
  console.log(`  HWID: ${hwid}`);
  console.log('');
  
  try {
    const response = await fetch(`${DEFAULT_CONFIG.apiUrl}/api/license/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, hwid, project }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('  ✅ License activated successfully!');
      console.log(`  Project: ${data.project}`);
      console.log(`  Tier: ${data.license?.tier}`);
      console.log('');
      
      // Save license locally
      saveLicenseLocally(key, hwid, data.project, data.license);
    } else {
      console.log(`  ❌ Activation failed: ${data.error}`);
    }
  } catch (error) {
    console.log('  ❌ Network error. Please check your connection.');
  }
}

async function validateLicense(key: string): Promise<void> {
  const hwid = getHWID();
  
  console.log('');
  console.log(`  Validating license: ${key}`);
  console.log('');
  
  try {
    const response = await fetch(`${DEFAULT_CONFIG.apiUrl}/api/license/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, hwid }),
    });
    
    const data = await response.json();
    
    if (data.valid) {
      console.log('  ✅ License is valid');
      console.log(`  Tier: ${data.license?.tier}`);
      console.log(`  Expires: ${data.license?.expiresAt || 'Never'}`);
    } else {
      console.log(`  ❌ License invalid: ${data.error}`);
    }
  } catch (error) {
    console.log('  ❌ Network error');
  }
}

function saveLicenseLocally(key: string, hwid: string, project: string, license: unknown): void {
  const configDir = join(homedir(), '.aurora-ember');
  const licenseFile = join(configDir, `${project}.json`);
  
  if (!existsSync(configDir)) {
    execSync(`mkdir -p "${configDir}"`);
  }
  
  writeFileSync(licenseFile, JSON.stringify({
    key,
    hwid,
    project,
    license,
    activatedAt: new Date().toISOString(),
  }, null, 2));
  
  console.log(`  License saved to: ${licenseFile}`);
}

function showHWID(): void {
  const hwid = getHWID();
  console.log('');
  console.log('========================================');
  console.log('  Hardware ID (HWID)');
  console.log('========================================');
  console.log('');
  console.log(`  ${hwid}`);
  console.log('');
  console.log('  Use this ID to activate your license.');
  console.log('');
}

// ============================================
// CLI COMMANDS
// ============================================

const program = new Command();

program
  .name(DEFAULT_CONFIG.name)
  .description(DEFAULT_CONFIG.description)
  .version(DEFAULT_CONFIG.version);

program
  .command('activate')
  .description('Activate a license key')
  .argument('<key>', 'License key (format: XXXX-XXXX-XXXX-XXXX-XXXX)')
  .option('-p, --project <project>', 'Project name')
  .action(async (key: string, options: { project?: string }) => {
    await activateLicense(key, options.project);
  });

program
  .command('validate')
  .description('Validate a license key')
  .argument('<key>', 'License key')
  .action(async (key: string) => {
    await validateLicense(key);
  });

program
  .command('hwid')
  .description('Show your Hardware ID')
  .action(() => {
    showHWID();
  });

program
  .command('status')
  .description('Show license status')
  .action(() => {
    console.log('');
    console.log('  License status:');
    console.log('  (Coming soon)');
    console.log('');
  });

program
  .command('config')
  .description('Show CLI configuration')
  .action(() => {
    console.log('');
    console.log('  CLI Configuration:');
    console.log(`  Name: ${DEFAULT_CONFIG.name}`);
    console.log(`  Version: ${DEFAULT_CONFIG.version}`);
    console.log(`  API URL: ${DEFAULT_CONFIG.apiUrl}`);
    console.log('');
  });

// Parse arguments
program.parse();
