// Connection Status Component
interface ConnectionStatusProps {
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSync?: string;
  message?: string;
  onRetry?: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  status,
  lastSync,
  message,
  onRetry
}) => {
  const statusConfig = {
    connected: { icon: '✅', label: 'Connected', color: 'success' },
    syncing: { icon: '🔄', label: 'Syncing', color: 'warning' },
    error: { icon: '❌', label: 'Error', color: 'error' },
    disconnected: { icon: '⚪', label: 'Disconnected', color: 'neutral' }
  };

  const config = statusConfig[status];

  return (
    <div className={cn('connection-status', `status-${config.color}`)}>
      <div className="status-indicator">
        <span className="status-icon">{config.icon}</span>
        <span className="status-label">{config.label}</span>
      </div>
      
      {lastSync && (
        <div className="last-sync">
          Last sync: {formatRelativeTime(lastSync)}
        </div>
      )}
      
      {message && (
        <div className="status-message">{message}</div>
      )}
      
      {status === 'error' && onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};