-- KONTROL Database Schema for Supabase
-- Optimizado para PostgreSQL con Row Level Security

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- ============================================================================
-- TABLAS PRINCIPALES
-- ============================================================================

-- Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    jurisdiction VARCHAR(50) NOT NULL DEFAULT 'ES',
    timezone VARCHAR(50) DEFAULT 'UTC',
    kyc_status VARCHAR(20) DEFAULT 'pending',
    subscription_tier VARCHAR(20) DEFAULT 'pro',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_jurisdiction CHECK (jurisdiction IN ('ES', 'US', 'DE', 'FR', 'IT', 'GB', 'NL', 'BE', 'AT', 'CH')),
    CONSTRAINT valid_subscription CHECK (subscription_tier IN ('free', 'pro', 'compliance', 'enterprise'))
);

-- Tabla de conexiones a exchanges
CREATE TABLE exchange_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exchange_name VARCHAR(100) NOT NULL,
    api_key_encrypted TEXT NOT NULL,
    api_secret_encrypted TEXT NOT NULL,
    passphrase_encrypted TEXT, -- Para exchanges como Coinbase Pro
    is_active BOOLEAN DEFAULT TRUE,
    last_sync TIMESTAMPTZ,
    sync_status VARCHAR(20) DEFAULT 'pending',
    error_count INTEGER DEFAULT 0,
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    CONSTRAINT valid_exchange CHECK (exchange_name IN ('binance', 'coinbase', 'kraken', 'ftx', 'kucoin', 'bybit', 'okx')),
    CONSTRAINT valid_sync_status CHECK (sync_status IN ('pending', 'syncing', 'completed', 'failed', 'paused'))
);

-- Tabla de direcciones de wallet
CREATE TABLE wallet_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(255) NOT NULL,
    label VARCHAR(100),
    blockchain VARCHAR(50) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    detection_method VARCHAR(50),
    confidence_score DECIMAL(3,2) DEFAULT 0.0,
    first_transaction_date TIMESTAMPTZ,
    last_transaction_date TIMESTAMPTZ,
    total_received DECIMAL(38, 18) DEFAULT 0,
    total_sent DECIMAL(38, 18) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    CONSTRAINT valid_blockchain CHECK (blockchain IN ('ethereum', 'bitcoin', 'polygon', 'arbitrum', 'optimism', 'bsc', 'avalanche', 'solana')),
    CONSTRAINT valid_confidence CHECK (confidence_score >= 0 AND confidence_score <= 1)
);

-- Tabla de transacciones canónicas (esquema principal)
CREATE TABLE canonical_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tx_id_kontrol VARCHAR(255) UNIQUE NOT NULL,
    tx_hash VARCHAR(255),
    timestamp_utc TIMESTAMPTZ NOT NULL,
    tx_type VARCHAR(50) NOT NULL,
    asset_in VARCHAR(20),
    asset_out VARCHAR(20),
    amount_in DECIMAL(38, 18),
    amount_out DECIMAL(38, 18),
    source_address VARCHAR(255),
    destination_address VARCHAR(255),
    source_type VARCHAR(50),
    destination_type VARCHAR(50),
    exchange_id VARCHAR(100),
    kontorl_type VARCHAR(50) NOT NULL,
    fiat_cost_basis_unit DECIMAL(38, 18),
    exchange_rate DECIMAL(38, 18),
    realized_pnl DECIMAL(38, 18) DEFAULT 0,
    data_confidence DECIMAL(3,2) DEFAULT 1.0,
    fees DECIMAL(38, 18) DEFAULT 0,
    network_fees DECIMAL(38, 18) DEFAULT 0,
    tags JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    CONSTRAINT valid_tx_type CHECK (tx_type IN ('BUY', 'SELL', 'TRANSFER', 'FEE', 'REWARD', 'STAKING', 'MINING')),
    CONSTRAINT valid_kontorl_type CHECK (kontorl_type IN ('INTERNAL_TRANSFER_IN', 'INTERNAL_TRANSFER_OUT', 'CAPITAL_GAIN_SELL', 'FEE_DEDUCTION', 'TRADE', 'SALE', 'EXCHANGE', 'DEPOSIT', 'WITHDRAWAL')),
    CONSTRAINT valid_source_type CHECK (source_type IN ('WALLET', 'EXCHANGE', 'CEX', 'DEX', 'DEFI', 'MINING', 'STAKING')),
    CONSTRAINT valid_destination_type CHECK (destination_type IN ('WALLET', 'EXCHANGE', 'CEX', 'DEX', 'DEFI', 'MINING', 'STAKING'))
);

