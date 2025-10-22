// ============================================================================
// TYPES - Kontrol Dashboard
// ============================================================================

export type ThemeColor = 'orange' | 'blue' | 'green' | 'purple' | 'pink';

export type SectionView = 'dashboard' | 'fiscal' | 'assets' | 'transactions' | 'banks' | 'aml';

export type TransactionType = 'buy' | 'sell' | 'transfer' | 'swap';
export type TransactionStatus = 'confirmed' | 'pending' | 'failed';

export type WalletType = 'hot' | 'hardware' | 'paper';

export type NetworkType = 'ethereum' | 'bitcoin' | 'polygon' | 'binance' | 'arbitrum' | 'optimism' | 'avalanche' | 'solana';

// ============================================================================
// USER & AUTH
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: ThemeColor;
  darkMode: boolean;
  language: 'es' | 'en';
  currency: 'EUR' | 'USD';
  notifications: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// WALLET
// ============================================================================

export interface Wallet {
  id: string;
  name: string;
  address: string;
  type: WalletType;
  network: NetworkType;
  balance: number;
  balanceUSD: number;
  icon?: string;
  color?: string;
  createdAt: Date;
  lastSync?: Date;
}

// ============================================================================
// EXCHANGE
// ============================================================================

export interface Exchange {
  id: string;
  name: string;
  platform: 'binance' | 'coinbase' | 'kraken' | 'cryptocom' | 'bitfinex' | 'kucoin' | 'bybit' | 'okx' | 'bitstamp';
  apiKey?: string;
  permissions: string[];
  balance: number;
  balanceUSD: number;
  connected: boolean;
  lastSync?: Date;
  createdAt: Date;
}

// ============================================================================
// TRANSACTION
// ============================================================================

export interface Transaction {
  id: string;
  date: Date;
  type: TransactionType;
  status: TransactionStatus;
  
  // Main transaction data
  amount: number;
  currency: string;
  valueInEur?: number;
  
  // For swaps/trades
  fromAmount?: number;
  fromCurrency?: string;
  toAmount?: number;
  toCurrency?: string;
  
  // Transaction fee
  feeAmount?: number;
  feeCurrency?: string;
  feeInEur?: number;
  
  // Location data
  exchange?: string;
  wallet?: string;
  fromWallet?: string;
  toWallet?: string;
  network?: NetworkType;
  
  // Organization
  tradeGroup?: string;
  comment?: string;
  tags?: string[];
  
  // Blockchain data
  txHash?: string;
  confirmations?: number;
  
  // Fiscal data
  isTaxable?: boolean;
  realizedPnL?: number;
  costBasis?: number;
  
  // AI/Special
  aiHighlight?: {
    message: string;
    type: 'milestone' | 'opportunity' | 'warning' | 'celebration';
  };
}

// ============================================================================
// BANK
// ============================================================================

export interface BankAccount {
  id: string;
  bankName: string;
  accountType: 'checking' | 'savings';
  accountNumber: string;
  balance: number;
  currency: string;
  iban?: string;
  connected: boolean;
  lastSync?: Date;
  provider?: string;
}

// ============================================================================
// TAX & FISCAL
// ============================================================================

export interface TaxSummary {
  year: number;
  realizedGains: number;
  unrealizedGains: number;
  totalTaxes: number;
  taxRate: number;
  deductions: number;
}

export interface FiscalTransaction {
  id: string;
  date: Date;
  type: 'buy' | 'sell';
  asset: string;
  amount: number;
  cost: number;
  proceeds?: number;
  gain?: number;
  holdingPeriod?: number;
}

// ============================================================================
// KYC / AML
// ============================================================================

export interface KYCStatus {
  profileComplete: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  lastReview: Date;
  documentsVerified: number;
  documentsTotal: number;
  verified: boolean;
}

export interface ComplianceDocument {
  id: string;
  type: 'id' | 'proof_of_address' | 'source_of_funds' | 'tax_residency';
  fileName: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: Date;
  verifiedDate?: Date;
}

// ============================================================================
// UI STATE
// ============================================================================

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  type: 'wallet' | 'exchange' | 'transaction' | 'confirm' | null;
  data?: any;
}

// ============================================================================
// API RESPONSE
// ============================================================================

export type ApiResponse<T> = 
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string };

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
