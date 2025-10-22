-- Transacciones canónicas para análisis
CREATE TABLE canonical_transactions (
    user_id UUID,
    tx_id UUID,
    timestamp_utc DateTime64(3),
    tx_type LowCardinality(String),
    asset_in String,
    asset_out String,
    amount_in Decimal(38, 18),
    amount_out Decimal(38, 18),
    source_address String,
    destination_address String,
    source_type LowCardinality(String),
    destination_type LowCardinality(String),
    exchange_id LowCardinality(String),
    tx_hash String,
    kontorl_type LowCardinality(String),
    fiat_cost_basis_unit Decimal(38, 18),
    exchange_rate Decimal(38, 18),
    realized_pnl Decimal(38, 18),
    data_confidence Decimal(3,2),
    created_at DateTime64(3) DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp_utc)
ORDER BY (user_id, timestamp_utc, asset_in)
SETTINGS index_granularity = 8192;

-- Snapshot diario de portfolio
CREATE TABLE portfolio_daily_snapshot (
    user_id UUID,
    date Date,
    asset String,
    amount Decimal(38, 18),
    value_usd Decimal(38, 18),
    cost_basis_usd Decimal(38, 18),
    unrealized_pnl Decimal(38, 18),
    created_at DateTime64(3) DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (user_id, date, asset);

-- Vista para P&L calculado
CREATE VIEW portfolio_pnl_detailed AS
SELECT 
    user_id,
    asset_in as asset,
    toYear(timestamp_utc) as year,
    sum(amount_in * fiat_cost_basis_unit) as total_cost,
    sum(amount_out * exchange_rate) as total_proceeds,
    total_proceeds - total_cost as realized_pnl,
    count() as transaction_count
FROM canonical_transactions
WHERE kontorl_type IN ('TRADE', 'SALE', 'EXCHANGE')
GROUP BY user_id, asset_in, toYear(timestamp_utc);