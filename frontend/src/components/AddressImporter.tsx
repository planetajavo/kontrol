import { useState } from 'react'
import './AddressImporter.css'

interface AddressImporterProps {
  onImport: (addresses: string[]) => void;
  onLog: (type: 'info' | 'success' | 'error' | 'warning', message: string, data?: any) => void;
}

const AddressImporter = ({ onImport, onLog }: AddressImporterProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Validar si una dirección es válida (básico)
  const isValidAddress = (address: string): boolean => {
    // Ethereum/Polygon address (0x + 40 hex chars)
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    // Bitcoin address (legacy, segwit)
    const btcRegex = /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,62}$/;
    
    return ethRegex.test(address) || btcRegex.test(address);
  };

  const handleImport = async () => {
    if (!inputValue.trim()) {
      onLog('warning', 'Por favor ingresa al menos una dirección');
      return;
    }

    setIsProcessing(true);
    onLog('info', 'Procesando direcciones...');

    try {
      // Split by newlines and commas, clean up
      const rawAddresses = inputValue
        .split(/[\n,]+/)
        .map(addr => addr.trim())
        .filter(addr => addr.length > 0);

      onLog('info', `Encontradas ${rawAddresses.length} direcciones para validar`);

      // Validate addresses
      const validAddresses: string[] = [];
      const invalidAddresses: string[] = [];

      rawAddresses.forEach(addr => {
        if (isValidAddress(addr)) {
          validAddresses.push(addr);
        } else {
          invalidAddresses.push(addr);
        }
      });

      // Log results
      if (invalidAddresses.length > 0) {
        onLog('warning', `${invalidAddresses.length} direcciones inválidas ignoradas`, { invalid: invalidAddresses });
      }

      if (validAddresses.length === 0) {
        onLog('error', 'No se encontraron direcciones válidas');
        setIsProcessing(false);
        return;
      }

      // Aquí podrías hacer una llamada al backend
      // const response = await fetch('/api/addresses/import', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ addresses: validAddresses })
      // });

      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 500));

      onLog('success', `✅ ${validAddresses.length} direcciones importadas correctamente`);
      onImport(validAddresses);
      setInputValue(''); // Clear input

    } catch (error) {
      onLog('error', 'Error al importar direcciones', { error });
      console.error('Import error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePasteExample = () => {
    // Ejemplos de direcciones para testing
    const examples = [
      '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    ];
    setInputValue(examples.join('\n'));
    onLog('info', 'Direcciones de ejemplo cargadas');
  };

  return (
    <div className="address-importer">
      <div className="importer-header">
        <p className="importer-description">
          Pega tus direcciones de wallet (una por línea o separadas por comas).
          Soporta: Ethereum, Polygon, Bitcoin.
        </p>
        <button 
          className="btn-example"
          onClick={handlePasteExample}
          disabled={isProcessing}
        >
          📋 Cargar Ejemplo
        </button>
      </div>

      <textarea
        className="address-input"
        placeholder="Ej:&#10;0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb&#10;0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&#10;1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        rows={8}
        disabled={isProcessing}
      />

      <button 
        className="btn-import"
        onClick={handleImport}
        disabled={isProcessing || !inputValue.trim()}
      >
        {isProcessing ? '⏳ Procesando...' : '🚀 Importar Direcciones'}
      </button>
    </div>
  );
};

export default AddressImporter;
