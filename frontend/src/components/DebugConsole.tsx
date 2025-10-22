import { useEffect, useRef } from 'react'
import './DebugConsole.css'

interface Log {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  data?: any;
}

interface DebugConsoleProps {
  logs: Log[];
  onClear: () => void;
}

const DebugConsole = ({ logs, onClear }: DebugConsoleProps) => {
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último log
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogIcon = (type: Log['type']) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getLogClass = (type: Log['type']) => {
    return `log-entry log-${type}`;
  };

  return (
    <div className="debug-console">
      <div className="console-header">
        <h2>🐛 Consola de Debug</h2>
        <div className="console-actions">
          <span className="log-count">{logs.length} logs</span>
          <button 
            className="btn-clear"
            onClick={onClear}
            disabled={logs.length === 0}
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <div className="console-body">
        {logs.length === 0 ? (
          <div className="console-empty">
            <p>Sin logs aún... Importa algunas direcciones para empezar! 👆</p>
          </div>
        ) : (
          <div className="logs-container">
            {logs.map((log) => (
              <div key={log.id} className={getLogClass(log.type)}>
                <span className="log-icon">{getLogIcon(log.type)}</span>
                <span className="log-timestamp">[{log.timestamp}]</span>
                <span className="log-message">{log.message}</span>
                {log.data && (
                  <details className="log-data">
                    <summary>Ver datos</summary>
                    <pre>{JSON.stringify(log.data, null, 2)}</pre>
                  </details>
                )}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        )}
      </div>

      <div className="console-footer">
        <p>💡 Tip: Esta consola muestra todas las operaciones en tiempo real</p>
      </div>
    </div>
  );
};

export default DebugConsole;
