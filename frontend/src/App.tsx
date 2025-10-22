import { useState } from 'react'
import AddressImporter from './components/AddressImporter'
import DebugConsole from './components/DebugConsole'
import './App.css'

// Hook para gestionar los logs de debug
export const useDebugLogs = () => {
  const [logs, setLogs] = useState<Array<{
    id: string;
    timestamp: string;
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
    data?: any;
  }>>([]);

  const addLog = (type: 'info' | 'success' | 'error' | 'warning', message: string, data?: any) => {
    const newLog = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString('es-ES'),
      type,
      message,
      data
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  };

  const clearLogs = () => setLogs([]);

  return { logs, addLog, clearLogs };
};

function App() {
  const { logs, addLog, clearLogs } = useDebugLogs();
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleAddressesImported = (importedAddresses: string[]) => {
    setAddresses(importedAddresses);
    addLog('success', `${importedAddresses.length} direcciones importadas`, { addresses: importedAddresses });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>🎯 KONTROL</h1>
          <p className="subtitle">Plataforma de Gestión Crypto-Fiscal MVP</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Sección de Importación */}
        <section className="section">
          <h2>📥 Importar Direcciones</h2>
          <AddressImporter 
            onImport={handleAddressesImported}
            onLog={addLog}
          />
          
          {/* Mostrar direcciones importadas */}
          {addresses.length > 0 && (
            <div className="addresses-list">
              <h3>Direcciones Importadas ({addresses.length})</h3>
              <div className="addresses-grid">
                {addresses.map((address, idx) => (
                  <div key={idx} className="address-card">
                    <span className="address-label">#{idx + 1}</span>
                    <code className="address-value">{address}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Consola de Debug */}
        <section className="section console-section">
          <DebugConsole 
            logs={logs}
            onClear={clearLogs}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Desarrollado con ❤️ para la comunidad crypto | MVP v0.1.0</p>
      </footer>
    </div>
  )
}

export default App
