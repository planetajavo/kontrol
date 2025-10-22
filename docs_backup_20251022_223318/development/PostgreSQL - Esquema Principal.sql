-- Tabla de usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    jurisdiction VARCHAR(50) NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    kyc_status VARCHAR(20) DEFAULT 'pending',
    subscription_tier VARCHAR(20) DEFAULT 'pro',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);

-- Tabla de conexiones a exchanges
CREATE TABLE exchange_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exchange_name VARCHAR(100) NOT NULL,
    api_key_encrypted TEXT NOT NULL,
    api_secret_encrypted TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_sync TIMESTAMPTZ,
    sync_status VARCHAR(20) DEFAULT 'pending',
    error_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    INDEX idx_exchange_user (user_id, exchange_name),
    INDEX idx_exchange_sync (sync_status, last_sync)
);

-- Tabla de direcciones de wallet
CREATE TABLE wallet_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(255) NOT NULL,
    label VARCHAR(100),
    blockchain VARCHAR(50) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    detection_method VARCHAR(50),
    confidence_score DECIMAL(3,2),
    first_transaction_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices
    UNIQUE (user_id, address, blockchain),
    INDEX idx_wallet_user (user_id),
    INDEX idx_wallet_address (address)
);

-- Habilitar Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_addresses ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can only access own data" ON users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can only access own exchanges" ON exchange_connections
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access own wallets" ON wallet_addresses
    FOR ALL USING (user_id = auth.uid());