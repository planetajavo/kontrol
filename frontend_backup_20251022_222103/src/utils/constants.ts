// ============================================================================
// CONSTANTS - Kontrol Dashboard
// ============================================================================

import { ThemeColor, NetworkType } from '../types';

// ============================================================================
// APP CONFIG
// ============================================================================

export const APP_NAME = 'Kontrol';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Dashboard financiero cripto profesional';

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  AUTH: 'kontrol_auth',
  USER: 'kontrol_user',
  THEME: 'kontrol_theme',
  DARK_MODE: 'kontrol_darkMode',
  PREFERENCES: 'kontrol_preferences',
  ONBOARDING: 'kontrol_onboarding_completed',
} as const;

// ============================================================================
// THEME
// ============================================================================

export const THEME_COLORS: ThemeColor[] = ['orange', 'blue', 'green', 'purple', 'pink'];

export const THEME_CONFIG: Record<ThemeColor, { name: string; color: string }> = {
  orange: { name: 'Naranja', color: '#F97316' },
  blue: { name: 'Azul', color: '#3B82F6' },
  green: { name: 'Verde', color: '#10B981' },
  purple: { name: 'Morado', color: '#8B5CF6' },
  pink: { name: 'Rosa', color: '#EC4899' },
};

// ============================================================================
// NETWORKS
// ============================================================================

export const NETWORK_CONFIG: Record<NetworkType, { name: string; color: string; chainId?: number }> = {
  ethereum: { name: 'Ethereum', color: '#627EEA', chainId: 1 },
  bitcoin: { name: 'Bitcoin', color: '#F7931A' },
  polygon: { name: 'Polygon', color: '#8247E5', chainId: 137 },
  binance: { name: 'Binance Smart Chain', color: '#F3BA2F', chainId: 56 },
  arbitrum: { name: 'Arbitrum', color: '#28A0F0', chainId: 42161 },
  optimism: { name: 'Optimism', color: '#FF0420', chainId: 10 },
  avalanche: { name: 'Avalanche', color: '#E84142', chainId: 43114 },
  solana: { name: 'Solana', color: '#14F195' },
};

// ============================================================================
// EXCHANGES
// ============================================================================

export const SUPPORTED_EXCHANGES = [
  'binance',
  'coinbase',
  'kraken',
  'cryptocom',
  'bitfinex',
  'kucoin',
  'bybit',
  'okx',
  'bitstamp',
] as const;

// ============================================================================
// TRANSACTION TYPES
// ============================================================================

export const TRANSACTION_TYPE_LABELS: Record<string, string> = {
  buy: 'Compra',
  sell: 'Venta',
  transfer: 'Transferencia',
  transfer_internal_wallet: 'Transfer entre Wallets',
  transfer_internal_exchange: 'Transfer entre Exchanges',
  transfer_external: 'Transfer Externa',
  trade: 'Trade',
  staking: 'Staking',
  airdrop: 'Airdrop',
};

// ============================================================================
// VALIDATION
// ============================================================================

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  WALLET_ADDRESS_MIN_LENGTH: 26,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
} as const;

// ============================================================================
// DATE FORMATS
// ============================================================================

export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY HH:mm',
  TIME: 'HH:mm',
} as const;

// ============================================================================
// CURRENCY
// ============================================================================

export const CURRENCY_SYMBOLS = {
  EUR: '€',
  USD: '$',
  GBP: '£',
} as const;

// ============================================================================
// PAGINATION
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// ============================================================================
// TOAST DURATIONS
// ============================================================================

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 4000,
  LONG: 6000,
} as const;

// ============================================================================
// TAX RATES (España)
// ============================================================================

export const TAX_BRACKETS = [
  { min: 0, max: 6000, rate: 19 },
  { min: 6000, max: 50000, rate: 21 },
  { min: 50000, max: 200000, rate: 23 },
  { min: 200000, max: 300000, rate: 27 },
  { min: 300000, max: Infinity, rate: 28 },
];

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

export const KEYBOARD_SHORTCUTS = {
  SEARCH: 'cmd+k',
  NEW_TRANSACTION: 'cmd+n',
  CLOSE_MODAL: 'esc',
  SAVE: 'cmd+s',
} as const;
