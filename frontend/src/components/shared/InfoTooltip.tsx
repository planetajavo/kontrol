// ============================================================================
// INFO TOOLTIP - Sistema de tooltips informativos reutilizable
// ============================================================================

import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface InfoTooltipProps {
  content: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  iconSize?: number;
}

/**
 * InfoTooltip - Componente reutilizable para mostrar información contextual
 * 
 * @param content - Texto o contenido a mostrar en el tooltip
 * @param side - Posición del tooltip (default: 'top')
 * @param className - Clases adicionales para el icono
 * @param iconSize - Tamaño del icono en pixels (default: 14)
 */
export default function InfoTooltip({ 
  content, 
  side = 'top',
  className = '',
  iconSize = 14
}: InfoTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span 
            tabIndex={0}
            role="button"
            aria-label="More information"
            className={`inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-help ${className}`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
          >
            <HelpCircle size={iconSize} className="flex-shrink-0" />
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          className="max-w-xs text-sm bg-popover/95 backdrop-blur-xl border-border shadow-lg"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
