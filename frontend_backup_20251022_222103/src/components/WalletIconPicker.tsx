import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CryptoIcon, popularCryptos } from './CryptoIcon';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search } from 'lucide-react';

interface WalletIconPickerProps {
  currentIcon: string;
  onSelectIcon: (icon: string) => void;
  children: React.ReactNode;
}

const emojiIcons = [
  '💼', '👛', '🏦', '💰', '💎', '🎯', '🚀', '⚡', '🔥', '🌟',
  '🎨', '🎭', '🎪', '🎬', '🎮', '🎲', '🎯', '🎰', '🏆', '🏅',
  '🔷', '🔶', '🔸', '🔹', '💠', '🔱', '⚜️', '🌈', '🦄', '🐉',
  '🦊', '🐺', '🦁', '🐯', '🐻', '🐼', '🐨', '🐸', '🦋', '🐝',
  '🌸', '🌺', '🌻', '🌹', '🌷', '🌴', '🌲', '🌳', '🎋', '🎍',
];

export default function WalletIconPicker({ currentIcon, onSelectIcon, children }: WalletIconPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCryptos = popularCryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start">
        <Tabs defaultValue="crypto" className="w-full">
          <div className="p-3 border-b border-border">
            <h4 className="text-sm text-foreground mb-1">Selecciona un icono</h4>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="emoji">Emoji</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="crypto" className="p-3 m-0 max-h-80 overflow-y-auto">
            <div className="mb-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar crypto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-8 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {filteredCryptos.map((crypto) => (
                <button
                  key={crypto.symbol}
                  onClick={() => onSelectIcon(crypto.symbol)}
                  className={`
                    w-full aspect-square flex items-center justify-center rounded-lg
                    hover:bg-muted transition-all p-1
                    ${currentIcon === crypto.symbol ? 'bg-primary/10 ring-2 ring-primary' : ''}
                  `}
                  title={crypto.name}
                >
                  <CryptoIcon symbol={crypto.symbol} size={32} />
                </button>
              ))}
            </div>
            {filteredCryptos.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">
                No se encontró "{searchTerm}"
              </p>
            )}
          </TabsContent>

          <TabsContent value="emoji" className="p-3 m-0 max-h-80 overflow-y-auto">
            <div className="grid grid-cols-10 gap-1">
              {emojiIcons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => onSelectIcon(icon)}
                  className={`
                    w-8 h-8 flex items-center justify-center rounded-lg
                    hover:bg-muted transition-all text-xl
                    ${currentIcon === icon ? 'bg-primary/10 ring-2 ring-primary' : ''}
                  `}
                >
                  {icon}
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
