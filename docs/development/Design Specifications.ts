interface PortfolioChatProps {
  position?: 'bottom-right' | 'bottom-left' | 'floating';
  defaultOpen?: boolean;
  userData: UserPortfolioData;
  suggestedQuestions?: string[];
  onMessageSend?: (message: string) => Promise<ChatResponse>;
  theme?: 'light' | 'dark' | 'auto';
}

// Estados del Widget
type ChatState = 'collapsed' | 'expanded' | 'loading' | 'error' | 'thinking';

// Configuración de Animaciones
const CHAT_ANIMATIONS = {
  slideUp: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
    transition: { type: 'spring', damping: 25, stiffness: 200 }
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { type: 'spring', damping: 20 }
  }
};