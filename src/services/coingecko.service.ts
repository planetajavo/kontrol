// ============================================================================
// COINGECKO SERVICE - Historical prices (EUR) with simple cache
// ============================================================================

export type PricePoint = { date: string; priceEur: number };

const CACHE = new Map<string, number>(); // key: symbol|YYYY-MM-DD -> priceEUR

function toDateKey(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getCoingeckoId(symbol: string): string | null {
  const map: Record<string, string> = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    USDT: 'tether',
    BNB: 'binancecoin',
    SOL: 'solana',
    MATIC: 'matic-network',
    AVAX: 'avalanche-2',
    ADA: 'cardano',
    DOT: 'polkadot',
    LINK: 'chainlink',
    USDC: 'usd-coin'
  };
  return map[symbol.toUpperCase()] || null;
}

export async function getHistoricalPriceEUR(symbol: string, date: Date | string): Promise<number | null> {
  const keyDate = toDateKey(date);
  const cacheKey = `${symbol.toUpperCase()}|${keyDate}`;
  if (CACHE.has(cacheKey)) return CACHE.get(cacheKey)!;

  const id = getCoingeckoId(symbol);
  if (!id) return null;

  // Coingecko historical price endpoint accepts dd-mm-yyyy
  const d = typeof date === 'string' ? new Date(date) : date;
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = d.getUTCFullYear();
  const formatted = `${dd}-${mm}-${yyyy}`;

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/history?date=${formatted}&localization=false`);
    if (!res.ok) throw new Error(`CG error ${res.status}`);
    const data = await res.json();
    const price = data?.market_data?.current_price?.eur;
    if (typeof price === 'number') {
      CACHE.set(cacheKey, price);
      return price;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getValueInEur(symbol: string, amount: number, date: Date | string): Promise<number | null> {
  const p = await getHistoricalPriceEUR(symbol, date);
  return p != null ? amount * p : null;
}
