// ============================================================================
// IMPORTED ADDRESSES TRANSACTIONS - listas virtualizadas por direcciones
// ============================================================================

import { useEffect, useMemo, useState } from 'react';
import { getImportedAddresses } from '../utils/importedAddresses';
import { fetchAddressTransactions, type AlchemyTx } from '../services/alchemy.service';
import { getHistoricalPriceEUR } from '../services/coingecko.service';
import TransactionsList from './TransactionsList';
import { type Transaction } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

// Maps
function symbolForNetwork(network: string): string {
  switch (network) {
    case 'ethereum': return 'ETH';
    case 'polygon': return 'MATIC';
    case 'arbitrum': return 'ETH';
    case 'optimism': return 'ETH';
    default: return 'ETH';
  }
}

export default function ImportedAddressesTransactions() {
  const addresses = useMemo(() => getImportedAddresses(), []);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const all: Transaction[] = [];
      for (const addr of addresses) {
        const { txs } = await fetchAddressTransactions(addr.address, addr.network as any);
        for (const t of txs) {
          const date = new Date((t.timeStamp || Math.floor(Date.now()/1000)) * 1000);
          const symbol = symbolForNetwork(addr.network);
          const price = await getHistoricalPriceEUR(symbol, date);
          const valueInEur = t.valueEth && price ? t.valueEth * price : undefined;
          const amount = t.valueEth ?? 0;

          const tx: Transaction = {
            id: t.hash,
            date,
            type: 'transfer',
            status: t.status === 'failed' ? 'failed' : (t.status === 'pending' ? 'pending' : 'confirmed'),
            amount,
            currency: symbol,
            valueInEur,
            network: addr.network as any,
            fromAddress: t.from,
            toAddress: t.to || undefined,
            txHash: t.hash,
            confirmations: undefined,
            blockNumber: t.blockNumber,
            gasUsed: t.gasUsed,
            gasPriceGwei: t.gasPriceGwei,
            nonce: t.nonce,
            txIndex: t.txIndex,
            classification: 'transfer',
            tradeGroup: addr.label,
          };
          all.push(tx);
        }
      }
      // Most recent first
      all.sort((a, b) => b.date.getTime() - a.date.getTime());
      setTransactions(all);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground">Transacciones de Addresses Importadas</h3>
          <Badge variant="secondary">{transactions.length}</Badge>
        </div>
        <Button size="sm" variant="outline" className="gap-2" onClick={load} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refrescar
        </Button>
      </div>

      <TransactionsList
        transactions={transactions}
        enableFilters={true}
        enableSearch={true}
        enableInfiniteScroll={true}
        groupByMonth={true}
        showDetails={true}
      />
    </div>
  );
}
