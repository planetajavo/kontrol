CREATE TABLE market_prices (
    asset String,
    timestamp DateTime64(3),
    price_usd Decimal(38, 18),
    volume_24h Decimal(38, 18),
    market_cap Decimal(38, 18),
    source LowCardinality(String),
    created_at DateTime64(3) DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (asset, timestamp)
SETTINGS index_granularity = 8192;