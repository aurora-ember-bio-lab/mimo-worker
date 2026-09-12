// Aurora Ember Bio Lab — SEO Meta Tags Generator
// Generates meta tags for all 13 projects

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  url: string;
  image: string;
  type: 'website' | 'product' | 'article';
}

export const SEO_CONFIGS: Record<string, SEOConfig> = {
  atlantgen: {
    title: 'AtlantGen - AI-Powered Migration SaaS | Migrate WooCommerce to Next.js',
    description: 'Migrate your WooCommerce, Shopify, or WordPress store to Next.js in minutes with AI-powered automation. 943+ products migrated successfully.',
    keywords: ['migration', 'WooCommerce', 'Shopify', 'WordPress', 'Next.js', 'AI', 'e-commerce', 'SaaS'],
    url: 'https://atlantgen.com',
    image: 'https://atlantgen.com/og-image.png',
    type: 'product',
  },
  ambershield: {
    title: 'Amber Shield - AI Security Scanner & Compliance Tool',
    description: 'Scan your codebase for vulnerabilities with AI-powered explanations. Get compliance reports and heatmaps in seconds.',
    keywords: ['security', 'scanner', 'vulnerabilities', 'compliance', 'AI', 'code analysis', 'cybersecurity'],
    url: 'https://ambershield.app',
    image: 'https://ambershield.app/og-image.png',
    type: 'product',
  },
  ascodex: {
    title: 'AsCodex - Launch Full-Stack Apps in 4 Minutes | AI Scaffold Generator',
    description: 'Scaffold Next.js, Remix, Nuxt, or SvelteKit projects with AI. Pick a framework, AI engine, and database - we handle the rest.',
    keywords: ['scaffold', 'generator', 'Next.js', 'Remix', 'Nuxt', 'AI', 'developer tools', 'boilerplate'],
    url: 'https://ascodex.app',
    image: 'https://ascodex.app/og-image.png',
    type: 'product',
  },
  ascodexcom: {
    title: 'AsCodex.com - AscAI: RAG + LLM Generator for Developers',
    description: 'Chat with your codebase using RAG. Generate code with GPT-4, Claude, or MiMo. AI-powered development assistant.',
    keywords: ['RAG', 'LLM', 'AI', 'code generation', 'chat', 'developer tools', 'AscAI'],
    url: 'https://ascodex.com',
    image: 'https://ascodex.com/og-image.png',
    type: 'product',
  },
  templateai: {
    title: 'TemplateAI - AI Template Generator with Theme Injection',
    description: 'Generate beautiful templates with AI. Inject themes, customize styles, and export to any framework.',
    keywords: ['templates', 'AI', 'generator', 'themes', 'design', 'frontend', 'UI'],
    url: 'https://templateai.app',
    image: 'https://templateai.app/og-image.png',
    type: 'product',
  },
  nordicai: {
    title: 'Nordic AI - Multi-Model AI Platform | Chat, Code, Create',
    description: 'Access GPT-4, Claude, Gemini, and more in one platform. Chat, generate code, and create content with AI.',
    keywords: ['AI', 'GPT-4', 'Claude', 'Gemini', 'chat', 'code generation', 'multi-model'],
    url: 'https://nordiclab.app',
    image: 'https://nordiclab.app/og-image.png',
    type: 'product',
  },
  certus: {
    title: 'Certus - SSL/TLS Certificate Manager | Auto-Renewal & Monitoring',
    description: 'Monitor and auto-renew your SSL certificates. Get alerts before expiry and stay compliant.',
    keywords: ['SSL', 'TLS', 'certificate', 'monitoring', 'auto-renewal', 'security', 'compliance'],
    url: 'https://getcertus.app',
    image: 'https://getcertus.app/og-image.png',
    type: 'product',
  },
  voxaeena: {
    title: 'Voxa Eterna - AI Voice Cloning & Text-to-Speech Platform',
    description: 'Clone voices and generate speech with AI. Real-time synthesis, multiple languages, custom voices.',
    keywords: ['voice', 'AI', 'text-to-speech', 'voice cloning', 'synthesis', 'audio'],
    url: 'https://voxaeterna.app',
    image: 'https://voxaeterna.app/og-image.png',
    type: 'product',
  },
  infiniteheroes: {
    title: 'Infinite Heroes - AI Comics & Heroes Generator',
    description: 'Create comic book heroes and stories with AI. Generate characters, panels, and entire comics.',
    keywords: ['comics', 'heroes', 'AI', 'generator', 'characters', 'stories', 'creative'],
    url: 'https://infiniteheroes.app',
    image: 'https://infiniteheroes.app/og-image.png',
    type: 'product',
  },
  aegissolver: {
    title: 'Aegis Solver - AI Math & Science Problem Solver',
    description: 'Solve math and science problems with step-by-step explanations. LaTeX rendering, API for educators.',
    keywords: ['math', 'science', 'solver', 'AI', 'education', 'LaTeX', 'step-by-step'],
    url: 'https://aegissolver.com',
    image: 'https://aegissolver.com/og-image.png',
    type: 'product',
  },
  splatstudio: {
    title: 'Splat Studio - AI Design Tool for Splash Screens & Hero Images',
    description: 'Create stunning splash screens and hero images with AI. Templates, export formats, collaboration.',
    keywords: ['design', 'splash screen', 'hero image', 'AI', 'templates', 'creative'],
    url: 'https://splatstudio.app',
    image: 'https://splatstudio.app/og-image.png',
    type: 'product',
  },
  teleportlab: {
    title: 'Teleport Lab - Infrastructure-as-Code Visual Editor',
    description: 'Edit Terraform and Kubernetes with visual interface. AI suggestions, cost estimation, team collaboration.',
    keywords: ['IaC', 'Terraform', 'Kubernetes', 'DevOps', 'visual editor', 'AI'],
    url: 'https://teleportlab.app',
    image: 'https://teleportlab.app/og-image.png',
    type: 'product',
  },
  vitreouslab: {
    title: 'Vitreous Lab - Real-Time Analytics Dashboard with AI Insights',
    description: 'Track events in real-time with AI-powered insights. Custom reports, alerts, anomaly detection.',
    keywords: ['analytics', 'dashboard', 'real-time', 'AI', 'insights', 'metrics'],
    url: 'https://vitreouslab.app',
    image: 'https://vitreouslab.app/og-image.png',
    type: 'product',
  },
};

