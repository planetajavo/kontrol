import { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, FileText, Shield, HelpCircle, BookOpen, ChevronDown } from 'lucide-react';

interface UserMenuProps {
  userName: string;
  onLogout: () => void;
  onNavigateToDocs?: () => void;
}

export default function UserMenu({ userName, onLogout, onNavigateToDocs }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: <User className="w-4 h-4" />, label: 'Profile Settings', action: () => console.log('Profile') },
    { icon: <Settings className="w-4 h-4" />, label: 'Preferences', action: () => console.log('Preferences') },
    { icon: <FileText className="w-4 h-4" />, label: 'Reports & Documents', action: () => console.log('Reports') },
    { icon: <Shield className="w-4 h-4" />, label: 'Security & Privacy', action: () => console.log('Security') },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'Help & Support', action: () => console.log('Help') },
  ];
  
  const docsItem = { icon: <BookOpen className="w-4 h-4" />, label: 'Documentación', action: () => onNavigateToDocs?.() };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-gradient-to flex items-center justify-center text-primary-foreground font-semibold">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline font-medium">{userName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-3 border-b border-border">
            <div className="font-medium">{userName}</div>
            <div className="text-sm text-muted-foreground">javo@kontrol.app</div>
          </div>

          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent transition-colors text-left"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            
            {onNavigateToDocs && (
              <button
                onClick={() => {
                  docsItem.action();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-accent transition-colors text-left"
              >
                {docsItem.icon}
                <span>{docsItem.label}</span>
              </button>
            )}
          </div>

          <div className="border-t border-border pt-2">
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-destructive/10 text-destructive transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
