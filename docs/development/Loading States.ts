// Skeleton Loaders
export const SkeletonCard: React.FC = () => (
  <div className="skeleton-card">
    <div className="skeleton-header">
      <div className="skeleton-icon"></div>
      <div className="skeleton-title"></div>
    </div>
    <div className="skeleton-content">
      <div className="skeleton-value"></div>
      <div className="skeleton-chart">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-bar"></div>
        ))}
      </div>
    </div>
  </div>
);

// Progress Indicators
export const SyncProgress: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="sync-progress">
    <div 
      className="progress-bar"
      style={{ width: `${progress}%` }}
    />
    <div className="progress-label">
      {progress === 100 ? 'Complete' : `${Math.round(progress)}%`}
    </div>
  </div>
);