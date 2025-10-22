import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input Atom - Design System Component
 * 
 * Inspiración: GitHub form inputs
 * Uso: Campos de formulario en toda la aplicación
 * 
 * @example
 * <Input label="Email" type="email" />
 * <Input error="Campo requerido" />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2xs">
        {label && (
          <label className="text-sm font-medium text-fg-default">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            bg-canvas-inset border rounded-md
            px-sm py-2xs text-fg-default
            placeholder:text-fg-subtle
            focus:outline-none focus:ring-2 focus:ring-accent-emphasis
            transition-colors duration-200
            ${error ? 'border-danger-emphasis' : 'border-border-default'}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
        {error && (
          <span className="text-sm text-danger-emphasis">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-sm text-fg-subtle">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
