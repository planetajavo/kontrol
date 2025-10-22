export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  
  useEffect(() => {
    // Aplicar tema al documento
    document.documentElement.setAttribute('data-theme', theme);
    
    // Guardar preferencia
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return (
    <div className="theme-toggle">
      <button
        onClick={() => setTheme('light')}
        className={cn(theme === 'light' && 'active')}
        aria-label="Light theme"
      >
        <IconSun />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={cn(theme === 'dark' && 'active')}
        aria-label="Dark theme"
      >
        <IconMoon />
      </button>
      
      <button
        onClick={() => setTheme('auto')}
        className={cn(theme === 'auto' && 'active')}
        aria-label="Auto theme"
      >
        <IconAuto />
      </button>
    </div>
  );
};