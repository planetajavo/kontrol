// ============================================================================
// GRADIENT CARD - Componente con gradiente que respeta dark mode
// ============================================================================

import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface GradientCardProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'info' | 'warning' | 'subtle';
  className?: string;
  borderWidth?: '1' | '2';
}

const variantClasses = {
  primary: 'bg-gradient-to-br from-primary/10 via-primary/5 to-accent border-primary/30',
  success: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800',
  info: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800',
  warning: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border-amber-200 dark:border-amber-800',
  subtle: 'bg-gradient-to-br from-secondary to-accent border-border',
};

export default function GradientCard({ 
  children, 
  variant = 'primary',
  className = '',
  borderWidth = '2'
}: GradientCardProps) {
  return (
    <div 
      className={cn(
        'rounded-xl md:rounded-2xl p-4 md:p-6',
        `border-${borderWidth}`,
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
