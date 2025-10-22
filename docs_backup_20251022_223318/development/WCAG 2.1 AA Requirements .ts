// ARIA Labels y Roles
const AccessibleComponent: React.FC = () => (
  <div 
    role="region"
    aria-label="Portfolio Overview"
    aria-describedby="portfolio-description"
  >
    <h2 id="portfolio-description">Portfolio Value and Performance</h2>
    
    <button
      aria-label="Sync all exchanges"
      aria-describedby="sync-status"
    >
      <IconSync />
      <span id="sync-status" className="sr-only">
        Last synced 2 minutes ago
      </span>
    </button>
  </div>
);

// Focus Management
const FocusTrap: React.FC = () => {
  const trapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const trap = trapRef.current;
    if (!trap) return;
    
    const focusableElements = trap.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    trap.addEventListener('keydown', handleKeyDown);
    return () => trap.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return <div ref={trapRef}>{/* content */}</div>;
};