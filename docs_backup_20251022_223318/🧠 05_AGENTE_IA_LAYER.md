# El Cerebro de KONTROL: Diseño y Tool Use de Agentes Cognitivos 💡

## 1. Arquitectura del Agente: LangGraph y Tool Use

Utilizamos **LangGraph** para orquestar los agentes. Cada agente opera como un nodo inteligente que puede ejecutar **Tool Use** (llamadas a APIs internas del Matching Engine, Tax Engine, Neo4j).

El patrón principal es **RAG (Retrieval Augmented Generation)** para consultar la base de conocimiento fiscal y los datos transaccionales vectorizados del usuario.

## 2. Especificación Detallada de los 4 Agentes 🤖

| Agente | Tarea Central / Foco | Herramientas (Tools) Internas Llamadas | Output Estratégico |
| :--- | :--- | :--- | :--- |
| **Transaction Agent** | Interfaz conversacional para el portfolio y *queries* de datos. | `TaxEngine.query_pnl()`, `Neo4j.get_tx_path()` | Elimina la necesidad de *queries* SQL complejas. |
| **Security Agent** | *Risk Scoring* en tiempo real, monitoreo de exposición a *mixers*. | `Neo4j.run_risk_score_algorithm()`, `IngestionService.scan_address()` | Alerta proactiva con un **Risk Score (0-100)**. |
| **Legal/Compliance Agent** | Generación de **Proof-of-Origin** y documentación legal. | `TaxEngine.generate_audit_trail()`, `ZKEngine.request_zk_proof()` | Transforma la data forense en documentos legalmente válidos para bancos/reguladores. |
| **Tax Optimizer Agent** | Sugiere optimización fiscal (Tax-Loss Harvesting) en tiempo real. | `ClickHouse.get_projected_pnl()`, `RAG.query_tax_rules_by_jurisdiction()` | Estrategias de ahorro fiscal personalizadas. |

## 3. RAG: Vector Stores 💾

La memoria contextual se almacena en dos Vector Stores para optimizar la búsqueda:
* **Vector Store 1:** Reglas Fiscales, Leyes (Contexto Normativo).
* **Vector Store 2:** Embeddings de Transacciones Normalizadas (Contexto Transaccional).