<#
.SYNOPSIS
    Activates an Aurora Ember Bio Lab license key.

.DESCRIPTION
    Activates a license key by binding it to the current device's HWID.
    Supports all 13 Aurora Ember Bio Lab projects.

.PARAMETER LicenseKey
    The license key to activate (format: XXXX-XXXX-XXXX-XXXX-XXXX)

.PARAMETER Project
    The project name (e.g., atlantgen, ascodex, ambershield)

.PARAMETER ApiUrl
    API endpoint URL (default: https://api.aurora-ember-bio-lab.com)

.EXAMPLE
    .\Activate-License.ps1 -LicenseKey "ATGN-A1B2-STRT-C3D4-E5F6" -Project "atlantgen"

.EXAMPLE
    .\Activate-License.ps1 -LicenseKey "ASCX-0001-PRO_-0000-0000"

.NOTES
    Author: Aurora Ember Bio Lab
    Version: 2.0
    Date: 2026-09-12
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$LicenseKey,
    
    [Parameter(Mandatory=$false)]
    [string]$Project,
    
    [Parameter(Mandatory=$false)]
    [string]$ApiUrl = "https://api.aurora-ember-bio-lab.com"
)

# ============================================
# FUNCTIONS
# ============================================

function Get-HWID {
    [CmdletBinding()]
    param()

    try {
        $cpu = (Get-CimInstance Win32_Processor -ErrorAction Stop).ProcessorId
        if (-not $cpu) { $cpu = "NOCPU" }

        $bios = (Get-CimInstance Win32_BIOS -ErrorAction Stop).SerialNumber
        if (-not $bios) { $bios = "NOBIOS" }

        $macAdapter = Get-NetAdapter -ErrorAction SilentlyContinue | 
            Where-Object { $_.Status -eq "Up" } | 
            Select-Object -First 1
        $mac = if ($macAdapter) { $macAdapter.MacAddress } else { "NO-MAC-ADDRESS" }

        $disk = (Get-CimInstance Win32_DiskDrive -ErrorAction SilentlyContinue | 
            Where-Object { $_.Index -eq 0 } | 
            Select-Object -First 1).SerialNumber
        if (-not $disk) { $disk = "NODISK" }

        $raw = "$cpu|$bios|$mac|$disk"
        
        $sha256 = [System.Security.Cryptography.SHA256]::Create()
        $hashBytes = $sha256.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($raw))
        
        $hash = ($hashBytes | ForEach-Object { $_.ToString("x2") }) -join ''
        return $hash.Substring(0, 16).ToUpper()
    }
    catch {
        Write-Error "Failed to generate HWID: $_"
        return $null
    }
}

function Test-LicenseKeyFormat {
    param([string]$Key)
    return $Key -match '^[A-Z]{4}-[A-F0-9]{4}-(FREE|STRT|PRO_|STUD|LIFE|ENTE)-[A-F0-9]{4}-[A-F0-9]{4}$'
}

function Get-ProjectFromKey {
    param([string]$Key)
    $prefix = $Key.Split('-')[0]
    $projects = @{
        'ATGN' = 'atlantgen'
        'AMSH' = 'ambershield'
        'ASCX' = 'ascodex'
        'ASC2' = 'ascodexcom'
        'TMAI' = 'templateai'
        'NRAI' = 'nordicai'
        'CRSS' = 'certus'
        'VXET' = 'voxaeena'
        'INHR' = 'infiniteheroes'
        'AEGS' = 'aegissolver'
        'SPLT' = 'splatstudio'
        'TLPT' = 'teleportlab'
        'VTLB' = 'vitreouslab'
    }
    return $projects[$prefix]
}

# ============================================
# MAIN SCRIPT
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Aurora Ember Bio Lab - License        " -ForegroundColor Cyan
Write-Host "  Activation Tool v2.0                  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Validate license key format
Write-Host "[1/4] Validating license key format..." -ForegroundColor Yellow
if (-not (Test-LicenseKeyFormat -Key $LicenseKey)) {
    Write-Host "  ❌ Invalid license key format!" -ForegroundColor Red
    Write-Host "  Expected: XXXX-XXXX-XXXX-XXXX-XXXX" -ForegroundColor Gray
    Write-Host "  Example: ATGN-A1B2-STRT-C3D4-E5F6" -ForegroundColor Gray
    exit 1
}
Write-Host "  ✅ License key format valid" -ForegroundColor Green

# Detect project from key
Write-Host "[2/4] Detecting project..." -ForegroundColor Yellow
if (-not $Project) {
    $Project = Get-ProjectFromKey -Key $LicenseKey
    if (-not $Project) {
        Write-Host "  ❌ Could not detect project from license key" -ForegroundColor Red
        Write-Host "  Please specify -Project parameter" -ForegroundColor Gray
        exit 1
    }
}
Write-Host "  ✅ Project: $Project" -ForegroundColor Green

# Generate HWID
Write-Host "[3/4] Generating hardware ID..." -ForegroundColor Yellow
$HWID = Get-HWID
if (-not $HWID) {
    Write-Host "  ❌ Failed to generate HWID" -ForegroundColor Red
    exit 1
}
Write-Host "  ✅ HWID: $HWID" -ForegroundColor Green

# Activate license
Write-Host "[4/4] Activating license..." -ForegroundColor Yellow

$body = @{
    action = "activate"
    key = $LicenseKey
    hwid = $HWID
    project = $Project
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$ApiUrl/api/license/activate" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 30
    
    if ($response.success) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  ✅ License Activated Successfully!    " -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Project: $($response.project)" -ForegroundColor White
        Write-Host "  HWID: $($response.hwid)" -ForegroundColor White
        Write-Host ""
        Write-Host "  License is now bound to this device." -ForegroundColor Gray
        Write-Host ""
    }
    else {
        Write-Host "  ❌ Activation failed: $($response.error)" -ForegroundColor Red
        exit 1
    }
}
catch {
    Write-Host "  ❌ API error: $_" -ForegroundColor Red
    Write-Host "  Check your internet connection and try again." -ForegroundColor Gray
    exit 1
}
