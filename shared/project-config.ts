// Aurora Ember Bio Lab — Project Configuration
// All 13 projects with their license prefixes

export const PROJECT_PREFIXES = {
  atlantgen: 'ATGN',
  ambershield: 'AMSH',
  ascodex: 'ASCX',
  ascodexcom: 'ASC2',
  templateai: 'TMAI',
  nordicai: 'NRAI',
  certus: 'CRSS',
  voxaeena: 'VXET',
  infiniteheroes: 'INHR',
  aegissolver: 'AEGS',
  splatstudio: 'SPLT',
  teleportlab: 'TLPT',
  vitreouslab: 'VTLB',
} as const;

export type ProjectKey = keyof typeof PROJECT_PREFIXES;

export interface ProjectConfig {
  id: ProjectKey;
  name: string;
  prefix: string;
  domain: string;
  description: string;
  tierFeatures: TierFeatures;
}

export interface TierFeatures {
  free: string[];
  starter: string[];
  pro: string[];
  studio: string[];
  lifetime: string[];
  enterprise: string[];
}

export const PROJECTS: Record<ProjectKey, ProjectConfig> = {
  atlantgen: {
    id: 'atlantgen',
    name: 'AtlantGen',
    prefix: 'ATGN',
    domain: 'atlantgen.com',
    description: 'AI-Powered Migration SaaS',
    tierFeatures: {
      free: ['basic_migration', '1_store', 'community_support'],
      starter: ['woocommerce', 'shopify', '5_stores', 'email_support'],
      pro: ['all_connectors', 'ai_scan', '25_stores', 'priority_support'],
      studio: ['team_access', 'custom_connectors', '100_stores', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_development'],
    },
  },
  ambershield: {
    id: 'ambershield',
    name: 'Amber Shield',
    prefix: 'AMSH',
    domain: 'ambershield.app',
    description: 'Security Scanner & Compliance',
    tierFeatures: {
      free: ['basic_scan', '1_project', 'community_support'],
      starter: ['full_scan', 'heatmaps', '10_projects', 'email_support'],
      pro: ['ai_explanations', 'ci_cd', '50_projects', 'priority_support'],
      studio: ['team_dashboard', 'compliance', '200_projects', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_rules'],
    },
  },
  ascodex: {
    id: 'ascodex',
    name: 'AsCodex',
    prefix: 'ASCX',
    domain: 'ascodex.app',
    description: 'Scaffold Generator SaaS',
    tierFeatures: {
      free: ['basic_scaffold', '3_projects', 'community_support'],
      starter: ['9_frameworks', 'local_ai', '20_projects', 'email_support'],
      pro: ['10_ai_engines', 'rag_workspace', '35_projects', 'priority_support'],
      studio: ['team_templates', 'priority_deploy', '50_projects', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_templates'],
    },
  },
  ascodexcom: {
    id: 'ascodexcom',
    name: 'AsCodex.com',
    prefix: 'ASC2',
    domain: 'ascodex.com',
    description: 'RAG + LLM Generator (AscAI)',
    tierFeatures: {
      free: ['10k_tokens', 'basic_chat', 'community_support'],
      starter: ['100k_tokens', 'gpt4_access', 'email_support'],
      pro: ['500k_tokens', 'claude_access', 'priority_support'],
      studio: ['unlimited_tokens', 'byok', 'team_access', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_models'],
    },
  },
  templateai: {
    id: 'templateai',
    name: 'TemplateAI',
    prefix: 'TMAI',
    domain: 'templateai.app',
    description: 'AI Template Generator',
    tierFeatures: {
      free: ['5_templates', 'basic_export', 'community_support'],
      starter: ['50_templates', 'theme_injection', 'email_support'],
      pro: ['all_templates', 'custom_themes', 'priority_support'],
      studio: ['team_library', 'white_label', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_development'],
    },
  },
  nordicai: {
    id: 'nordicai',
    name: 'Nordic AI',
    prefix: 'NRAI',
    domain: 'nordiclab.app',
    description: 'Multi-Model AI Platform',
    tierFeatures: {
      free: ['1k_messages', 'basic_models', 'community_support'],
      starter: ['10k_messages', 'all_models', 'email_support'],
      pro: ['100k_messages', 'fine_tuning', 'priority_support'],
      studio: ['unlimited', 'custom_models', 'team_access', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'on_premise'],
    },
  },
  certus: {
    id: 'certus',
    name: 'Certus',
    prefix: 'CRSS',
    domain: 'getcertus.app',
    description: 'Certificate Manager',
    tierFeatures: {
      free: ['5_certs', 'basic_monitoring', 'community_support'],
      starter: ['50_certs', 'auto_renewal', 'email_support'],
      pro: ['500_certs', 'team_alerts', 'priority_support'],
      studio: ['unlimited', 'compliance', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_integration'],
    },
  },
  voxaeena: {
    id: 'voxaeena',
    name: 'Voxa Eterna',
    prefix: 'VXET',
    domain: 'voxaeterna.app',
    description: 'Voice AI Assistant',
    tierFeatures: {
      free: ['1k_characters', 'basic_voices', 'community_support'],
      starter: ['50k_characters', 'voice_cloning', 'email_support'],
      pro: ['500k_characters', 'real_time', 'priority_support'],
      studio: ['unlimited', 'custom_voices', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'on_premise'],
    },
  },
  infiniteheroes: {
    id: 'infiniteheroes',
    name: 'Infinite Heroes',
    prefix: 'INHR',
    domain: 'infiniteheroes.app',
    description: 'Comics Heroes Generator',
    tierFeatures: {
      free: ['5_comics', 'basic_characters', 'community_support'],
      starter: ['50_comics', 'ai_generation', 'email_support'],
      pro: ['500_comics', 'story_engine', 'priority_support'],
      studio: ['unlimited', 'marketplace', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_art'],
    },
  },
  aegissolver: {
    id: 'aegissolver',
    name: 'Aegis Solver',
    prefix: 'AEGS',
    domain: 'aegissolver.com',
    description: 'AI Problem Solver',
    tierFeatures: {
      free: ['10_problems', 'basic_solver', 'community_support'],
      starter: ['100_problems', 'step_by_step', 'email_support'],
      pro: ['1k_problems', 'latex_render', 'priority_support'],
      studio: ['unlimited', 'api_access', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_integration'],
    },
  },
  splatstudio: {
    id: 'splatstudio',
    name: 'Splat Studio',
    prefix: 'SPLT',
    domain: 'splatstudio.app',
    description: 'AI Design Tool',
    tierFeatures: {
      free: ['5_designs', 'basic_templates', 'community_support'],
      starter: ['50_designs', 'ai_generation', 'email_support'],
      pro: ['500_designs', 'export_formats', 'priority_support'],
      studio: ['unlimited', 'collaboration', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_templates'],
    },
  },
  teleportlab: {
    id: 'teleportlab',
    name: 'Teleport Lab',
    prefix: 'TLPT',
    domain: 'teleportlab.app',
    description: 'Infrastructure-as-Code Editor',
    tierFeatures: {
      free: ['5_deployments', 'basic_iac', 'community_support'],
      starter: ['50_deployments', 'terraform', 'email_support'],
      pro: ['500_deployments', 'kubernetes', 'priority_support'],
      studio: ['unlimited', 'cost_estimation', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'custom_providers'],
    },
  },
  vitreouslab: {
    id: 'vitreouslab',
    name: 'Vitreous Lab',
    prefix: 'VTLB',
    domain: 'vitreouslab.app',
    description: 'Analytics Dashboard',
    tierFeatures: {
      free: ['1k_events', 'basic_dashboard', 'community_support'],
      starter: ['100k_events', 'real_time', 'email_support'],
      pro: ['1m_events', 'ai_insights', 'priority_support'],
      studio: ['unlimited', 'custom_reports', 'dedicated_support'],
      lifetime: ['everything', 'unlimited'],
      enterprise: ['everything', 'unlimited', 'sla', 'on_premise'],
    },
  },
};

// Helper functions
export function getProjectByPrefix(prefix: string): ProjectConfig | undefined {
  return Object.values(PROJECTS).find(p => p.prefix === prefix);
}

export function getProjectByDomain(domain: string): ProjectConfig | undefined {
  return Object.values(PROJECTS).find(p => p.domain === domain);
}

export function getProjectById(id: string): ProjectConfig | undefined {
  return PROJECTS[id as ProjectKey];
}

export function getAllPrefixes(): string[] {
  return Object.values(PROJECTS).map(p => p.prefix);
}

export function isValidPrefix(prefix: string): boolean {
  return getAllPrefixes().includes(prefix);
}
