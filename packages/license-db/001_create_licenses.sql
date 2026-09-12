-- Aurora Ember Bio Lab — License Database Schema
-- Version: 2.0
-- Date: 2026-09-12

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    avatar_url TEXT,
    tier VARCHAR(20) DEFAULT 'free',
    tokens_used BIGINT DEFAULT 0,
    tokens_limit BIGINT DEFAULT 10000,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- LICENSES TABLE (Universal for all 13 projects)
-- ============================================
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Project identification
    project VARCHAR(20) NOT NULL,  -- 'atlantgen', 'ascodex', etc.
    
    -- User reference
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- License key (unique across all projects)
    key VARCHAR(19) UNIQUE NOT NULL,  -- 'ATGN-A1B2-STRT-C3D4-E5F6'
    
    -- License details
    tier VARCHAR(20) NOT NULL,  -- 'free', 'starter', 'pro', 'studio', 'lifetime', 'enterprise'
    features JSONB DEFAULT '[]',
    
    -- Hardware binding
    hwid VARCHAR(16),  -- 16-char hex HWID
    max_devices INT DEFAULT 1,
    activation_count INT DEFAULT 0,
    
    -- Expiration
    expires_at TIMESTAMP,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    status VARCHAR(20) DEFAULT 'active',  -- 'active', 'expired', 'revoked', 'transferred', 'pending'
    
    -- Audit
    created_at TIMESTAMP DEFAULT NOW(),
    last_validated TIMESTAMP,
    last_activated_at TIMESTAMP,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'
);

-- ============================================
-- LICENSE ACTIVATIONS LOG
-- ============================================
CREATE TABLE IF NOT EXISTS license_activations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_id UUID REFERENCES licenses(id) ON DELETE CASCADE,
    hwid VARCHAR(16) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    activated_at TIMESTAMP DEFAULT NOW(),
    deactivated_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- ============================================
-- LICENSE TRANSFERS LOG
-- ============================================
CREATE TABLE IF NOT EXISTS license_transfers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_id UUID REFERENCES licenses(id) ON DELETE CASCADE,
    old_hwid VARCHAR(16),
    new_hwid VARCHAR(16) NOT NULL,
    reason TEXT,
    transferred_at TIMESTAMP DEFAULT NOW(),
    transferred_by UUID REFERENCES users(id)
);

-- ============================================
-- LICENSE AUDIT LOG
-- ============================================
CREATE TABLE IF NOT EXISTS license_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    license_id UUID REFERENCES licenses(id) ON DELETE SET NULL,
    action VARCHAR(50) NOT NULL,  -- 'activate', 'validate', 'transfer', 'revoke', 'expire'
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Licenses indexes
CREATE INDEX IF NOT EXISTS idx_licenses_project ON licenses(project);
CREATE INDEX IF NOT EXISTS idx_licenses_user_id ON licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_key ON licenses(key);
CREATE INDEX IF NOT EXISTS idx_licenses_hwid ON licenses(hwid);
CREATE INDEX IF NOT EXISTS idx_licenses_tier ON licenses(tier);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
CREATE INDEX IF NOT EXISTS idx_licenses_expires_at ON licenses(expires_at);
CREATE INDEX IF NOT EXISTS idx_licenses_is_active ON licenses(is_active);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_licenses_project_user ON licenses(project, user_id);
CREATE INDEX IF NOT EXISTS idx_licenses_project_status ON licenses(project, status);
CREATE INDEX IF NOT EXISTS idx_licenses_key_hwid ON licenses(key, hwid);

-- Activations indexes
CREATE INDEX IF NOT EXISTS idx_activations_license_id ON license_activations(license_id);
CREATE INDEX IF NOT EXISTS idx_activations_hwid ON license_activations(hwid);
CREATE INDEX IF NOT EXISTS idx_activations_is_active ON license_activations(is_active);

-- Transfers indexes
CREATE INDEX IF NOT EXISTS idx_transfers_license_id ON license_transfers(license_id);

