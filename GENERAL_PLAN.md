# Aurora Ember Bio Lab — Master Project Plan

> **Organization:** https://github.com/aurora-ember-bio-lab
> **Private Code:** https://github.com/cargounetcom
> **Deployment:** Vercel (frontend) + Railway (backend)
> **Automation:** MiMo Workers (daily rebuilds at 16:05 IST)
> **Last Updated:** 2026-09-12

---

## Portfolio Overview

| # | Project | Domain | Type | Status | Deploy |
|---|---------|--------|------|--------|--------|
| 1 | **AtlantGen** | atlantgen.com | Migration SaaS | 🟢 Live | Vercel + Railway |
| 2 | **Amber Shield** | ambershield.app | Security Scanner | 🟡 Beta | Vercel + Railway |
| 3 | **AsCodex** | ascodex.app | Code Generator | 🟡 Beta | Vercel |
| 4 | **TemplateAI** | templateai.app | Template Engine | 🔴 Planning | Vercel |
| 5 | **Nordic AI** | nordiclab.app | AI Platform | 🔴 Planning | Vercel |
| 6 | **Certus** | getcertus.app | Certificate Manager | 🔴 Planning | Vercel |
| 7 | **Voxa Eterna** | voxaeterna.app | Voice AI | 🔴 Planning | Vercel |
| 8 | **Infinite Heroes** | infiniteheroes.app | Game Platform | 🔴 Planning | Vercel |
| 9 | **Aegis Solver** | aegissolver.com | Problem Solver | 🔴 Planning | Vercel |
| 10 | **Splat Studio** | splatstudio.app | Design Tool | 🔴 Planning | Vercel |
| 11 | **Teleport Lab** | teleportlab.app | DevOps Tool | 🔴 Planning | Vercel |
| 12 | **Vitreous Lab** | vitreouslab.app | Analytics Dashboard | 🔴 Planning | Vercel |

---

## Project Details

### 1. AtlantGen — Migration SaaS
**Domain:** atlantgen.com
**Repo (private):** cargounetcom/atlantgen
**Repo (public releases):** aurora-ember-bio-lab/atlantgen-releases

**What it does:**
WordPress / Shopify / WooCommerce / Magento → Next.js + PostgreSQL migration platform.

**Tech Stack:**
- Frontend: Next.js 16, Tailwind CSS, shadcn/ui
- Backend: Go + Fiber, Node.js + BullMQ
- Database: PostgreSQL, Redis
- AI: MiMo models for data validation
- Deploy: Vercel (dashboard) + Railway (API + worker)

**MiMo Worker Tasks:**
- [ ] Admin panel refactoring
- [ ] Dashboard performance optimization
- [ ] AI scan improvements
- [ ] New connector development

**Current Status:**
- ✅ Dashboard deployed at atlantgen.com
- ✅ API deployed on Railway
- ✅ 943 products migrated from familywhole.com
- ✅ AI scan + report working
- ⏳ Worker deployment (Railway ROLE fix needed)

---

### 2. Amber Shield — Security Scanner
**Domain:** ambershield.app
**Repo (private):** cargounetcom/Amber-Shield
**Repo (public releases):** aurora-ember-bio-lab/Amber-Shield-releases

**What it does:**
Local security scanner with code-vulnerability heatmap + AI explain-drawer. Rust + Tauri desktop app.

**Tech Stack:**
- Desktop: Rust + Tauri
- Scanner: Trivy + GitLeaks
- AI: Local LLM for vulnerability explanations
- Deploy: GitHub Releases (desktop app)

**MiMo Worker Tasks:**
- [ ] Vulnerability database updates
- [ ] UI improvements
- [ ] New scan rules
- [ ] Performance optimization

**Current Status:**
- ✅ Desktop app (beta)
- ✅ GitHub Action (amber-shield-scan-action)
- ⏳ Web dashboard
- ⏳ Team features

---

### 3. AsCodex — Code Generator
**Domain:** ascodex.app
**Repo (private):** cargounetcom/ascodex
**Repo (public releases):** aurora-ember-bio-lab/ascodex-releases

**What it does:**
AI-powered code generation for Next.js, MedusaJS, and starter templates.

**Tech Stack:**
- Frontend: Next.js 16, Monaco Editor
- Backend: Node.js, MiMo models
- AI: Code generation + completion
- Deploy: Vercel

