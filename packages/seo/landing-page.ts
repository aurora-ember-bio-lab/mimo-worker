// Aurora Ember Bio Lab — Landing Page Template
// Reusable landing page component for all projects

export interface LandingPageConfig {
  project: string;
  name: string;
  tagline: string;
  description: string;
  features: Feature[];
  pricing: PricingTier[];
  cta: string;
  testimonials?: Testimonial[];
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: number;
  interval: string;
  features: string[];
  highlighted?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

// Landing page HTML template
export function generateLandingPage(config: LandingPageConfig): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name} - ${config.tagline}</title>
  <meta name="description" content="${config.description}">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .gradient-bg { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
  </style>
</head>
<body class="gradient-bg min-h-screen text-white">
  <!-- Hero Section -->
  <section class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-5xl font-bold mb-6">
      <span class="text-purple-400">${config.name}</span>
    </h1>
    <p class="text-2xl text-gray-300 mb-8">${config.tagline}</p>
    <p class="text-lg text-gray-400 max-w-2xl mx-auto mb-12">${config.description}</p>
    
    <a href="#pricing" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all inline-block">
      ${config.cta}
    </a>
  </section>

  <!-- Features Section -->
  <section class="container mx-auto px-4 py-20">
    <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${config.features.map(f => `
        <div class="bg-gray-800/50 rounded-xl p-6 card-hover">
          <div class="text-4xl mb-4">${f.icon}</div>
          <h3 class="text-xl font-bold mb-2">${f.title}</h3>
          <p class="text-gray-400">${f.description}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="container mx-auto px-4 py-20">
    <h2 class="text-3xl font-bold text-center mb-12">Pricing</h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      ${config.pricing.map(p => `
        <div class="bg-gray-800/50 rounded-xl p-6 card-hover ${p.highlighted ? 'border-2 border-purple-500' : ''}">
          ${p.highlighted ? '<div class="bg-purple-600 text-white text-xs px-2 py-1 rounded-full inline-block mb-4">Most Popular</div>' : ''}
          <h3 class="text-xl font-bold mb-2">${p.name}</h3>
          <div class="text-4xl font-bold mb-4">
            €${p.price}<span class="text-lg text-gray-400">/${p.interval}</span>
          </div>
          <ul class="space-y-2 mb-6">
            ${p.features.map(f => `<li class="text-gray-400">✓ ${f}</li>`).join('')}
          </ul>
          <button class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all">
            Get Started
          </button>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- CTA Section -->
  <section class="container mx-auto px-4 py-20 text-center">
    <h2 class="text-3xl font-bold mb-6">Ready to get started?</h2>
    <p class="text-gray-400 mb-8">Join thousands of developers using ${config.name}</p>
    <a href="#pricing" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all inline-block">
      ${config.cta}
    </a>
  </section>

  <!-- Footer -->
  <footer class="container mx-auto px-4 py-8 border-t border-gray-800">
    <div class="flex justify-between items-center">
      <div class="text-gray-400">© 2026 ${config.name}. Built by Aurora Ember Bio Lab.</div>
      <div class="flex gap-4">
        <a href="/privacy" class="text-gray-400 hover:text-white">Privacy</a>
        <a href="/terms" class="text-gray-400 hover:text-white">Terms</a>
        <a href="https://github.com/aurora-ember-bio-lab" class="text-gray-400 hover:text-white">GitHub</a>
      </div>
    </div>
  </footer>
</body>
</html>
`.trim();
}

// Example configurations for each project
export const LANDING_PAGE_CONFIGS: Record<string, LandingPageConfig> = {
  atlantgen: {
    project: 'atlantgen',
    name: 'AtlantGen',
    tagline: 'Migrate to Next.js in Minutes',
    description: 'AI-powered migration from WooCommerce, Shopify, and WordPress to modern Next.js applications.',
    features: [
      { icon: '🛒', title: 'WooCommerce', description: 'Migrate products, orders, and customers automatically.' },
      { icon: '🛍️', title: 'Shopify', description: 'Seamless Shopify to Next.js migration.' },
      { icon: '🤖', title: 'AI Validation', description: 'AI scans and validates your data during migration.' },
    ],
    pricing: [
      { name: 'Free', price: 0, interval: 'mo', features: ['1 store', '100 products', 'Basic support'] },
      { name: 'Starter', price: 18, interval: 'mo', features: ['5 stores', '5,000 products', 'Email support'], highlighted: true },
      { name: 'Pro', price: 29, interval: 'mo', features: ['25 stores', '50,000 products', 'Priority support'] },
      { name: 'Studio', price: 59, interval: 'mo', features: ['100 stores', 'Unlimited products', 'Dedicated support'] },
    ],
    cta: 'Start Migration Free',
  },
  ascodex: {
    project: 'ascodex',
    name: 'AsCodex',
    tagline: 'Launch Full-Stack Apps in 4 Minutes',
    description: 'AI-powered scaffold generator. Pick a framework, AI engine, and database - we handle the rest.',
    features: [
      { icon: '⚛️', title: '9 Frameworks', description: 'Next.js, Remix, Nuxt, SvelteKit, and more.' },
      { icon: '🤖', title: '10 AI Engines', description: 'Ollama, Claude, GPT-4, Gemini, and more.' },
      { icon: '🚀', title: 'Auto Deploy', description: 'One-click deploy to Vercel, Netlify, Railway.' },
    ],
    pricing: [
      { name: 'Free', price: 0, interval: 'mo', features: ['3 projects', 'Basic templates', 'Community support'] },
      { name: 'Starter', price: 18, interval: 'mo', features: ['20 projects', '9 frameworks', 'Email support'], highlighted: true },
      { name: 'Pro', price: 29, interval: 'mo', features: ['35 projects', 'All AI engines', 'Priority support'] },
      { name: 'Studio', price: 59, interval: 'mo', features: ['50 projects', 'Team templates', 'Dedicated support'] },
    ],
    cta: 'Start Scaffolding Free',
  },
};
