// ============================================================================
// ALCHEMY SERVICE - Fetch transactions by address (mock/fallback)
// ============================================================================

export type AlchemyTx = {
  hash: string;
  from: string;
  to: string | null;
  valueEth?: number;
  blockNumber?: number;
  timeStamp?: number; // seconds
  gasUsed?: number;
  gasPriceGwei?: number;
  nonce?: number;
  txIndex?: number;
  status?: 'success' | 'failed' | 'pending';
};

// NOTE: Without API key/env, we return mock-like data for demo
export async function fetchAddressTransactions(address: string, network: 'ethereum' | 'polygon' | 'arbitrum' | 'optimism' = 'ethereum', pageKey?: string): Promise<{ txs: AlchemyTx[]; nextPageKey?: string }> {
  // If you later set ALCHEMY_API_KEY in env and runtime allows, plug real fetch here
  // Returning small synthetic batch to demonstrate structure
  const now = Date.now();
  const txs: AlchemyTx[] = Array.from({ length: 10 }).map((_, i) => ({
    hash: `0x${Math.random().toString(16).slice(2)}${i}`.padEnd(66, '0'),
    from: address,
    to: Math.random() > 0.3 ? `0x${Math.random().toString(16).slice(2).padEnd(40, 'a')}`.slice(0, 42) : null,
    valueEth: Math.random() * 0.5,
    blockNumber: 2000000 + Math.floor(Math.random() * 3000000),
    timeStamp: Math.floor((now - i * 86400000) / 1000),
    gasUsed: 21000 + Math.floor(Math.random() * 120000),
    gasPriceGwei: 5 + Math.floor(Math.random() * 80),
    nonce: Math.floor(Math.random() * 200),
    txIndex: Math.floor(Math.random() * 200),
    status: 'success'
  }));

  return { txs, nextPageKey: undefined };
}
