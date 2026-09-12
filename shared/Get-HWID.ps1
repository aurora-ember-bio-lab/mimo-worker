<#
.SYNOPSIS
    Generates unique Hardware ID (HWID) for license activation.

.DESCRIPTION
    Creates a 16-character hex fingerprint from CPU, BIOS, MAC, and Disk serial numbers.
    Used by Aurora Ember Bio Lab products for license binding.

.EXAMPLE
    .\Get-HWID.ps1
    Returns: A1B2C3D4E5F6G7H8

.NOTES
    Author: Aurora Ember Bio Lab
    Version: 2.0
    Date: 2026-09-12
#>

function Get-HWID {
    [CmdletBinding()]
    param()

    try {
        # CPU Processor ID
        $cpu = (Get-CimInstance Win32_Processor -ErrorAction Stop).ProcessorId
        if (-not $cpu) { $cpu = "NOCPU" }

        # BIOS Serial Number
        $bios = (Get-CimInstance Win32_BIOS -ErrorAction Stop).SerialNumber
        if (-not $bios) { $bios = "NOBIOS" }

        # Primary MAC Address (active adapter)
        $macAdapter = Get-NetAdapter -ErrorAction SilentlyContinue | 
            Where-Object { $_.Status -eq "Up" } | 
            Select-Object -First 1
        $mac = if ($macAdapter) { $macAdapter.MacAddress } else { "NO-MAC-ADDRESS" }

        # Primary Disk Serial Number
        $disk = (Get-CimInstance Win32_DiskDrive -ErrorAction SilentlyContinue | 
            Where-Object { $_.Index -eq 0 } | 
            Select-Object -First 1).SerialNumber
        if (-not $disk) { $disk = "NODISK" }

        # Combine all components
        $raw = "$cpu|$bios|$mac|$disk"
        
        # Generate SHA-256 hash
        $sha256 = [System.Security.Cryptography.SHA256]::Create()
        $hashBytes = $sha256.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($raw))
        
        # Convert to hex and take first 16 characters
        $hash = ($hashBytes | ForEach-Object { $_.ToString("x2") }) -join ''
        $hwid = $hash.Substring(0, 16).ToUpper()

        return $hwid
    }
    catch {
        Write-Error "Failed to generate HWID: $_"
        return $null
    }
}

# Export function
$HWID = Get-HWID

if ($HWID) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Aurora Ember Bio Lab - Hardware ID    " -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  HWID: $HWID" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Use this ID to activate your license." -ForegroundColor Gray
    Write-Host "  Copy it to clipboard? (Y/N): " -ForegroundColor Gray -NoNewline
    
    $response = Read-Host
    if ($response -eq 'Y' -or $response -eq 'y') {
        $HWID | Set-Clipboard
        Write-Host "  Copied to clipboard!" -ForegroundColor Green
    }
    Write-Host ""
}
