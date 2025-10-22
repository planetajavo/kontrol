CREATE TABLE cointracking_imports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    original_filename VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    import_type VARCHAR(50) NOT NULL CHECK (import_type IN ('csv', 'json', 'backup')),
    row_count INTEGER,
    processed_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    extracted_metadata JSONB,
    import_status VARCHAR(20) DEFAULT 'processing',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    
    -- Índices
    INDEX idx_imports_user_status (user_id, import_status),
    INDEX idx_imports_created (created_at)
);