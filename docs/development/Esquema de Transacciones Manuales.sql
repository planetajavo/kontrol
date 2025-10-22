CREATE TABLE manual_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tx_type VARCHAR(50) NOT NULL CHECK (tx_type IN ('BUY', 'SELL', 'TRANSFER', 'FEE')),
    amount DECIMAL(38, 18) NOT NULL CHECK (amount > 0),
    currency VARCHAR(20) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    source_address VARCHAR(255),
    destination_address VARCHAR(255),
    exchange_name VARCHAR(100),
    description TEXT,
    tags JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Índices para búsquedas eficientes
    INDEX idx_manual_user_date (user_id, timestamp),
    INDEX idx_manual_currency (user_id, currency),
    INDEX idx_manual_tags USING GIN (tags)
);