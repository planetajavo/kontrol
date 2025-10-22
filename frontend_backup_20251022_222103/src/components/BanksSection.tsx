import { useState } from 'react';
import { Plus, RefreshCw, TrendingUp, TrendingDown, Building2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import CollapsibleSection from './CollapsibleSection';

const banksDataInitial = [
  {
    id: 'bank1',
    name: 'BBVA',
    customIcon: '🏦',
    status: 'connected' as const,
    lastSync: new Date('2025-10-17T11:30:00'),
    balance: 45678.90,
    accounts: [
      { 
        type: 'Checking', 
        number: '****1234', 
        balance: 25678.90,
        movements: [
          { date: '2025-10-15', description: 'Salary', amount: 3500, type: 'credit' as const },
          { date: '2025-10-12', description: 'Rent Payment', amount: -1200, type: 'debit' as const },
          { date: '2025-10-10', description: 'Crypto Purchase', amount: -500, type: 'debit' as const },
        ]
      },
      { 
        type: 'Savings', 
        number: '****5678', 
        balance: 20000,
        movements: []
      },
    ]
  },
  {
    id: 'bank2',
    name: 'Revolut',
    customIcon: '💳',
    status: 'connected' as const,
    lastSync: new Date('2025-10-17T10:15:00'),
    balance: 12345.67,
    accounts: [
      { 
        type: 'Main Account', 
        number: '****9012', 
        balance: 12345.67,
        movements: [
          { date: '2025-10-16', description: 'Card Payment - Amazon', amount: -89.99, type: 'debit' as const },
          { date: '2025-10-14', description: 'Transfer from BBVA', amount: 1000, type: 'credit' as const },
        ]
      },
    ]
  },
  {
    id: 'bank3',
    name: 'N26',
    customIcon: '🌐',
    status: 'pending' as const,
    lastSync: new Date('2025-10-16T15:00:00'),
    balance: 5432.10,
    accounts: [
      { 
        type: 'Standard', 
        number: '****3456', 
        balance: 5432.10,
        movements: []
      },
    ]
  },
];

export default function BanksSection() {
  const [banksData, setBanksData] = useState(banksDataInitial);
  const [expandedBank, setExpandedBank] = useState<string | null>(null);
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);

  const totalBalance = banksData.reduce((sum, bank) => sum + bank.balance, 0);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-foreground">Banks</h1>
        <p className="text-muted-foreground">Connect your bank accounts via Open Banking</p>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 md:py-4 border-b border-border">
        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => {
              setAllCollapsed(!allCollapsed);
              setCollapseKey(prev => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
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
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Sincronizar todo</span>
            <span className="sm:hidden">Sync</span>
          </Button>

          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Conectar Banco</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Total Balance Card */}
      <div className="rounded-xl md:rounded-2xl border border-border p-4 md:p-6 bg-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-muted-foreground mb-2">Total Bank Balance</div>
            <div className="text-foreground text-3xl md:text-4xl mb-2">
              €{totalBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-muted-foreground">
              Across {banksData.length} connected banks
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Open Banking Enabled
            </Badge>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-muted/30 border border-border rounded-xl p-4">
        <div className="flex gap-3">
          <Building2 className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-1">About Open Banking Integration</h3>
            <p className="text-sm text-muted-foreground">
              Connect your bank accounts securely using PSD2 Open Banking standards. We can access your movements and initiate transactions with your authorization. All connections are encrypted and comply with EU regulations.
            </p>
          </div>
        </div>
      </div>

      {/* Banks List */}
      <CollapsibleSection
        key={`banks-${collapseKey}`}
        title="Your Banks"
        description={`${banksData.length} banks connected`}
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-primary/10 text-primary">{banksData.length}</Badge>}
      >
        <div className="space-y-2">
          {banksData.map((bank) => (
            <div
              key={bank.id}
              className="bg-card rounded-xl border border-border hover:shadow-md transition-all overflow-hidden"
            >
              {/* Bank Header */}
              <div className="flex items-center justify-between p-4 gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                    {bank.customIcon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-foreground font-semibold truncate">{bank.name}</span>
                      {bank.status === 'connected' ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last sync: {bank.lastSync.toLocaleString('es-ES', { 
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-foreground font-semibold">
                      €{bank.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-xs text-muted-foreground">{bank.accounts.length} accounts</div>
                  </div>
                  <button
                    onClick={() => setExpandedBank(expandedBank === bank.id ? null : bank.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg className={`w-5 h-5 transition-transform ${expandedBank === bank.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Accounts & Movements */}
              {expandedBank === bank.id && (
                <div className="border-t border-border">
                  {bank.accounts.map((account, idx) => (
                    <div key={idx} className="p-4 bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium">{account.type}</div>
                          <div className="text-sm text-muted-foreground">{account.number}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            €{account.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>

                      {/* Recent Movements */}
                      {account.movements.length > 0 && (
                        <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
                          <div className="text-sm font-medium text-muted-foreground mb-2">Recent Movements</div>
                          {account.movements.map((movement, mIdx) => (
                            <div key={mIdx} className="flex items-center justify-between text-sm py-2">
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                {movement.type === 'credit' ? (
                                  <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-600 flex-shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <div className="truncate">{movement.description}</div>
                                  <div className="text-xs text-muted-foreground">{movement.date}</div>
                                </div>
                              </div>
                              <div className={`font-medium flex-shrink-0 ${
                                movement.type === 'credit' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {movement.type === 'credit' ? '+' : ''}€{Math.abs(movement.amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}
