// ============================================================================
// MOCK TRANSACTIONS - Realistic Transaction Data Generator
// ============================================================================

import { type Transaction, type TransactionType, type TransactionStatus } from '../types';

const currencies = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'MATIC', 'AVAX', 'ADA', 'DOT', 'LINK'];
const wallets = ['Ledger Nano X', 'MetaMask', 'Trust Wallet', 'Exodus'];
const exchanges = ['Binance', 'Coinbase', 'Kraken', 'Bitfinex'];
const tradeGroups = ['DCA Strategy', 'Swing Trading', 'Long Term Hold', 'Arbitrage', 'Mining'];
const networks = ['ethereum', 'bitcoin', 'polygon', 'binance', 'solana', 'avalanche'] as const;

// Special highlights for memorable transactions
const highlights = [
  { 
    dateOffset: -1200, // Days ago
    message: '🎉 Tu primer Bitcoin - El inicio de tu journey',
    type: 'milestone' as const
  },
  { 
    dateOffset: -800,
    message: '💎 Compraste en el dip - Excelente timing',
    type: 'opportunity' as const
  },
  { 
    dateOffset: -365,
    message: '🎆 Compra de año nuevo - Gran comienzo',
    type: 'celebration' as const
  },
  { 
    dateOffset: -90,
    message: '🚀 Swap exitoso justo antes del pump',
    type: 'celebration' as const
  },
  { 
    dateOffset: -30,
    message: '⚠️ Alta volatilidad ese día - pero mantuviste la calma',
    type: 'warning' as const
  }
];

/**
 * Generate realistic mock transactions
 */
export function generateMockTransactions(count: number = 500): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    // Random date within last 3 years
    const daysAgo = Math.floor(Math.random() * 1095);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

    const type: TransactionType = ['buy', 'sell', 'transfer', 'swap'][Math.floor(Math.random() * 4)] as TransactionType;
    const status: TransactionStatus = Math.random() > 0.95 ? (Math.random() > 0.5 ? 'pending' : 'failed') : 'confirmed';
    
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const amount = parseFloat((Math.random() * 10).toFixed(8));
    const priceInEur = getCryptoPrice(currency);
    const valueInEur = amount * priceInEur;

    // Check if this should have a highlight
    const highlight = highlights.find(h => Math.abs(daysAgo - Math.abs(h.dateOffset)) < 2);

    let transaction: Transaction = {
      id: `tx-${i}-${Date.now()}`,
      date,
      type,
      status,
      amount,
      currency,
      valueInEur,
      network: networks[Math.floor(Math.random() * networks.length)],
    };

    // Type-specific data
    switch (type) {
      case 'buy':
        transaction.wallet = wallets[Math.floor(Math.random() * wallets.length)];
        transaction.exchange = Math.random() > 0.5 ? exchanges[Math.floor(Math.random() * exchanges.length)] : undefined;
        transaction.feeAmount = parseFloat((amount * 0.001).toFixed(8));
        transaction.feeCurrency = 'EUR';
        transaction.feeInEur = transaction.feeAmount;
        transaction.isTaxable = false;
        transaction.tradeGroup = tradeGroups[Math.floor(Math.random() * tradeGroups.length)];
        if (Math.random() > 0.7) {
          transaction.comment = `DCA ${currency} - Compra mensual`;
        }
        break;

      case 'sell':
        transaction.wallet = wallets[Math.floor(Math.random() * wallets.length)];
        transaction.exchange = exchanges[Math.floor(Math.random() * exchanges.length)];
        transaction.feeAmount = parseFloat((amount * 0.001).toFixed(8));
        transaction.feeCurrency = currency;
        transaction.feeInEur = transaction.feeAmount! * priceInEur;
        transaction.isTaxable = true;
        transaction.costBasis = valueInEur * (0.7 + Math.random() * 0.5); // Random cost basis
        transaction.realizedPnL = valueInEur - transaction.costBasis;
        transaction.tradeGroup = tradeGroups[Math.floor(Math.random() * tradeGroups.length)];
        if (Math.random() > 0.8) {
          transaction.comment = `Venta parcial - Toma de beneficios`;
        }
        break;

      case 'transfer':
        transaction.fromWallet = wallets[Math.floor(Math.random() * wallets.length)];
        transaction.toWallet = wallets[Math.floor(Math.random() * wallets.length)];
        transaction.feeAmount = parseFloat((0.0001 + Math.random() * 0.001).toFixed(8));
        transaction.feeCurrency = currency;
        transaction.feeInEur = transaction.feeAmount! * priceInEur;
        transaction.isTaxable = false;
        if (Math.random() > 0.6) {
          transaction.comment = `Transferencia a cold storage`;
        }
        break;

      case 'swap':
        const toCurrency = currencies.filter(c => c !== currency)[Math.floor(Math.random() * (currencies.length - 1))];
        const toAmount = parseFloat((Math.random() * 15).toFixed(8));
        const toPriceInEur = getCryptoPrice(toCurrency);

        transaction.fromCurrency = currency;
        transaction.fromAmount = amount;
        transaction.toCurrency = toCurrency;
        transaction.toAmount = toAmount;
        transaction.valueInEur = toAmount * toPriceInEur;
        transaction.exchange = exchanges[Math.floor(Math.random() * exchanges.length)];
        transaction.feeAmount = parseFloat((amount * 0.003).toFixed(8));
        transaction.feeCurrency = currency;
        transaction.feeInEur = transaction.feeAmount! * priceInEur;
        transaction.isTaxable = true;
        transaction.costBasis = amount * priceInEur;
        transaction.realizedPnL = (toAmount * toPriceInEur) - transaction.costBasis;
        transaction.tradeGroup = tradeGroups[Math.floor(Math.random() * tradeGroups.length)];
        if (Math.random() > 0.7) {
          transaction.comment = `Swap optimizado - Rebalanceo de portfolio`;
        }
        break;
    }

    // Add blockchain data for confirmed transactions
    if (status === 'confirmed') {
      transaction.txHash = generateTxHash();
      transaction.confirmations = 6 + Math.floor(Math.random() * 100);
    }

    // Add tags randomly
    if (Math.random() > 0.7) {
      const tagOptions = ['Important', 'Review', 'Tax Planning', 'Large Trade', 'Auto DCA'];
      const numTags = 1 + Math.floor(Math.random() * 2);
      transaction.tags = [];
      for (let t = 0; t < numTags; t++) {
        const tag = tagOptions[Math.floor(Math.random() * tagOptions.length)];
        if (!transaction.tags.includes(tag)) {
          transaction.tags.push(tag);
        }
      }
    }

    // Add AI highlight if applicable
    if (highlight) {
      transaction.aiHighlight = {
        message: highlight.message,
        type: highlight.type
      };
    }

    transactions.push(transaction);
  }

  // Sort by date descending (most recent first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Get mock price for a cryptocurrency in EUR
 */
