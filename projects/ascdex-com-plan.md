# AsCodex.com — Technical Plan v2.0

> **Domain:** ascodex.com
> **Type:** RAG + LLM Generator Platform
> **AI Engine:** AscAI (MiMo-powered)
> **License:** MIT (free tier) + Commercial
> **Last Updated:** 2026-09-12

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    AsCodex.com                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Web App    │  │  RAG Engine │  │  LLM Router │    │
│  │  (Next.js)  │  │  (Qdrant)   │  │  (AscAI)    │    │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤    │
│  │ Dashboard   │  │ Vectors     │  │ Multi-model │    │
│  │ Chat UI     │  │ Embeddings  │  │ Context     │    │
│  │ Documents   │  │ Search      │  │ Routing     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              AscAI Engine (MiMo)                 │   │
│  │  - RAG chat (codebase + docs)                   │   │
│  │  - LLM generation (multi-model)                 │   │
│  │  - Voice commands                               │   │
│  │  - Auto-complete                                │   │
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

## 2. AscAI — Named AI Engine

### 2.1 Branding

```
┌─────────────────────────────────────────────────┐
│              AscAI                               │
│  Your intelligent coding assistant               │
│                                                 │
│  Powered by MiMo Engine                         │
│  ├── RAG (Retrieval-Augmented Generation)       │
│  ├── Multi-model routing                        │
│  ├── Context-aware responses                    │
│  └── Voice commands                             │
│                                                 │
│  Models:                                        │
│  ├── AscAI Base (MiMo) — Free                   │
│  ├── AscAI Pro (GPT-4) — €9/mo                  │
│  ├── AscAI Ultra (Claude) — €19/mo              │
│  └── AscAI Custom (BYOK) — €29/mo               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 2.2 Profit Monetization

| Tier | Price | Models | Tokens/mo |
|------|-------|--------|-----------|
| **Free** | €0 | AscAI Base (MiMo) | 10,000 |
| **Pro** | €9/mo | + GPT-4 | 100,000 |
| **Ultra** | €19/mo | + Claude, Gemini | 500,000 |
| **Custom** | €29/mo | BYOK (your keys) | Unlimited |

### 2.3 Revenue Streams

1. **Subscriptions:** €9-29/mo per user
2. **Token Overage:** €0.002/1K tokens beyond limit
3. **API Access:** €49/mo for developers
4. **Enterprise:** Custom pricing for teams
5. **Marketplace:** Templates & plugins (20% commission)

---

## 3. RAG Engine

### 3.1 Features

```
┌─────────────────────────────────────────────────┐
│              RAG Workspace                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Document Ingestion                             │
│  ├── Upload files (PDF, MD, TXT, DOCX)         │
│  ├── Connect repos (GitHub, GitLab)            │
│  ├── Web scraping (URLs, sitemaps)             │
│  └── API endpoints (REST, GraphQL)             │
│                                                 │
│  Vector Storage                                 │
│  ├── Qdrant vector database                    │
│  ├── Voyage AI embeddings                      │
│  ├── Automatic chunking                        │
│  └── Metadata filtering                        │
│                                                 │
│  Semantic Search                                │
│  ├── Natural language queries                  │
│  ├── Code-aware search                         │
│  ├── Multi-document search                     │
│  └── Relevance ranking                         │
│                                                 │
│  Chat with Code                                 │
│  ├── Context-aware responses                   │
│  ├── Code citations                            │
│  ├── Follow-up questions                       │
│  └── Export conversations                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 3.2 API Endpoints

```
POST   /api/rag/upload        → Upload document
POST   /api/rag/connect       → Connect repo
POST   /api/rag/search        → Semantic search
POST   /api/rag/chat          → Chat with codebase
GET    /api/rag/documents     → List documents
DELETE /api/rag/documents/:id → Delete document
GET    /api/rag/stats         → Usage stats
```

---

## 4. LLM Generator

### 4.1 Features

```
┌─────────────────────────────────────────────────┐
│              LLM Generator                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  Code Generation                                │
│  ├── Component generation                      │
│  ├── API route generation                      │
│  ├── Database schema generation                │
│  ├── Test generation                           │
│  └── Documentation generation                  │
│                                                 │
│  Code Analysis                                  │
│  ├── Bug detection                             │
│  ├── Security scanning                         │
│  ├── Performance analysis                      │
│  ├── Code review                               │
│  └── Refactoring suggestions                   │
│                                                 │
│  Multi-Model Support                            │
│  ├── AscAI Base (MiMo) — Fast, free            │
│  ├── GPT-4 — Best code quality                 │
│  ├── Claude — Long context                     │
│  ├── Gemini — Google integration               │
│  └── Custom (BYOK) — Your choice               │
│                                                 │
│  Context Management                             │
│  ├── Smart truncation                          │
│  ├── File relevance scoring                    │
│  ├── Dependency awareness                      │
│  └── Multi-file context                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 4.2 API Endpoints

```
POST   /api/llm/generate      → Generate code
POST   /api/llm/analyze       → Analyze code
POST   /api/llm/refactor      → Refactor code
POST   /api/llm/review        → Code review
POST   /api/llm/explain       → Explain code
GET    /api/llm/models        → List available models
POST   /api/llm/switch        → Switch model
```

---

## 5. Registration & Auth

### 5.1 Auth Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Email/Pass  │────▶│  NextAuth v5 │────▶│  PostgreSQL  │
│  Google      │     │  Sessions    │     │  Users table │
│  GitHub      │     │  JWT tokens  │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

### 5.2 Registration Flow

```
1. User visits ascodex.com
2. Click "Sign Up"
3. Enter email + password
4. Verify email (magic link)
5. Free tier activated (10K tokens)
6. Onboarding wizard:
   ├── Choose default model
   ├── Connect first repo
   └── Upload first document
