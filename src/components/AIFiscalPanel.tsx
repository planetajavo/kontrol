import { useState } from 'react';
import { Bot, Send, TrendingDown, Calendar, Coins, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface AIFiscalPanelProps {
  onSimulate: () => void;
}

export default function AIFiscalPanel({ onSimulate }: AIFiscalPanelProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: '¡Hola! Soy tu asistente fiscal cripto. Puedo ayudarte a optimizar tu fiscalidad, analizar escenarios y resolver dudas. ¿En qué puedo ayudarte hoy?'
    }
  ]);

  const suggestions = [
    {
      icon: <TrendingDown className="w-5 h-5" />,
      title: 'Optimizar fiscalidad Q4',
      description: 'Vender 0.3 BTC antes de fin de año para compensar pérdidas y reducir deuda fiscal en ~1.250€',
      color: 'bg-violet-50',
      textColor: 'text-violet-700',
      borderColor: 'border-violet-200'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Próximo tramo fiscal',
      description: 'Estás a 4.180€ del siguiente tramo (24%). Considera estrategias de diferimiento',
      color: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-800'
    },
    {
      icon: <Coins className="w-5 h-5" />,
      title: 'Hold recomendado',
      description: '2.5 ETH - Espera 6 meses más para beneficio fiscal de +1 año de tenencia',
      color: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-800'
    }
  ];

  const quickQuestions = [
    '¿Cómo optimizo mi fiscalidad este mes?',
    '¿Cuándo debo vender mis activos?',
    '¿Cómo compensar pérdidas?',
    'Simula un escenario de venta'
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([
      ...messages,
      { role: 'user', content: message },
      { 
        role: 'ai', 
        content: `Para optimizar tu fiscalidad, te recomiendo vender 0.3 BTC antes del 31 de diciembre para compensar pérdidas. Esto reduciría tu deuda fiscal en aproximadamente 1.250€. ¿Quieres que simule este escenario?` 
      }
    ]);
    setMessage('');
  };

  return (
    <div className="space-y-8">
      {/* AI Suggestions */}
      <div className="grid grid-cols-1 gap-6">
        {suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            className={`${suggestion.color} ${suggestion.borderColor} border-2 rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer group`}
          >
            <div className="flex items-start gap-6 mb-6">
              <div className={`w-14 h-14 bg-card border border-border rounded-xl flex items-center justify-center flex-shrink-0 ${suggestion.textColor}`}>
                {suggestion.icon}
              </div>
              <div className="flex-1">
                <h3 className={`${suggestion.textColor} mb-2`}>
                  {suggestion.title}
                </h3>
                <p className="text-muted-foreground">
                  {suggestion.description}
                </p>
              </div>
            </div>
            <Button
              onClick={onSimulate}
              variant="outline"
              className="w-full shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Simular escenario
            </Button>
          </div>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary to-purple-600 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-6 h-6" />
            <h2>Consulta Fiscal con IA</h2>
          </div>
          <p className="text-white/80">
            Pregunta lo que necesites sobre optimización fiscal
          </p>
        </div>

        {/* Messages */}
        <div className="p-8 space-y-6 min-h-[400px] max-h-[600px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-6 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Questions */}
        <div className="px-8 pb-6">
          <div className="text-muted-foreground mb-4">Preguntas rápidas:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => setMessage(question)}
                className="text-left p-4 rounded-xl bg-muted hover:bg-accent transition-all border border-border text-foreground"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-8 border-t border-border bg-muted/30">
          <div className="flex gap-4">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu consulta fiscal..."
              className="h-14 bg-background"
            />
            <Button 
              onClick={handleSendMessage} 
              size="lg"
              className="px-8"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
