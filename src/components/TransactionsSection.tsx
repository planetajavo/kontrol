// ============================================================================
// TRANSACTIONS SECTION - Full Transaction Management View
// ============================================================================

import { useState, useMemo } from 'react';
import { Upload, Download, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import CollapsibleSection from './CollapsibleSection';
import TransactionsList from './TransactionsList';
import ImportedAddressesTransactions from './ImportedAddressesTransactions';
import MissingTransactionsWidget from './MissingTransactionsWidget';
import { generateMockTransactions } from '../utils/mockTransactions';

// Generate mock transactions once
const allTransactions = generateMockTransactions(500);

export default function TransactionsSection() {
  // Transactions are generated once and reused
  const transactions = useMemo(() => allTransactions, []);
  const [allCollapsed, setAllCollapsed] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-foreground">Transactions</h1>
        <p className="text-muted-foreground">Gestiona e importa todas tus transacciones</p>
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
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Importar CSV</span>
            <span className="sm:hidden">Importar</span>
          </Button>

          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>

          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nueva Transacción</span>
            <span className="sm:hidden">Nueva</span>
          </Button>
        </div>
      </div>

      {/* Missing Transactions Widget */}
      <CollapsibleSection
        key={`missing-${collapseKey}`}
        title="Missing Transactions"
        description="Transacciones sin matchear con criterios inteligentes"
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-warning-pastel/10 text-warning-pastel border-warning-pastel/30">4</Badge>}
      >
        <MissingTransactionsWidget />
      </CollapsibleSection>

      {/* Transactions History */}
      <CollapsibleSection
        key={`history-${collapseKey}`}
        title="Historial de Transacciones"
        description={`${transactions.length} transacciones registradas`}
        defaultOpen={!allCollapsed}
        badge={<Badge className="bg-primary/10 text-primary">{transactions.length}</Badge>}
      >
        <TransactionsList
          transactions={transactions}
          enableFilters={true}
          enableSearch={true}
          enableInfiniteScroll={true}
          compact={false}
          showDetails={true}
          groupByMonth={true}
        />
      </CollapsibleSection>

      {/* Imported Addresses Transactions */}
      <CollapsibleSection
        key={`addresses-${collapseKey}`}
        title="Transacciones de Addresses Importadas"
        description="Todas las transacciones on-chain vinculadas a tus direcciones importadas"
        defaultOpen={!allCollapsed}
      >
        <ImportedAddressesTransactions />
      </CollapsibleSection>
    </div>
  );
}
