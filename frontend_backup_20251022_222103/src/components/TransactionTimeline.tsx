import { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useThemeColor } from './hooks/useThemeColor';

const mockTransactions = [
  {
    id: '1',
    date: '2025-10-15',
    time: '14:32:45',
    type: 'buy',
    crypto: 'BTC',
    amount: 0.5,
    value: 32500,
    wallet: 'Principal Trading',
    walletColor: 'bg-violet-100 text-violet-700 border-violet-300',
    tag: 'Inversión',
    hash: '0x742d35f8a1b9c4e2d6f9a3b8c5e7f2a4d6b8c9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9',
    network: 'Ethereum',
    exchange: 'Binance',
    fees: 12.5,
    feesCrypto: 0.00038,
    price: 65000,
    notes: 'Compra programada mensual'
  },
  {
    id: '2',
    date: '2025-10-12',
    time: '09:15:22',
    type: 'sell',
    crypto: 'ETH',
    amount: 2.5,
    value: 8750,
    wallet: 'Trading Activo',
    walletColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    tag: 'Trading',
    hash: '0x893b2c1e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d',
    network: 'Polygon',
    exchange: 'Kraken',
    fees: 3.5,
    feesCrypto: 0.001,
    price: 3500,
    notes: ''
  },
  {
    id: '3',
    date: '2025-10-08',
    time: '16:47:11',
    type: 'transfer',
    crypto: 'USDT',
    amount: 10000,
    value: 10000,
    wallet: 'Cold Storage',
    walletColor: 'bg-blue-100 text-blue-700 border-blue-300',
    tag: 'Ahorro',
    hash: '0x124f7d3a9b5c8e1f3a6b9c2d5e8f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5',
    network: 'Tron',
    exchange: null,
    fees: 1,
    feesCrypto: 1,
    price: 1,
    notes: 'Transferencia a hardware wallet'
  },
  {
    id: '4',
    date: '2025-10-05',
    time: '11:22:33',
    type: 'buy',
    crypto: 'SOL',
    amount: 50,
    value: 7500,
    wallet: 'Principal Trading',
    walletColor: 'bg-violet-100 text-violet-700 border-violet-300',
    tag: 'Inversión',
    hash: '0x456e9b2c5f8a1d4e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2c5d8e1f4a7b0c3d6e9',
    network: 'Solana',
    exchange: 'Bybit',
    fees: 7.5,
    feesCrypto: 0.05,
    price: 150,
    notes: ''
  },
  {
    id: '5',
    date: '2025-10-01',
    time: '08:05:17',
    type: 'sell',
    crypto: 'BTC',
    amount: 0.2,
    value: 13000,
    wallet: 'Trading Activo',
    walletColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    tag: 'Ganancia',
    hash: '0x789a4f1d7b0c3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8f1',
    network: 'Bitcoin',
    exchange: 'Coinbase',
    fees: 26,
    feesCrypto: 0.0004,
    price: 65000,
    notes: 'Take profit 20%'
  },
];

const chartData = [
  { date: 'Sep 28', txs: 3 },
  { date: 'Sep 30', txs: 5 },
  { date: 'Oct 02', txs: 8 },
  { date: 'Oct 04', txs: 12 },
  { date: 'Oct 06', txs: 15 },
  { date: 'Oct 08', txs: 18 },
  { date: 'Oct 10', txs: 14 },
  { date: 'Oct 12', txs: 10 },
  { date: 'Oct 14', txs: 7 },
  { date: 'Oct 15', txs: 5 },
];

