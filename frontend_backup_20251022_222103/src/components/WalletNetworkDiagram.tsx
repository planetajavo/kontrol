import { useState } from 'react';
import { X, Plus, Search, Filter, Edit2, Circle, Check, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';

interface WalletNetworkDiagramProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WalletNode {
  id: string;
  name: string;
  network: string;
  tag: string;
  tagColor: string;
  synced: boolean;
  x: number;
  y: number;
  connections: string[];
}

const mockWallets: WalletNode[] = [
  { id: '1', name: 'Wallet Principal', network: 'ETH', tag: 'Principal', tagColor: 'bg-blue-500', synced: true, x: 300, y: 200, connections: ['2', '3'] },
  { id: '2', name: 'Trading Hot', network: 'BTC', tag: 'Trading', tagColor: 'bg-green-500', synced: true, x: 500, y: 150, connections: ['1', '4'] },
  { id: '3', name: 'Cold Storage', network: 'BTC', tag: 'Ahorro', tagColor: 'bg-purple-500', synced: true, x: 300, y: 350, connections: ['1'] },
  { id: '4', name: 'DeFi Wallet', network: 'BSC', tag: 'DeFi', tagColor: 'bg-yellow-500', synced: false, x: 700, y: 200, connections: ['2'] },
  { id: '5', name: 'Solana Main', network: 'SOL', tag: 'NFT', tagColor: 'bg-pink-500', synced: true, x: 500, y: 350, connections: [] },
];

export default function WalletNetworkDiagram({ isOpen, onClose }: WalletNetworkDiagramProps) {
  const [selectedWallet, setSelectedWallet] = useState<WalletNode | null>(null);
  const [networkFilter, setNetworkFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getNetworkIcon = (network: string) => {
    const colors: Record<string, string> = {
      'BTC': 'text-orange-500',
      'ETH': 'text-blue-500',
      'BSC': 'text-yellow-500',
      'SOL': 'text-purple-500'
    };
    return colors[network] || 'text-neutral-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Red de Wallets Conectadas</DialogTitle>
          
          {/* Top Controls */}
          <div className="flex gap-3 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Buscar wallet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={networkFilter} onValueChange={setNetworkFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Red" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las redes</SelectItem>
                <SelectItem value="BTC">Bitcoin</SelectItem>
                <SelectItem value="ETH">Ethereum</SelectItem>
                <SelectItem value="BSC">BSC</SelectItem>
                <SelectItem value="SOL">Solana</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Añadir Wallet
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6 mt-4 h-full">
          {/* Network Diagram */}
          <div className="col-span-2 bg-neutral-50 rounded-lg p-6 relative overflow-hidden">
            <svg className="w-full h-full">
              {/* Connection Lines */}
              {mockWallets.map(wallet => 
                wallet.connections.map(connId => {
                  const targetWallet = mockWallets.find(w => w.id === connId);
                  if (!targetWallet) return null;
                  return (
                    <line
                      key={`${wallet.id}-${connId}`}
                      x1={wallet.x}
                      y1={wallet.y}
                      x2={targetWallet.x}
                      y2={targetWallet.y}
                      stroke="#d4d4d8"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  );
                })
              )}

              {/* Wallet Nodes */}
              {mockWallets.map(wallet => (
                <g
                  key={wallet.id}
                  transform={`translate(${wallet.x}, ${wallet.y})`}
                  onClick={() => setSelectedWallet(wallet)}
                  className="cursor-pointer"
                >
                  {/* Circle */}
                  <circle
                    r="40"
                    fill="white"
                    stroke={selectedWallet?.id === wallet.id ? '#3b82f6' : '#e5e5e5'}
                    strokeWidth={selectedWallet?.id === wallet.id ? '3' : '2'}
                    className="hover:stroke-blue-400 transition-all"
                  />
                  
                  {/* Network Icon */}
                  <text
                    textAnchor="middle"
                    dy="-5"
                    fontSize="20"
                    className={getNetworkIcon(wallet.network)}
                  >
                    ●
                  </text>

                  {/* Sync Status */}
                  <circle
                    cx="25"
                    cy="-25"
                    r="8"
                    fill={wallet.synced ? '#22c55e' : '#ef4444'}
                  />
                  
                  {wallet.synced && (
                    <text x="25" y="-21" textAnchor="middle" fontSize="10" fill="white">✓</text>
                  )}

                  {/* Name */}
                  <text
                    textAnchor="middle"
                    dy="15"
                    fontSize="12"
                    fill="#171717"
                  >
                    {wallet.name}
                  </text>

                  {/* Network Badge */}
                  <text
                    textAnchor="middle"
                    dy="50"
                    fontSize="10"
                    fill="#737373"
                  >
                    {wallet.network}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Wallet Details Panel */}
          <div className="border-l border-neutral-200 pl-6">
            {selectedWallet ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-neutral-900">Detalles de Wallet</h3>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-neutral-500 mb-1">Nombre</div>
                    <Input value={selectedWallet.name} />
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">Red</div>
                    <div className="flex items-center gap-2">
                      <Circle className={`w-3 h-3 ${getNetworkIcon(selectedWallet.network)}`} />
                      <span>{selectedWallet.network}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">Etiqueta</div>
                    <Badge className={`${selectedWallet.tagColor} text-white border-0`}>
                      {selectedWallet.tag}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-neutral-500 mb-1">Estado de Sincronización</div>
                    <div className="flex items-center gap-2">
                      {selectedWallet.synced ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">Sincronizada</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 text-orange-600" />
                          <span className="text-orange-600">Sincronizando...</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Local Timeline */}
                <div className="mt-6">
                  <div className="text-neutral-900 mb-3">Transacciones Recientes</div>
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((_, idx) => (
                        <div key={idx} className="p-3 bg-neutral-50 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-neutral-700">Compra BTC</span>
                            <span className="text-green-600">+0.5</span>
                          </div>
                          <div className="text-neutral-400">Hace 2 días</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <Button variant="outline" className="w-full">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar Etiquetas
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-neutral-400">
                Selecciona una wallet para ver detalles
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
