// ============================================================================
// TOP NAV BAR - Simplified (No theme selector)
// ============================================================================

import Logo from './Logo';
import UserMenu from './UserMenu';

interface TopNavBarProps {
  onLogout: () => void;
  onNavigateToDocs?: () => void;
}

export default function TopNavBar({ onLogout, onNavigateToDocs }: TopNavBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4 md:px-6">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <Logo className="w-9 h-9 flex-shrink-0" />
        <span className="text-foreground font-semibold text-lg tracking-tight">Kontrol</span>
      </div>

      {/* User Menu */}
      <UserMenu userName="Javo" onLogout={onLogout} onNavigateToDocs={onNavigateToDocs} />
    </div>
  );
}