export default function TransactionTimeline() {
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const primaryColor = useThemeColor();
  const [typeFilter, setTypeFilter] = useState('all');
  const [walletFilter, setWalletFilter] = useState('all');
  const [networkFilter, setNetworkFilter] = useState('all');
  const [exchangeFilter, setExchangeFilter] = useState('all');

  const filteredTransactions = mockTransactions;
  const totalTxs = filteredTransactions.length;

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'buy':
        return {
          icon: ArrowDownCircle,
          label: 'Compra',
          color: 'text-emerald-600 dark:text-emerald-400',
          bg: 'bg-emerald-50 dark:bg-emerald-900/20'
        };
      case 'sell':
        return {
          icon: ArrowUpCircle,
          label: 'Venta',
          color: 'text-rose-600 dark:text-rose-400',
          bg: 'bg-rose-50 dark:bg-rose-900/20'
        };
      case 'transfer':
        return {
          icon: ArrowRightCircle,
          label: 'Transferencia',
          color: 'text-violet-600 dark:text-violet-400',
          bg: 'bg-violet-50 dark:bg-violet-900/20'
        };
      default:
        return {
          icon: ArrowRightCircle,
          label: type,
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-50 dark:bg-gray-800/50'
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Chart Header */}
      <div className="bg-card rounded-2xl border border-border p-8">
        <div className="mb-6">
          <h3 className="text-foreground mb-2">Distribución temporal</h3>
          <p className="text-muted-foreground">Volumen de transacciones en los últimos 30 días</p>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="txGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                padding: '12px',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="txs" 
              stroke={primaryColor}
              strokeWidth={2}
              fill="url(#txGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-2xl border border-border p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="buy">Compras</SelectItem>
              <SelectItem value="sell">Ventas</SelectItem>
              <SelectItem value="transfer">Transferencias</SelectItem>
            </SelectContent>
          </Select>

          <Select value={walletFilter} onValueChange={setWalletFilter}>
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las wallets</SelectItem>
              <SelectItem value="principal">Principal Trading</SelectItem>
              <SelectItem value="trading">Trading Activo</SelectItem>
              <SelectItem value="cold">Cold Storage</SelectItem>
            </SelectContent>
          </Select>

          <Select value={networkFilter} onValueChange={setNetworkFilter}>
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Red" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las redes</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="bitcoin">Bitcoin</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="solana">Solana</SelectItem>
              <SelectItem value="tron">Tron</SelectItem>
            </SelectContent>
          </Select>

          <Select value={exchangeFilter} onValueChange={setExchangeFilter}>
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los exchanges</SelectItem>
              <SelectItem value="binance">Binance</SelectItem>
              <SelectItem value="kraken">Kraken</SelectItem>
              <SelectItem value="coinbase">Coinbase</SelectItem>
              <SelectItem value="bybit">Bybit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transaction Count */}
      <div className="text-muted-foreground">
        Mostrando <span className="text-foreground">{totalTxs}</span> transacciones
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((tx) => {
          const typeConfig = getTypeConfig(tx.type);
          const Icon = typeConfig.icon;
          const isExpanded = expandedTx === tx.id;

          return (
            <div
              key={tx.id}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all"
            >
              {/* Main Info */}
              <div 
                className="p-8 cursor-pointer"
                onClick={() => setExpandedTx(isExpanded ? null : tx.id)}
              >
                <div className="flex items-center gap-8">
                  {/* Type Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 ${typeConfig.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${typeConfig.color}`} />
                  </div>

                  {/* Main Info Grid */}
                  <div className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                    {/* Type & Date */}
                    <div>
                      <div className="text-foreground mb-1">{typeConfig.label}</div>
                      <div className="text-muted-foreground">
                        {tx.date}
                      </div>
                    </div>

                    {/* Crypto & Amount */}
                    <div>
                      <div className="text-foreground mb-1">
                        {tx.amount} {tx.crypto}
                      </div>
                      <div className="text-muted-foreground">
                        €{tx.value.toLocaleString('es-ES')}
                      </div>
                    </div>

                    {/* Wallet Badge */}
                    <div>
                      <div className={`inline-flex px-4 py-2 rounded-lg border ${tx.walletColor}`}>
                        {tx.wallet}
                      </div>
                    </div>

                    {/* Network */}
                    <div>
                      <div className="text-muted-foreground mb-1">Red</div>
                      <div className="text-foreground">{tx.network}</div>
                    </div>

                    {/* Exchange */}
                    <div>
                      <div className="text-muted-foreground mb-1">Exchange</div>
                      <div className="text-foreground">{tx.exchange || 'N/A'}</div>
                    </div>

                    {/* Expand Button */}
                    <div className="flex justify-end">
                      <button className="p-3 hover:bg-muted rounded-xl transition-all">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-border bg-muted/30 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Timestamp */}
                    <div>
                      <div className="text-muted-foreground mb-2">Timestamp completo</div>
                      <div className="text-foreground">{tx.date} {tx.time}</div>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="text-muted-foreground mb-2">Precio unitario</div>
                      <div className="text-foreground">€{tx.price.toLocaleString('es-ES')}</div>
                    </div>

                    {/* Fees */}
                    <div>
                      <div className="text-muted-foreground mb-2">Comisiones</div>
                      <div className="text-foreground">
                        €{tx.fees} ({tx.feesCrypto} {tx.crypto})
                      </div>
                    </div>

                    {/* Hash */}
                    <div className="lg:col-span-2">
                      <div className="text-muted-foreground mb-2">Hash de transacción</div>
                      <div className="text-foreground font-mono text-sm break-all bg-background p-3 rounded-lg">
                        {tx.hash}
                      </div>
                    </div>

                    {/* Tag */}
                    <div>
                      <div className="text-muted-foreground mb-2">Etiqueta</div>
                      <Badge className="bg-secondary text-secondary-foreground">
                        {tx.tag}
                      </Badge>
                    </div>

                    {/* Notes */}
                    {tx.notes && (
                      <div className="lg:col-span-3">
                        <div className="text-muted-foreground mb-2">Notas</div>
                        <div className="text-foreground">{tx.notes}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <button className="px-6 py-3 bg-card border border-border rounded-xl hover:bg-muted transition-all">
          Anterior
        </button>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-12 h-12 rounded-xl transition-all ${
                page === 1
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-card border border-border hover:bg-muted'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-6 py-3 bg-card border border-border rounded-xl hover:bg-muted transition-all">
          Siguiente
        </button>
      </div>
    </div>
  );
}
