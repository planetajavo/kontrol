import { Wallet, User, Settings, TrendingUp, FileText, Tags } from 'lucide-react';

interface TopBarProps {
  onShowWallets: () => void;
}

export default function TopBar({ onShowWallets }: TopBarProps) {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-neutral-900">CryptoFiscal</span>
          </div>

          {/* Central Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </button>
            <button 
              onClick={onShowWallets}
              className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Wallets
            </button>
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reportes
            </button>
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2">
              <Tags className="w-4 h-4" />
              Etiquetas
            </button>
          </nav>

          {/* User */}
          <div className="flex items-center gap-4">
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-neutral-700 hidden md:block">Usuario</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
