import { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/shared/ErrorBoundary';
import LoadingState from './components/shared/LoadingState';
import TopNavBar from './components/TopNavBar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import ContextualAIChat from './components/ContextualAIChat';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

// Force dark mode
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

// Lazy load sections
const DashboardSection = lazy(() => import('./components/DashboardSection'));
const TaxFiscalSection = lazy(() => import('./components/TaxFiscalSection'));
const AssetsSection = lazy(() => import('./components/AssetsSection'));
const TransactionsSection = lazy(() => import('./components/TransactionsSection'));
const BanksSection = lazy(() => import('./components/BanksSection'));
const AMLKYTSection = lazy(() => import('./components/AMLKYTSection'));
const DocsApp = lazy(() => import('./DocsApp'));

function AppContent() {
  const { isAuthenticated, isLoading: authLoading, login, register, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'register' | 'app' | 'docs'>('landing');
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 1280);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update page state based on authentication
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('app');
    } else if (!authLoading) {
      setCurrentPage('landing');
    }
  }, [isAuthenticated, authLoading]);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    await register(name, email, password);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardSection />;
      case 'fiscal': return <TaxFiscalSection />;
      case 'assets': return <AssetsSection />;
      case 'transactions': return <TransactionsSection />;
      case 'banks': return <BanksSection />;
      case 'aml': return <AMLKYTSection />;
      case 'docs': return <DocsApp onBackToHome={() => setCurrentPage('landing')} />;
      default: return <DashboardSection />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingState message="Cargando Kontrol..." size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    if (currentPage === 'login') {
      return (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentPage('register')}
          onNavigateToHome={() => setCurrentPage('landing')}
        />
      );
    }
    
    if (currentPage === 'register') {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onNavigateToLogin={() => setCurrentPage('login')}
          onNavigateToHome={() => setCurrentPage('landing')}
        />
      );
    }

    if (currentPage === 'docs') {
      return (
        <ErrorBoundary>
          <Suspense fallback={<LoadingState message="Cargando documentación..." />}>
            <DocsApp onBackToHome={() => setCurrentPage('landing')} />
          </Suspense>
        </ErrorBoundary>
      );
    }
    
    return (
      <LandingPage
        onLogin={() => setCurrentPage('login')}
        onRegister={() => setCurrentPage('register')}
        onNavigateToDocs={() => setCurrentPage('docs')}
      />
    );
  }

  // Full-screen docs view
  if (currentView === 'docs') {
    return (
      <div className="min-h-screen bg-background">
        <ErrorBoundary>
          <Suspense fallback={<LoadingState message="Cargando documentación..." />}>
            {renderView()}
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavBar 
        onLogout={handleLogout} 
        onNavigateToDocs={() => setCurrentView('docs')} 
      />
      
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <BottomNav currentView={currentView} onViewChange={setCurrentView} />

      <main className={`pt-16 pb-20 lg:pb-6 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 xl:py-12">
          <ErrorBoundary>
            <Suspense fallback={<LoadingState message="Cargando sección..." />}>
              {renderView()}
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      <ContextualAIChat section={currentView} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
          <Toaster position="top-right" expand={false} richColors closeButton />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
