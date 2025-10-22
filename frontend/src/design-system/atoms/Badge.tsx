import { ReactNode } from 'react';

type BadgeVariant = 'success' | 'danger' | 'accent' | 'neutral' | 'attention';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

/**
 * Badge Atom - Design System Component
 * 
 * Inspiración: GitHub labels/badges
 * Uso: Tags, estados, categorías
 * 
 * @example
 * <Badge variant="success">Verified</Badge>
 * <Badge variant="danger">Failed</Badge>
 */
export const Badge = ({ 
  variant = 'neutral', 
  children, 
  className = '' 
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center px-2xs py-4xs rounded-md text-xs font-medium';
  
  const variantClasses = {
    success: 'bg-success-subtle text-fg-onEmphasis',
    danger: 'bg-danger-subtle text-fg-onEmphasis',
    accent: 'bg-accent-subtle text-fg-onEmphasis',
    neutral: 'bg-neutral-subtle text-fg-default border border-border-default',
    attention: 'bg-attention-subtle text-fg-onEmphasis',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