-- Tabla de portfolios (snapshots diarios)
CREATE TABLE portfolio_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    asset VARCHAR(20) NOT NULL,
    amount DECIMAL(38, 18) NOT NULL,
    value_usd DECIMAL(38, 18) NOT NULL,
    cost_basis_usd DECIMAL(38, 18) NOT NULL,
    unrealized_pnl DECIMAL(38, 18) NOT NULL,
    unrealized_pnl_percent DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índice único por usuario, fecha y asset
    UNIQUE (user_id, date, asset)
);

-- Tabla de reportes fiscales
CREATE TABLE tax_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    method VARCHAR(20) NOT NULL,
    total_realized_gain DECIMAL(38, 18) NOT NULL,
    total_tax_amount DECIMAL(38, 18) NOT NULL,
    short_term_gains DECIMAL(38, 18) DEFAULT 0,
    long_term_gains DECIMAL(38, 18) DEFAULT 0,
    transaction_count INTEGER DEFAULT 0,
    report_data JSONB NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índice único por usuario, año y método
    UNIQUE (user_id, year, method),
    CONSTRAINT valid_method CHECK (method IN ('FIFO', 'LIFO', 'HIFO', 'AVERAGE_COST'))
);

-- Tabla de jobs de sincronización
CREATE TABLE sync_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_type VARCHAR(50) NOT NULL,
    target_id VARCHAR(255), -- ID del exchange o wallet
    status VARCHAR(20) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    total_items INTEGER DEFAULT 0,
    processed_items INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT valid_job_type CHECK (job_type IN ('exchange_sync', 'wallet_sync', 'csv_import', 'tax_calculation')),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled'))
);

-- ============================================================================
-- ÍNDICES PARA RENDIMIENTO
-- ============================================================================

-- Índices para usuarios
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_jurisdiction ON users(jurisdiction);
CREATE INDEX idx_users_subscription ON users(subscription_tier);

-- Índices para exchanges
CREATE INDEX idx_exchange_user ON exchange_connections(user_id, exchange_name);
CREATE INDEX idx_exchange_sync ON exchange_connections(sync_status, last_sync);
CREATE INDEX idx_exchange_active ON exchange_connections(user_id, is_active);

-- Índices para wallets
CREATE INDEX idx_wallet_user ON wallet_addresses(user_id);
CREATE INDEX idx_wallet_address ON wallet_addresses(address);
CREATE INDEX idx_wallet_blockchain ON wallet_addresses(blockchain);
CREATE INDEX idx_wallet_verified ON wallet_addresses(is_verified);

-- Índices para transacciones (críticos para rendimiento)
CREATE INDEX idx_tx_user_timestamp ON canonical_transactions(user_id, timestamp_utc);
CREATE INDEX idx_tx_user_asset ON canonical_transactions(user_id, asset_in);
CREATE INDEX idx_tx_user_type ON canonical_transactions(user_id, kontorl_type);
CREATE INDEX idx_tx_hash ON canonical_transactions(tx_hash);
CREATE INDEX idx_tx_exchange ON canonical_transactions(exchange_id);
CREATE INDEX idx_tx_addresses ON canonical_transactions(source_address, destination_address);
CREATE INDEX idx_tx_timestamp ON canonical_transactions(timestamp_utc);

-- Índices compuestos para queries complejas
CREATE INDEX idx_tx_user_asset_timestamp ON canonical_transactions(user_id, asset_in, timestamp_utc);
CREATE INDEX idx_tx_user_type_timestamp ON canonical_transactions(user_id, kontorl_type, timestamp_utc);

-- Índices para portfolios
CREATE INDEX idx_portfolio_user_date ON portfolio_snapshots(user_id, date);
CREATE INDEX idx_portfolio_user_asset ON portfolio_snapshots(user_id, asset);

