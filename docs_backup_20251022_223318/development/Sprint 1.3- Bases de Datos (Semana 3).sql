-- PostgreSQL Configuration
CREATE DATABASE kontrol_prod;
CREATE USER kontrol_app WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE kontrol_prod TO kontrol_app;

-- ClickHouse Configuration
CREATE DATABASE kontrol_analytics;
CREATE USER analytics_user IDENTIFIED BY 'secure_password';
GRANT ALL ON kontrol_analytics.* TO analytics_user;

# Entregables
• k8s/databases/postgresql/statefulset.yaml
• k8s/databases/clickhouse/configmap.yaml
• k8s/databases/neo4j/values.yaml
• k8s/databases/redis/deployment.yaml
• scripts/database/init-scripts/