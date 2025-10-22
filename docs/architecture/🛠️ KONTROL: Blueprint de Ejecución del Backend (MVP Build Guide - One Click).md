🛠️ KONTROL: Blueprint de Ejecución del Backend (MVP Build Guide - Copia Maestra Única)
1. Objetivo: Conversión Estratégica a Código Ejecutable 🚀
Este documento es el Manual de Construcción del MVP de KONTROL. Transforma la visión estratégica en especificaciones técnicas prescriptivas (modelos de datos, pseudocódigo estructurado, contratos API) que permiten iniciar la construcción inmediata en projects/kontrol-backend.

2. Definición Estricta de Contratos API (OpenAPI YAML) 🔗
El Ingestion Service (Go) es el entry point. El contrato debe ser asíncrono (202 Accepted) para manejar alta concurrencia y delegar el trabajo pesado al Matching Engine vía un bus de mensajes (Kafka/PubSub).

Contrato API: Ingestion Service (Go)
YAML

# Archivo: schemas/openapi_ingestion.yaml
openapi: 3.0.0
info:
  title: KONTROL Ingestion Service API
  version: v1
servers:
  - url: /api/v1/ingest
paths:
  /sync/exchange:
    post:
      summary: Inicia una sincronización de TXs con un exchange.
      description: Envía un mensaje al bus de Kafka/PubSub para procesar las TXs asíncronamente y retorna un Job ID.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [exchange_id, user_id, api_key_ref]
              properties:
                exchange_id:
                  type: string
                  description: ID interno del exchange (ej. 'binance_1').
                user_id:
                  type: string
                api_key_ref:
                  type: string
                  description: Referencia al secreto en el KMS (NO la clave en sí).
      responses:
        '202':
          description: Sincronización aceptada. Proceso en cola.
          content:
            application/json:
              schema:
                type: object
                properties:
                  job_id: {type: string, description: 'ID de la tarea de procesamiento'}
                  status: {type: string, example: 'ACCEPTED'}
3. Modelo de Datos Canónico (JSON Schema y Tipado Rígido) 💾
La CanonicalTransaction es la fuente de verdad fiscal. La precisión decimal es obligatoria (utilizando librerías como rust-decimal) para evitar errores de cálculo de Cost Basis y Capital Gains.

Propiedad	Tipo de Datos	Formato/Restricción	Rol Crítico para el Backend
tx_id_kontorl	string	uuid	Clave primaria generada (ID inmutable).
kontorl_type	string	enum (ej. CAPITAL_GAIN_SELL, INTERNAL_TRANSFER_IN)	Clasificación final del Matching Engine.
fiat_cost_basis_unit	number	double (Alta Precisión/Decimal(38, 18))	El Moat Fiscal: Coste en EUR/USD por unidad de activo. Requiere la librería rust-decimal.
amount_in/out	number	double	Montos exactos.
timestamp_utc	string	date-time	Indexado en ClickHouse para consultas analíticas rápidas.

Exportar a Hojas de cálculo

4. Especificación Algorítmica (Pseudocódigo y DDL) 🧠
El Matching Engine (Rust) es el motor de alto rendimiento que ejecuta la lógica de reconciliación. El Tax Engine (ClickHouse) gestiona la analítica masiva.

Algoritmo: reconcile_internal_transfer (Rust Core)
Rust

// Módulo: matching_engine_rs/src/algorithms/reconciliation.rs

fn reconcile_internal_transfers(txs: &mut Vec<CanonicalTransaction>) -> Vec<TransferMatch> {
    // 1. Indexar TXs de Salida (SEND) por asset, user_id, y rango de tiempo (90s).
    let mut tx_out_candidates: HashMap<String, Vec<&mut CanonicalTransaction>> = index_by_asset_and_time_window(txs.filter(|t| t.kontorl_type == "SEND"));

    // 2. Iterar sobre TXs de Entrada (RECEIVE) para buscar un match.
    for tx_in in txs.iter_mut().filter(|t| t.kontorl_type == "RECEIVE") {
        
        // 3. Búsqueda Optimizada: Búsqueda de un match por cantidad y asset.
        let candidates = tx_out_candidates.get_close_matches(tx_in.asset, tx_in.amount_in, tx_in.timestamp);

        // 4. Lógica de Matching (Validación Forense)
        if let Some(tx_out) = candidates.find_best_match() {
            if is_same_user_wallet_cluster(tx_out.wallet_id, tx_in.wallet_id) && 
               calculate_fee_tolerance(tx_in, tx_out) < MAX_FEE_TOLERANCE 
            {
                // 5. Mutación del Estado (Clasificación Final)
                tx_out.kontorl_type = "INTERNAL_TRANSFER_OUT";
                tx_in.kontorl_type = "INTERNAL_TRANSFER_IN";
                
                // 6. Enviar a ClickHouse/Neo4j vía Kafka (Loading Service)
                produce_to_kafka(tx_out, tx_in, "MATCHED_TXS"); 
                break;
            }
        }
    }
    return matches;
}
DDL de Alto Rendimiento (Tax Engine - ClickHouse)
SQL

-- DDL para ClickHouse: Creación de tabla optimizada para P&L
CREATE TABLE IF NOT EXISTS canonical_transactions (
    user_id UUID,
    timestamp_utc DateTime,
    asset_in String,
    kontorl_type LowCardinality(String),
    fiat_cost_basis_unit Decimal(38, 18), 
    realized_pnl Decimal(38, 18) MATERIALIZED total_revenue - total_cost,
    -- ... otros campos ...
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp_utc) -- Partición por mes/año para búsquedas rápidas
ORDER BY (user_id, timestamp_utc, asset_in); -- Orden clave para la eficiencia de la consulta
5. Matriz de Dependencias Rigurosa (MVP Build Stack) 🛠️
Estas versiones y librerías son obligatorias para el MVP.

Microservicio	Lenguaje	Versión Mínima	Librerías Críticas (Ejemplos de Librerías y Roles)
Matching Engine	Rust	1.70+	tokio, serde, rust-decimal.
Ingestion Service	Go	1.21+	confluent-kafka-go, gorilla/mux.
Agent Orchestrator	Python	3.10+	FastAPI, LangGraph, Pydantic.

Exportar a Hojas de cálculo

6. Estructura de Proyecto Sugerida para el MVP 📂
Esta es la estructura mínima que debe reflejar el projects/kontrol-backend para el inicio de la construcción.

projects/kontrol-backend/
├── matching_engine_rs/         # (Rust) Implementación de Matching Algorithm
│   ├── Cargo.toml               
│   └── src/models.rs            
├── ingestion_service_go/       # (Go) API Gateway y Productor Kafka
│   ├── go.mod                   
│   └── main.go                  
├── agent_orchestrator_py/      # (Python) Capa de Agentes IA
│   ├── requirements.txt         
│   └── main.py                  
└── infrastructure/
    ├── terraform/              # Archivos IaC (AWS/GCP, K8s definitions)
    └── schemas/
        ├── openapi_ingestion.yaml
        └── canonical_transaction.json