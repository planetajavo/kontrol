// ============================================================================
// TRANSACTION LIST ITEM - Expandable Transaction with Modern Pastel Colors
// ============================================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  X,
  AlertCircle,
  Calendar,
  Hash,
  Building2,
  Wallet,
  Shield,
  Tag,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ExternalLink,
  Copy
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import InfoTooltip from './shared/InfoTooltip';
import { CryptoIcon } from './CryptoIcon';
import { type Transaction } from '../types';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../utils/clipboard';

interface TransactionListItemProps {
  transaction: Transaction;
  showDetails?: boolean;
  compact?: boolean;
  isVisible?: boolean;
}

export default function TransactionListItem({ 
  transaction, 
  showDetails = true,
  compact = false,
  isVisible = true
}: TransactionListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get type configuration
  const getTypeConfig = (type: Transaction['type']) => {
    switch (type) {
      case 'buy':
        return {
          icon: ArrowDownCircle,
          label: 'Compra',
          description: 'Purchase an asset',
          color: 'text-purple-pastel',
          border: 'border-purple-pastel',
          borderLeft: 'border-l-purple-pastel',
          emoji: '🛒'
        };
      case 'sell':
        return {
          icon: ArrowUpCircle,
          label: 'Venta',
          description: 'Sell an asset',
          color: 'text-pink-pastel',
          border: 'border-pink-pastel',
          borderLeft: 'border-l-pink-pastel',
          emoji: '💰'
        };
      case 'transfer':
        return {
          icon: ArrowRightCircle,
          label: 'Transferencia',
          description: 'Transfer between wallets',
          color: 'text-indigo-pastel',
          border: 'border-indigo-pastel',
          borderLeft: 'border-l-indigo-pastel',
          emoji: '🔄'
        };
      case 'swap':
        return {
          icon: RefreshCw,
          label: 'Swap',
          description: 'Exchange one asset for another',
          color: 'text-teal-pastel',
          border: 'border-teal-pastel',
          borderLeft: 'border-l-teal-pastel',
          emoji: '🔀'
        };
    }
  };

  // Get status configuration
  const getStatusConfig = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: Check,
          label: 'Confirmada',
          color: 'text-success-pastel',
          border: 'border-success-pastel'
        };
      case 'pending':
        return {
          icon: Clock,
          label: 'Pendiente',
          color: 'text-warning-pastel',
          border: 'border-warning-pastel'
        };
      case 'failed':
        return {
          icon: X,
          label: 'Fallida',
          color: 'text-destructive-pastel',
          border: 'border-destructive-pastel'
        };
    }
  };

  const typeConfig = getTypeConfig(transaction.type);
  const statusConfig = getStatusConfig(transaction.status);
  const TypeIcon = typeConfig.icon;
  const StatusIcon = statusConfig.icon;

  const handleCopyToClipboard = async (text: string, label: string) => {
    await copyToClipboard(text, `${label} copiado al portapapeles`);
  };

  const openExplorer = (hash: string) => {
    // Mock - would open blockchain explorer
    toast.info('Abriendo explorador de blockchain...');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        rounded-xl border-l-4 overflow-hidden transition-all
        ${typeConfig.borderLeft} border border-border bg-card/50 backdrop-blur-sm
        ${isExpanded ? 'shadow-lg border-primary/30' : 'hover:shadow-md hover:border-primary/20'}
        ${compact ? 'p-3' : 'p-4'}
        ${!isExpanded ? 'min-h-[88px]' : ''}
      `}
    >
      {/* Main Content - Fixed Height When Collapsed */}
      <div 
        className={`flex items-start gap-3 ${showDetails && !compact ? 'cursor-pointer' : ''} ${!isExpanded ? 'h-[56px]' : ''}`}
        onClick={() => showDetails && !compact && setIsExpanded(!isExpanded)}
      >
        {/* Icon */}
        <div className={`
          ${compact ? 'w-8 h-8' : 'w-10 h-10'} 
          rounded-lg ${typeConfig.border} border-2
          flex items-center justify-center flex-shrink-0
        `}>
          <TypeIcon className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} ${typeConfig.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* AI Highlight */}
          {transaction.aiHighlight && !compact && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 mb-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">
                {transaction.aiHighlight.message}
              </span>
            </motion.div>
          )}

          {/* Type & Status Badges */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="outline" className={`${typeConfig.color} ${typeConfig.border} border-2 flex items-center gap-1.5`}>
              <span>{typeConfig.emoji}</span>
              <span>{typeConfig.label}</span>
            </Badge>
            <Badge variant="outline" className={`${statusConfig.color} ${statusConfig.border} border-2`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig.label}
            </Badge>
            {transaction.isTaxable && (
              <Badge variant="outline" className="text-warning-pastel border-warning-pastel border-2">
                <AlertCircle className="w-3 h-3 mr-1" />
                Declarable
              </Badge>
            )}
          </div>

          {/* Transaction Details */}
          <div className="space-y-1">
            {/* Buy/Sell */}
            {(transaction.type === 'buy' || transaction.type === 'sell') && (
              <div className="flex items-center gap-2">
                <CryptoIcon symbol={transaction.currency} size={16} />
                {isVisible ? (
                  <>
                    <span className="text-foreground font-semibold">
                      {transaction.amount.toFixed(8)} {transaction.currency}
                    </span>
                    {transaction.valueInEur && (
                      <span className="text-muted-foreground text-sm">
                        ≈ €{transaction.valueInEur.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-foreground font-semibold">
                      •••••••• {transaction.currency}
                    </span>
                    <span className="text-muted-foreground text-sm">≈ €••••••</span>
                  </>
                )}
              </div>
            )}

            {/* Swap */}
            {transaction.type === 'swap' && transaction.fromCurrency && transaction.toCurrency && (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <CryptoIcon symbol={transaction.fromCurrency} size={16} />
                  <span className="text-foreground font-semibold">
                    {isVisible ? `${transaction.fromAmount?.toFixed(8)} ${transaction.fromCurrency}` : `•••••••• ${transaction.fromCurrency}`}
                  </span>
                </div>
                <RefreshCw className="w-3 h-3 text-muted-foreground" />
                <div className="flex items-center gap-1.5">
                  <CryptoIcon symbol={transaction.toCurrency} size={16} />
                  <span className="text-foreground font-semibold">
                    {isVisible ? `${transaction.toAmount?.toFixed(8)} ${transaction.toCurrency}` : `•••••••• ${transaction.toCurrency}`}
                  </span>
                </div>
              </div>
            )}

            {/* Transfer */}
            {transaction.type === 'transfer' && (
              <div className="flex items-center gap-2 flex-wrap">
                <CryptoIcon symbol={transaction.currency} size={16} />
                <span className="text-foreground font-semibold">
                  {isVisible ? `${transaction.amount.toFixed(8)} ${transaction.currency}` : `•••••••• ${transaction.currency}`}
                </span>
                {transaction.fromWallet && transaction.toWallet && (
                  <span className="text-muted-foreground text-sm">
                    {transaction.fromWallet} → {transaction.toWallet}
                  </span>
                )}
              </div>
            )}

            {/* Location info */}
            {!compact && (transaction.exchange || transaction.wallet) && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {transaction.exchange && (
                  <>
                    <Building2 className="w-3 h-3" />
                    <span>{transaction.exchange}</span>
                  </>
                )}
                {transaction.wallet && (
                  <>
                    <Wallet className="w-3 h-3" />
                    <span>{transaction.wallet}</span>
                  </>
                )}
              </div>
            )}

            {/* Fee */}
            {transaction.feeAmount && !compact && (
              <div className="text-xs text-muted-foreground">
                Fee: {transaction.feeAmount.toFixed(8)} {transaction.feeCurrency}
                {transaction.feeInEur && ` (€${transaction.feeInEur.toFixed(2)})`}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Date & Expand */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">
              {transaction.date.toLocaleDateString('es-ES', { 
                day: '2-digit', 
                month: 'short',
                year: compact ? undefined : 'numeric'
              })}
            </div>
            {!compact && (
              <div className="text-xs text-muted-foreground">
                {transaction.date.toLocaleTimeString('es-ES', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            )}
          </div>

          {showDetails && !compact && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 rounded-lg hover:bg-accent transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-border space-y-4"
          >
            {/* Transaction Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Transaction Type */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Tag className="w-3 h-3" />
                  <span>Transaction Type</span>
                </div>
                <div className="text-sm text-foreground font-medium">
                  {typeConfig.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {typeConfig.description}
                </div>
              </div>

              {/* Transaction Date */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>Transaction Date</span>
                </div>
                <div className="text-sm text-foreground font-medium">
                  {transaction.date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })} {transaction.date.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Amount</span>
                  <InfoTooltip content="Cantidad de activo en esta transacción" iconSize={10} />
                </div>
                {isVisible ? (
                  <>
                    <div className="text-sm text-foreground font-medium">
                      {transaction.amount.toFixed(8)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Currency: {transaction.currency}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm text-foreground font-medium">••••••••</div>
                    <div className="text-xs text-muted-foreground">
                      Currency: {transaction.currency}
                    </div>
                  </>
                )}
              </div>

              {/* Value in EUR */}
              {transaction.valueInEur && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Value</span>
                  </div>
                  {isVisible ? (
                    <>
                      <div className="text-sm text-foreground font-medium">
                        €{transaction.valueInEur.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        EUR value at transaction time
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-foreground font-medium">€••••••</div>
                      <div className="text-xs text-muted-foreground">
                        EUR value at transaction time
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Transaction Fee */}
              {transaction.feeAmount && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Transaction Fee</span>
                    <Badge variant="outline" className="text-xs">Optional</Badge>
                  </div>
                  {isVisible ? (
                    <>
                      <div className="text-sm text-foreground font-medium">
                        {transaction.feeAmount.toFixed(8)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Currency: {transaction.feeCurrency}
                        {transaction.feeInEur && ` (€${transaction.feeInEur.toFixed(2)})`}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-foreground font-medium">••••••••</div>
                      <div className="text-xs text-muted-foreground">
                        Currency: {transaction.feeCurrency}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Exchange/Wallet */}
              {(transaction.exchange || transaction.wallet) && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {transaction.exchange ? <Building2 className="w-3 h-3" /> : <Wallet className="w-3 h-3" />}
                    <span>{transaction.exchange ? 'Exchange' : 'Wallet'}</span>
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    {transaction.exchange || transaction.wallet}
                  </div>
                </div>
              )}

              {/* Trade Group */}
              {transaction.tradeGroup && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="w-3 h-3" />
                    <span>Trade Group</span>
                    <Badge variant="outline" className="text-xs">Optional</Badge>
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    {transaction.tradeGroup}
                  </div>
                </div>
              )}

              {/* Comment */}
              {transaction.comment && (
                <div className="space-y-1 md:col-span-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MessageSquare className="w-3 h-3" />
                    <span>Comment</span>
                    <Badge variant="outline" className="text-xs">Optional</Badge>
                  </div>
                  <div className="text-sm text-foreground">
                    {transaction.comment}
                  </div>
                </div>
              )}

              {/* Blockchain Data */}
              {transaction.txHash && (
                <div className="space-y-1 md:col-span-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Hash className="w-3 h-3" />
                    <span>Transaction Hash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-foreground bg-muted/50 px-2 py-1 rounded font-mono flex-1 overflow-x-auto">
                      {isVisible ? transaction.txHash : '••••••••••••••••••••••••••••••••'}
                    </code>
                    {isVisible && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyToClipboard(transaction.txHash!, 'Hash')}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openExplorer(transaction.txHash!)}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                  </div>
                  {transaction.confirmations !== undefined && (
                    <div className="text-xs text-muted-foreground">
                      {transaction.confirmations} confirmations
                    </div>
                  )}
                </div>
              )}

              {/* Fiscal Information */}
              {transaction.isTaxable && (
                <div className="md:col-span-2 p-3 rounded-lg border-2 border-warning-pastel">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-warning-pastel flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <div className="text-sm font-medium text-foreground">
                        Impacto Fiscal
                      </div>
                      {transaction.realizedPnL !== undefined && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">P&L Realizada:</span>
                          {isVisible ? (
                            <span className={`text-sm font-semibold ${
                              transaction.realizedPnL >= 0 ? 'text-success-pastel' : 'text-destructive-pastel'
                            }`}>
                              {transaction.realizedPnL >= 0 ? '+' : ''}€{transaction.realizedPnL.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-sm font-semibold text-foreground">€••••••</span>
                          )}
                        </div>
                      )}
                      {transaction.costBasis !== undefined && (
                        <div className="text-xs text-muted-foreground">
                          Cost Basis: €{transaction.costBasis.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            {transaction.tags && transaction.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {transaction.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
