// ============================================================================
// THEME CONTEXT - Simplified (Purple Dark Mode Only)
// ============================================================================

import { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'purple';
  isDarkMode: true;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always purple, always dark - no state needed
  return (
    <ThemeContext.Provider value={{ theme: 'purple', isDarkMode: true }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
