# 🔍 FASE 2: Transaction Matching Engine (Semanas 3-4)

## Objetivos
- Implementar el motor de reconciliación de transacciones
- Crear algoritmos de matching inteligente
- Implementar detección de transferencias internas
- Optimizar para rendimiento con millones de TXs

## Entregables

### 2.1 Core Matching Engine
- [ ] Algoritmo de reconciliación FIFO/LIFO/HIFO
- [ ] Detección de transferencias internas
- [ ] Clasificación forense de transacciones
- [ ] Cálculo de cost basis preciso
- [ ] Validación de matches con ML

### 2.2 Algoritmos de Matching
- [ ] Temporal window matching (ventana de 90s)
- [ ] Amount-based matching con tolerancia de fees
- [ ] Address clustering para wallets relacionadas
- [ ] Exchange-specific matching rules
- [ ] Confidence scoring para matches

### 2.3 Data Processing Pipeline
- [ ] ETL para datos de exchanges
- [ ] Normalización a esquema canónico
- [ ] Deduplicación de transacciones
- [ ] Enriquecimiento con datos de precios
- [ ] Batch processing optimizado

### 2.4 Performance Optimization
- [ ] Indexación optimizada en Supabase
- [ ] Caching con Redis
- [ ] Procesamiento asíncrono con Celery
- [ ] Compresión de datos históricos
- [ ] Métricas de rendimiento

## Algoritmos Clave

### Internal Transfer Detection
```python
async def detect_internal_transfers(transactions: List[Transaction]) -> List[TransferMatch]:
    # 1. Indexar TXs de salida por asset y ventana temporal
    tx_out_index = index_by_asset_and_time_window(
        [tx for tx in transactions if tx.type == "SEND"]
    )
    
    # 2. Buscar matches para TXs de entrada
    matches = []
    for tx_in in [tx for tx in transactions if tx.type == "RECEIVE"]:
        candidates = tx_out_index.find_candidates(
            asset=tx_in.asset,
            amount=tx_in.amount,
            timestamp=tx_in.timestamp,
            window_seconds=90
        )
        
        # 3. Validar match con tolerancia de fees
        for tx_out in candidates:
            if is_valid_match(tx_in, tx_out):
                matches.append(TransferMatch(
                    tx_in=tx_in,
                    tx_out=tx_out,
                    confidence=calculate_confidence(tx_in, tx_out)
                ))
    
    return matches
```

### Cost Basis Calculation
```python
async def calculate_cost_basis(transactions: List[Transaction], method: str) -> Dict[str, Decimal]:
    if method == "FIFO":
        return await calculate_fifo_cost_basis(transactions)
    elif method == "LIFO":
        return await calculate_lifo_cost_basis(transactions)
    elif method == "HIFO":
        return await calculate_hifo_cost_basis(transactions)
    else:
        raise ValueError(f"Método no soportado: {method}")
```

## Tecnologías
- **Python**: Lógica principal
- **NumPy/Pandas**: Procesamiento de datos
- **Celery**: Tareas asíncronas
- **Redis**: Cache y colas
- **Supabase**: Almacenamiento optimizado

## Criterios de Éxito
- ✅ Matching accuracy > 99.5%
- ✅ Procesamiento de 1M+ TXs en < 5 minutos
- ✅ Detección de transferencias internas > 95%
- ✅ Cost basis accuracy < 0.01% error
- ✅ Tests de rendimiento pasando

