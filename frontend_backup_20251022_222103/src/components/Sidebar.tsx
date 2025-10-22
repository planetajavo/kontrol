import { Globe, Scale, Wallet, ChevronLeft, ChevronRight, ArrowLeftRight, Landmark, Shield } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ currentView, onViewChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Globe },
    { id: 'fiscal', label: 'Tax Optimizer', icon: Scale },
    { id: 'assets', label: 'Assets', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'banks', label: 'Banks', icon: Landmark },
    { id: 'aml', label: 'Compliance', icon: Shield },
  ];

  return (
    <aside 
      className={`
        hidden lg:flex
        fixed top-16 bottom-0 left-0 z-40
        bg-card border-r border-border shadow-sm flex-col
        transition-all duration-300
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-3' : 'gap-3 px-4'} py-3 rounded-xl transition-all ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-foreground hover:bg-muted'
                  }`}
                  style={isActive ? {
                    background: `linear-gradient(to right, var(--primary-gradient-from), var(--primary-gradient-to))`,
                    boxShadow: '0 10px 15px -3px rgba(var(--primary), 0.2)'
                  } : {}}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-border flex-shrink-0">
        <button 
          onClick={onToggleCollapse}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-3' : 'gap-3 px-4'} py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all`}
          title={isCollapsed ? 'Expandir' : 'Colapsar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Colapsar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
