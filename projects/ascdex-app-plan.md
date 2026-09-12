# AsCodex.app — Technical Plan v2.0

> **Domain:** ascodex.app
> **Type:** Scaffold Generator SaaS + Desktop App (Tauri)
> **License:** MIT (free trial) + Commercial licenses
> **AI Engine:** AscAI (MiMo-powered)
> **Last Updated:** 2026-09-12

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    AsCodex.app                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Web App    │  │  Desktop    │  │  CLI Tool   │    │
│  │  (Next.js)  │  │  (Tauri)    │  │  (npm)      │    │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤    │
│  │ Dashboard   │  │ Native App  │  │ npx init     │    │
│  │ Projects    │  │ HWID lic.   │  │ Wizard       │    │
│  │ Templates   │  │ Auto-update │  │ Scaffold     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              AscAI Engine (MiMo)                 │   │
│  │  - Code generation                              │   │
│  │  - Template completion                          │   │
│  │  - RAG workspace (Qdrant)                       │   │
│  │  - Voice commands                               │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Database   │  │  Auth       │  │  Billing    │    │
│  │  PostgreSQL │  │  NextAuth   │  │  Stripe     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. License System

### 2.1 License Tiers

| Tier | Price | Features | Limits |
|------|-------|----------|--------|
| **Free Trial** | €0 | 3 projects, basic templates | 7 days |
| **Starter** | €18/mo | 9 frameworks, local Ollama | 20 projects |
| **Pro** | €29/mo | 10 AI engines, RAG workspace | 35 projects |
| **Studio** | €59/mo | 5 seats, team templates | 50 projects |
| **Lifetime** | €499 | Everything forever | Unlimited |

### 2.2 License Activation Flow

```
User purchases → Stripe webhook → Generate license key
    ↓
License key = base64({userId, tier, expiresAt, hwid, features})
    ↓
Desktop app validates locally (offline capable)
    ↓
Phone home every 7 days to check revocation
    ↓
HWID binding: hash(machine-id + cpu-id + mac-address)
```

### 2.3 License API Endpoints

```
POST   /api/license/activate     → Activate license key
POST   /api/license/validate     → Validate license (online)
GET    /api/license/status       → Get current license
POST   /api/license/transfer     → Transfer to new device
DELETE /api/license/revoke       → Revoke license (admin)
```

### 2.4 License Key Format

```
ASCEX-XXXX-XXXX-XXXX-XXXX
│      │    │    │    │
│      │    │    │    └── Checksum (4 chars)
│      │    │    └── Device ID (4 chars)
│      │    └── Tier (4 chars: STRT/PRO_/STUD/LIFE)
│      └── Serial (4 chars)
└── Prefix (ASCEX)
```

---

## 3. Registration & Auth

### 3.1 Auth Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Email/Pass  │────▶│  NextAuth v5 │────▶│  PostgreSQL  │
│  Google      │     │  Sessions    │     │  Users table │
│  GitHub      │     │  JWT tokens  │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

### 3.2 Database Schema (Users & Licenses)

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Licenses
CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    key VARCHAR(19) UNIQUE NOT NULL,  -- ASCEx-XXXX-XXXX-XXXX-XXXX
    tier VARCHAR(20) NOT NULL,  -- starter/pro/studio/lifetime
    hwid VARCHAR(255),  -- Hardware ID for binding
    features JSONB DEFAULT '[]',
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    last_validated TIMESTAMP
);

-- Projects (scaffolded apps)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    framework VARCHAR(50),  -- nextjs/remix/nuxt/sveltekit/astro
    ai_engine VARCHAR(50),  -- ollama/claude/gpt4/gemini
    database VARCHAR(50),   -- sqlite/neon/supabase/planetscale
    deploy_target VARCHAR(50),  -- vercel/netlify/railway
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    scaffolded_at TIMESTAMP
);

-- Templates
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    framework VARCHAR(50),
    category VARCHAR(50),
    content JSONB NOT NULL,
    is_official BOOLEAN DEFAULT false,
    author_id UUID REFERENCES users(id),
    downloads INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Usage tracking
CREATE TABLE usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    project_id UUID REFERENCES projects(id),
    action VARCHAR(50),  -- scaffold/deploy/generate
    tokens_used INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 4. Scaffold Wizard

### 4.1 CLI Flow (`npx ascodex init`)

```
$ npx ascodex@latest init

? Project name › my-app
? Framework › Next.js 15
? AI engine › AscAI (MiMo) [LOCAL FREE]
? Database › SQLite
? Deploy target › Vercel
? Features › 
  ◉ TypeScript
  ◉ Tailwind CSS
  ◉ shadcn/ui
  ◉ Authentication
  ○ Payment (Stripe)
  ○ CMS (Payload)

✓ Scaffolded in 3m 48s
✓ .env configured
✓ Git initialized
✓ Pushing to Vercel...
```

### 4.2 Supported Frameworks

| Framework | Templates | Status |
|-----------|-----------|--------|
| Next.js 15 | 12 templates | ✅ Ready |
| Remix | 8 templates | ✅ Ready |
| Nuxt 3 | 8 templates | 🟡 Beta |
| SvelteKit | 6 templates | 🟡 Beta |
| Astro | 6 templates | 🟡 Beta |
| Payload CMS | 4 templates | 🔴 Planned |
| MedusaJS | 4 templates | 🔴 Planned |
| Express | 4 templates | 🔴 Planned |
| Fastify | 4 templates | 🔴 Planned |

