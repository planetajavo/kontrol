import { Wallet, Network, Tags, Upload, Download, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface WalletsSectionProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function WalletsSection({ activeTab, onTabChange }: WalletsSectionProps) {

  const wallets = [
    {
      id: '1',
      name: 'Principal Trading',
      address: '0x742d35f8a1b9c4e2d6f9a3b8c5e7f2a4d6b8c9e1',
      network: 'Ethereum',
      balance: 12500,
      assets: 5,
      color: 'bg-violet-100 text-violet-700 border-violet-300',
      transactions: 234
    },
    {
      id: '2',
      name: 'Trading Activo',
      address: '0x893b2c1e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c',
      network: 'Polygon',
      balance: 8750,
      assets: 3,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      transactions: 189
    },
    {
      id: '3',
      name: 'Cold Storage',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      network: 'Bitcoin',
      balance: 45000,
      assets: 2,
      color: 'bg-blue-100 text-blue-700 border-blue-300',
      transactions: 45
    },
  ];

  const tags = [
    { id: '1', name: 'Inversión', color: 'bg-violet-100 text-violet-700', count: 45 },
    { id: '2', name: 'Trading', color: 'bg-emerald-100 text-emerald-700', count: 89 },
    { id: '3', name: 'Ahorro', color: 'bg-blue-100 text-blue-700', count: 23 },
    { id: '4', name: 'Ganancia', color: 'bg-amber-100 text-amber-700', count: 67 },
    { id: '5', name: 'Mining', color: 'bg-rose-100 text-rose-700', count: 12 },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-foreground">My Wallets</h1>
        <p className="text-muted-foreground">Gestiona tus wallets, conexiones y etiquetas</p>
      </div>

      {/* Sticky Action Bar with Tabs */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 md:py-4 border-b border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-full sm:w-auto overflow-x-auto">
            {['wallets', 'network', 'tags'].map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-3 md:px-4 py-2 rounded-md transition-all whitespace-nowrap text-sm font-medium ${
                  activeTab === tab
                    ? 'bg-card shadow-sm text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'wallets' && 'Wallets'}
                {tab === 'network' && 'Red'}
                {tab === 'tags' && 'Etiquetas'}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full sm:w-auto">
            {activeTab === 'wallets' && (
              <Button size="sm" className="gap-2 flex-1 sm:flex-none bg-gradient-to-r from-[#FB923C] to-[#EA580C] hover:opacity-90">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Añadir wallet</span>
                <span className="sm:hidden">Añadir</span>
              </Button>
            )}
            {activeTab === 'tags' && (
              <Button size="sm" className="gap-2 flex-1 sm:flex-none bg-gradient-to-r from-[#FB923C] to-[#EA580C] hover:opacity-90">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Nueva etiqueta</span>
                <span className="sm:hidden">Nueva</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Wallets Tab */}
      {activeTab === 'wallets' && (
        <div className="space-y-6">
          {/* Import/Export Actions */}
          <div className="bg-card rounded-xl md:rounded-2xl border border-border p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-foreground">
                Importar desde exchange o archivo
              </div>
              <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-background border border-border rounded-lg md:rounded-xl hover:bg-muted transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Importar CSV</span>
                  <span className="sm:hidden">Importar</span>
                </button>
                <button className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-background border border-border rounded-lg md:rounded-xl hover:bg-muted transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Exportar</span>
                  <span className="sm:hidden">Exportar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Wallets List */}
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="bg-card rounded-xl md:rounded-2xl border border-border p-4 md:p-6 lg:p-8 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-purple-600 rounded-lg md:rounded-xl flex items-center justify-center">
                      <Wallet className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className={`inline-flex px-4 py-2 rounded-lg border mb-3 ${wallet.color}`}>
                        {wallet.name}
                      </div>
                      <div className="text-muted-foreground font-mono text-sm">
                        {wallet.address}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-muted text-muted-foreground">
                    {wallet.network}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-muted-foreground mb-1">Balance</div>
                    <div className="text-foreground">
                      €{wallet.balance.toLocaleString('es-ES')}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Activos</div>
                    <div className="text-foreground">{wallet.assets}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Transacciones</div>
                    <div className="text-foreground">{wallet.transactions}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Network Tab */}
      {activeTab === 'network' && (
        <div>
          <div className="bg-card rounded-2xl border border-border p-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Network className="w-10 h-10 text-violet-600" />
              </div>
              <h3 className="text-foreground mb-4">Diagrama de Red de Wallets</h3>
              <p className="text-muted-foreground mb-8">
                Visualiza las conexiones entre tus wallets basadas en transferencias.
                Detecta patrones, flujos de capital y optimiza tu estructura.
              </p>
              
              {/* Simplified Network Visualization */}
              <div className="bg-muted rounded-xl p-12 mb-8">
                <div className="flex items-center justify-center gap-8">
                  {wallets.slice(0, 3).map((wallet, idx) => (
                    <div key={wallet.id} className="text-center">
                      <div className={`w-24 h-24 rounded-full border-4 ${wallet.color} bg-card flex items-center justify-center mb-3`}>
                        <Wallet className="w-8 h-8" />
                      </div>
                      <div className="text-foreground text-sm">{wallet.name}</div>
                      {idx < 2 && (
                        <div className="h-1 w-16 bg-violet-300 absolute mt-[-40px] ml-24" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button size="lg">
                Ver diagrama completo interactivo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tags Tab */}
      {activeTab === 'tags' && (
        <div className="space-y-6">
          {/* Create Tag */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h3 className="text-foreground mb-6">Crear nueva etiqueta</h3>
            <div className="flex gap-4">
              <Input
                placeholder="Nombre de la etiqueta..."
                className="flex-1"
              />
              <Button>Crear etiqueta</Button>
            </div>
          </div>

          {/* Tags List */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h3 className="text-foreground mb-6">Etiquetas existentes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className={`p-6 rounded-xl border-2 ${tag.color} bg-opacity-50 hover:shadow-md transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-foreground mb-1">{tag.name}</div>
                      <div className="text-muted-foreground">
                        {tag.count} transacciones
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Tags className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CoinTracking Import */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/30 p-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-card rounded-xl flex items-center justify-center flex-shrink-0 border border-border">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground mb-2">Importar desde CoinTracking</h3>
                <p className="text-muted-foreground mb-6">
                  Reconcilia y sincroniza tus etiquetas desde un backup de CoinTracking
                </p>
                <Button variant="outline">
                  Seleccionar archivo de backup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
