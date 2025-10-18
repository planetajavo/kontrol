// ============================================================================
// EMPTY STATE - Reusable Component
// ============================================================================

import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className = '' 
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-foreground mb-2 text-center">{title}</h3>
      
      <p className="text-muted-foreground text-sm md:text-base text-center max-w-md mb-6">
        {description}
      </p>

      {action && (
        <Button onClick={action.onClick} className="gap-2">
          {action.icon && <action.icon className="w-4 h-4" />}
          {action.label}
        </Button>
      )}
    </div>
  );
}