// Generate HTML meta tags
export function generateMetaTags(project: string): string {
  const config = SEO_CONFIGS[project];
  if (!config) return '';

  return `
<!-- Primary Meta Tags -->
<title>${config.title}</title>
<meta name="title" content="${config.title}">
<meta name="description" content="${config.description}">
<meta name="keywords" content="${config.keywords.join(', ')}">
<meta name="author" content="Aurora Ember Bio Lab">
<meta name="robots" content="index, follow">
<meta name="language" content="English">
<meta name="revisit-after" content="7 days">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${config.type}">
<meta property="og:url" content="${config.url}">
<meta property="og:title" content="${config.title}">
<meta property="og:description" content="${config.description}">
<meta property="og:image" content="${config.image}">
<meta property="og:site_name" content="Aurora Ember Bio Lab">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${config.url}">
<meta property="twitter:title" content="${config.title}">
<meta property="twitter:description" content="${config.description}">
<meta property="twitter:image" content="${config.image}">

<!-- Canonical URL -->
<link rel="canonical" href="${config.url}">
`.trim();
}

// Generate JSON-LD structured data
export function generateStructuredData(project: string): string {
  const config = SEO_CONFIGS[project];
  if (!config) return '';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.title.split(' - ')[0],
    description: config.description,
    url: config.url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web, Windows, macOS, Linux',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '0',
      highPrice: '59',
      offerCount: '4',
    },
    author: {
      '@type': 'Organization',
      name: 'Aurora Ember Bio Lab',
      url: 'https://github.com/aurora-ember-bio-lab',
    },
  };

  return `<script type="application/ld+json">${JSON.stringify(structuredData, null, 2)}</script>`;
}

// Generate sitemap entry
export function generateSitemapEntry(project: string): string {
  const config = SEO_CONFIGS[project];
  if (!config) return '';

  return `
  <url>
    <loc>${config.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`.trim();
}
