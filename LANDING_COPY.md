# ascodex.app — Landing Copy: "How it works" + FAQ

Author: Aurora Ember Bio Lab · Status: ready to hand off
Target page: Landing (spread out between the terminal demo and the Features section) + a FAQ block before the footer.
All facts/prices below match the current live site (Starter €18/mo, Pro €29/mo, Studio €59/mo, yearly = save ~2 months, Windows .exe LIVE, macOS/Linux coming soon, Web PWA all platforms).

---

## 1. HOW IT WORKS (3 steps — drop-in section)

Section label: **How it works**
Heading: **Up and running in three steps**
Sub: Four minutes from idea to deployed app. No boilerplate, no config files, no guesswork.

### Step 01 — Install (or open in browser)
Download the Windows installer, or just open ascodex.app and click "Install as app" — it runs as a native-feel PWA on Chrome, Edge, Safari or Firefox. Choose the path that fits your machine.

### Step 02 — Pick your stack in the wizard
Enter your project name, then choose your framework (of 9), your AI engine (of 10), your database (of 9), and your deploy target. Everything is optional to change later — the scaffold is instant, not permanent.

### Step 03 — Scaffold and deploy
ascodex writes the project, wires the `.env`, installs dependencies, and pushes to Vercel. In under four minutes you have a live URL and a local dev server. License-key activation is automatic after checkout.

---

## 2. FAQ (drop-in block)

### What is a HWID-bound license?
HWID stands for hardware ID — a unique fingerprint of your specific machine. When you activate a license, it is bound to your PC. That means your Pro or Studio key can't be shared across machines: activation is locked to the one device you activated. Moving to a new machine? Use the Transfer tool in the app to release the license before you switch.

### What happens right after I buy?
- You're redirected to Stripe for payment.
- Your license key appears on the confirmation screen **and** is emailed to the purchase address.
- Open the app → enter the key once → done. No waiting, no manual approval.

### How do I transfer my license to a new machine?
Use the **Transfer device** page (or the in-app transfer). It releases your current machine's hardware lock so you can reactivate on the new machine. A license can be transferred, but it can only be active on one machine at a time.

### Can I change plans or cancel later?
Yes. Visit **Manage plan** with your license key and purchase email to open the secure Stripe billing portal. From there you can upgrade, downgrade, update your payment method, download invoices, or cancel. If you cancel, access continues until the end of your billing period.

### Is there a free option?
The Web PWA and Windows download are free to install. Starter is €18/month (or the yearly equivalent) and includes 20 projects, the local Ollama AI engine, SQLite & Neon databases, and one-click Vercel deploy. Pro and Studio add the full AI-engine and database catalog, voice commands, and the RAG codebase workspace.

### Do I need an account in the browser vs. the desktop app?
The desktop app runs on a license key and works fully offline once installed. The web PWA covers the same feature set from the browser. Your projects stay on your machine when you're on the desktop build.

### Which platforms are supported?
Windows: native Tauri installer (live). macOS and Linux: native installers coming soon — until then, use the Web PWA. The PWA works on Windows, macOS, Linux, iOS and Android from any modern browser.

### Is my code sent anywhere?
On the local path (desktop app with Ollama), generation runs on your machine. When you choose a cloud AI engine, only the request you make is sent to that provider. Your scaffolded projects are only deployed when you click deploy.

---

## 3. Suggested placement

1. **How it works** → directly after the terminal demo / before the Features grid (mirrors AtlantGen's 3-step pattern).
2. **FAQ** → after Pricing, just above the footer, as a two-column accordion on desktop / stacked on mobile.
3. Each step card icon: ⬡ install-download, ⬡ wizard-pick, ⬡ rocket-deploy (match existing purple/cyan/green accents).

---

*Handoff ready: any implementer can drop sections 1 and 2 into the landing. If copy needs to match a real "voice commands" or "RAG workshop" release date, flag those two phrases in Features first.*