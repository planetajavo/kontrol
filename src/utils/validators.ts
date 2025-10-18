// ============================================================================
// VALIDATORS - Kontrol Dashboard
// ============================================================================

import { VALIDATION_RULES } from './constants';

// ============================================================================
// FORM VALIDATION
// ============================================================================

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: 'El email es requerido' };
  }
  
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'Email inválido' };
  }
  
  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: 'La contraseña es requerida' };
  }
  
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return { 
      isValid: false, 
      error: `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres` 
    };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos un número' };
  }
  
  return { isValid: true };
}

export function validateWalletAddress(address: string): ValidationResult {
  if (!address) {
    return { isValid: false, error: 'La dirección es requerida' };
  }
  
  if (address.length < VALIDATION_RULES.WALLET_ADDRESS_MIN_LENGTH) {
    return { isValid: false, error: 'Dirección de wallet inválida' };
  }
  
  // Basic alphanumeric check
  if (!/^[a-zA-Z0-9]+$/.test(address)) {
    return { isValid: false, error: 'La dirección contiene caracteres inválidos' };
  }
  
  return { isValid: true };
}

export function validateAmount(amount: string | number): ValidationResult {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(num)) {
    return { isValid: false, error: 'Cantidad inválida' };
  }
  
  if (num <= 0) {
    return { isValid: false, error: 'La cantidad debe ser mayor a 0' };
  }
  
  return { isValid: true };
}

export function validateFile(file: File): ValidationResult {
  if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: `El archivo es demasiado grande. Máximo ${VALIDATION_RULES.MAX_FILE_SIZE / 1024 / 1024}MB` 
    };
  }
  
  if (!VALIDATION_RULES.ALLOWED_FILE_TYPES.includes(file.type)) {
    return { isValid: false, error: 'Tipo de archivo no permitido' };
  }
  
  return { isValid: true };
}

export function validateRequired(value: any, fieldName: string = 'Campo'): ValidationResult {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, error: `${fieldName} es requerido` };
  }
  
  return { isValid: true };
}

// ============================================================================
// MULTI-FIELD VALIDATION
// ============================================================================

export interface FormErrors {
  [key: string]: string | undefined;
}

export function validateLoginForm(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  
  const emailResult = validateEmail(email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }
  
  const passwordResult = validateRequired(password, 'La contraseña');
  if (!passwordResult.isValid) {
    errors.password = passwordResult.error;
  }
  
  return errors;
}

export function validateRegisterForm(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): FormErrors {
  const errors: FormErrors = {};
  
  const nameResult = validateRequired(name, 'El nombre');
  if (!nameResult.isValid) {
    errors.name = nameResult.error;
  }
  
  const emailResult = validateEmail(email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
  }
  
  const passwordResult = validatePassword(password);
  if (!passwordResult.isValid) {
    errors.password = passwordResult.error;
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }
  
  return errors;
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
