import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string | React.ReactNode;
  description?: string;
  defaultOpen?: boolean;
  isOpen?: boolean; // Controlled state from parent
  children: React.ReactNode | ((isCollapsed: boolean) => React.ReactNode);
  badge?: React.ReactNode;
}

export default function CollapsibleSection({ 
  title, 
  description, 
  defaultOpen = true,
  isOpen: controlledIsOpen,
  children,
  badge
}: CollapsibleSectionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    // Only update internal state if not controlled
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className="bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full p-4 md:p-6 lg:p-8 flex items-center justify-between hover:bg-muted/50 transition-all"
      >
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <div className="text-left min-w-0 flex-1">
            <div className="flex items-center gap-2 md:gap-3 mb-1">
              {typeof title === 'string' ? (
                <h2 className="text-foreground truncate">{title}</h2>
              ) : (
                <h2 className="text-foreground flex items-center gap-2">{title}</h2>
              )}
              {badge}
            </div>
            {description && (
              <p className="text-muted-foreground text-sm md:text-base truncate">{description}</p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 ml-3 md:ml-4">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="border-t border-border p-4 md:p-6 lg:p-8">
          {typeof children === 'function' ? children(!isOpen) : children}
        </div>
      )}
      {!isOpen && typeof children === 'function' && (
        <div className="border-t border-border">
          {children(!isOpen)}
        </div>
      )}
    </div>
  );
}