7. Dashboard ready
```

### 5.3 Password Generation

```
When user signs up:
1. Generate secure password: AscAI-{random}-2026!
2. Show password ONCE
3. User can change later
4. Password requirements:
   - 12+ characters
   - Upper + lowercase
   - Number + special char
   - Not in common list
```

---

## 6. License System

### 6.1 License Types

| Type | Duration | Features | Price |
|------|----------|----------|-------|
| **Free Trial** | 7 days | All features | €0 |
| **Free** | Unlimited | 10K tokens/mo | €0 |
| **Pro** | Monthly | 100K tokens + GPT-4 | €9/mo |
| **Ultra** | Monthly | 500K tokens + Claude | €19/mo |
| **Custom** | Monthly | BYOK + unlimited | €29/mo |
| **Lifetime** | Forever | Everything | €999 |

### 6.2 License Activation

```
User purchases → Stripe webhook → Generate license
    ↓
License key = base64({userId, tier, expiresAt, features})
    ↓
Activate in dashboard or CLI
    ↓
Phone home every 7 days
```

---

## 7. Database Schema

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    avatar_url TEXT,
    tier VARCHAR(20) DEFAULT 'free',
    tokens_used INT DEFAULT 0,
    tokens_limit INT DEFAULT 10000,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Licenses
CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    key VARCHAR(255) UNIQUE NOT NULL,
    tier VARCHAR(20) NOT NULL,
    features JSONB DEFAULT '[]',
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Documents (RAG)
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),  -- file/repo/url/api
    source TEXT,
    content TEXT,
    chunks INT DEFAULT 0,
    vector_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Conversations
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    title VARCHAR(255),
    model VARCHAR(50),
    messages JSONB DEFAULT '[]',
    tokens_used INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    repo_url TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 8. Deployment

### 8.1 Infrastructure

| Component | Service | Cost |
|-----------|---------|------|
| Frontend | Vercel | Free tier |
| API | Railway | €5/mo |
| Database | Supabase | Free tier |
| Vector DB | Qdrant Cloud | Free tier |
| Embeddings | Voyage AI | $0.1/1M tokens |
| Auth | NextAuth | Free |
| Billing | Stripe | 2.9% + €0.25 |

### 8.2 CI/CD

```yaml
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

## 9. Revenue Model

### 9.1 Pricing Strategy

| Segment | Price | Target |
|---------|-------|--------|
| Free | €0 | Hobbyists, students |
| Pro | €9/mo | Solo developers |
| Ultra | €19/mo | Professionals |
| Custom | €29/mo | Power users |
| Lifetime | €999 | Early adopters |
| Enterprise | Custom | Companies |

### 9.2 Revenue Projections

| Month | Users | Paid | MRR |
|-------|-------|------|-----|
| 1 | 200 | 20 | €180 |
| 3 | 1,000 | 100 | €900 |
| 6 | 5,000 | 500 | €4,500 |
| 12 | 20,000 | 2,000 | €18,000 |

### 9.3 Upsell Points

1. **Free → Pro:** When hitting 10K token limit
2. **Pro → Ultra:** When needing Claude/long context
3. **Ultra → Custom:** When wanting BYOK
4. **Monthly → Lifetime:** After 12 months

---

## 10. MiMo Worker Tasks

### Phase 1: Core (Week 1-2)
- [ ] User registration & auth
- [ ] License system
- [ ] Basic chat UI
- [ ] Document upload

### Phase 2: RAG Engine (Week 3-4)
- [ ] Qdrant integration
- [ ] Voyage AI embeddings
- [ ] Semantic search
- [ ] Repo connection

### Phase 3: LLM Generator (Week 5-6)
- [ ] Multi-model routing
- [ ] Code generation
- [ ] Code analysis
- [ ] Context management

### Phase 4: Dashboard (Week 7-8)
- [ ] Project management
- [ ] Usage analytics
- [ ] Billing integration
- [ ] Settings page

### Phase 5: Launch (Week 9-10)
- [ ] Landing page
- [ ] Documentation
- [ ] Beta testing
- [ ] Product Hunt launch

---

*Plan generated: 2026-09-12*
