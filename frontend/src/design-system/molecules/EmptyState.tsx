import { ReactNode } from 'react';
import { Button } from '../atoms';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * EmptyState Molecule - Design System Component
 * 
 * Combina: Icon + Text + Button
 * Uso: Estados vacíos (sin datos, sin resultados, etc)
 * 
 * @example
 * <EmptyState 
 *   title="Sin direcciones"
 *   description="Importa tu primera wallet"
 *   actionLabel="Importar"
 *   onAction={() => {}}
 * />
 */
export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-3xl text-center">
      {icon && (
        <div className="mb-md text-fg-muted">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-fg-default mb-2xs">
        {title}
      </h3>
      <p className="text-fg-muted mb-md max-w-md">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
