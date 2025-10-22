import { useState } from 'react';
import { Copy, Edit3, ChevronDown, ChevronUp, Wallet, Building2, RefreshCw, Key, Settings, ExternalLink, Shield, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Button } from './ui/button';
import EditWalletModal from './EditWalletModal';
import { Badge } from './ui/badge';
import CollapsibleSection from './CollapsibleSection';
import WalletIconPicker from './WalletIconPicker';
import NetworkBadge from './NetworkBadge';
import { CryptoIcon } from './CryptoIcon';
import { SmartIcon } from './SmartIcon';
import { ExchangeIcon } from './ExchangeIcon';
import PortfolioBalanceChart from './PortfolioBalanceChart';
import { copyToClipboard } from '../utils/clipboard';

// Mock data para wallets con iconos customizables y tokens con red
const walletsDataInitial = [
  {
    id: '1',
    name: 'Principal Trading',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5',
    network: 'Ethereum',
    customIcon: '💼',
    walletType: 'hot' as 'hot' | 'hardware' | 'paper',
    balance: 45678.90,
    tokens: [
      { symbol: 'ETH', name: 'Ethereum', amount: 12.45, valueEur: 28945.50, priceEur: 2325.50, network: 'ethereum' },
      { symbol: 'USDT', name: 'Tether', amount: 15000, valueEur: 15000, priceEur: 1, network: 'ethereum' },
      { symbol: 'UNI', name: 'Uniswap', amount: 250, valueEur: 1733.40, priceEur: 6.93, network: 'ethereum' },
    ]
  },
  {
    id: '2',
    name: 'Cold Storage',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    network: 'Bitcoin',
    customIcon: '🏦',
    walletType: 'hardware' as 'hot' | 'hardware' | 'paper',
    balance: 87234.12,
    tokens: [
      { symbol: 'BTC', name: 'Bitcoin', amount: 1.34, valueEur: 87234.12, priceEur: 65099.34, network: 'bitcoin' },
    ]
  },
  {
    id: '3',
    name: 'DeFi Wallet',
    address: '0x8f5a9c7d2e1b6f4a3d9c8e7b6a5f4d3c2b1a9e8d',
    network: 'BSC',
    customIcon: '🚀',
    walletType: 'hot' as 'hot' | 'hardware' | 'paper',
    balance: 12456.78,
    tokens: [
      { symbol: 'BNB', name: 'Binance Coin', amount: 28.5, valueEur: 9120.00, priceEur: 320, network: 'bsc' },
      { symbol: 'CAKE', name: 'PancakeSwap', amount: 1500, valueEur: 3336.78, priceEur: 2.22, network: 'bsc' },
    ]
  },
  {
    id: '4',
    name: 'Multi-Chain',
    address: '0x9e2f8a3c1b7d6e5f4a8c7b6e5d4c3b2a1f9e8d7c',
    network: 'Multi-Chain',
    customIcon: '🌈',
    walletType: 'hot' as 'hot' | 'hardware' | 'paper',
    balance: 23567.45,
    tokens: [
      { symbol: 'USDC', name: 'USD Coin', amount: 5000, valueEur: 5000, priceEur: 1, network: 'ethereum' },
      { symbol: 'USDT', name: 'Tether', amount: 3000, valueEur: 3000, priceEur: 1, network: 'arbitrum' },
      { symbol: 'sUSDe', name: 'Staked USDe', amount: 8500, valueEur: 8567.45, priceEur: 1.008, network: 'plasma' },
      { symbol: 'MATIC', name: 'Polygon', amount: 10000, valueEur: 7000, priceEur: 0.70, network: 'polygon' },
    ]
  },
  {
    id: '5',
    name: 'NFT Collection',
    address: 'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK',
    network: 'Solana',
    customIcon: '🎨',
    walletType: 'paper' as 'hot' | 'hardware' | 'paper',
    balance: 8945.23,
    tokens: [
      { symbol: 'SOL', name: 'Solana', amount: 89.5, valueEur: 8945.23, priceEur: 99.95, network: 'solana' },
    ]
  },
  {
    id: '6',
    name: 'Posiciones DeFi',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    network: 'Ethereum',
    customIcon: '🌊',
    walletType: 'hot' as 'hot' | 'hardware' | 'paper',
    balance: 42890.67,
    tokens: [
      { symbol: 'UNI-V2-ETH/USDC', name: 'Uniswap V2 ETH/USDC LP', amount: 1.25, valueEur: 18456.23, priceEur: 14765.00, network: 'ethereum', type: 'LP' },
      { symbol: 'SUSHI-ETH/DAI', name: 'SushiSwap ETH/DAI LP', amount: 0.85, valueEur: 12234.11, priceEur: 14393.00, network: 'ethereum', type: 'LP' },
      { symbol: 'CAKE-BNB/BUSD', name: 'PancakeSwap BNB/BUSD LP', amount: 3.5, valueEur: 8945.78, priceEur: 2556.00, network: 'bsc', type: 'LP' },
      { symbol: 'AAVE', name: 'Aave', amount: 15.2, valueEur: 2154.55, priceEur: 141.75, network: 'ethereum' },
      { symbol: 'CRV', name: 'Curve DAO', amount: 850, valueEur: 1100.00, priceEur: 1.29, network: 'ethereum' },
    ]
  },
];

