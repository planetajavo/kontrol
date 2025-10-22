# 💰 FASE 5: Tax Engine & Compliance (Semanas 9-10)

## Objetivos
- Implementar motor de cálculos fiscales completo
- Crear generador de reportes DAC8
- Implementar Proof of Origin
- Configurar compliance automático

## Entregables

### 5.1 Tax Calculation Engine
- [ ] Cálculos FIFO, LIFO, HIFO precisos
- [ ] Soporte multi-jurisdicción
- [ ] Optimización fiscal automática
- [ ] Tax-loss harvesting
- [ ] Cálculo de cost basis

### 5.2 Report Generation
- [ ] Generador de reportes DAC8
- [ ] Reportes fiscales personalizados
- [ ] Exportación a PDF/Excel
- [ ] Validación de esquemas XSD
- [ ] Templates personalizables

### 5.3 Proof of Origin System
- [ ] Trazabilidad completa de fondos
- [ ] Generación de documentos legales
- [ ] Gráficos de flujo de fondos
- [ ] Validación forense
- [ ] Exportación a formatos legales

### 5.4 Compliance Automation
- [ ] Monitoreo de límites regulatorios
- [ ] Alertas de compliance
- [ ] Generación automática de reportes
- [ ] Integración con reguladores
- [ ] Audit trail completo

## Implementación del Tax Engine

### Core Tax Calculator
```python
from decimal import Decimal
from typing import List, Dict, Optional
from enum import Enum
from dataclasses import dataclass

class TaxMethod(Enum):
    FIFO = "FIFO"
    LIFO = "LIFO"
    HIFO = "HIFO"
    AVERAGE_COST = "AVERAGE_COST"

@dataclass
class TaxCalculation:
    realized_gain: Decimal
    cost_basis: Decimal
    proceeds: Decimal
    holding_period_days: int
    tax_rate: Decimal
    tax_amount: Decimal

class TaxEngine:
    def __init__(self, jurisdiction: str):
        self.jurisdiction = jurisdiction
        self.tax_rules = self._load_tax_rules(jurisdiction)
    
    async def calculate_tax_report(
        self, 
        user_id: str, 
        year: int, 
        method: TaxMethod = TaxMethod.FIFO
    ) -> TaxReport:
        """Calcular reporte fiscal completo"""
        
        # Obtener transacciones del año
        transactions = await self._get_transactions_for_year(user_id, year)
        
        # Aplicar método de cálculo
        if method == TaxMethod.FIFO:
            calculations = await self._calculate_fifo(transactions)
        elif method == TaxMethod.LIFO:
            calculations = await self._calculate_lifo(transactions)
        elif method == TaxMethod.HIFO:
            calculations = await self._calculate_hifo(transactions)
        else:
            raise ValueError(f"Método no soportado: {method}")
        
        # Aplicar reglas fiscales de la jurisdicción
        tax_report = await self._apply_tax_rules(calculations)
        
        return tax_report
    
    async def _calculate_fifo(self, transactions: List[Transaction]) -> List[TaxCalculation]:
        """Calcular usando método First-In-First-Out"""
        # Ordenar transacciones por fecha de adquisición
        sorted_txs = sorted(transactions, key=lambda x: x.timestamp)
        
        calculations = []
        inventory = {}  # asset -> queue of buy transactions
        
        for tx in sorted_txs:
            if tx.tx_type == "BUY":
                # Añadir al inventario
                if tx.asset_out not in inventory:
                    inventory[tx.asset_out] = []
                inventory[tx.asset_out].append(tx)
                
            elif tx.tx_type == "SELL":
                # Calcular ganancia usando las primeras adquisiciones
                if tx.asset_in in inventory and inventory[tx.asset_in]:
                    buy_tx = inventory[tx.asset_in].pop(0)
                    
                    calculation = self._calculate_gain(buy_tx, tx)
                    calculations.append(calculation)
        
        return calculations
    
    async def _calculate_hifo(self, transactions: List[Transaction]) -> List[TaxCalculation]:
        """Calcular usando método Highest-In-First-Out"""
        calculations = []
        inventory = {}  # asset -> list of buy transactions sorted by cost basis
        
        for tx in sorted(transactions, key=lambda x: x.timestamp):
            if tx.tx_type == "BUY":
                if tx.asset_out not in inventory:
                    inventory[tx.asset_out] = []
                inventory[tx.asset_out].append(tx)
                # Mantener ordenado por cost basis (descendente)
                inventory[tx.asset_out].sort(
                    key=lambda x: x.fiat_cost_basis_unit, 
                    reverse=True
                )
                
            elif tx.tx_type == "SELL":
                if tx.asset_in in inventory and inventory[tx.asset_in]:
                    # Usar la transacción con mayor cost basis
                    buy_tx = inventory[tx.asset_in][0]
                    
                    calculation = self._calculate_gain(buy_tx, tx)
                    calculations.append(calculation)
                    
                    # Reducir cantidad o eliminar si se agota
                    remaining_amount = buy_tx.amount_out - tx.amount_in
                    if remaining_amount <= Decimal('0.00000001'):  # Tolerancia para decimales
                        inventory[tx.asset_in].pop(0)
                    else:
                        buy_tx.amount_out = remaining_amount
        
        return calculations
    
    def _calculate_gain(self, buy_tx: Transaction, sell_tx: Transaction) -> TaxCalculation:
        """Calcular ganancia entre compra y venta"""
        cost_basis = buy_tx.amount_out * buy_tx.fiat_cost_basis_unit
        proceeds = sell_tx.amount_in * sell_tx.exchange_rate
        realized_gain = proceeds - cost_basis
        
        holding_period = (sell_tx.timestamp - buy_tx.timestamp).days
        
        # Determinar tasa de impuesto según período de tenencia
        if holding_period < 365:  # Short-term
            tax_rate = self.tax_rules.short_term_capital_gains_rate
        else:  # Long-term
            tax_rate = self.tax_rules.long_term_capital_gains_rate
        
        tax_amount = realized_gain * tax_rate
        
        return TaxCalculation(
            realized_gain=realized_gain,
            cost_basis=cost_basis,
            proceeds=proceeds,
            holding_period_days=holding_period,
            tax_rate=tax_rate,
            tax_amount=tax_amount
        )
```

