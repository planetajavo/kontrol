// ============================================================================
// IMPORTED ADDRESSES - Centralized mock list + helpers
// ============================================================================

export type ImportedAddress = {
  address: string;
  network: 'ethereum' | 'bitcoin' | 'polygon' | 'arbitrum' | 'optimism' | 'avalanche' | 'solana';
  label?: string;
};

// NOTE: This is a mock. In real app, load from user storage/backend.
const IMPORTED_ADDRESSES: ImportedAddress[] = [
  { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', network: 'ethereum', label: 'Main ETH' },
  { address: '0x8a90F2bEb03693eA5d0F3d4C7aB33e8C925b5F2d', network: 'ethereum', label: 'DeFi' },
  { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'bitcoin', label: 'BTC SegWit' },
];

export function getImportedAddresses(): ImportedAddress[] {
  return IMPORTED_ADDRESSES;
}

export function isImportedAddress(address: string): boolean {
  const a = address.toLowerCase();
  return IMPORTED_ADDRESSES.some((x) => x.address.toLowerCase() === a);
}
