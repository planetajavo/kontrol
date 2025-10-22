export const PortfolioChat: React.FC<PortfolioChatProps> = ({
  position = 'bottom-right',
  defaultOpen = false,
  userData,
  suggestedQuestions = [],
  onMessageSend,
  theme = 'auto'
}) => {
  const [state, setState] = useState<ChatState>(
    defaultOpen ? 'expanded' : 'collapsed'
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Gestión de estado del chat
  const toggleChat = () => {
    setState(prev => prev === 'collapsed' ? 'expanded' : 'collapsed');
  };
  
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
      const response = await onMessageSend?.(message);
      
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
    <div className={cn('portfolio-chat', `position-${position}`, `theme-${theme}`)}>
      {/* Header del Chat */}
      <ChatHeader 
        state={state}
        onToggle={toggleChat}
        onClose={() => setState('collapsed')}
      />
      
      {/* Contenido del Chat cuando está expandido */}
      {state === 'expanded' && (
        <div className="chat-content">
          {/* Área de Mensajes */}
          <MessageList 
            messages={messages}
            isLoading={isLoading}
          />
          
          {/* Preguntas Sugeridas */}
          <SuggestedQuestions 
            questions={suggestedQuestions}
            onQuestionClick={handleSendMessage}
            categories={SUGGESTED_QUESTIONS}
          />
          
          {/* Input de Mensaje */}
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={isLoading}
            placeholder="Pregunta sobre tu portfolio..."
          />
        </div>
      )}
    </div>
  );
};