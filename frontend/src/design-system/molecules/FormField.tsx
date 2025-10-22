import { Input } from '../atoms';
import { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

/**
 * FormField Molecule - Design System Component
 * 
 * Combina: Input + Label + Error/Helper text
 * Uso: Formularios en toda la aplicación
 * 
 * @example
 * <FormField label="Email" type="email" required />
 */
export const FormField = ({ 
  label, 
  error, 
  helperText, 
  required,
  ...props 
}: FormFieldProps) => {
  return (
    <Input
      label={required ? `${label} *` : label}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
};