-- Índices para reportes fiscales
CREATE INDEX idx_tax_user_year ON tax_reports(user_id, year);
CREATE INDEX idx_tax_user_method ON tax_reports(user_id, method);

-- Índices para jobs
CREATE INDEX idx_jobs_user_status ON sync_jobs(user_id, status);
CREATE INDEX idx_jobs_type_status ON sync_jobs(job_type, status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE canonical_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can only access own data" ON users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can only access own exchanges" ON exchange_connections
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access own wallets" ON wallet_addresses
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access own transactions" ON canonical_transactions
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access own portfolios" ON portfolio_snapshots
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access own tax reports" ON tax_reports
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access own sync jobs" ON sync_jobs
    FOR ALL USING (user_id = auth.uid());

-- ============================================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exchanges_updated_at BEFORE UPDATE ON exchange_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallet_addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON canonical_transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para generar tx_id_kontrol único
CREATE OR REPLACE FUNCTION generate_tx_id_kontrol()
RETURNS TEXT AS $$
BEGIN
    RETURN 'kontrol_' || extract(epoch from now())::bigint || '_' || substr(md5(random()::text), 1, 8);
END;
$$ language 'plpgsql';

-- Trigger para generar tx_id_kontrol automáticamente
CREATE TRIGGER generate_tx_id_kontrol_trigger BEFORE INSERT ON canonical_transactions
    FOR EACH ROW EXECUTE FUNCTION generate_tx_id_kontrol();

-- ============================================================================
-- VISTAS ÚTILES
-- ============================================================================

-- Vista para P&L resumido por usuario
CREATE VIEW user_pnl_summary AS
SELECT 
    user_id,
    COUNT(*) as total_transactions,
    SUM(CASE WHEN kontorl_type IN ('TRADE', 'SALE', 'EXCHANGE') THEN realized_pnl ELSE 0 END) as total_realized_pnl,
    SUM(CASE WHEN kontorl_type IN ('TRADE', 'SALE', 'EXCHANGE') THEN amount_in * fiat_cost_basis_unit ELSE 0 END) as total_cost_basis,
    SUM(CASE WHEN kontorl_type IN ('TRADE', 'SALE', 'EXCHANGE') THEN amount_out * exchange_rate ELSE 0 END) as total_proceeds,
    COUNT(DISTINCT asset_in) as unique_assets,
    MIN(timestamp_utc) as first_transaction,
    MAX(timestamp_utc) as last_transaction
FROM canonical_transactions
GROUP BY user_id;

-- Vista para holdings actuales
CREATE VIEW current_holdings AS
WITH latest_snapshots AS (
    SELECT DISTINCT ON (user_id, asset)
        user_id, asset, amount, value_usd, cost_basis_usd, unrealized_pnl, unrealized_pnl_percent
    FROM portfolio_snapshots
    ORDER BY user_id, asset, date DESC
)
SELECT * FROM latest_snapshots;

-- ============================================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- ============================================================================

COMMENT ON TABLE users IS 'Usuarios del sistema KONTROL';
COMMENT ON TABLE exchange_connections IS 'Conexiones a exchanges externos';
COMMENT ON TABLE wallet_addresses IS 'Direcciones de wallets blockchain';
COMMENT ON TABLE canonical_transactions IS 'Transacciones normalizadas (esquema canónico KONTROL)';
COMMENT ON TABLE portfolio_snapshots IS 'Snapshots diarios del portfolio';
COMMENT ON TABLE tax_reports IS 'Reportes fiscales generados';
COMMENT ON TABLE sync_jobs IS 'Jobs de sincronización y procesamiento';

COMMENT ON COLUMN canonical_transactions.kontorl_type IS 'Tipo de transacción según clasificación KONTROL';
COMMENT ON COLUMN canonical_transactions.fiat_cost_basis_unit IS 'Coste en fiat por unidad de activo (clave para fiscalidad)';
COMMENT ON COLUMN canonical_transactions.data_confidence IS 'Confianza en los datos (0.0 a 1.0)';
COMMENT ON COLUMN canonical_transactions.tags IS 'Tags personalizados para categorización';
COMMENT ON COLUMN canonical_transactions.metadata IS 'Metadatos adicionales de la transacción';