const exchangesDataInitial = [
  {
    id: '1',
    name: 'Binance',
    customIcon: '🟡',
    balance: 34567.89,
    apiKeyStatus: 'connected' as 'connected' | 'expired' | 'none',
    permissions: ['Read', 'Trade'],
    lastSync: new Date(),
    tokens: [
      { symbol: 'BTC', name: 'Bitcoin', amount: 0.25, valueEur: 16274.84, priceEur: 65099.34, network: 'bitcoin' },
      { symbol: 'ETH', name: 'Ethereum', amount: 5.5, valueEur: 12790.25, priceEur: 2325.50, network: 'ethereum' },
      { symbol: 'BNB', name: 'Binance Coin', amount: 12.3, valueEur: 3936.00, priceEur: 320, network: 'bsc' },
      { symbol: 'USDT', name: 'Tether', amount: 1566.80, valueEur: 1566.80, priceEur: 1, network: 'ethereum' },
    ]
  },
  {
    id: '2',
    name: 'Coinbase',
    customIcon: '🔵',
    balance: 23456.78,
    apiKeyStatus: 'connected' as 'connected' | 'expired' | 'none',
    permissions: ['Read'],
    lastSync: new Date(Date.now() - 3600000), // 1 hour ago
    tokens: [
      { symbol: 'BTC', name: 'Bitcoin', amount: 0.15, valueEur: 9764.90, priceEur: 65099.34, network: 'bitcoin' },
      { symbol: 'ETH', name: 'Ethereum', amount: 4.2, valueEur: 9767.10, priceEur: 2325.50, network: 'ethereum' },
      { symbol: 'SOL', name: 'Solana', amount: 38.5, valueEur: 3848.08, priceEur: 99.95, network: 'solana' },
      { symbol: 'USDC', name: 'USD Coin', amount: 76.70, valueEur: 76.70, priceEur: 1, network: 'ethereum' },
    ]
  },
  {
    id: '3',
    name: 'Kraken',
    customIcon: '🟣',
    balance: 18923.45,
    apiKeyStatus: 'expired' as 'connected' | 'expired' | 'none',
    permissions: ['Read'],
    lastSync: new Date(Date.now() - 86400000 * 3), // 3 days ago
    tokens: [
      { symbol: 'BTC', name: 'Bitcoin', amount: 0.12, valueEur: 7811.92, priceEur: 65099.34, network: 'bitcoin' },
      { symbol: 'ETH', name: 'Ethereum', amount: 3.8, valueEur: 8836.90, priceEur: 2325.50, network: 'ethereum' },
      { symbol: 'DOT', name: 'Polkadot', amount: 450, valueEur: 2274.63, priceEur: 5.055, network: 'polkadot' },
    ]
  },
];