### DAC8 Report Generator
```python
from xml.etree import ElementTree as ET
from datetime import datetime
from typing import List, Dict

class DAC8ReportGenerator:
    def __init__(self):
        self.namespace = "urn:oecd:ties:dac:v1"
        self.schema_version = "1.0"
    
    async def generate_dac8_report(
        self, 
        user_id: str, 
        year: int,
        jurisdiction: str = "ES"
    ) -> DAC8Report:
        """Generar reporte DAC8 para regulaciones europeas"""
        
        # Obtener transacciones reportables
        reportable_txs = await self._get_dac8_reportable_transactions(user_id, year)
        
        # Crear estructura XML
        root = self._create_xml_structure()
        
        # Añadir información del reportante
        self._add_reporter_info(root, user_id, jurisdiction)
        
        # Añadir transacciones
        self._add_transactions(root, reportable_txs)
        
        # Validar con esquema XSD
        validation_result = await self._validate_dac8_report(root)
        
        if not validation_result.is_valid:
            raise ValidationError(f"Reporte DAC8 inválido: {validation_result.errors}")
        
        return DAC8Report(
            xml_content=ET.tostring(root, encoding='unicode'),
            validation_result=validation_result,
            transaction_count=len(reportable_txs)
        )
    
    def _create_xml_structure(self) -> ET.Element:
        """Crear estructura base del XML DAC8"""
        root = ET.Element("DAC8Report")
        root.set("xmlns", self.namespace)
        root.set("version", self.schema_version)
        root.set("generatedAt", datetime.utcnow().isoformat())
        
        return root
    
    def _add_reporter_info(self, root: ET.Element, user_id: str, jurisdiction: str):
        """Añadir información del reportante"""
        reporter = ET.SubElement(root, "Reporter")
        
        ET.SubElement(reporter, "ReporterId").text = user_id
        ET.SubElement(reporter, "Jurisdiction").text = jurisdiction
        ET.SubElement(reporter, "ReportType").text = "CRYPTO_ASSETS"
        ET.SubElement(reporter, "ReportingPeriod").text = str(datetime.now().year)
    
    def _add_transactions(self, root: ET.Element, transactions: List[Transaction]):
        """Añadir transacciones al reporte"""
        transactions_elem = ET.SubElement(root, "Transactions")
        
        for tx in transactions:
            tx_elem = ET.SubElement(transactions_elem, "Transaction")
            
            ET.SubElement(tx_elem, "TransactionId").text = tx.tx_id
            ET.SubElement(tx_elem, "Timestamp").text = tx.timestamp_utc.isoformat()
            ET.SubElement(tx_elem, "Asset").text = tx.asset_in
            ET.SubElement(tx_elem, "Amount").text = str(tx.amount_in)
            ET.SubElement(tx_elem, "ExchangeRate").text = str(tx.exchange_rate)
            ET.SubElement(tx_elem, "CostBasis").text = str(tx.fiat_cost_basis_unit)
            ET.SubElement(tx_elem, "RealizedGain").text = str(tx.realized_pnl)
```

