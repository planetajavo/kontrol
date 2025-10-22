// ============================================================================
// WALLET SERVICE - Mock Data & API
// ============================================================================

import { Wallet, ApiResponse } from '../types';

// Mock data
const mockWallets: Wallet[] = [
  {
    id: '1',
    name: 'Main Wallet',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    type: 'hot',
    network: 'ethereum',
    balance: 2.5,
    balanceUSD: 5840.50,
    icon: '🔵',
    color: '#627EEA',
    createdAt: new Date('2024-01-15'),
    lastSync: new Date(),
  },
  {
    id: '2',
    name: 'Hardware Security',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    type: 'hardware',
    network: 'bitcoin',
    balance: 0.15,
    balanceUSD: 9450.00,
    icon: '🔐',
    color: '#F7931A',
    createdAt: new Date('2023-11-20'),
    lastSync: new Date(),
  },
];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const walletService = {
  async getWallets(): Promise<ApiResponse<Wallet[]>> {
    await delay(500);
    
    try {
      return {
        success: true,
        data: mockWallets,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: 'Error al cargar wallets',
      };
    }
  },

  async getWalletById(id: string): Promise<ApiResponse<Wallet>> {
    await delay(300);
    
    const wallet = mockWallets.find(w => w.id === id);
    
    if (wallet) {
      return {
        success: true,
        data: wallet,
        error: null,
      };
    }
    
    return {
      success: false,
      data: null,
      error: 'Wallet no encontrada',
    };
  },

  async createWallet(wallet: Omit<Wallet, 'id' | 'createdAt' | 'lastSync'>): Promise<ApiResponse<Wallet>> {
    await delay(800);
    
    try {
      const newWallet: Wallet = {
        ...wallet,
        id: Date.now().toString(),
        createdAt: new Date(),
        lastSync: new Date(),
      };
      
      mockWallets.push(newWallet);
      
      return {
        success: true,
        data: newWallet,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: 'Error al crear wallet',
      };
    }
  },

  async updateWallet(id: string, updates: Partial<Wallet>): Promise<ApiResponse<Wallet>> {
    await delay(500);
    
    const index = mockWallets.findIndex(w => w.id === id);
    
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Wallet no encontrada',
      };
    }
    
    mockWallets[index] = { ...mockWallets[index], ...updates };
    
    return {
      success: true,
      data: mockWallets[index],
      error: null,
    };
  },

  async deleteWallet(id: string): Promise<ApiResponse<boolean>> {
    await delay(500);
    
    const index = mockWallets.findIndex(w => w.id === id);
    
    if (index === -1) {
      return {
        success: false,
        data: null,
        error: 'Wallet no encontrada',
      };
    }
    
    mockWallets.splice(index, 1);
    
    return {
      success: true,
      data: true,
      error: null,
    };
  },

  async syncWallet(id: string): Promise<ApiResponse<Wallet>> {
    await delay(1500);
    
    const wallet = mockWallets.find(w => w.id === id);
    
    if (!wallet) {
      return {
        success: false,
        data: null,
        error: 'Wallet no encontrada',
      };
    }
    
    // Simulate balance update
    wallet.lastSync = new Date();
    wallet.balanceUSD = wallet.balanceUSD * (1 + (Math.random() - 0.5) * 0.02);
    
    return {
      success: true,
      data: wallet,
      error: null,
    };
  },
};
