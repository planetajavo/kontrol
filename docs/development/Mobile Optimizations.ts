// Hook para detectar dispositivo
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile };
};

// Componente responsive
const ResponsiveDashboard: React.FC = () => {
  const { isMobile } = useDeviceDetection();
  
  if (isMobile) {
    return <MobileDashboard />;
  }
  
  return <DesktopDashboard />;
};