# 🤖 FASE 4: Transaction Agent & AI (Semanas 7-8)

## Objetivos
- Implementar Transaction Agent como interfaz conversacional
- Configurar LangChain y LangGraph
- Crear sistema RAG para consultas inteligentes
- Implementar Tool Use para APIs internas

## Entregables

### 4.1 Transaction Agent Core
- [ ] Agente conversacional para portfolio
- [ ] Query language natural para datos
- [ ] Integración con APIs internas
- [ ] Memoria contextual de conversaciones
- [ ] Respuestas estructuradas y accionables

### 4.2 RAG System (Retrieval Augmented Generation)
- [ ] Vector store con Chroma/Redis
- [ ] Embeddings de transacciones
- [ ] Embeddings de reglas fiscales
- [ ] Sistema de retrieval inteligente
- [ ] Context injection para LLM

### 4.3 Tool Use Implementation
- [ ] TaxEngine.query_pnl() tool
- [ ] Neo4j.get_tx_path() tool
- [ ] PortfolioAnalyzer.get_holdings() tool
- [ ] ReportGenerator.create_report() tool
- [ ] ExchangeClient.sync_data() tool

### 4.4 LangChain Integration
- [ ] Configuración de LangChain
- [ ] LangGraph para orquestación
- [ ] Memory management
- [ ] Prompt engineering
- [ ] Error handling y fallbacks

## Implementación del Transaction Agent

### Agent Core
```python
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.tools import Tool
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder

class TransactionAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4", temperature=0.1)
        self.memory = ConversationBufferWindowMemory(
            memory_key="chat_history",
            return_messages=True,
            k=10
        )
        self.tools = self._create_tools()
        self.agent = self._create_agent()
    
    def _create_tools(self) -> List[Tool]:
        return [
            Tool(
                name="query_portfolio_pnl",
                description="Obtener P&L del portfolio por período",
                func=self._query_portfolio_pnl
            ),
            Tool(
                name="get_transaction_path",
                description="Obtener ruta de transacciones entre wallets",
                func=self._get_transaction_path
            ),
            Tool(
                name="analyze_holdings",
                description="Analizar holdings actuales del portfolio",
                func=self._analyze_holdings
            ),
            Tool(
                name="generate_tax_report",
                description="Generar reporte fiscal para un año específico",
                func=self._generate_tax_report
            ),
            Tool(
                name="sync_exchange_data",
                description="Sincronizar datos de un exchange específico",
                func=self._sync_exchange_data
            )
        ]
    
    def _create_agent(self):
        prompt = ChatPromptTemplate.from_messages([
            ("system", self._get_system_prompt()),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad")
        ])
        
        return create_openai_functions_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=prompt
        )
    
    def _get_system_prompt(self) -> str:
        return """
        Eres el Transaction Agent de KONTROL, un asistente especializado en análisis de portfolios crypto y fiscalidad.

        Tu función es:
        1. Responder preguntas sobre portfolios crypto de manera precisa
        2. Proporcionar análisis fiscal y de rendimiento
        3. Sugerir optimizaciones de portfolio
        4. Generar reportes y visualizaciones de datos
        5. Ayudar con reconciliación de transacciones

        Siempre:
        - Usa datos reales del usuario
        - Proporciona cifras exactas con decimales apropiados
        - Explica conceptos fiscales de manera clara
        - Sugiere acciones concretas cuando sea apropiado
        - Mantén la confidencialidad de los datos

        Si no tienes información suficiente, pregunta por detalles específicos.
        """
    
    async def chat(self, message: str, user_id: str) -> str:
        """Procesar mensaje del usuario"""
        try:
            result = await self.agent_executor.ainvoke({
                "input": message,
                "user_id": user_id
            })
            return result["output"]
        except Exception as e:
            return f"Error procesando consulta: {str(e)}"
```

