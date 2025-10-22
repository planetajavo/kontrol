// ============================================================================
// ANIMATED SKELETON - Loading states with shimmer effect
// ============================================================================

import { motion } from 'motion/react';

interface AnimatedSkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'chart' | 'list';
  count?: number;
  className?: string;
}

export default function AnimatedSkeleton({ 
  variant = 'card', 
  count = 1,
  className = '' 
}: AnimatedSkeletonProps) {
  
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`bg-card rounded-xl border border-border p-6 ${className}`}>
            <div className="animate-shimmer h-6 w-1/3 rounded-lg mb-4" />
            <div className="animate-shimmer h-10 w-1/2 rounded-lg mb-6" />
            <div className="space-y-3">
              <div className="animate-shimmer h-4 w-full rounded" />
              <div className="animate-shimmer h-4 w-4/5 rounded" />
              <div className="animate-shimmer h-4 w-3/5 rounded" />
            </div>
          </div>
        );
        
      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            <div className="animate-shimmer h-4 w-full rounded" />
            <div className="animate-shimmer h-4 w-5/6 rounded" />
            <div className="animate-shimmer h-4 w-4/6 rounded" />
          </div>
        );
        
      case 'circle':
        return (
          <div className={`animate-shimmer rounded-full ${className}`} 
               style={{ aspectRatio: '1/1' }} />
        );
        
      case 'chart':
        return (
          <div className={`bg-card rounded-xl border border-border p-6 ${className}`}>
            <div className="animate-shimmer h-6 w-1/4 rounded-lg mb-6" />
            <div className="flex items-end justify-between gap-2 h-64">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i}
                  className="animate-shimmer w-full rounded-t"
                  style={{ 
                    height: `${Math.random() * 60 + 40}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        );
        
      case 'list':
        return (
          <div className={`space-y-4 ${className}`}>
            {[...Array(count)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
              >
                <div className="animate-shimmer w-12 h-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="animate-shimmer h-4 w-3/4 rounded" />
                  <div className="animate-shimmer h-3 w-1/2 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return <>{renderSkeleton()}</>;
}