export default function AssetsSection() {
  const [walletsData, setWalletsData] = useState(walletsDataInitial);
  const [exchangesData, setExchangesData] = useState(exchangesDataInitial);
  const [editingWallet, setEditingWallet] = useState<{ name: string; address: string } | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [collapsedWallets, setCollapsedWallets] = useState<Set<string>>(new Set());
  const [expandedExchange, setExpandedExchange] = useState<string | null>(null);
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);

  const walletsBalance = walletsData.reduce((sum, wallet) => sum + wallet.balance, 0);
  const exchangesBalance = exchangesData.reduce((sum, exchange) => sum + exchange.balance, 0);
  const totalBalance = walletsBalance + exchangesBalance;

  const toggleWallet = (walletId: string) => {
    setCollapsedWallets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(walletId)) {
        newSet.delete(walletId);
      } else {
        newSet.add(walletId);
      }
      return newSet;
    });
  };

  const getWalletTypeBadge = (type: 'hot' | 'hardware' | 'paper') => {
    switch (type) {
      case 'hot':
        return { label: 'Hot Wallet', className: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' };
      case 'hardware':
        return { label: 'Hardware', className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' };
      case 'paper':
        return { label: 'Paper Wallet', className: 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700' };
    }
  };

  const getPermissionBadge = (permission: string) => {
    const colors: Record<string, string> = {
      'Read': 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      'Trade': 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      'Withdraw': 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    };
    return colors[permission] || 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700';
  };

  const handleCopyAddress = async (address: string) => {
    const success = await copyToClipboard(address, 'Dirección copiada al portapapeles');
    if (success) {
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    }
  };

  const handleUpdateWalletIcon = (walletId: string, newIcon: string) => {
    setWalletsData(prev => 
      prev.map(w => w.id === walletId ? { ...w, customIcon: newIcon } : w)
    );
  };

  const handleUpdateExchangeIcon = (exchangeId: string, newIcon: string) => {
    setExchangesData(prev => 
      prev.map(e => e.id === exchangeId ? { ...e, customIcon: newIcon } : e)
    );
  };

  const handleCollapseAll = () => {
    setAllCollapsed(!allCollapsed);
    setCollapseKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-foreground">Assets</h1>
        <p className="text-muted-foreground">Añade todas tus billeteras y exchanges</p>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 md:py-4 border-b border-border">
        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleCollapseAll}
          >
            {allCollapsed ? (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="hidden sm:inline">Expandir todo</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="hidden sm:inline">Contraer todo</span>
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Añadir Wallet</span>
            <span className="sm:hidden">Wallet</span>
          </Button>

          <Button size="sm" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Añadir Exchange</span>
            <span className="sm:hidden">Exchange</span>
          </Button>
        </div>
      </div>

      {/* Wallets List */}
      <CollapsibleSection
        key={`wallets-${collapseKey}`}
        title="Tus Wallets"
        description={`${walletsData.length} wallets conectadas · €${walletsBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`}
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-primary/10 text-primary">{walletsData.length}</Badge>}
      >
        <div className="space-y-2">
          {walletsData.map((wallet) => {
            const isCollapsed = collapsedWallets.has(wallet.id);
            
            return (
              <div
                key={wallet.id}
                className="bg-card rounded-xl border border-border hover:shadow-md transition-all overflow-hidden"
              >
                {/* Wallet Row Header */}
                <div className="flex items-center justify-between p-4 gap-4">
                  {/* Left: Icon + Name + Network */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <WalletIconPicker
                      currentIcon={wallet.customIcon}
                      onSelectIcon={(icon) => handleUpdateWalletIcon(wallet.id, icon)}
                    >
                      <button className="w-12 h-12 rounded-lg bg-muted hover:bg-muted/70 flex items-center justify-center flex-shrink-0 transition-colors">
                        <SmartIcon icon={wallet.customIcon} size={28} />
                      </button>
                    </WalletIconPicker>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-foreground font-bold text-lg truncate">{wallet.name}</span>
                        <Badge variant="outline" className={`text-xs ${getWalletTypeBadge(wallet.walletType).className}`}>
                          {getWalletTypeBadge(wallet.walletType).label}
                        </Badge>
                        <button
                          onClick={() => setEditingWallet({ name: wallet.name, address: wallet.address })}
                          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground truncate font-mono">{wallet.address}</div>
                        <button
                          onClick={() => handleCopyAddress(wallet.address)}
                          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                          title="Copiar dirección"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Balance + Collapse Toggle */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-foreground font-semibold">€{wallet.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
                      <div className="text-xs text-muted-foreground">{wallet.tokens.length} activos</div>
                    </div>
                    <button
                      onClick={() => toggleWallet(wallet.id)}
                      className="text-muted-foreground hover:text-foreground transition-all"
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Tokens List - Collapsible */}
                {!isCollapsed && (
                  <div className="border-t border-border bg-muted/30">
                    {wallet.tokens.map((token, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between px-4 py-3 gap-3 ${
                          idx !== wallet.tokens.length - 1 ? 'border-b border-border/50' : ''
                        }`}
                      >
                        {/* Token Info */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex-shrink-0">
                            <CryptoIcon symbol={token.symbol.toLowerCase()} size={24} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-medium truncate">{token.symbol}</span>
                              <NetworkBadge network={token.network} size="sm" />
                              {(token as any).type === 'LP' && (
                                <Badge variant="outline" className="text-teal-pastel border-teal-pastel border-2">
                                  🌊 LP
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">{token.name}</div>
                          </div>
                        </div>

                        {/* Amount + Value */}
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-medium">{token.amount.toLocaleString('es-ES', { maximumFractionDigits: 4 })} {token.symbol}</div>
                          <div className="text-xs text-muted-foreground">€{token.valueEur.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Exchanges List */}
      <CollapsibleSection
        key={`exchanges-${collapseKey}`}
        title="Tus Exchanges"
        description={`${exchangesData.length} exchanges conectados · €${exchangesBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`}
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-primary/10 text-primary">{exchangesData.length}</Badge>}
      >
        <div className="space-y-2">
          {exchangesData.map((exchange) => {
            const isExpanded = expandedExchange === exchange.id;
            const timeSinceSync = Date.now() - exchange.lastSync.getTime();
            const hoursSinceSync = Math.floor(timeSinceSync / (1000 * 60 * 60));
            
            return (
              <div
                key={exchange.id}
                className="bg-card rounded-xl border border-border hover:shadow-md transition-all overflow-hidden"
              >
                {/* Exchange Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                        <ExchangeIcon exchange={exchange.name.toLowerCase()} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-foreground font-bold text-lg">{exchange.name}</span>
                          {exchange.apiKeyStatus === 'connected' && (
                            <Badge variant="outline" className="bg-success-pastel/10 text-success-pastel border-success-pastel/30">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Conectado
                            </Badge>
                          )}
                          {exchange.apiKeyStatus === 'expired' && (
                            <Badge variant="outline" className="bg-warning-pastel/10 text-warning-pastel border-warning-pastel/30">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Expirado
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Última sync: {hoursSinceSync < 1 ? 'hace menos de 1h' : `hace ${hoursSinceSync}h`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-foreground font-semibold">€{exchange.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
                        <div className="text-xs text-muted-foreground">{exchange.tokens.length} activos</div>
                      </div>
                      <button
                        onClick={() => setExpandedExchange(isExpanded ? null : exchange.id)}
                        className="text-muted-foreground hover:text-foreground transition-all"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-muted-foreground">Permisos:</span>
                    {exchange.permissions.map((perm, idx) => (
                      <Badge key={idx} variant="outline" className={`text-xs ${getPermissionBadge(perm)}`}>
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tokens List - Expandable */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/30">
                    {exchange.tokens.map((token, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between px-4 py-3 gap-3 ${
                          idx !== exchange.tokens.length - 1 ? 'border-b border-border/50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="flex-shrink-0">
                            <CryptoIcon symbol={token.symbol.toLowerCase()} size={24} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-medium truncate">{token.symbol}</span>
                              <NetworkBadge network={token.network} size="sm" />
                            </div>
                            <div className="text-xs text-muted-foreground truncate">{token.name}</div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-medium">{token.amount.toLocaleString('es-ES', { maximumFractionDigits: 4 })} {token.symbol}</div>
                          <div className="text-xs text-muted-foreground">€{token.valueEur.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* API Keys Help Section */}
      <CollapsibleSection
        key={`help-${collapseKey}`}
        title="Cómo obtener API Keys"
        description="Guía paso a paso para conectar tus exchanges"
        defaultOpen={false}
        badge={<Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"><Info className="w-3 h-3 mr-1" />Ayuda</Badge>}
      >
        <div className="space-y-4">
          {/* Binance */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-2xl flex-shrink-0">
                🟡
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Binance</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Conecta tu cuenta de Binance de forma segura usando API Keys con permisos de solo lectura.
                </p>
                <ol className="text-sm space-y-2 ml-4 list-decimal text-muted-foreground">
                  <li>Inicia sesión en Binance y ve a <strong>Account → API Management</strong></li>
                  <li>Haz clic en <strong>Create API</strong> y elige <strong>System Generated</strong></li>
                  <li>Dale un nombre descriptivo (ej: "Kontrol Read-Only")</li>
                  <li>Completa la verificación 2FA</li>
                  <li>En permisos, activa solo <strong>Enable Reading</strong></li>
                  <li>Copia tu API Key y Secret Key</li>
                  <li>Opcional: Añade restricción de IP para mayor seguridad</li>
                </ol>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <ExternalLink className="w-4 h-4" />
              Abrir Binance API Management
            </Button>
          </div>

          {/* Coinbase */}
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">
                🔵
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Coinbase</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Utiliza Coinbase API para sincronizar tu portfolio de forma segura.
                </p>
                <ol className="text-sm space-y-2 ml-4 list-decimal text-muted-foreground">
                  <li>Ve a <strong>Settings → API</strong> en Coinbase</li>
                  <li>Haz clic en <strong>New API Key</strong></li>
                  <li>En permisos, selecciona solo <strong>wallet:accounts:read</strong></li>
                  <li>No actives permisos de trading o withdrawal</li>
                  <li>Completa la verificación 2FA</li>
                  <li>Guarda tu API Key de forma segura</li>
                </ol>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <ExternalLink className="w-4 h-4" />
              Abrir Coinbase API Settings
            </Button>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-yellow-700 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-300 mb-1">Recomendaciones de Seguridad</h4>
                <ul className="text-sm text-yellow-800 dark:text-yellow-400 space-y-1 list-disc ml-4">
                  <li>Siempre usa permisos de <strong>solo lectura (Read-Only)</strong> cuando sea posible</li>
                  <li>Nunca habilites permisos de <strong>Withdrawal</strong> a menos que sea absolutamente necesario</li>
                  <li>Utiliza <strong>restricciones de IP</strong> cuando tu exchange lo permita</li>
                  <li>Guarda tus API Keys de forma segura y nunca las compartas</li>
                  <li>Revoca y regenera tus API Keys periódicamente</li>
                  <li>Habilita siempre la <strong>autenticación de dos factores (2FA)</strong> en tu exchange</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Edit Wallet Modal */}
      {editingWallet && (
        <EditWalletModal
          isOpen={!!editingWallet}
          onClose={() => setEditingWallet(null)}
          wallet={editingWallet}
        />
      )}

      {/* Copied notification */}
      {copiedAddress && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-lg shadow-lg z-50">
          ¡Dirección copiada!
        </div>
      )}
    </div>
  );
}