**MiMo Worker Tasks:**
- [ ] Template library expansion
- [ ] Code completion improvements
- [ ] Multi-language support
- [ ] IDE plugin development

**Current Status:**
- ✅ Core generator
- ✅ Next.js templates
- ⏳ MedusaJS templates
- ⏳ VS Code extension

---

### 4. TemplateAI — Template Engine
**Domain:** templateai.app
**Repo (private):** cargounetcom/templateai
**Repo (public releases):** cargounetcom/templateai-releases

**What it does:**
Style-connected template generation with theme injection.

**Tech Stack:**
- Frontend: Next.js 16
- Generator: AI-powered template engine
- Style: Theme injection system
- Deploy: Vercel

**MiMo Worker Tasks:**
- [ ] Theme library expansion
- [ ] Generator accuracy
- [ ] New template types
- [ ] Export formats

---

### 5. Nordic AI — AI Platform
**Domain:** nordiclab.app
**Repo (private):** cargounetcom/Nordic-ai
**Repo (public releases):** aurora-ember-bio-lab/nordic-ai-releases

**What it does:**
Multi-model AI platform with chat, code generation, and image analysis.

**Tech Stack:**
- Frontend: Next.js 16
- Backend: Node.js, multiple LLM providers
- AI: MiMo, GPT, Claude integration
- Deploy: Vercel + Railway

**MiMo Worker Tasks:**
- [ ] Model routing optimization
- [ ] Context window management
- [ ] Plugin system
- [ ] Usage analytics

---

### 6. Certus — Certificate Manager
**Domain:** getcertus.app
**Repo:** aurora-ember-bio-lab/certus

**What it does:**
SSL/TLS certificate monitoring and auto-renewal for teams.

**Tech Stack:**
- Frontend: Next.js 16
- Backend: Go + Fiber
- Scanner: Certificate transparency logs
- Deploy: Vercel + Railway

