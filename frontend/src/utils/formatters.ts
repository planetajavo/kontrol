// ============================================================================
// FORMATTERS - Kontrol Dashboard
// ============================================================================

import { CURRENCY_SYMBOLS } from './constants';

// ============================================================================
// CURRENCY FORMATTING
// ============================================================================

export function formatCurrency(
  amount: number,
  currency: 'EUR' | 'USD' | 'GBP' = 'EUR',
  options?: { decimals?: number; showSymbol?: boolean }
): string {
  const decimals = options?.decimals ?? 2;
  const showSymbol = options?.showSymbol ?? true;

  const formatted = amount.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return showSymbol ? `${CURRENCY_SYMBOLS[currency]}${formatted}` : formatted;
}

export function formatCrypto(amount: number, decimals: number = 8): string {
  if (amount === 0) return '0';
  
  // For small amounts, show more decimals
  if (Math.abs(amount) < 0.01) {
    return amount.toFixed(decimals);
  }
  
  // For larger amounts, show fewer decimals
  return amount.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

// ============================================================================
// DATE FORMATTING
// ============================================================================

export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  
  return d.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(d, 'short')} ${formatDate(d, 'time')}`;
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Ahora';
  if (diffMins < 60) return `Hace ${diffMins}m`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  
  return formatDate(d, 'short');
}

// ============================================================================
// NUMBER FORMATTING
// ============================================================================

export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// ============================================================================
// ADDRESS FORMATTING
// ============================================================================

export function formatAddress(address: string, chars: number = 6): string {
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatHash(hash: string): string {
  return formatAddress(hash, 8);
}

// ============================================================================
// STRING UTILITIES
// ============================================================================

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

// ============================================================================
// FILE SIZE FORMATTING
// ============================================================================

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidAddress(address: string): boolean {
  // Basic validation - 26-42 chars alphanumeric
  return /^[a-zA-Z0-9]{26,42}$/.test(address);
}

// ============================================================================
// COLOR UTILITIES
// ============================================================================

export function getColorForValue(value: number): string {
  if (value > 0) return 'text-green-600 dark:text-green-400';
  if (value < 0) return 'text-red-600 dark:text-red-400';
  return 'text-muted-foreground';
}

export function getBackgroundColorForValue(value: number): string {
  if (value > 0) return 'bg-green-50 dark:bg-green-900/20';
  if (value < 0) return 'bg-red-50 dark:bg-red-900/20';
  return 'bg-muted';
}
