import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
}

/**
 * Button Atom - Design System Component
 * 
 * Inspiración: GitHub buttons
 * Uso: Acciones primarias y secundarias en la UI
 * 
 * @example
 * <Button variant="primary">Importar</Button>
 * <Button variant="secondary" size="sm">Cancelar</Button>
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200';
  const baseClasses2 = 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-canvas-default';
  const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-accent-emphasis hover:bg-accent-muted text-fg-onEmphasis focus:ring-accent-emphasis',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100 border border-gray-600 focus:ring-blue-500',
    danger: 'bg-danger-emphasis hover:bg-danger-muted text-fg-onEmphasis focus:ring-danger-emphasis',
    ghost: 'hover:bg-neutral-subtle text-fg-default focus:ring-accent-emphasis',
  };
  
  const sizeClasses = {
    sm: 'px-3xs py-4xs text-sm',
    md: 'px-sm py-2xs text-base',
    lg: 'px-md py-xs text-lg',
  };
  
  return (
    <button
      className={`
        ${baseClasses}
        ${baseClasses2}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg 
          className="animate-spin h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
