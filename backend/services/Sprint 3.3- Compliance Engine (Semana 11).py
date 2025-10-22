# compliance-engine/core/tax_calculator.py
class TaxCalculator:
    """Calculador de impuestos multi-método"""
    
    def __init__(self, user_id: str, jurisdiction: str):
        self.user_id = user_id
        self.jurisdiction = jurisdiction
        self.tax_rules = self.load_tax_rules(jurisdiction)
        
    async def calculate_tax_report(self, year: int, method: str) -> TaxReport:
        """Calcular reporte fiscal para un año y método específico"""
        
        # Obtener transacciones del año
        transactions = await self.get_transactions_for_year(year)
        
        # Aplicar método de cálculo seleccionado
        if method == 'FIFO':
            report = await self.calculate_fifo(transactions)
        elif method == 'LIFO':
            report = await self.calculate_lifo(transactions)
        elif method == 'EXCHANGE_SPECIFIC':
            report = await self.calculate_exchange_specific(transactions)
        elif method == 'HIFO':
            report = await self.calculate_hifo(transactions)
        else:
            raise ValueError(f"Método no soportado: {method}")
        
        # Aplicar reglas fiscales de la jurisdicción
        report = await self.apply_tax_rules(report)
        
        return report
    
    async def calculate_fifo(self, transactions: List[Transaction]) -> TaxReport:
        """Calcular usando método First-In-First-Out"""
        # Ordenar transacciones por fecha de adquisición
        sorted_tx = sorted(transactions, key=lambda x: x.timestamp)
        
        report = TaxReport(method='FIFO')
        inventory = {}
        
        for tx in sorted_tx:
            if tx.tx_type == 'BUY':
                # Añadir al inventario
                if tx.asset not in inventory:
                    inventory[tx.asset] = []
                inventory[tx.asset].append(tx)
                
            elif tx.tx_type == 'SELL':
                # Calcular ganancia usando las primeras adquisiciones
                if tx.asset in inventory and inventory[tx.asset]:
                    buy_tx = inventory[tx.asset].pop(0)
                    
                    gain = self.calculate_gain(buy_tx, tx)
                    report.add_realized_gain(gain)
                    
        return report
    
    async def generate_dac8_report(self, user_id: str, year: int) -> DAC8Report:
        """Generar reporte DAC8 para regulaciones europeas"""
        
        # Obtener transacciones reportables
        reportable_txs = await self.get_dac8_reportable_transactions(user_id, year)
        
        # Aplicar formato DAC8
        report = DAC8ReportFormatter.format(reportable_txs)
        
        # Validar con esquema XSD
        validation_result = await self.validate_dac8_report(report)
        
        if not validation_result.is_valid:
            raise ValidationError(f"Reporte DAC8 inválido: {validation_result.errors}")
        
        return report

# compliance-engine/core/proof_of_origin.py
class ProofOfOriginGenerator:
    """Generador de documentos Proof-of-Origin"""
    
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.graph_client = Neo4jClient()
        self.template_engine = ReportTemplateEngine()
        
    async def generate_proof_document(self, target_wallet: str) -> ProofDocument:
        """Generar documento completo de origen de fondos"""
        
        # 1. Trazar el camino completo de los fondos
        fund_origin = await self.trace_fund_origin(target_wallet)
        
        # 2. Obtener transacciones relevantes
        relevant_txs = await self.get_relevant_transactions(fund_origin)
        
        # 3. Generar gráficos de flujo
        flow_charts = await self.generate_flow_charts(fund_origin)
        
        # 4. Crear documento con todos los elementos
        document = await self.create_comprehensive_document(
            fund_origin=fund_origin,
            transactions=relevant_txs,
            charts=flow_charts,
            user_id=self.user_id
        )
        
        return document
    
    async def trace_fund_origin(self, target_wallet: str) -> FundOrigin:
        """Trazar el origen de los fondos usando análisis de grafos"""
        
        query = """
        MATCH path = (target:Wallet {address: $target_address})<-[:RECEIVED_BY*1..20]-(:Transaction)<-[:SENT]-(source:Wallet)
        WHERE source.user_id IS NOT NULL OR 
              (source:Exchange OR source:KnownEntity)
        RETURN path
        ORDER BY length(path) ASC
        LIMIT 10
        """
        
        results = await self.graph_client.run_query(query, {
            'target_address': target_wallet
        })
        
        return self.analyze_fund_paths(results)
    
    async def generate_flow_charts(self, fund_origin: FundOrigin) -> List[FlowChart]:
        """Generar gráficos de flujo de fondos"""
        
        charts = []
        
        # Gráfico principal de flujo
        main_flow = await self.create_main_flow_chart(fund_origin)
        charts.append(main_flow)
        
        # Gráficos de timeline por asset
        for asset in fund_origin.assets:
            timeline_chart = await self.create_timeline_chart(fund_origin, asset)
            charts.append(timeline_chart)
        
        # Gráfico de interacciones con CEX
        cex_chart = await self.create_cex_interaction_chart(fund_origin)
        charts.append(cex_chart)
        
        return charts

# Entregables
• compliance-engine/core/tax_calculator.py
• compliance-engine/core/proof_of_origin.py
• compliance-engine/core/dac8_reporter.py
• compliance-engine/core/cex_detector.py
• compliance-engine/models/tax_models.py
• compliance-engine/utils/tax_rules_loader.py
• compliance-engine/templates/proof_of_origin.html
• k8s/services/compliance-engine/deployment.yaml