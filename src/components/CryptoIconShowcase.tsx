import React, { useState } from 'react';
import { CryptoIcon, popularCryptos } from './CryptoIcon';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Search, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { copyToClipboard } from '../utils/clipboard';

/**
 * CryptoIconShowcase - Displays all available crypto icons with search
 * Useful for developers to browse and select icons
 */
export function CryptoIconShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState(32);
  const [selectedVariant, setSelectedVariant] = useState<'color' | 'black' | 'white' | 'icon'>('color');

  const filteredCryptos = popularCryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyCode = async (symbol: string) => {
    const code = `<CryptoIcon symbol="${symbol}" size={${selectedSize}} variant="${selectedVariant}" />`;
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedSymbol(symbol);
      setTimeout(() => setCopiedSymbol(null), 2000);
    }
  };

  const sizes = [16, 24, 32, 40, 48, 64];
  const variants: Array<'color' | 'black' | 'white' | 'icon'> = ['color', 'black', 'white', 'icon'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Crypto Icons Library</h2>
        <p className="text-muted-foreground">
          Browse and use 400+ cryptocurrency icons powered by cryptocurrency-icons
        </p>
      </div>

      {/* Controls */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search cryptocurrency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Size</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}px
                </Button>
              ))}
            </div>
          </div>

          {/* Variant Selector */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-2 block">Variant</label>
            <div className="flex flex-wrap gap-2">
              {variants.map(variant => (
                <Button
                  key={variant}
                  variant={selectedVariant === variant ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedVariant(variant)}
                  className="capitalize"
                >
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Icon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredCryptos.map(crypto => (
          <Card
            key={crypto.symbol}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => handleCopyCode(crypto.symbol)}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <CryptoIcon 
                  symbol={crypto.symbol} 
                  size={selectedSize}
                  variant={selectedVariant}
                />
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedSymbol === crypto.symbol ? (
                    <div className="bg-green-500 text-white rounded-full p-1">
                      <Check className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Copy className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{crypto.name}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {crypto.symbol.toUpperCase()}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCryptos.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No cryptocurrencies found matching "{searchTerm}"
          </p>
        </Card>
      )}

      {/* Usage Instructions */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-semibold mb-3">Usage Instructions</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>1. Import the component: <code className="bg-card px-2 py-1 rounded">import {`{ CryptoIcon }`} from './components/CryptoIcon';</code></p>
          <p>2. Use in your JSX: <code className="bg-card px-2 py-1 rounded">{`<CryptoIcon symbol="btc" size={32} variant="color" />`}</code></p>
          <p>3. Click any icon above to copy its code to clipboard</p>
          <p className="mt-4">
            <strong>Available variants:</strong>
            <br />
            • <strong>color</strong> - Full color icons (default)
            <br />
            • <strong>black</strong> - Black silhouette
            <br />
            • <strong>white</strong> - White silhouette (use on dark backgrounds)
            <br />
            • <strong>icon</strong> - Monochrome icon variant
          </p>
        </div>
      </Card>
    </div>
  );
}

export default CryptoIconShowcase;
