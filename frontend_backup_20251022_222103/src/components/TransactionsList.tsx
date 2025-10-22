// ============================================================================
// TRANSACTIONS LIST - Reusable Transaction List Component
// ============================================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Filter, 
  Search, 
  Calendar as CalendarIcon, 
  ArrowUpDown, 
  ChevronDown,
  ChevronUp,
  X,
  Wallet as WalletIcon,
  Building2
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import TransactionListItem from './TransactionListItem';
import DateRangeFilterModal from './DateRangeFilterModal';
import { type Transaction, type TransactionType, type TransactionStatus } from '../types';

interface TransactionsListProps {
  transactions: Transaction[];
  title?: string;
  maxItems?: number;
  enableFilters?: boolean;
  enableSearch?: boolean;
  enableInfiniteScroll?: boolean;
  compact?: boolean;
  showDetails?: boolean;
  groupByMonth?: boolean;
  isVisible?: boolean;
}

export default function TransactionsList({
  transactions,
  title,
  maxItems,
  enableFilters = false,
  enableSearch = false,
  enableInfiniteScroll = false,
  compact = false,
  showDetails = true,
  groupByMonth = true,
  isVisible = true
}: TransactionsListProps) {
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<TransactionType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<TransactionStatus | 'all'>('all');
  const [filterWallet, setFilterWallet] = useState<string>('all');
  const [filterExchange, setFilterExchange] = useState<string>('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateFilterModalOpen, setDateFilterModalOpen] = useState(false);
  const [collapsedMonths, setCollapsedMonths] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [loadingMore, setLoadingMore] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 20;

  // Get unique wallets and exchanges for filters
  const uniqueWallets = Array.from(new Set(transactions.map(tx => tx.wallet).filter(Boolean)));
  const uniqueExchanges = Array.from(new Set(transactions.map(tx => tx.exchange).filter(Boolean)));

  // Filter and search transactions
  useEffect(() => {
    let filtered = transactions;

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(tx => tx.type === filterType);
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(tx => tx.status === filterStatus);
    }

    // Apply wallet filter
    if (filterWallet !== 'all') {
      filtered = filtered.filter(tx => tx.wallet === filterWallet);
    }

    // Apply exchange filter
    if (filterExchange !== 'all') {
      filtered = filtered.filter(tx => tx.exchange === filterExchange);
    }

    // Apply date range filter
    if (startDate || endDate) {
      filtered = filtered.filter(tx => {
        const txDate = new Date(tx.date);
        const afterStart = !startDate || txDate >= startDate;
        const beforeEnd = !endDate || txDate <= endDate;
        return afterStart && beforeEnd;
      });
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tx =>
        tx.txId?.toLowerCase().includes(query) ||
        tx.currency?.toLowerCase().includes(query) ||
        tx.exchange?.toLowerCase().includes(query) ||
        tx.wallet?.toLowerCase().includes(query) ||
        tx.comment?.toLowerCase().includes(query) ||
        tx.tradeGroup?.toLowerCase().includes(query)
      );
    }

    // Sort by date
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredTransactions(filtered);
  }, [transactions, filterType, filterStatus, filterWallet, filterExchange, startDate, endDate, searchQuery, sortOrder]);

  // Initial load and max items
  useEffect(() => {
    const limit = maxItems || (enableInfiniteScroll ? ITEMS_PER_PAGE : filteredTransactions.length);
    setDisplayedTransactions(filteredTransactions.slice(0, limit));
  }, [filteredTransactions, maxItems, enableInfiniteScroll]);

  // Infinite scroll
  const loadMoreTransactions = useCallback(() => {
    if (!enableInfiniteScroll || loadingMore || displayedTransactions.length >= filteredTransactions.length) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedTransactions.length;
      const nextTransactions = filteredTransactions.slice(
        currentLength,
        currentLength + ITEMS_PER_PAGE
      );
      setDisplayedTransactions(prev => [...prev, ...nextTransactions]);
      setLoadingMore(false);
    }, 300);
  }, [loadingMore, displayedTransactions.length, filteredTransactions, enableInfiniteScroll]);

  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreTransactions();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreTransactions, enableInfiniteScroll]);

  // Group transactions by month
  const groupedTransactions = groupByMonth
    ? displayedTransactions.reduce((acc, tx) => {
        const year = tx.date.getFullYear();
        const month = tx.date.getMonth();
        const key = `${year}-${month}`;

        if (!acc[key]) {
          acc[key] = {
            year,
            month,
            transactions: []
          };
        }
        acc[key].transactions.push(tx);
        return acc;
      }, {} as Record<string, { year: number; month: number; transactions: Transaction[] }>)
    : null;

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const toggleMonthCollapse = (key: string) => {
    setCollapsedMonths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterStatus('all');
    setFilterWallet('all');
    setFilterExchange('all');
    setStartDate(null);
    setEndDate(null);
  };

  const activeFiltersCount = 
    (filterType !== 'all' ? 1 : 0) +
    (filterStatus !== 'all' ? 1 : 0) +
    (filterWallet !== 'all' ? 1 : 0) +
    (filterExchange !== 'all' ? 1 : 0) +
    (startDate || endDate ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="text-foreground">{title}</h3>
          <Badge variant="secondary">
            {displayedTransactions.length}
            {maxItems && filteredTransactions.length > maxItems && `/${filteredTransactions.length}`}
          </Badge>
        </div>
      )}

      {/* Filters & Search */}
      {(enableFilters || enableSearch) && (
        <div className="space-y-3">
          {/* Search Bar */}
          {enableSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="TxID, comment, wallet, everything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {enableFilters && (
            <>
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filtros</span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {activeFiltersCount} activo{activeFiltersCount > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-8 text-xs"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Limpiar todos
                  </Button>
                )}
              </div>

              {/* Filter Groups */}
              <div className="space-y-2">
                {/* Type & Status Filters */}
                <div className="flex flex-wrap gap-2">
                  {/* Date Filter Button */}
                  <Button
                    size="sm"
                    variant={startDate || endDate ? 'default' : 'outline'}
                    onClick={() => setDateFilterModalOpen(true)}
                    className="gap-2"
                  >
                    <CalendarIcon className="w-3 h-3" />
                    {startDate || endDate ? (
                      <span className="text-xs">
                        {startDate ? startDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : '...'} - {endDate ? endDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : '...'}
                      </span>
                    ) : (
                      'Fecha'
                    )}
                  </Button>

                  {/* Sort Order */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                    className="gap-2"
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    {sortOrder === 'desc' ? 'Más reciente' : 'Más antigua'}
                  </Button>

                  {/* Type Filter Buttons */}
                  <Button
                    size="sm"
                    variant={filterType === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterType('all')}
                  >
                    Todas
                  </Button>
                  <Button
                    size="sm"
                    variant={filterType === 'buy' ? 'default' : 'outline'}
                    onClick={() => setFilterType('buy')}
                    className={filterType === 'buy' ? 'bg-purple-pastel hover:bg-purple-pastel/90' : ''}
                  >
                    Compras
                  </Button>
                  <Button
                    size="sm"
                    variant={filterType === 'sell' ? 'default' : 'outline'}
                    onClick={() => setFilterType('sell')}
                    className={filterType === 'sell' ? 'bg-pink-pastel hover:bg-pink-pastel/90' : ''}
                  >
                    Ventas
                  </Button>
                  <Button
                    size="sm"
                    variant={filterType === 'transfer' ? 'default' : 'outline'}
                    onClick={() => setFilterType('transfer')}
                    className={filterType === 'transfer' ? 'bg-indigo-pastel hover:bg-indigo-pastel/90' : ''}
                  >
                    Transferencias
                  </Button>
                  <Button
                    size="sm"
                    variant={filterType === 'swap' ? 'default' : 'outline'}
                    onClick={() => setFilterType('swap')}
                    className={filterType === 'swap' ? 'bg-teal-pastel hover:bg-teal-pastel/90' : ''}
                  >
                    Swaps
                  </Button>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground flex items-center">Estado:</span>
                  <Button
                    size="sm"
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('all')}
                  >
                    Todos
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === 'confirmed' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('confirmed')}
                    className={filterStatus === 'confirmed' ? 'bg-success-pastel hover:bg-success-pastel/90' : ''}
                  >
                    Confirmadas
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === 'pending' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('pending')}
                    className={filterStatus === 'pending' ? 'bg-warning-pastel hover:bg-warning-pastel/90' : ''}
                  >
                    Pendientes
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === 'failed' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('failed')}
                    className={filterStatus === 'failed' ? 'bg-destructive-pastel hover:bg-destructive-pastel/90' : ''}
                  >
                    Fallidas
                  </Button>
                </div>

                {/* Wallet & Exchange Filters */}
                {(uniqueWallets.length > 0 || uniqueExchanges.length > 0) && (
                  <div className="flex flex-wrap gap-2">
                    {/* Wallet Filter */}
                    {uniqueWallets.length > 0 && (
                      <>
                        <WalletIcon className="w-4 h-4 text-muted-foreground" />
                        <Button
                          size="sm"
                          variant={filterWallet === 'all' ? 'default' : 'outline'}
                          onClick={() => setFilterWallet('all')}
                        >
                          Todas las wallets
                        </Button>
                        {uniqueWallets.slice(0, 5).map(wallet => (
                          <Button
                            key={wallet}
                            size="sm"
                            variant={filterWallet === wallet ? 'default' : 'outline'}
                            onClick={() => setFilterWallet(wallet)}
                          >
                            {wallet}
                          </Button>
                        ))}
                      </>
                    )}

                    {/* Exchange Filter */}
                    {uniqueExchanges.length > 0 && (
                      <>
                        <Building2 className="w-4 h-4 text-muted-foreground ml-2" />
                        <Button
                          size="sm"
                          variant={filterExchange === 'all' ? 'default' : 'outline'}
                          onClick={() => setFilterExchange('all')}
                        >
                          Todos los exchanges
                        </Button>
                        {uniqueExchanges.slice(0, 5).map(exchange => (
                          <Button
                            key={exchange}
                            size="sm"
                            variant={filterExchange === exchange ? 'default' : 'outline'}
                            onClick={() => setFilterExchange(exchange)}
                          >
                            {exchange}
                          </Button>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Transactions List */}
      <div className="space-y-4">
        {groupByMonth && groupedTransactions ? (
          // Grouped by month - COLLAPSIBLE
          Object.entries(groupedTransactions)
            .sort(([keyA], [keyB]) => sortOrder === 'desc' ? keyB.localeCompare(keyA) : keyA.localeCompare(keyB))
            .map(([key, group]) => {
              const isMonthCollapsed = collapsedMonths.has(key);
              
              return (
                <div key={key} className="space-y-2">
                  {/* Month Header - Collapsible */}
                  <motion.button
                    onClick={() => toggleMonthCollapse(key)}
                    className="w-full sticky top-32 z-10 bg-muted/80 backdrop-blur-sm px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          animate={{ rotate: isMonthCollapsed ? -90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                        <div className="text-left">
                          <h4 className="text-foreground">
                            {monthNames[group.month]} {group.year}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {group.transactions.length} transacciones
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {group.transactions.length}
                      </Badge>
                    </div>
                  </motion.button>

                  {/* Transactions in this month */}
                  <AnimatePresence>
                    {!isMonthCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2 overflow-hidden"
                      >
                        {group.transactions.map((tx) => (
                          <TransactionListItem
                            key={tx.id}
                            transaction={tx}
                            showDetails={showDetails}
                            compact={compact}
                            isVisible={isVisible}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
        ) : (
          // Flat list
          <div className="space-y-2">
            <AnimatePresence>
              {displayedTransactions.map((tx) => (
                <TransactionListItem
                  key={tx.id}
                  transaction={tx}
                  showDetails={showDetails}
                  compact={compact}
                  isVisible={isVisible}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {displayedTransactions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No se encontraron transacciones</p>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={clearAllFilters}
              >
                Limpiar filtros
              </Button>
            )}
          </motion.div>
        )}

        {/* Loading indicator for infinite scroll */}
        {enableInfiniteScroll && (
          <div ref={observerTarget} className="py-4 flex justify-center">
            {loadingMore && (
              <div className="text-muted-foreground text-sm">Cargando más transacciones...</div>
            )}
            {!loadingMore && displayedTransactions.length >= filteredTransactions.length && displayedTransactions.length > 0 && (
              <div className="text-muted-foreground text-sm">No hay más transacciones</div>
            )}
          </div>
        )}

        {/* Show more button (alternative to infinite scroll) */}
        {!enableInfiniteScroll && maxItems && filteredTransactions.length > displayedTransactions.length && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => setDisplayedTransactions(filteredTransactions)}
            >
              Ver todas ({filteredTransactions.length})
            </Button>
          </div>
        )}
      </div>

      {/* Date Range Filter Modal */}
      <DateRangeFilterModal
        open={dateFilterModalOpen}
        onClose={() => setDateFilterModalOpen(false)}
        onApply={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
        currentStartDate={startDate}
        currentEndDate={endDate}
      />
    </div>
  );
}
