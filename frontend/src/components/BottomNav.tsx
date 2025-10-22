import { Globe, Scale, Wallet, Landmark, ArrowLeftRight, Shield, MoreHorizontal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface BottomNavProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function BottomNav({ currentView, onViewChange }: BottomNavProps) {
  const [showMore, setShowMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Globe },
    { id: 'assets', label: 'Assets', icon: Wallet },
    { id: 'fiscal', label: 'Tax', icon: Scale },
    { id: 'transactions', label: 'Trans.', icon: ArrowLeftRight },
  ];

  const moreMenuItems = [
    { id: 'banks', label: 'Banks', icon: Landmark },
    { id: 'aml', label: 'Compliance', icon: Shield },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMore(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isMoreActive = moreMenuItems.some(item => item.id === currentView);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 lg:hidden safe-area-inset-bottom">
      <div className="grid grid-cols-5 h-16 relative">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-primary/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
        
        {/* More Menu */}
        <div ref={moreRef} className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className={`w-full h-full flex flex-col items-center justify-center gap-1 transition-all ${
              isMoreActive
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            <MoreHorizontal className={`w-5 h-5 ${isMoreActive ? 'fill-primary/10' : ''}`} strokeWidth={isMoreActive ? 2.5 : 2} />
            <span className="text-xs">More</span>
          </button>

          {showMore && (
            <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[160px]">
              {moreMenuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                const isLast = index === moreMenuItems.length - 1;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      setShowMore(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    } ${isLast ? 'border-t border-border' : ''}`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
