// ============================================================================
// ASSET BALANCE BREAKDOWN - Desglose detallado por activo, wallet y address
// ============================================================================

import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, Copy, ExternalLink, Wallet } from 'lucide-react';
import { useState } from 'react';
import { CryptoIcon } from './CryptoIcon';
import InfoTooltip from './shared/InfoTooltip';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../utils/clipboard';

interface AddressData {
  address: string;
  balance: number;
  percentage: number;
}

interface WalletData {
  wallet: string;
  type: 'hardware' | 'hot' | 'exchange';
  balance: number;
  percentage: number;
  addresses: AddressData[];
}

interface AssetData {
  symbol: string;
  name: string;
  totalBalance: number;
  totalValue: number;
  price: number;
  change24h: number;
  wallets: WalletData[];
}

interface AssetBalanceBreakdownProps {
  isVisible?: boolean;
}

export default function AssetBalanceBreakdown({ isVisible = true }: AssetBalanceBreakdownProps) {
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null);
  const [expandedWallet, setExpandedWallet] = useState<string | null>(null);

  // Mock data
  const assets: AssetData[] = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      totalBalance: 0.7052,
      totalValue: 45820,
      price: 64982,
      change24h: 2.34,
      wallets: [
        {
          wallet: 'Ledger Nano X',
          type: 'hardware',
          balance: 0.5,
          percentage: 70.9,
          addresses: [
            { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', balance: 0.35, percentage: 70 },
            { address: 'bc1qa5wkgaew2dkv56kfvj49j0av5nml45x9ek9hz6', balance: 0.15, percentage: 30 },
          ]
        },
        {
          wallet: 'Binance',
          type: 'exchange',
          balance: 0.2052,
          percentage: 29.1,
          addresses: [
            { address: 'Internal Binance Balance', balance: 0.2052, percentage: 100 },
          ]
        }
      ]
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      totalBalance: 8.234,
      totalValue: 28500,
      price: 3461,
      change24h: 1.82,
      wallets: [
        {
          wallet: 'MetaMask',
          type: 'hot',
          balance: 5.5,
          percentage: 66.8,
          addresses: [
            { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', balance: 5.5, percentage: 100 },
          ]
        },
        {
          wallet: 'Ledger Nano X',
          type: 'hardware',
          balance: 2.734,
          percentage: 33.2,
          addresses: [
            { address: '0x8Ab5E2C6F1b9C4E2D6F9A3B8C5E7F2A4D6B8C9E1', balance: 2.734, percentage: 100 },
          ]
        }
      ]
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      totalBalance: 156.8,
      totalValue: 12300,
      price: 78.44,
      change24h: -0.45,
      wallets: [
        {
          wallet: 'Phantom',
          type: 'hot',
          balance: 156.8,
          percentage: 100,
          addresses: [
            { address: 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK', balance: 156.8, percentage: 100 },
          ]
        }
      ]
    }
  ];

  const handleCopyToClipboard = async (text: string) => {
    await copyToClipboard(text, 'Address copiada al portapapeles');
  };

  const truncateAddress = (address: string) => {
    if (address.length < 20) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getWalletTypeColor = (type: string) => {
    switch (type) {
      case 'hardware':
        return 'text-success';
      case 'hot':
        return 'text-warning';
      case 'exchange':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-card via-card to-primary/5 rounded-xl border border-border shadow-xl overflow-hidden"
    >
      <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-foreground">Balance por Activo</h3>
          <InfoTooltip 
            content="Desglose detallado de cada activo, mostrando en qué wallets y addresses específicas están depositados tus fondos."
            side="right"
          />
        </div>
        <p className="text-muted-foreground text-sm">
          Distribución detallada por wallet y address
        </p>
      </div>

      {/* Assets List */}
      <div className="space-y-3">
        {assets.map((asset, assetIndex) => {
          const isAssetExpanded = expandedAsset === asset.symbol;
          const isPositive = asset.change24h >= 0;

          return (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: assetIndex * 0.1 }}
              className="bg-muted/30 rounded-xl border border-border overflow-hidden"
            >
              {/* Asset Header */}
              <button
                onClick={() => setExpandedAsset(isAssetExpanded ? null : asset.symbol)}
                className="w-full p-4 hover:bg-accent/30 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Expand Icon */}
                  <motion.div
                    animate={{ rotate: isAssetExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>

                  {/* Crypto Icon */}
                  <CryptoIcon symbol={asset.symbol} size={32} />

                  {/* Asset Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-foreground font-semibold">{asset.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {asset.symbol}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">
                        {asset.totalBalance} {asset.symbol}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className={isPositive ? 'text-success' : 'text-destructive'}>
                        {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Total Value */}
                  <div className="text-right">
                    {isVisible ? (
                      <>
                        <div className="text-foreground font-semibold">
                          €{asset.totalValue.toLocaleString('es-ES')}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          @€{asset.price.toLocaleString('es-ES')}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-foreground font-semibold">€••••••</div>
                        <div className="text-muted-foreground text-sm">@€••••••</div>
                      </>
                    )}
                  </div>
                </div>
              </button>

              {/* Asset Details */}
              <AnimatePresence>
                {isAssetExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border overflow-hidden"
                  >
                    <div className="p-4 bg-background/50 space-y-2">
                      {/* Wallets */}
                      {asset.wallets.map((wallet, walletIndex) => {
                        const walletKey = `${asset.symbol}-${wallet.wallet}`;
                        const isWalletExpanded = expandedWallet === walletKey;

                        return (
                          <div key={walletKey} className="bg-muted/50 rounded-lg overflow-hidden">
                            {/* Wallet Header */}
                            <button
                              onClick={() => setExpandedWallet(isWalletExpanded ? null : walletKey)}
                              className="w-full p-3 hover:bg-accent/30 transition-all"
                            >
                              <div className="flex items-center gap-3">
                                {/* Expand Icon */}
                                <motion.div
                                  animate={{ rotate: isWalletExpanded ? 90 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </motion.div>

                                {/* Wallet Icon */}
                                <Wallet className={`w-4 h-4 ${getWalletTypeColor(wallet.type)}`} />

                                {/* Wallet Info */}
                                <div className="flex-1 text-left">
                                  <div className="text-foreground text-sm font-semibold">
                                    {wallet.wallet}
                                  </div>
                                  {isVisible ? (
                                    <div className="text-muted-foreground text-xs">
                                      {wallet.balance} {asset.symbol}
                                    </div>
                                  ) : (
                                    <div className="text-muted-foreground text-xs">••••• {asset.symbol}</div>
                                  )}
                                </div>

                                {/* Percentage */}
                                <Badge variant="secondary" className="text-xs">
                                  {wallet.percentage.toFixed(1)}%
                                </Badge>
                              </div>
                            </button>

                            {/* Addresses */}
                            <AnimatePresence>
                              {isWalletExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="border-t border-border/50 overflow-hidden"
                                >
                                  <div className="p-3 bg-background/30 space-y-2">
                                    {wallet.addresses.map((addr, addrIndex) => (
                                      <div
                                        key={addrIndex}
                                        className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg group"
                                      >
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <code className="text-xs text-foreground font-mono truncate">
                                              {isVisible ? truncateAddress(addr.address) : '••••••••••••••••'}
                                            </code>
                                            {isVisible && (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleCopyToClipboard(addr.address);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                              >
                                                <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                                              </button>
                                            )}
                                          </div>
                                          {isVisible ? (
                                            <div className="text-xs text-muted-foreground">
                                              {addr.balance} {asset.symbol} ({addr.percentage.toFixed(1)}%)
                                            </div>
                                          ) : (
                                            <div className="text-xs text-muted-foreground">
                                              ••••• {asset.symbol} (•••%)
                                            </div>
                                          )}
                                        </div>
                                        
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toast.info('Abriendo explorador de bloques...');
                                          }}
                                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                        >
                                          <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-primary" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      </div>
    </motion.div>
  );
}