### RAG System
```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader

class RAGSystem:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.vector_store = Chroma(
            collection_name="kontrol_knowledge",
            embedding_function=self.embeddings
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
    
    async def add_transaction_data(self, transactions: List[Transaction]):
        """Agregar datos de transacciones al vector store"""
        docs = []
        for tx in transactions:
            doc_text = f"""
            Transacción: {tx.tx_hash}
            Tipo: {tx.kontorl_type}
            Asset: {tx.asset_in} -> {tx.asset_out}
            Cantidad: {tx.amount_in} -> {tx.amount_out}
            Fecha: {tx.timestamp_utc}
            Exchange: {tx.exchange_id}
            Cost Basis: {tx.fiat_cost_basis_unit}
            """
            docs.append(Document(page_content=doc_text, metadata={
                "tx_id": tx.tx_id,
                "user_id": tx.user_id,
                "timestamp": tx.timestamp_utc.isoformat()
            }))
        
        await self.vector_store.aadd_documents(docs)
    
    async def add_tax_rules(self, jurisdiction: str, rules: str):
        """Agregar reglas fiscales al vector store"""
        docs = self.text_splitter.split_text(rules)
        await self.vector_store.aadd_texts(
            docs,
            metadatas=[{"jurisdiction": jurisdiction, "type": "tax_rule"} for _ in docs]
        )
    
    async def query_relevant_context(self, query: str, user_id: str = None) -> List[Document]:
        """Buscar contexto relevante para una consulta"""
        filter_dict = {"user_id": user_id} if user_id else None
        return await self.vector_store.asimilarity_search(
            query,
            k=5,
            filter=filter_dict
        )
```

### Tool Implementations
```python
class TransactionAgentTools:
    def __init__(self, tax_engine, portfolio_analyzer, report_generator):
        self.tax_engine = tax_engine
        self.portfolio_analyzer = portfolio_analyzer
        self.report_generator = report_generator
    
    async def _query_portfolio_pnl(self, query: str) -> str:
        """Tool para consultar P&L del portfolio"""
        # Parsear query para extraer parámetros
        params = self._parse_pnl_query(query)
        
        # Obtener datos del portfolio
        pnl_data = await self.portfolio_analyzer.get_pnl(
            user_id=params["user_id"],
            start_date=params.get("start_date"),
            end_date=params.get("end_date"),
            method=params.get("method", "FIFO")
        )
        
        return f"""
        📊 P&L del Portfolio ({params.get('method', 'FIFO')}):
        
        💰 Realizado: ${pnl_data.realized_pnl:,.2f}
        📈 No Realizado: ${pnl_data.unrealized_pnl:,.2f}
        📊 Total: ${pnl_data.total_pnl:,.2f}
        
        🏆 Mejor Asset: {pnl_data.best_performer.asset} (+{pnl_data.best_performer.return_pct:.1f}%)
        📉 Peor Asset: {pnl_data.worst_performer.asset} ({pnl_data.worst_performer.return_pct:.1f}%)
        """
    
    async def _get_transaction_path(self, query: str) -> str:
        """Tool para obtener ruta de transacciones"""
        params = self._parse_path_query(query)
        
        path = await self.tax_engine.get_transaction_path(
            from_address=params["from_address"],
            to_address=params["to_address"],
            asset=params.get("asset")
        )
        
        return f"""
        🔍 Ruta de Transacciones:
        
        📍 Desde: {path.from_address}
        📍 Hasta: {path.to_address}
        💎 Asset: {path.asset}
        
        🛤️ Pasos ({len(path.steps)}):
        {self._format_path_steps(path.steps)}
        
        ⏱️ Tiempo Total: {path.total_time}
        💸 Fees Totales: {path.total_fees}
        """
    
    async def _analyze_holdings(self, query: str) -> str:
        """Tool para analizar holdings"""
        params = self._parse_holdings_query(query)
        
        holdings = await self.portfolio_analyzer.get_holdings(
            user_id=params["user_id"]
        )
        
        return f"""
        💼 Análisis de Holdings:
        
        📊 Distribución:
        {self._format_holdings_distribution(holdings.distribution)}
        
        🎯 Concentración: {holdings.concentration_score:.1f}%
        📈 Diversificación: {holdings.diversification_score:.1f}/10
        
        💡 Recomendaciones:
        {self._format_recommendations(holdings.recommendations)}
        """
```

## Tecnologías
- **LangChain**: Framework de agentes
- **LangGraph**: Orquestación de agentes
- **OpenAI GPT-4**: LLM principal
- **Chroma**: Vector store
- **Redis**: Cache de conversaciones

## Criterios de Éxito
- ✅ Transaction Agent respondiendo consultas complejas
- ✅ RAG system con accuracy > 90%
- ✅ Tool Use funcionando correctamente
- ✅ Memoria contextual persistente
- ✅ Respuestas estructuradas y accionables
- ✅ Tests de conversación pasando

