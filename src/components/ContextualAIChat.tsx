import { useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ContextualAIChatProps {
  section: string;
}

const sectionContexts = {
  dashboard: {
    title: 'Asistente del Dashboard',
    suggestions: [
      '¿Qué transacciones debería revisar?',
      'Detecta duplicados o errores',
      'Optimiza categorización fiscal',
    ],
    greeting: 'Puedo ayudarte a analizar tus transacciones, detectar patrones y optimizar tu categorización fiscal.'
  },
  fiscal: {
    title: 'Asistente Fiscal',
    suggestions: [
      'Simula venta de 0.5 BTC',
      '¿Cómo reducir mi deuda fiscal?',
      'Mejor momento para vender',
    ],
    greeting: 'Te ayudo a simular escenarios, optimizar tu fiscalidad y planificar tus operaciones.'
  },
  wallets: {
    title: 'Asistente de Wallets',
    suggestions: [
      'Analiza mi red de wallets',
      'Consolida wallets duplicadas',
      'Recomienda organización',
    ],
    greeting: 'Puedo analizar tu red de wallets, sugerir optimizaciones y ayudarte con etiquetas.'
  },
  exchanges: {
    title: 'Asistente de Exchanges',
    suggestions: [
      'Compara fees entre exchanges',
      'Mejores horarios para trading',
      'Detecta oportunidades de arbitraje',
    ],
    greeting: 'Te ayudo a optimizar tus operaciones en exchanges y analizar oportunidades.'
  }
};

export default function ContextualAIChat({ section }: ContextualAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);

  const context = sectionContexts[section as keyof typeof sectionContexts] || sectionContexts.dashboard;

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      { role: 'user', content: message },
      { 
        role: 'ai', 
        content: `Entiendo tu consulta sobre "${message}". Basándome en tus datos actuales, te recomiendo...` 
      }
    ]);
    setMessage('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 lg:bottom-8 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-40"
        style={{ background: 'linear-gradient(to bottom right, var(--primary-gradient-from), var(--primary-gradient-to))' }}
      >
        <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-emerald-500 dark:bg-emerald-600 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-8 md:right-8 w-[calc(100vw-2rem)] sm:w-96 bg-card rounded-xl md:rounded-2xl shadow-2xl border border-border overflow-hidden z-40">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to p-4 md:p-6 text-white" style={{ 
        background: `linear-gradient(to right, hsl(var(--primary-gradient-from)), hsl(var(--primary-gradient-to)))`
      }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <h3>{context.title}</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-2 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-white/80 text-sm">{context.greeting}</p>
      </div>

      {/* Messages */}
      <div className="p-6 space-y-4 h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="space-y-3">
            <div className="text-muted-foreground text-sm mb-4">Preguntas sugeridas:</div>
            {context.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setMessage(suggestion)}
                className="w-full text-left p-4 rounded-xl bg-muted hover:bg-accent transition-all border border-border text-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex gap-3">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu pregunta..."
            className="bg-background"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
