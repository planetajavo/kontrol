# Especificaciones de API y Dataflow: El Contrato de Data 🤝

## 1. API Gateway Híbrido

* **GraphQL (Frontend):** Interfaz principal para la UI. Permite *fetching* eficiente de *nested data* (ej. *portfolio* + *tax projection*) en una sola *query*.
* **REST (B2B/Ingesta):** Endpoints estandarizados para integraciones B2B y *webhooks* de exchanges. Documentación vía **OpenAPI Specification (Swagger)**.
* **Seguridad:** Autenticación vía **OAuth 2.0 / JWT** y **mTLS** para comunicación *service-to-service* interna.

## 2. Dataflow de Ingesta (ETL Pipeline Crítico) 🌊

El *pipeline* ETL (Extract, Transform, Load) es el componente más importante para el CBA (Cost Basis Accuracy).

| Fase | Tarea Principal | Tecnología Core | Output y Siguiente Fase |
| :--- | :--- | :--- | :--- |
| **Extract** | Conexión con *sources* (APIs, RPCs). **Rate Limiting** estricto. | **Go** | *Raw JSON* (Kafka Topic: `RAW_TXS`) |
| **Transform** | **Matching Engine (Rust)**. Normalización a Esquema Canónico KONTROL y Clasificación Forense. | **Rust** | *Canonical TX JSON* (ClickHouse & Neo4j) |
| **Enrichment** | **Agent Orchestrator (Python)**. Generación de *embeddings* vectoriales para RAG. | **Python** | *Vectors* en Redis/Chroma (Vector Store) |

## 3. Estándar de Transacción (Esquema Canónico KONTROL)

Cada transacción se normaliza a un esquema único, incluyendo la trazabilidad del *cost basis* en fiat, clave para la fiscalidad: `fiat_cost_basis_unit`.

```json
{
  "tx_id_kontorl": "string (UUID)",
  "kontorl_type": "enum (INTERNAL_TRANSFER_IN/OUT, CAPITAL_GAIN_SELL, FEE_DEDUCTION)",
  "fiat_cost_basis_unit": "decimal (Coste en EUR/USD por unidad de activo)",
  "asset_in": "string (Symbol, eg. BTC)",
  "timestamp_utc": "datetime (Indexada para ClickHouse)"
}