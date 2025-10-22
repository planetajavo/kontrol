// frontend/components/DataSourcesManager.tsx
interface DataSource {
    name: string;
    type: 'automated' | 'cointracking' | 'csv' | 'manual';
    status: 'connected' | 'syncing' | 'error' | 'disconnected';
    lastSync?: string;
    confidence: number;
    stats: {
        transactions: number;
        successRate: number;
        autoSync: boolean;
    };
}

const DataSourcesManager: React.FC = () => {
    const { data: dataSources, isLoading } = useQuery(
        ['data-sources'],
        fetchDataSources
    );
    
    const { mutate: syncDataSource } = useMutation(syncDataSource, {
        onSuccess: () => {
            queryClient.invalidateQueries(['data-sources']);
        }
    });
    
    return (
        <div className="data-sources-manager">
            <div className="manager-header">
                <h2>Data Sources</h2>
                <p>Manage your connected exchanges and data imports</p>
            </div>
            
            <div className="confidence-score">
                <h4>Overall Data Confidence</h4>
                <div className="score-display">
                    <ConfidenceMeter 
                        score={calculateOverallConfidence(dataSources)}
                        size="lg"
                    />
                    <div className="score-breakdown">
                        {dataSources?.map(source => (
                            <DataSourceConfidence 
                                key={source.name}
                                source={source}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="sources-grid">
                <AutomatedSyncCard 
                    sources={dataSources?.filter(s => s.type === 'automated')}
                    onSync={syncDataSource}
                />
                
                <CointrackingImporterCard 
                    onImportComplete={handleCointrackingImport}
                />
                
                <CSVUploaderCard 
                    onUploadComplete={handleCSVImport}
                />
                
                <ManualEntryCard 
                    onTransactionAdd={handleManualTransaction}
                />
            </div>
            
            <div className="sync-controls">
                <Button 
                    variant="primary"
                    onClick={syncAllDataSources}
                    isLoading={isSyncingAll}
                >
                    <IconSync />
                    Sync All Sources
                </Button>
                
                <Button 
                    variant="ghost"
                    onClick={discoverOldWallets}
                >
                    <IconSearch />
                    Discover Old Wallets
                </Button>
            </div>
        </div>
    );
};

// frontend/components/PortfolioChat.tsx
export const PortfolioChat: React.FC<PortfolioChatProps> = ({
    position = 'bottom-right',
    defaultOpen = false,
    userData,
    onMessageSend
}) => {
    const [state, setState] = useState<ChatState>(
        defaultOpen ? 'expanded' : 'collapsed'
    );
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const suggestedQuestions = useMemo(() => [
        "¿Cuál es mi ganancia total?",
        "Muéstrame mis wallets antiguas",
        "Genera reporte fiscal para 2024",
        "¿Qué transacciones pasaron por CEX después de 2024?",
        "Proof of origin para mi wallet principal",
        "Optimización fiscal sugerida",
        "Análisis de riesgo del portfolio",
        "Transacciones no conciliadas"
    ], []);
    
    const handleSendMessage = async (message: string) => {
        setIsLoading(true);
        
        // Añadir mensaje de usuario
        const userMessage: ChatMessage = {
            id: generateId(),
            role: 'user',
            content: message,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        
        try {
            // Llamar al servicio de chat
            const response = await onMessageSend(message);
            
            if (response) {
                const assistantMessage: ChatMessage = {
                    id: generateId(),
                    role: 'assistant',
                    content: response.text,
                    visualizations: response.visualizations,
                    timestamp: new Date()
                };
                
                setMessages(prev => [...prev, assistantMessage]);
            }
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: generateId(),
                role: 'assistant',
                content: 'Lo siento, hubo un error procesando tu pregunta. Por favor, inténtalo de nuevo.',
                isError: true,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <motion.div 
            className={cn(
                'portfolio-chat',
                `position-${position}`,
                `state-${state}`
            )}
            initial={CHAT_ANIMATIONS.slideUp.initial}
            animate={CHAT_ANIMATIONS.slideUp.animate}
            exit={CHAT_ANIMATIONS.slideUp.exit}
            transition={CHAT_ANIMATIONS.slideUp.transition}
        >
            {/* Chat Header */}
            <div className="chat-header">
                <div className="header-left">
                    <div className="assistant-avatar">
                        <IconBot />
                    </div>
                    <div className="header-info">
                        <h3>Portfolio Assistant</h3>
                        <span className="status">
                            {isLoading ? 'Thinking...' : 'Online'}
                        </span>
                    </div>
                </div>
                
                <div className="header-actions">
                    <button
                        className="header-btn"
                        onClick={() => setState('collapsed')}
                        aria-label="Minimize chat"
                    >
                        <IconMinimize />
                    </button>
                </div>
            </div>
            
            {/* Chat Content */}
            {state === 'expanded' && (
                <div className="chat-content">
                    {/* Welcome Message */}
                    {messages.length === 0 && (
                        <div className="welcome-message">
                            <h4>👋 ¡Hola! Soy tu asistente de portfolio</h4>
                            <p>Puedo ayudarte con:</p>
                            <ul>
                                <li>📊 Análisis de ganancias y pérdidas</li>
                                <li>🏦 Reportes fiscales y compliance</li>
                                <li>🔍 Detección de wallets antiguas</li>
                                <li>📈 Optimización de tu portfolio</li>
                            </ul>
                        </div>
                    )}
                    
                    {/* Messages List */}
                    <div className="messages-container">
                        {messages.map(message => (
                            <ChatMessage 
                                key={message.id}
                                message={message}
                                isLoading={isLoading && message.role === 'assistant'}
                            />
                        ))}
                        
                        {isLoading && (
                            <div className="thinking-indicator">
                                <TypingAnimation />
                                <span>Procesando tu pregunta...</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Suggested Questions */}
                    <SuggestedQuestions
                        questions={suggestedQuestions}
                        onQuestionClick={handleSendMessage}
                        disabled={isLoading}
                    />
                    
                    {/* Message Input */}
                    <MessageInput
                        onSendMessage={handleSendMessage}
                        disabled={isLoading}
                        placeholder="Pregunta sobre tu portfolio..."
                    />
                </div>
            )}
        </motion.div>
    );
};

# Entregables
• frontend/components/DataSourcesManager.tsx
• frontend/components/PortfolioChat.tsx
• frontend/components/Dashboard.tsx
• frontend/components/MetricCard.tsx
• frontend/components/ConfidenceMeter.tsx
• frontend/hooks/useDataSources.ts
• frontend/hooks/usePortfolioChat.ts
• frontend/styles/design-tokens.css
• frontend/utils/formatters.ts