function getCryptoPrice(symbol: string): number {
  const prices: Record<string, number> = {
    BTC: 65000,
    ETH: 3500,
    USDT: 0.92,
    BNB: 580,
    SOL: 140,
    MATIC: 0.85,
    AVAX: 35,
    ADA: 0.45,
    DOT: 6.5,
    LINK: 14
  };
  return prices[symbol] || 1;
}

/**
 * Generate a realistic-looking transaction hash
 */
function generateTxHash(): string {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

/**
 * Get the most recent N transactions
 */
export function getRecentTransactions(allTransactions: Transaction[], count: number = 30): Transaction[] {
  return allTransactions.slice(0, count);
}

/**
 * Filter transactions by type
 */
export function filterByType(transactions: Transaction[], type: TransactionType): Transaction[] {
  return transactions.filter(tx => tx.type === type);
}

/**
 * Filter transactions by status
 */
export function filterByStatus(transactions: Transaction[], status: TransactionStatus): Transaction[] {
  return transactions.filter(tx => tx.status === status);
}

/**
 * Filter taxable transactions
 */
export function getTaxableTransactions(transactions: Transaction[]): Transaction[] {
  return transactions.filter(tx => tx.isTaxable === true);
}

/**
 * Get transactions for a specific year
 */
export function getTransactionsByYear(transactions: Transaction[], year: number): Transaction[] {
  return transactions.filter(tx => tx.date.getFullYear() === year);
}

/**
 * Calculate total P&L from transactions
 */
export function calculateTotalPnL(transactions: Transaction[]): {
  realized: number;
  unrealized: number;
  total: number;
} {
  const realized = transactions
    .filter(tx => tx.realizedPnL !== undefined)
    .reduce((sum, tx) => sum + (tx.realizedPnL || 0), 0);

  return {
    realized,
    unrealized: 0, // Would need current holdings to calculate
    total: realized
  };
}