**MiMo Worker Tasks:**
- [ ] Certificate monitoring
- [ ] Auto-renewal (Let's Encrypt)
- [ ] Team alerts
- [ ] Compliance reports

---

### 7. Voxa Eterna — Voice AI
**Domain:** voxaeterna.app
**Repo:** aurora-ember-bio-lab/voxaeterna

**What it does:**
AI voice cloning and text-to-speech platform.

**Tech Stack:**
- Frontend: Next.js 16
- Backend: Python + FastAPI
- AI: Voice synthesis models
- Deploy: Vercel + Railway

**MiMo Worker Tasks:**
- [ ] Voice quality improvements
- [ ] New language support
- [ ] Real-time synthesis
- [ ] API documentation

---

### 8. Infinite Heroes — Game Platform
**Domain:** infiniteheroes.app
**Repo:** aurora-ember-bio-lab/infinite-heroes

**What it does:**
AI-powered game character creation and management.

**Tech Stack:**
- Frontend: Next.js 16 + Three.js
- Backend: Node.js
- AI: Character generation
- Deploy: Vercel + Railway

**MiMo Worker Tasks:**
- [ ] Character templates
- [ ] 3D model generation
- [ ] Game engine integration
- [ ] Marketplace

---

### 9. Aegis Solver — Problem Solver
**Domain:** aegissolver.com
**Repo:** aurora-ember-bio-lab/aegis-solver

**What it does:**
AI math and science problem solver with step-by-step explanations.

**Tech Stack:**
- Frontend: Next.js 16
- Backend: Python + FastAPI
- AI: Mathematical reasoning
- Deploy: Vercel + Railway

**MiMo Worker Tasks:**
- [ ] Problem database expansion
- [ ] Step-by-step solver
- [ ] LaTeX rendering
- [ ] API for educators

---

### 10. Splat Studio — Design Tool
**Domain:** splatstudio.app
**Repo:** aurora-ember-bio-lab/splat-studio

**What it does:**
AI-powered design tool for creating splash screens and hero images.

**Tech Stack:**
- Frontend: Next.js 16 + Canvas API
- Backend: Node.js
- AI: Image generation
- Deploy: Vercel

**MiMo Worker Tasks:**
- [ ] Template library
- [ ] AI image generation
- [ ] Export formats
- [ ] Collaboration features

---

### 11. Teleport Lab — DevOps Tool
**Domain:** teleportlab.app
**Repo:** aurora-ember-bio-lab/teleport-lab

**What it does:**
Infrastructure-as-code visual editor with AI suggestions.

**Tech Stack:**
- Frontend: Next.js 16 + React Flow
- Backend: Go + Fiber
- AI: Infrastructure suggestions
- Deploy: Vercel + Railway

**MiMo Worker Tasks:**
- [ ] Terraform support
- [ ] Kubernetes manifests
- [ ] AI suggestions
- [ ] Cost estimation

---

### 12. Vitreous Lab — Analytics Dashboard
**Domain:** vitreouslab.app
**Repo:** aurora-ember-bio-lab/vitreous-lab

**What it does:**
Real-time analytics dashboard with AI-powered insights.

**Tech Stack:**
- Frontend: Next.js 16 + D3.js
- Backend: Node.js + ClickHouse
- AI: Anomaly detection
- Deploy: Vercel + Railway

**MiMo Worker Tasks:**
- [ ] Dashboard widgets
- [ ] Real-time streaming
- [ ] Alert system
- [ ] Custom reports

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Aurora Ember Bio Lab                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Vercel     │  │  Railway    │  │  GitHub     │    │
│  │  (Frontend) │  │  (Backend)  │  │  (Code)     │    │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤    │
│  │ Next.js 16  │  │ Go + Fiber  │  │ Private:    │    │
│  │ Tailwind    │  │ Node.js     │  │ cargounetcom│    │
│  │ shadcn/ui   │  │ PostgreSQL  │  │             │    │
│  │             │  │ Redis       │  │ Public:     │    │
│  │ 12 apps     │  │ 12 APIs     │  │ aurora-ember│    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              MiMo Workers (Daily)               │   │
│  │  16:05 IST: Auto-refactor all 12 projects       │   │
│  │  Typecheck → Lint → Test → Commit → PR          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Domain → Project Mapping

| Domain | Project | Vercel Project | Railway Service |
|--------|---------|---------------|-----------------|
| atlantgen.com | AtlantGen | atlantgen | aura-amber-saas |
| ambershield.app | Amber Shield | amber-shield | amber-shield-api |
| ascodex.app | AsCodex | ascodex | ascodex-api |
| templateai.app | TemplateAI | templateai | templateai-api |
| nordiclab.app | Nordic AI | nordic-ai | nordic-ai-api |
| getcertus.app | Certus | certus | certus-api |
| voxaeterna.app | Voxa Eterna | voxaeterna | voxaeterna-api |
| infiniteheroes.app | Infinite Heroes | infinite-heroes | infinite-heroes-api |
| aegissolver.com | Aegis Solver | aegis-solver | aegis-solver-api |
| splatstudio.app | Splat Studio | splat-studio | splat-studio-api |
| teleportlab.app | Teleport Lab | teleport-lab | teleport-lab-api |
| vitreouslab.app | Vitreous Lab | vitreous-lab | vitreous-lab-api |

## MiMo Worker Schedule

| Time (IST) | Task | Projects |
|------------|------|----------|
| 16:05 | Phase 1: Component Refactoring | All 12 |
| 17:05 | Phase 2: Routing & Middleware | All 12 |
| 18:05 | Phase 3: Query Optimization | All 12 |
| 19:05 | Phase 4: Tests | All 12 |
| 20:05 | Phase 5: Deployment & Docs | All 12 |
| 21:05 | Final: Commit & PR | All 12 |

## Revenue Model

| Tier | Price | Features |
|------|-------|----------|
| Free | $0/mo | 3 projects, 1k records, community support |
| Starter | $29/mo | 10 projects, 10k records, email support |
| Growth | $99/mo | 50 projects, 100k records, priority support |
| Scale | $299/mo | Unlimited, custom connectors, dedicated instance |

## Next Steps

1. **Week 1:** Deploy AtlantGen worker (fix Railway ROLE bug)
2. **Week 1:** Create public repos for all 12 projects
3. **Week 2:** Build Amber Shield web dashboard
4. **Week 2:** Build AsCodex web interface
5. **Week 3:** Launch TemplateAI beta
6. **Week 3:** Launch Nordic AI beta
7. **Week 4:** Create landing pages for all projects
8. **Week 4:** Set up MiMo workers for all projects
9. **Month 2:** Launch Certus, Voxa Eterna, Infinite Heroes
10. **Month 3:** Launch Aegis Solver, Splat Studio, Teleport Lab, Vitreous Lab

---

*Generated by MiMo Worker Plan Engine — 2026-09-12*
