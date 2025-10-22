import { useState } from 'react';
import { X, Key, Upload, Link, Check, AlertCircle, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';

interface ImportWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportWalletModal({ isOpen, onClose }: ImportWalletModalProps) {
  const [step, setStep] = useState(1);
  const [importType, setImportType] = useState('public-key');
  const [network, setNetwork] = useState('');
  const [walletKey, setWalletKey] = useState('');
  const [walletName, setWalletName] = useState('');
  const [walletColor, setWalletColor] = useState('#3b82f6');
  const [walletTag, setWalletTag] = useState('');
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'error'>('idle');

  const networks = [
    { id: 'btc', name: 'Bitcoin', icon: '₿', color: 'bg-orange-500' },
    { id: 'eth', name: 'Ethereum', icon: 'Ξ', color: 'bg-blue-500' },
    { id: 'bsc', name: 'BSC', icon: 'B', color: 'bg-yellow-500' },
    { id: 'sol', name: 'Solana', icon: 'S', color: 'bg-purple-500' },
    { id: 'matic', name: 'Polygon', icon: 'M', color: 'bg-indigo-500' },
    { id: 'avax', name: 'Avalanche', icon: 'A', color: 'bg-red-500' },
  ];

  const tags = ['Principal', 'Trading', 'Ahorro', 'DeFi', 'NFT', 'Staking'];
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  const validateKey = () => {
    setValidationStatus('validating');
    setTimeout(() => {
      if (walletKey.length > 10) {
        setValidationStatus('valid');
      } else {
        setValidationStatus('error');
      }
    }, 1000);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirm = () => {
    // Simulate wallet import
    setTimeout(() => {
      onClose();
      // Reset state
      setStep(1);
      setImportType('public-key');
      setNetwork('');
      setWalletKey('');
      setWalletName('');
      setWalletTag('');
      setValidationStatus('idle');
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importar Wallet - Paso {step} de 3</DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-blue-600' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Import Type */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>Tipo de Importación</Label>
              <RadioGroup value={importType} onValueChange={setImportType} className="mt-3">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="public-key" id="public-key" />
                  <div className="flex-1">
                    <label htmlFor="public-key" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Key className="w-4 h-4" />
                        <span>Clave Pública</span>
                      </div>
                      <p className="text-neutral-500">Importar usando dirección pública de wallet</p>
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="backup" id="backup" />
                  <div className="flex-1">
                    <label htmlFor="backup" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Upload className="w-4 h-4" />
                        <span>Backup File</span>
                      </div>
                      <p className="text-neutral-500">Subir archivo de backup de wallet</p>
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-neutral-50 cursor-pointer">
                  <RadioGroupItem value="api-key" id="api-key" />
                  <div className="flex-1">
                    <label htmlFor="api-key" className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <Link className="w-4 h-4" />
                        <span>API Key</span>
                      </div>
                      <p className="text-neutral-500">Conectar mediante API key de exchange</p>
                    </label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {/* Step 2: Network Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Selecciona la Red Blockchain</Label>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {networks.map((net) => (
                  <button
                    key={net.id}
                    onClick={() => setNetwork(net.id)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      network === net.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className={`w-12 h-12 ${net.color} text-white rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <span className="text-xl">{net.icon}</span>
                    </div>
                    <div className="text-neutral-900">{net.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Input & Configuration */}
        {step === 3 && (
          <div className="space-y-4">
            {/* Input Field */}
            <div>
              <Label>
                {importType === 'public-key' && 'Clave Pública'}
                {importType === 'backup' && 'Archivo de Backup'}
                {importType === 'api-key' && 'API Key'}
              </Label>
              <div className="relative mt-2">
                {importType === 'backup' ? (
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-neutral-600">Arrastra o haz clic para subir archivo</p>
                  </div>
                ) : (
                  <>
                    <Input
                      value={walletKey}
                      onChange={(e) => setWalletKey(e.target.value)}
                      onBlur={validateKey}
                      placeholder="Ingresa la clave..."
                      className="pr-10"
                    />
                    {validationStatus === 'validating' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    {validationStatus === 'valid' && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-600" />
                    )}
                    {validationStatus === 'error' && (
                      <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
                    )}
                  </>
                )}
              </div>
              {validationStatus === 'valid' && (
                <p className="text-green-600 mt-2 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Clave válida
                </p>
              )}
              {validationStatus === 'error' && (
                <p className="text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Clave inválida
                </p>
              )}
            </div>

            {/* Wallet Configuration */}
            <div className="pt-4 border-t border-neutral-200">
              <Label>Configuración de Wallet</Label>
              
              <div className="space-y-3 mt-3">
                <div>
                  <Label htmlFor="wallet-name">Nombre</Label>
                  <Input
                    id="wallet-name"
                    value={walletName}
                    onChange={(e) => setWalletName(e.target.value)}
                    placeholder="Mi Wallet Principal"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Color</Label>
                  <div className="flex gap-2 mt-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setWalletColor(color)}
                        className={`w-10 h-10 rounded-lg transition-all ${
                          walletColor === color ? 'ring-2 ring-offset-2 ring-neutral-400' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Etiqueta</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        onClick={() => setWalletTag(tag)}
                        className={`cursor-pointer ${
                          walletTag === tag
                            ? 'bg-blue-600 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-neutral-200">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handleBack}
          >
            {step === 1 ? 'Cancelar' : 'Atrás'}
          </Button>
          
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !importType) ||
                (step === 2 && !network)
              }
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              disabled={validationStatus !== 'valid' || !walletName}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Importación
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