### Proof of Origin Generator
```python
class ProofOfOriginGenerator:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.graph_client = Neo4jClient()
        self.template_engine = ReportTemplateEngine()
    
    async def generate_proof_document(
        self, 
        target_wallet: str,
        date_range: Optional[Tuple[datetime, datetime]] = None
    ) -> ProofDocument:
        """Generar documento completo de origen de fondos"""
        
        # 1. Trazar el camino completo de los fondos
        fund_origin = await self._trace_fund_origin(target_wallet, date_range)
        
        # 2. Obtener transacciones relevantes
        relevant_txs = await self._get_relevant_transactions(fund_origin)
        
        # 3. Generar gráficos de flujo
        flow_charts = await self._generate_flow_charts(fund_origin)
        
        # 4. Crear documento con todos los elementos
        document = await self._create_comprehensive_document(
            fund_origin=fund_origin,
            transactions=relevant_txs,
            charts=flow_charts,
            user_id=self.user_id
        )
        
        return document
    
    async def _trace_fund_origin(
        self, 
        target_wallet: str, 
        date_range: Optional[Tuple[datetime, datetime]] = None
    ) -> FundOrigin:
        """Trazar el origen de los fondos usando análisis de grafos"""
        
        query = """
        MATCH path = (target:Wallet {address: $target_address})<-[:RECEIVED_BY*1..20]-(:Transaction)<-[:SENT]-(source:Wallet)
        WHERE source.user_id IS NOT NULL OR 
              (source:Exchange OR source:KnownEntity)
        RETURN path
        ORDER BY length(path) ASC
        LIMIT 10
        """
        
        params = {'target_address': target_wallet}
        if date_range:
            query += " AND tx.timestamp >= $start_date AND tx.timestamp <= $end_date"
            params.update({
                'start_date': date_range[0].isoformat(),
                'end_date': date_range[1].isoformat()
            })
        
        results = await self.graph_client.run_query(query, params)
        
        return self._analyze_fund_paths(results)
    
    async def _generate_flow_charts(self, fund_origin: FundOrigin) -> List[FlowChart]:
        """Generar gráficos de flujo de fondos"""
        
        charts = []
        
        # Gráfico principal de flujo
        main_flow = await self._create_main_flow_chart(fund_origin)
        charts.append(main_flow)
        
        # Gráficos de timeline por asset
        for asset in fund_origin.assets:
            timeline_chart = await self._create_timeline_chart(fund_origin, asset)
            charts.append(timeline_chart)
        
        # Gráfico de interacciones con CEX
        cex_chart = await self._create_cex_interaction_chart(fund_origin)
        charts.append(cex_chart)
        
        return charts
```

## Tecnologías
- **Python**: Lógica principal
- **Decimal**: Precisión en cálculos monetarios
- **XML/ET**: Generación de reportes DAC8
- **Jinja2**: Templates de documentos
- **Supabase**: Almacenamiento de reportes

## Criterios de Éxito
- ✅ Cálculos fiscales con precisión < 0.01%
- ✅ Reportes DAC8 válidos según esquema XSD
- ✅ Proof of Origin con trazabilidad completa
- ✅ Compliance automático funcionando
- ✅ Exportación a PDF/Excel
- ✅ Tests de precisión fiscal pasando

