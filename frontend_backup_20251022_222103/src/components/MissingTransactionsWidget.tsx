// ============================================================================
// MISSING TRANSACTIONS WIDGET - Transacciones sin matchear con IA
// ============================================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  AlertCircle,
  Copy,
  ExternalLink,
  Filter,
  ArrowRight,
  Search
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { copyToClipboard } from '../utils/clipboard';
import CryptoIcon from './CryptoIcon';
import ExchangeIcon from './ExchangeIcon';
import IdentifyAddressModal from './IdentifyAddressModal';

// ============================================================================
// TYPES
// ============================================================================

interface MatchingCriteria {
  id: string;
  name: string;
  type: 'address' | 'amount' | 'time' | 'exchange';
  value: string;
  color: string;
}

interface MissingTransaction {
  id: string;
  hash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  currency: string;
  type: 'send' | 'receive' | 'transfer' | 'manual';
  timestamp: Date;
  exchange?: string;
  network: string;
  status: 'unmatched' | 'searching' | 'found';
  fromIdentified?: boolean;
  toIdentified?: boolean;
  isCSVImport?: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const INITIAL_CRITERIA: MatchingCriteria[] = [
  {
    id: '1',
    name: 'Direcciones conocidas',
    type: 'address',
    value: '15 addresses',
    color: 'bg-info-pastel/20 text-info-pastel border-info-pastel/30'
  },
  {
    id: '2',
    name: 'Exchanges CEX',
    type: 'exchange',
    value: 'Binance, Coinbase, Kraken',
    color: 'bg-warning-pastel/20 text-warning-pastel border-warning-pastel/30'
  },
  {
    id: '3',
    name: 'Montos > €1000',
    type: 'amount',
    value: '€1,000+',
    color: 'bg-success-pastel/20 text-success-pastel border-success-pastel/30'
  }
];

const MISSING_TRANSACTIONS: MissingTransaction[] = [
  {
    id: '1',
    hash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    fromAddress: '0x8a90F2bEb03693eA5d0F3d4C7aB33e8C925b5F2d',
    toAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    amount: 2.5,
    currency: 'ETH',
    type: 'transfer',
    timestamp: new Date('2025-10-15T14:30:00'),
    network: 'Ethereum',
    status: 'unmatched',
    fromIdentified: false,
    toIdentified: false
  },
  {
    id: '2',
    hash: '0xa8d5b2f1e3c4d7a9b6f8e2d1c5a7b9f3e1d4c8a6b2f5e7d9c1a3b6f8e2d4c7a9',
    fromAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    toAddress: 'Binance Exchange',
    amount: 0.15,
    currency: 'BTC',
    type: 'send',
    timestamp: new Date('2025-10-14T09:15:00'),
    exchange: 'Binance',
    network: 'Bitcoin',
    status: 'unmatched',
    fromIdentified: false,
    toIdentified: true
  },
  {
    id: '3',
    hash: '0xb3c7d9e1f5a8b2c6d4e9f1a7c3b8d2e6f9a5c1d7b4e8f2a6c9d3e7b1f5a8c4d2',
    fromAddress: 'Coinbase Pro',
    toAddress: '0x8a90F2bEb03693eA5d0F3d4C7aB33e8C925b5F2d',
    amount: 1500,
    currency: 'USDT',
    type: 'receive',
    timestamp: new Date('2025-10-13T16:45:00'),
    network: 'Ethereum',
    status: 'unmatched',
    fromIdentified: true,
    toIdentified: false
  },
  {
    id: '4',
    hash: '0xc2d8e4f6a9b3c7d1e5f8a2b6c9d4e7f1a5b8c2d6e9f3a7b1c5d8e2f6a9c3d7e1',
    fromAddress: '0x5F8aD12E3b9e7C2d8F4a1B6c9D3e7A2b5C8f1E4d',
    toAddress: 'Kraken Exchange',
    amount: 250,
    currency: 'DOGE',
    type: 'send',
    timestamp: new Date('2025-10-12T11:20:00'),
    exchange: 'Kraken',
    network: 'Dogecoin',
    status: 'unmatched',
    fromIdentified: false,
    toIdentified: true
  },
  {
    id: '5',
    hash: 'manual-entry-001',
    fromAddress: '0x9B7d8F3E2a1C4b6D8e5F9a2C7b4D6e8F1a3C5b7D',
    toAddress: '0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B',
    amount: 0.5,
    currency: 'BNB',
    type: 'manual',
    timestamp: new Date('2025-10-11T18:00:00'),
    network: 'BSC',
    status: 'unmatched',
    fromIdentified: false,
    toIdentified: false,
    isCSVImport: false
  },
  {
    id: '6',
    hash: 'csv-import-batch-42',
    fromAddress: 'MetaMask Wallet',
    toAddress: 'Trust Wallet',
    amount: 1000,
    currency: 'USDC',
    type: 'manual',
    timestamp: new Date('2025-10-10T12:30:00'),
    network: 'Polygon',
    status: 'unmatched',
    fromIdentified: false,
    toIdentified: false,
    isCSVImport: true
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MissingTransactionsWidget() {
  const [criteria, setCriteria] = useState<MatchingCriteria[]>(INITIAL_CRITERIA);
  const [transactions, setTransactions] = useState<MissingTransaction[]>(MISSING_TRANSACTIONS);
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [showAddCriteria, setShowAddCriteria] = useState(false);
  const [newCriteriaName, setNewCriteriaName] = useState('');
  const [searchingTx, setSearchingTx] = useState<string | null>(null);
  const [identifyModalOpen, setIdentifyModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{ address: string; txId: string; field: 'from' | 'to' } | null>(null);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleAddCriteria = () => {
    if (!newCriteriaName.trim()) {
      toast.error('El nombre del criterio no puede estar vacío');
      return;
    }

    const newCriteria: MatchingCriteria = {
      id: Date.now().toString(),
      name: newCriteriaName,
      type: 'address',
      value: 'Nuevo criterio',
      color: 'bg-primary/20 text-primary border-primary/30'
    };

    setCriteria([...criteria, newCriteria]);
    setNewCriteriaName('');
    setShowAddCriteria(false);
    toast.success('Criterio añadido correctamente');
  };

  const handleRemoveCriteria = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
    toast.success('Criterio eliminado');
  };

  const handleToggleExpand = (id: string) => {
    setExpandedTx(expandedTx === id ? null : id);
  };

  const handleCopyAddress = async (address: string) => {
    await copyToClipboard(address, 'Dirección copiada al portapapeles');
  };

  const handleAISearch = async (tx: MissingTransaction) => {
    setSearchingTx(tx.id);
    
    // Simulate AI search
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update transaction status
    setTransactions(transactions.map(t => 
      t.id === tx.id 
        ? { ...t, status: 'found' as const }
        : t
    ));
    
    setSearchingTx(null);
    toast.success('IA encontró información de la transacción', {
      description: `Se identificó como transferencia desde ${tx.exchange || 'wallet externa'}`
    });
  };

  const handleIdentifyAddress = (address: string, txId: string, field: 'from' | 'to') => {
    setSelectedAddress({ address, txId, field });
    setIdentifyModalOpen(true);
  };

  const handleAddressIdentified = (platform: string, fileName: string) => {
    if (!selectedAddress) return;

    setTransactions(transactions.map(tx => {
      if (tx.id === selectedAddress.txId) {
        if (selectedAddress.field === 'from') {
          return { ...tx, fromIdentified: true };
        } else {
          return { ...tx, toIdentified: true };
        }
      }
      return tx;
    }));

    toast.success('Dirección identificada', {
      description: `Importado desde ${platform}`
    });
  };

  const getTypeInfo = (type: MissingTransaction['type'], isCSVImport?: boolean) => {
    switch (type) {
      case 'send':
        return { 
          label: 'Envío', 
          color: 'text-purple-pastel', 
          borderColor: 'border-purple-pastel',
          icon: '📤'
        };
      case 'receive':
        return { 
          label: 'Recepción', 
          color: 'text-cyan-pastel', 
          borderColor: 'border-cyan-pastel',
          icon: '📥'
        };
      case 'transfer':
        return { 
          label: 'Transferencia', 
          color: 'text-indigo-pastel', 
          borderColor: 'border-indigo-pastel',
          icon: '🔄'
        };
      case 'manual':
        return { 
          label: isCSVImport ? 'Manual (CSV)' : 'Manual', 
          color: 'text-pink-pastel', 
          borderColor: 'border-pink-pastel',
          icon: isCSVImport ? '📋' : '✏️'
        };
    }
  };

  const getStatusBadge = (status: MissingTransaction['status']) => {
    switch (status) {
      case 'unmatched':
        return <Badge variant="outline" className="bg-warning-pastel/10 text-warning-pastel border-warning-pastel/30">Sin matchear</Badge>;
      case 'searching':
        return <Badge variant="outline" className="bg-info-pastel/10 text-info-pastel border-info-pastel/30">Buscando...</Badge>;
      case 'found':
        return <Badge variant="outline" className="bg-success-pastel/10 text-success-pastel border-success-pastel/30">Encontrado</Badge>;
    }
  };

  const truncateAddress = (address: string) => {
    if (address.length < 20) return address;
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Matching Criteria Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Criterios de Matching</h3>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddCriteria(!showAddCriteria)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Añadir criterio
          </Button>
        </div>

        {/* Add Criteria Form */}
        <AnimatePresence>
          {showAddCriteria && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nombre del criterio..."
                    value={newCriteriaName}
                    onChange={(e) => setNewCriteriaName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCriteria()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddCriteria} size="sm">
                    Añadir
                  </Button>
                  <Button 
                    onClick={() => {
                      setShowAddCriteria(false);
                      setNewCriteriaName('');
                    }} 
                    size="sm" 
                    variant="ghost"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Criteria List */}
        <div className="flex flex-wrap gap-2">
          {criteria.map((criterion) => (
            <motion.div
              key={criterion.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant="outline"
                className={`${criterion.color} px-3 py-2 flex items-center gap-2`}
              >
                <span className="text-sm">{criterion.name}</span>
                <span className="text-xs opacity-70">({criterion.value})</span>
                <button
                  onClick={() => handleRemoveCriteria(criterion.id)}
                  className="ml-1 hover:bg-background/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            </motion.div>
          ))}
          {criteria.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No hay criterios de matching configurados
            </p>
          )}
        </div>
      </div>

      {/* Missing Transactions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-warning-pastel" />
            <h3 className="text-foreground">Transacciones sin matchear</h3>
            <Badge variant="outline" className="bg-warning-pastel/10 text-warning-pastel border-warning-pastel/30">
              {transactions.filter(t => t.status === 'unmatched').length}
            </Badge>
          </div>
        </div>

        {/* Transactions */}
        <div className="space-y-2">
          {transactions.map((tx) => {
            const isExpanded = expandedTx === tx.id;
            const typeInfo = getTypeInfo(tx.type, tx.isCSVImport);

            return (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all overflow-hidden cursor-pointer"
                  onClick={() => handleToggleExpand(tx.id)}
                >
                  {/* Transaction Header - CLICKABLE */}
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      {/* Left: Icon + Info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Crypto Icon */}
                        <div className="flex-shrink-0">
                          {tx.exchange ? (
                            <ExchangeIcon exchange={tx.exchange} size="md" />
                          ) : (
                            <CryptoIcon symbol={tx.currency} size="md" />
                          )}
                        </div>

                        {/* Transaction Summary */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="outline" className={`${typeInfo.color} ${typeInfo.borderColor} border-2 flex items-center gap-1.5`}>
                              <span>{typeInfo.icon}</span>
                              <span>{typeInfo.label}</span>
                            </Badge>
                            <span className="font-medium text-foreground">
                              {tx.amount} {tx.currency}
                            </span>
                            {getStatusBadge(tx.status)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{truncateAddress(tx.fromAddress)}</span>
                            <ArrowRight className="w-3 h-3" />
                            <span>{truncateAddress(tx.toAddress)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* AI Search Button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAISearch(tx);
                          }}
                          disabled={searchingTx === tx.id || tx.status === 'found'}
                          className="gap-2 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 hover:border-primary/50"
                        >
                          <Sparkles className={`w-4 h-4 ${searchingTx === tx.id ? 'animate-spin' : ''}`} />
                          <span className="hidden sm:inline">
                            {searchingTx === tx.id ? 'Buscando...' : 'IA'}
                          </span>
                        </Button>

                        {/* Expand Indicator */}
                        <div className="text-muted-foreground">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-4 pb-4 pt-0 border-t border-border/50">
                          <div className="mt-4 space-y-4">
                            {/* From/To Addresses Section */}
                            <div className="grid grid-cols-1 gap-4">
                              {/* FROM Address */}
                              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground font-medium">Desde (From)</span>
                                  {tx.fromIdentified ? (
                                    <Badge variant="outline" className="bg-success-pastel/10 text-success-pastel border-success-pastel/30 text-xs">
                                      ✓ Identificado
                                    </Badge>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleIdentifyAddress(tx.fromAddress, tx.id, 'from')}
                                      className="gap-2 h-7 text-xs bg-primary/10 border-primary/30 hover:bg-primary/20"
                                    >
                                      <Search className="w-3 h-3" />
                                      Identify Address
                                    </Button>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <code className="text-xs bg-background/50 px-3 py-2 rounded flex-1 break-all text-foreground font-mono">
                                    {tx.fromAddress}
                                  </code>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleCopyAddress(tx.fromAddress)}
                                    className="flex-shrink-0"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>

                              {/* TO Address */}
                              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground font-medium">Hacia (To)</span>
                                  {tx.toIdentified ? (
                                    <Badge variant="outline" className="bg-success-pastel/10 text-success-pastel border-success-pastel/30 text-xs">
                                      ✓ Identificado
                                    </Badge>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleIdentifyAddress(tx.toAddress, tx.id, 'to')}
                                      className="gap-2 h-7 text-xs bg-primary/10 border-primary/30 hover:bg-primary/20"
                                    >
                                      <Search className="w-3 h-3" />
                                      Identify Address
                                    </Button>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <code className="text-xs bg-background/50 px-3 py-2 rounded flex-1 break-all text-foreground font-mono">
                                    {tx.toAddress}
                                  </code>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleCopyAddress(tx.toAddress)}
                                    className="flex-shrink-0"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Transaction Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2">
                              <div>
                                <span className="text-muted-foreground">Hash:</span>
                                <div className="flex items-center gap-2 mt-1">
                                  <code className="text-xs bg-muted/50 px-2 py-1 rounded truncate block">
                                    {tx.hash.slice(0, 20)}...
                                  </code>
                                  <button
                                    onClick={() => handleCopyAddress(tx.hash)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              
                              <div>
                                <span className="text-muted-foreground">Red:</span>
                                <div className="mt-1">
                                  <Badge variant="outline" className="bg-accent/50">
                                    {tx.network}
                                  </Badge>
                                </div>
                              </div>

                              <div>
                                <span className="text-muted-foreground">Fecha:</span>
                                <p className="mt-1 text-foreground">
                                  {tx.timestamp.toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>

                              <div>
                                <span className="text-muted-foreground">Tipo:</span>
                                <div className="mt-1">
                                  <Badge variant="outline" className={`${typeInfo.color} ${typeInfo.borderColor} border-2 flex items-center gap-1.5 w-fit`}>
                                    <span>{typeInfo.icon}</span>
                                    <span>{typeInfo.label}</span>
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Explorer Link */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                              className="w-full gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Ver en explorador de bloques
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}

          {transactions.length === 0 && (
            <Card className="p-8 text-center bg-card/50 backdrop-blur-sm">
              <AlertCircle className="w-12 h-12 text-success-pastel mx-auto mb-3" />
              <h4 className="text-foreground mb-2">¡Todo matcheado!</h4>
              <p className="text-sm text-muted-foreground">
                No hay transacciones pendientes de matchear
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Identify Address Modal */}
      <IdentifyAddressModal
        open={identifyModalOpen}
        onClose={() => {
          setIdentifyModalOpen(false);
          setSelectedAddress(null);
        }}
        address={selectedAddress?.address || ''}
        onIdentified={handleAddressIdentified}
      />
    </div>
  );
}