-- Audit log indexes
CREATE INDEX IF NOT EXISTS idx_audit_license_id ON license_audit_log(license_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON license_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON license_audit_log(created_at);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-expire licenses
CREATE OR REPLACE FUNCTION expire_licenses()
RETURNS void AS $$
BEGIN
    UPDATE licenses
    SET status = 'expired',
        is_active = false
    WHERE expires_at < NOW()
      AND status = 'active'
      AND tier != 'lifetime';
END;
$$ language 'plpgsql';

-- Function to log license actions
CREATE OR REPLACE FUNCTION log_license_action()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO license_audit_log (license_id, action, details)
    VALUES (
        NEW.id,
        CASE
            WHEN TG_OP = 'INSERT' THEN 'create'
            WHEN TG_OP = 'UPDATE' AND NEW.is_active = false AND OLD.is_active = true THEN 'deactivate'
            WHEN TG_OP = 'UPDATE' AND NEW.hwid IS NOT NULL AND OLD.hwid IS NULL THEN 'activate'
            WHEN TG_OP = 'UPDATE' AND NEW.hwid != OLD.hwid THEN 'transfer'
            ELSE TG_OP
        END,
        jsonb_build_object(
            'old_status', OLD.status,
            'new_status', NEW.status,
            'old_hwid', OLD.hwid,
            'new_hwid', NEW.hwid,
            'operation', TG_OP
        )
    );
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for license audit logging
CREATE TRIGGER audit_license_changes
    AFTER INSERT OR UPDATE ON licenses
    FOR EACH ROW
    EXECUTE FUNCTION log_license_action();

-- ============================================
-- VIEWS
-- ============================================

-- Active licenses view
CREATE OR REPLACE VIEW active_licenses AS
SELECT
    l.*,
    u.email as user_email,
    u.name as user_name
FROM licenses l
JOIN users u ON l.user_id = u.id
WHERE l.is_active = true
  AND l.status = 'active'
  AND (l.expires_at IS NULL OR l.expires_at > NOW());

-- License stats view
CREATE OR REPLACE VIEW license_stats AS
SELECT
    project,
    tier,
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE is_active = true AND status = 'active') as active,
    COUNT(*) FILTER (WHERE expires_at < NOW()) as expired,
    COUNT(*) FILTER (WHERE status = 'revoked') as revoked
FROM licenses
GROUP BY project, tier;

-- ============================================
-- SAMPLE DATA (for testing)
-- ============================================

-- Insert test user
INSERT INTO users (email, name, password_hash) VALUES
    ('test@example.com', 'Test User', '$2a$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
ON CONFLICT (email) DO NOTHING;

-- Insert sample licenses (for testing)
INSERT INTO licenses (project, user_id, key, tier, features, max_devices) VALUES
    ('atlantgen', (SELECT id FROM users WHERE email = 'test@example.com'), 'ATGN-0001-STRT-0000-0000', 'starter', '["woocommerce", "shopify"]', 2),
    ('ascodex', (SELECT id FROM users WHERE email = 'test@example.com'), 'ASCX-0001-PRO_-0000-0000', 'pro', '["10_ai_engines", "rag_workspace"]', 3),
    ('ambershield', (SELECT id FROM users WHERE email = 'test@example.com'), 'AMSH-0001-STUD-0000-0000', 'studio', '["team_dashboard", "compliance"]', 5)
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE licenses IS 'Universal license table for all Aurora Ember Bio Lab projects';
COMMENT ON COLUMN licenses.project IS 'Project identifier: atlantgen, ambershield, ascodex, etc.';
COMMENT ON COLUMN licenses.key IS 'License key format: {PREFIX}-{SERIAL}-{TIER}-{DEVICE}-{CHECKSUM}';
COMMENT ON COLUMN licenses.hwid IS 'Hardware ID for device binding (16-char hex)';
COMMENT ON COLUMN licenses.tier IS 'License tier: free, starter, pro, studio, lifetime, enterprise';
COMMENT ON COLUMN licenses.features IS 'JSON array of enabled features';
COMMENT ON COLUMN licenses.max_devices IS 'Maximum number of devices for this license';
COMMENT ON COLUMN licenses.activation_count IS 'Number of times this license has been activated';
