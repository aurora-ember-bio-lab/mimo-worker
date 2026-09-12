// Aurora Ember Bio Lab — Shared Stripe Configuration
// All 13 projects with their Stripe product/price IDs

export const STRIPE_CONFIG = {
  // API Keys (use test keys for development)
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_REPLACE',
  secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_REPLACE',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_REPLACE',

  // Webhook configuration
  webhook: {
    endpoint: '/api/stripe/webhook',
    events: [
      'checkout.session.completed',
      'invoice.paid',
      'invoice.payment_failed',
      'customer.subscription.updated',
      'customer.subscription.deleted',
      'customer.subscription.created',
    ],
  },

  // Products and Prices for all 13 projects
  products: {
    atlantgen: {
      name: 'AtlantGen',
      description: 'AI-Powered Migration SaaS',
      tiers: {
        starter: {
          productId: 'prod_atgn_starter',
          priceId: 'price_atgn_starter_monthly',
          name: 'Starter',
          price: 1800, // cents
          currency: 'eur',
          interval: 'month',
          features: ['woocommerce', 'shopify', '5_stores', 'email_support'],
        },
        pro: {
          productId: 'prod_atgn_pro',
          priceId: 'price_atgn_pro_monthly',
          name: 'Pro',
          price: 2900,
          currency: 'eur',
          interval: 'month',
          features: ['all_connectors', 'ai_scan', '25_stores', 'priority_support'],
        },
        studio: {
          productId: 'prod_atgn_studio',
          priceId: 'price_atgn_studio_monthly',
          name: 'Studio',
          price: 5900,
          currency: 'eur',
          interval: 'month',
          features: ['team_access', 'custom_connectors', '100_stores', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_atgn_lifetime',
          priceId: 'price_atgn_lifetime',
          name: 'Lifetime',
          price: 199900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    ambershield: {
      name: 'Amber Shield',
      description: 'Security Scanner & Compliance',
      tiers: {
        starter: {
          productId: 'prod_amsh_starter',
          priceId: 'price_amsh_starter_monthly',
          name: 'Starter',
          price: 1800,
          currency: 'eur',
          interval: 'month',
          features: ['full_scan', 'heatmaps', '10_projects', 'email_support'],
        },
        pro: {
          productId: 'prod_amsh_pro',
          priceId: 'price_amsh_pro_monthly',
          name: 'Pro',
          price: 2900,
          currency: 'eur',
          interval: 'month',
          features: ['ai_explanations', 'ci_cd', '50_projects', 'priority_support'],
        },
        studio: {
          productId: 'prod_amsh_studio',
          priceId: 'price_amsh_studio_monthly',
          name: 'Studio',
          price: 5900,
          currency: 'eur',
          interval: 'month',
          features: ['team_dashboard', 'compliance', '200_projects', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_amsh_lifetime',
          priceId: 'price_amsh_lifetime',
          name: 'Lifetime',
          price: 199900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    ascodex: {
      name: 'AsCodex',
      description: 'Scaffold Generator SaaS',
      tiers: {
        starter: {
          productId: 'prod_ascx_starter',
          priceId: 'price_ascx_starter_monthly',
          name: 'Starter',
          price: 1800,
          currency: 'eur',
          interval: 'month',
          features: ['9_frameworks', 'local_ai', '20_projects', 'email_support'],
        },
        pro: {
          productId: 'prod_ascx_pro',
          priceId: 'price_ascx_pro_monthly',
          name: 'Pro',
          price: 2900,
          currency: 'eur',
          interval: 'month',
          features: ['10_ai_engines', 'rag_workspace', '35_projects', 'priority_support'],
        },
        studio: {
          productId: 'prod_ascx_studio',
          priceId: 'price_ascx_studio_monthly',
          name: 'Studio',
          price: 5900,
          currency: 'eur',
          interval: 'month',
          features: ['team_templates', 'priority_deploy', '50_projects', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_ascx_lifetime',
          priceId: 'price_ascx_lifetime',
          name: 'Lifetime',
          price: 199900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    ascodexcom: {
      name: 'AsCodex.com',
      description: 'RAG + LLM Generator (AscAI)',
      tiers: {
        starter: {
          productId: 'prod_asc2_starter',
          priceId: 'price_asc2_starter_monthly',
          name: 'Starter',
          price: 900,
          currency: 'eur',
          interval: 'month',
          features: ['100k_tokens', 'gpt4_access', 'email_support'],
        },
        pro: {
          productId: 'prod_asc2_pro',
          priceId: 'price_asc2_pro_monthly',
          name: 'Pro',
          price: 1900,
          currency: 'eur',
          interval: 'month',
          features: ['500k_tokens', 'claude_access', 'priority_support'],
        },
        studio: {
          productId: 'prod_asc2_studio',
          priceId: 'price_asc2_studio_monthly',
          name: 'Studio',
          price: 2900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited_tokens', 'byok', 'team_access', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_asc2_lifetime',
          priceId: 'price_asc2_lifetime',
          name: 'Lifetime',
          price: 99900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    templateai: {
      name: 'TemplateAI',
      description: 'AI Template Generator',
      tiers: {
        starter: {
          productId: 'prod_tmai_starter',
          priceId: 'price_tmai_starter_monthly',
          name: 'Starter',
          price: 1200,
          currency: 'eur',
          interval: 'month',
          features: ['50_templates', 'theme_injection', 'email_support'],
        },
        pro: {
          productId: 'prod_tmai_pro',
          priceId: 'price_tmai_pro_monthly',
          name: 'Pro',
          price: 2400,
          currency: 'eur',
          interval: 'month',
          features: ['all_templates', 'custom_themes', 'priority_support'],
        },
        studio: {
          productId: 'prod_tmai_studio',
          priceId: 'price_tmai_studio_monthly',
          name: 'Studio',
          price: 4900,
          currency: 'eur',
          interval: 'month',
          features: ['team_library', 'white_label', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_tmai_lifetime',
          priceId: 'price_tmai_lifetime',
          name: 'Lifetime',
          price: 149900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    nordicai: {
      name: 'Nordic AI',
      description: 'Multi-Model AI Platform',
      tiers: {
        starter: {
          productId: 'prod_nrai_starter',
          priceId: 'price_nrai_starter_monthly',
          name: 'Starter',
          price: 1500,
          currency: 'eur',
          interval: 'month',
          features: ['10k_messages', 'all_models', 'email_support'],
        },
        pro: {
          productId: 'prod_nrai_pro',
          priceId: 'price_nrai_pro_monthly',
          name: 'Pro',
          price: 2900,
          currency: 'eur',
          interval: 'month',
          features: ['100k_messages', 'fine_tuning', 'priority_support'],
        },
        studio: {
          productId: 'prod_nrai_studio',
          priceId: 'price_nrai_studio_monthly',
          name: 'Studio',
          price: 5900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited', 'custom_models', 'team_access', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_nrai_lifetime',
          priceId: 'price_nrai_lifetime',
          name: 'Lifetime',
          price: 199900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    certus: {
      name: 'Certus',
      description: 'Certificate Manager',
      tiers: {
        starter: {
          productId: 'prod_crss_starter',
          priceId: 'price_crss_starter_monthly',
          name: 'Starter',
          price: 1200,
          currency: 'eur',
          interval: 'month',
          features: ['50_certs', 'auto_renewal', 'email_support'],
        },
        pro: {
          productId: 'prod_crss_pro',
          priceId: 'price_crss_pro_monthly',
          name: 'Pro',
          price: 2400,
          currency: 'eur',
          interval: 'month',
          features: ['500_certs', 'team_alerts', 'priority_support'],
        },
        studio: {
          productId: 'prod_crss_studio',
          priceId: 'price_crss_studio_monthly',
          name: 'Studio',
          price: 4900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited', 'compliance', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_crss_lifetime',
          priceId: 'price_crss_lifetime',
          name: 'Lifetime',
          price: 149900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    voxaeena: {
      name: 'Voxa Eterna',
      description: 'Voice AI Assistant',
      tiers: {
        starter: {
          productId: 'prod_vxet_starter',
          priceId: 'price_vxet_starter_monthly',
          name: 'Starter',
          price: 1500,
          currency: 'eur',
          interval: 'month',
          features: ['50k_characters', 'voice_cloning', 'email_support'],
        },
        pro: {
          productId: 'prod_vxet_pro',
          priceId: 'price_vxet_pro_monthly',
          name: 'Pro',
          price: 2900,
          currency: 'eur',
          interval: 'month',
          features: ['500k_characters', 'real_time', 'priority_support'],
        },
        studio: {
          productId: 'prod_vxet_studio',
          priceId: 'price_vxet_studio_monthly',
          name: 'Studio',
          price: 5900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited', 'custom_voices', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_vxet_lifetime',
          priceId: 'price_vxet_lifetime',
          name: 'Lifetime',
          price: 199900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    infiniteheroes: {
      name: 'Infinite Heroes',
      description: 'Comics Heroes Generator',
      tiers: {
        starter: {
          productId: 'prod_inhr_starter',
          priceId: 'price_inhr_starter_monthly',
          name: 'Starter',
          price: 1200,
          currency: 'eur',
          interval: 'month',
          features: ['50_comics', 'ai_generation', 'email_support'],
        },
        pro: {
          productId: 'prod_inhr_pro',
          priceId: 'price_inhr_pro_monthly',
          name: 'Pro',
          price: 2400,
          currency: 'eur',
          interval: 'month',
          features: ['500_comics', 'story_engine', 'priority_support'],
        },
        studio: {
          productId: 'prod_inhr_studio',
          priceId: 'price_inhr_studio_monthly',
          name: 'Studio',
          price: 4900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited', 'marketplace', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_inhr_lifetime',
          priceId: 'price_inhr_lifetime',
          name: 'Lifetime',
          price: 149900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    aegissolver: {
      name: 'Aegis Solver',
      description: 'AI Problem Solver',
      tiers: {
        starter: {
          productId: 'prod_aegs_starter',
          priceId: 'price_aegs_starter_monthly',
          name: 'Starter',
          price: 1200,
          currency: 'eur',
          interval: 'month',
          features: ['100_problems', 'step_by_step', 'email_support'],
        },
        pro: {
          productId: 'prod_aegs_pro',
          priceId: 'price_aegs_pro_monthly',
          name: 'Pro',
          price: 2400,
          currency: 'eur',
          interval: 'month',
          features: ['1k_problems', 'latex_render', 'priority_support'],
        },
        studio: {
          productId: 'prod_aegs_studio',
          priceId: 'price_aegs_studio_monthly',
          name: 'Studio',
          price: 4900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited', 'api_access', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_aegs_lifetime',
          priceId: 'price_aegs_lifetime',
          name: 'Lifetime',
          price: 149900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    splatstudio: {
      name: 'Splat Studio',
      description: 'AI Design Tool',
      tiers: {
        starter: {
          productId: 'prod_splt_starter',
          priceId: 'price_splt_starter_monthly',
          name: 'Starter',
          price: 1200,
          currency: 'eur',
          interval: 'month',
          features: ['50_designs', 'ai_generation', 'email_support'],
        },
        pro: {
          productId: 'prod_splt_pro',
          priceId: 'price_splt_pro_monthly',
          name: 'Pro',
          price: 2400,
          currency: 'eur',
          interval: 'month',
          features: ['500_designs', 'export_formats', 'priority_support'],
        },
        studio: {
          productId: 'prod_splt_studio',
          priceId: 'price_splt_studio_monthly',
          name: 'Studio',
          price: 4900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited', 'collaboration', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_splt_lifetime',
          priceId: 'price_splt_lifetime',
          name: 'Lifetime',
          price: 149900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    teleportlab: {
      name: 'Teleport Lab',
      description: 'Infrastructure-as-Code Editor',
      tiers: {
        starter: {
          productId: 'prod_tlpt_starter',
          priceId: 'price_tlpt_starter_monthly',
          name: 'Starter',
          price: 1500,
          currency: 'eur',
          interval: 'month',
          features: ['50_deployments', 'terraform', 'email_support'],
        },
        pro: {
          productId: 'prod_tlpt_pro',
          priceId: 'price_tlpt_pro_monthly',
          name: 'Pro',
          price: 2900,
          currency: 'eur',
          interval: 'month',
          features: ['500_deployments', 'kubernetes', 'priority_support'],
        },
        studio: {
          productId: 'prod_tlpt_studio',
          priceId: 'price_tlpt_studio_monthly',
          name: 'Studio',
          price: 5900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited', 'cost_estimation', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_tlpt_lifetime',
          priceId: 'price_tlpt_lifetime',
          name: 'Lifetime',
          price: 199900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },

    vitreouslab: {
      name: 'Vitreous Lab',
      description: 'Analytics Dashboard',
      tiers: {
        starter: {
          productId: 'prod_vtlb_starter',
          priceId: 'price_vtlb_starter_monthly',
          name: 'Starter',
          price: 1500,
          currency: 'eur',
          interval: 'month',
          features: ['100k_events', 'real_time', 'email_support'],
        },
        pro: {
          productId: 'prod_vtlb_pro',
          priceId: 'price_vtlb_pro_monthly',
          name: 'Pro',
          price: 2900,
          currency: 'eur',
          interval: 'month',
          features: ['1m_events', 'ai_insights', 'priority_support'],
        },
        studio: {
          productId: 'prod_vtlb_studio',
          priceId: 'price_vtlb_studio_monthly',
          name: 'Studio',
          price: 5900,
          currency: 'eur',
          interval: 'month',
          features: ['unlimited', 'custom_reports', 'dedicated_support'],
        },
        lifetime: {
          productId: 'prod_vtlb_lifetime',
          priceId: 'price_vtlb_lifetime',
          name: 'Lifetime',
          price: 199900,
          currency: 'eur',
          interval: 'once',
          features: ['everything', 'unlimited'],
        },
      },
    },
  },
};

// Helper functions
export function getProductConfig(project: string) {
  return STRIPE_CONFIG.products[project as keyof typeof STRIPE_CONFIG.products];
}

export function getPriceId(project: string, tier: string): string | null {
  const product = getProductConfig(project);
  if (!product) return null;
  const tierConfig = product.tiers[tier as keyof typeof product.tiers];
  return tierConfig?.priceId || null;
}

export function getTierConfig(project: string, tier: string) {
  const product = getProductConfig(project);
  if (!product) return null;
  return product.tiers[tier as keyof typeof product.tiers] || null;
}

export function getAllProjects(): string[] {
  return Object.keys(STRIPE_CONFIG.products);
}

export function getTiersForProject(project: string): string[] {
  const product = getProductConfig(project);
  if (!product) return [];
  return Object.keys(product.tiers);
}
