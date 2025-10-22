# Anexos Técnicos: Estándares y Glosario 📘

## 1. Estándares de Ingeniería y QA

| Estándar | Componente Aplicado | Métrica de Calidad |
| :--- | :--- | :--- |
| **High Security (Rust)** | Matching Engine, ZK Primitives | Auditorías de Seguridad Externas. |
| **Code Coverage** | Core Engine (Rust/Go) | Mínimo **80% de cobertura** en tests unitarios. |
| **Data Integrity** | PostgreSQL, ClickHouse | Migraciones de base de datos con Flyway/Liquibase. |
| **API Compliance** | API Gateway | **Swagger/OpenAPI Spec** para documentación automatizada. |

## 2. Glosario Técnico y PM 📖

* **Moat:** Ventaja competitiva sostenible. En KONTROL, es la combinación de **Neo4j Graph Analytics** y el **IA Matching Engine**.
* **RAG:** Patrón de IA usado por los agentes para consultar bases de conocimiento externas (leyes fiscales).
* **Proof-of-Origin:** Documento legal que justifica la procedencia de los fondos.
* **mTLS:** Cifrado y autenticación bidireccional que asegura la comunicación entre microservicios internos.

## 3. Pseudocódigo: Query Optimizada de P&L (ClickHouse)

```sql
-- Query base del Tax Optimizer Agent para calcular P&L en tiempo real:
SELECT
    asset_in,
    SUM(CASE WHEN kontorl_type = 'CAPITAL_GAIN_SELL' THEN amount_out * original_fiat_value ELSE 0 END) AS total_revenue_fiat,
    SUM(CASE WHEN kontorl_type = 'CAPITAL_GAIN_SELL' THEN amount_out * fiat_cost_basis_unit ELSE 0 END) AS total_cost_fiat,
    total_revenue_fiat - total_cost_fiat AS realized_profit_loss
FROM 
    canonical_transactions
WHERE 
    user_id = 'user_id_x' AND timestamp_utc BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY 
    asset_in
ORDER BY
    realized_profit_loss DESC