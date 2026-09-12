# Aurora Ember Bio Lab — Shared License System

> **License:** MIT (Free) + Commercial
> **Version:** 2.0.0
> **Last Updated:** 2026-09-12

---

## Overview

Universal HWID license system for all 13 Aurora Ember Bio Lab projects. Includes:

- PowerShell HWID generator
- TypeScript license core
- React UI components
- Redis caching
- Rate limiting
- Stripe integration

---

## Projects

| # | Project | Domain | Prefix |
|---|---------|--------|--------|
| 1 | AtlantGen | atlantgen.com | ATGN |
| 2 | Amber Shield | ambershield.app | AMSH |
| 3 | AsCodex | ascodex.app | ASCX |
| 4 | AsCodex.com | ascodex.com | ASC2 |
| 5 | TemplateAI | templateai.app | TMAI |
| 6 | Nordic AI | nordiclab.app | NRAI |
| 7 | Certus | getcertus.app | CRSS |
| 8 | Voxa Eterna | voxaeterna.app | VXET |
| 9 | Infinite Heroes | infiniteheroes.app | INHR |
| 10 | Aegis Solver | aegissolver.com | AEGS |
| 11 | Splat Studio | splatstudio.app | SPLT |
| 12 | Teleport Lab | teleportlab.app | TLPT |
| 13 | Vitreous Lab | vitreouslab.app | VTLB |

---

## Quick Start

### PowerShell (Windows)

```powershell
# Get your HWID
.\shared\Get-HWID.ps1

# Activate a license
.\shared\Activate-License.ps1 -LicenseKey "ATGN-A1B2-STRT-C3D4-E5F6"
```

### CLI (Node.js)

```bash
# Install CLI
npm install -g @aurora-ember/cli

# Get HWID
aurora-cli hwid

# Activate license
aurora-cli activate ATGN-A1B2-STRT-C3D4-E5F6

# Validate license
aurora-cli validate ATGN-A1B2-STRT-C3D4-E5F6
```

### API

```bash
# Activate
curl -X POST https://api.aurora-ember-bio-lab.com/api/license/activate \
  -H "Content-Type: application/json" \
  -d '{"key": "ATGN-A1B2-STRT-C3D4-E5F6", "hwid": "A1B2C3D4E5F6G7H8"}'

# Validate
curl -X POST https://api.aurora-ember-bio-lab.com/api/license/validate \
  -H "Content-Type: application/json" \
  -d '{"key": "ATGN-A1B2-STRT-C3D4-E5F6"}'
```

### React

```tsx
import LicenseInput from '@aurora-ember/license-ui/LicenseInput';
import ActivationDialog from '@aurora-ember/license-ui/ActivationDialog';
import LicenseStatus from '@aurora-ember/license-ui/LicenseStatus';

function App() {
  return (
    <div>
      <LicenseInput onActivate={(license) => console.log(license)} />
      <LicenseStatus project="atlantgen" />
    </div>
  );
}
```

---

## License Key Format

```
{PREFIX}-{SERIAL}-{TIER}-{DEVICE}-{CHECKSUM}

Example: ATGN-A1B2-STRT-C3D4-E5F6
         │    │    │    │    │
         │    │    │    │    └── Checksum (4 chars)
         │    │    │    └── Device ID (4 chars)
         │    │    └── Tier (FREE/STRT/PRO_/STUD/LIFE/ENTE)
         │    └── Serial (4 chars)
         └── Project prefix (4 chars)
```

---

## Tier Limits

| Tier | Price | Projects | Devices | Support |
|------|-------|----------|---------|---------|
| Free | €0 | 3 | 1 | Community |
| Starter | €18/mo | 20 | 2 | Email |
| Pro | €29/mo | 50 | 3 | Priority |
| Studio | €59/mo | 100 | 5 | Dedicated |
| Lifetime | €1,999 | Unlimited | 10 | Dedicated |

---

## File Structure

```
shared/
├── Get-HWID.ps1           # PowerShell HWID generator
├── Activate-License.ps1   # PowerShell activation
├── license-core.ts        # Core license functions
├── license-types.ts       # TypeScript types
├── project-config.ts      # 13 project configs
├── stripe-config.ts       # Stripe configuration
├── stripe-test.ts         # Stripe test mode
└── cli-template.ts        # CLI tool template

packages/
├── license-api/           # API routes
│   ├── activate.ts
│   ├── validate.ts
│   ├── transfer.ts
│   └── revoke.ts
├── license-ui/            # React components
│   ├── LicenseInput.tsx
│   ├── ActivationDialog.tsx
│   └── LicenseStatus.tsx
├── license-db/            # Database
│   ├── 001_create_licenses.sql
│   ├── cache.ts
│   └── rate-limit.ts
└── seo/                   # SEO tools
    ├── meta-tags.ts
    └── landing-page.ts
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Support

- GitHub Issues: https://github.com/aurora-ember-bio-lab/mimo-worker/issues
- Email: support@aurora-ember-bio-lab.com

---

*Built by Aurora Ember Bio Lab*
