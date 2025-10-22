# Arquitectura de Microservicios: Diseño para la Auditoría y el Rendimiento 🛠️

## 1. Patrón Arquitectónico: Microservicios Desacoplados

La arquitectura se basa en **Domain-Driven Design (DDD)** para aislar la lógica fiscal de alta seguridad (Rust) de la capa de orquestación.

| Componente | Dominio / Stack | Justificación Técnica |
| :--- | :--- | :--- |
| **Ingestion Service** | Go (Golang) | Alta concurrencia en I/O para manejar picos de APIs/RPCs. |
| **Matching Engine** | Rust | **Seguridad y Rendimiento** para algoritmos forenses y cálculo de *cost basis*. |
| **Tax Engine** | ClickHouse / Python | Cálculos de P&L complejos y analítica masiva en tiempo real (Base para el Optimizer). |
| **API Gateway** | Go / GraphQL | Agregación eficiente de datos para el *frontend* y *partners*. |

## 2. Estrategia de Bases de Datos Híbrida (DDBB) 📊

* **PostgreSQL (Core):** **Transaccional** (Fiabilidad ACID) para metadatos de usuario (KYC), VCs y reportes finales.
* **ClickHouse (Analítica Fiscal):** **Columnal, OLAP**. Permite *queries* de P&L sobre millones de TXs en milisegundos.
* **Neo4j (Forensic Graph Store):** **Grafo**. Modela las conexiones entre Wallets, TXs y Clusters. **Indispensable** para el **Security Agent** y la trazabilidad forense.

## 3. Principios de Comunicación y Resiliencia

* **Mensajería:** **Apache Kafka** o **Google Pub/Sub** para eventos asíncronos (ej. `TRANSACTION_INGESTED`).
* **Seguridad:** **mTLS (Mutual TLS)** entre microservicios para garantizar autenticación y cifrado interno.