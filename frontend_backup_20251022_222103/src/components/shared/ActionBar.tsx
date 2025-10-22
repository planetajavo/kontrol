// ============================================================================
// ACTION BAR - Sticky Action Bar Component
// ============================================================================

import { ReactNode } from 'react';

interface ActionBarProps {
  children: ReactNode;
  className?: string;
}

export default function ActionBar({ children, className = '' }: ActionBarProps) {
  return (
    <div className={`sticky top-16 z-10 bg-background/80 backdrop-blur-sm border-b border-border -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 px-4 sm:px-6 lg:px-8 xl:px-12 py-3 mb-6 ${className}`}>
      <div className="flex items-center justify-end gap-2 md:gap-3">
        {children}
      </div>
    </div>
  );
}
