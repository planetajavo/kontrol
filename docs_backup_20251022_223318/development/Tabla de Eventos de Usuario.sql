CREATE TABLE user_events (
    user_id UUID,
    event_type LowCardinality(String),
    event_data JSON,
    timestamp DateTime64(3),
    session_id UUID,
    user_agent String,
    ip_address String,
    created_at DateTime64(3) DEFAULT now()
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (user_id, timestamp, event_type)
SETTINGS index_granularity = 8192;