### 4.3 Supported AI Engines

| Engine | Type | Cost | Features |
|--------|------|------|----------|
| **AscAI (MiMo)** | Local | Free | Code gen, completion, chat |
| Ollama | Local | Free | Llama, Mistral, CodeLlama |
| Claude | API | $3/1M tokens | Long context, analysis |
| GPT-4 | API | $30/1M tokens | Best code generation |
| Gemini | API | Free tier | Google integration |
| Copilot | API | $10/mo | IDE integration |
| DeepSeek | API | Cheap | Code specialist |
| Mistral | API | Cheap | European LLM |
| Llama | Local | Free | Open source |
| Custom | API | Varies | Bring your own |

### 4.4 Supported Databases

| Database | Setup | Cost |
|----------|-------|------|
| SQLite | Local file | Free |
| Neon Postgres | Cloud | Free tier |
| Supabase | Cloud | Free tier |
| PlanetScale | Cloud | Free tier |
| MongoDB Atlas | Cloud | Free tier |
| Redis (Upstash) | Cloud | Free tier |
| Turso | Edge | Free tier |
| Xata | Serverless | Free tier |
| PocketBase | Self-host | Free |

---

## 5. AscAI Engine (MiMo Integration)

### 5.1 Features

```
┌─────────────────────────────────────────────────┐
│              AscAI Engine                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  Code Generation                                │
│  ├── Component scaffolding                     │
│  ├── API route generation                      │
│  ├── Database schema generation                │
│  └── Test file generation                      │
│                                                 │
│  RAG Workspace                                  │
│  ├── Qdrant vector DB                          │
│  ├── Voyage AI embeddings                      │
│  ├── Codebase semantic search                  │
│  └── Chat with your code                       │
│                                                 │
│  Voice Commands                                 │
│  ├── "Create a login page"                     │
│  ├── "Add Stripe payments"                     │
│  ├── "Generate API routes"                     │
│  └── "Deploy to Vercel"                        │
│                                                 │
│  Auto-Complete                                  │
│  ├── Real-time suggestions                     │
│  ├── Context-aware                             │
│  ├── Multi-file editing                        │
│  └── Refactor suggestions                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 5.2 AscAI API

```
POST /api/ai/generate      → Generate code from prompt
POST /api/ai/complete      → Code completion
POST /api/ai/chat          → Chat with codebase
POST /api/ai/voice         → Voice command
POST /api/ai/refactor      → Refactor code
GET  /api/ai/suggestions   → Get suggestions
```

---

## 6. Revenue Model

### 6.1 Pricing Strategy

| Segment | Price | Target |
|---------|-------|--------|
| Free Trial | €0/7d | Hobbyists |
| Starter | €18/mo | Solo devs |
| Pro | €29/mo | Professionals |
| Studio | €59/mo | Teams |
| Lifetime | €499 | Power users |
| Enterprise | Custom | Companies |

### 6.2 Revenue Projections

| Month | Users | Paid | MRR |
|-------|-------|------|-----|
| 1 | 100 | 10 | €180 |
| 3 | 500 | 50 | €1,200 |
| 6 | 2,000 | 200 | €5,000 |
| 12 | 10,000 | 1,000 | €25,000 |

### 6.3 Upsell Points

1. **Free → Starter:** After 3rd project
2. **Starter → Pro:** When using cloud AI engines
3. **Pro → Studio:** When inviting team members
4. **Monthly → Lifetime:** After 12 months of payment

---

## 7. Deployment

### 7.1 Infrastructure

| Component | Service | Cost |
|-----------|---------|------|
| Frontend | Vercel | Free tier |
| API | Railway | €5/mo |
| Database | Supabase | Free tier |
| Auth | NextAuth | Free |
| Billing | Stripe | 2.9% + €0.25 |
| CDN | Cloudflare | Free |
| Analytics | PostHog | Free tier |

### 7.2 CI/CD

```yaml
# GitHub Actions
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 8. MiMo Worker Tasks

### Phase 1: Core (Week 1-2)
- [ ] License system implementation
- [ ] User registration & auth
- [ ] Scaffold wizard (CLI)
- [ ] 3 framework templates (Next.js, Remix, Nuxt)

### Phase 2: AI Engine (Week 3-4)
- [ ] AscAI integration (MiMo)
- [ ] Ollama local engine
- [ ] Code completion
- [ ] RAG workspace setup

### Phase 3: Dashboard (Week 5-6)
- [ ] Project management
- [ ] Template marketplace
- [ ] Usage analytics
- [ ] Billing integration

### Phase 4: Desktop App (Week 7-8)
- [ ] Tauri wrapper
- [ ] HWID licensing
- [ ] Auto-update
- [ ] Offline mode

### Phase 5: Launch (Week 9-10)
- [ ] Landing page
- [ ] Documentation
- [ ] Beta testing
- [ ] Product Hunt launch

---

*Plan generated: 2026-09-12*
