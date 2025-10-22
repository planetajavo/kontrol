import { Download, Plus, Upload, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface AppTopBarProps {
  section: string;
  onTabChange?: (tab: string) => void;
  currentTab?: string;
  onYearChange?: (year: number) => void;
  currentYear?: number;
  sidebarCollapsed: boolean;
}

export default function AppTopBar({ 
  section, 
  onTabChange, 
  currentTab,
  onYearChange,
  currentYear = 2025,
  sidebarCollapsed
}: AppTopBarProps) {
  const renderActions = () => {
    switch (section) {
      case 'dashboard':
        return (
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Importar
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nueva transacción
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Configurar columnas</DropdownMenuItem>
                <DropdownMenuItem>Exportar CSV</DropdownMenuItem>
                <DropdownMenuItem>Limpiar filtros</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      
      case 'fiscal':
        return (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar informe
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver año anterior</DropdownMenuItem>
                <DropdownMenuItem>Comparar años</DropdownMenuItem>
                <DropdownMenuItem>Generar informe PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      
      case 'wallets':
        return (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
              {['wallets', 'network', 'tags'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange?.(tab)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    currentTab === tab
                      ? 'bg-card shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'wallets' && 'Wallets'}
                  {tab === 'network' && 'Red de conexiones'}
                  {tab === 'tags' && 'Etiquetas'}
                </button>
              ))}
            </div>
            {currentTab === 'wallets' && (
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Añadir wallet
              </Button>
            )}
            {currentTab === 'tags' && (
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nueva etiqueta
              </Button>
            )}
          </div>
        );
      
      case 'exchanges':
        return (
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              Sincronizar todos
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Conectar exchange
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (section) {
      case 'dashboard':
        return {
          title: 'Dashboard',
          subtitle: 'Resumen general de tu actividad crypto'
        };
      case 'fiscal':
        return {
          title: 'Tax & Fiscal',
          subtitle: 'Análisis fiscal y planificación de salida'
        };
      case 'wallets':
        return {
          title: 'My Wallets',
          subtitle: 'Gestiona tus wallets, conexiones y etiquetas'
        };
      case 'exchanges':
        return {
          title: 'My Exchanges',
          subtitle: 'Conecta tus exchanges para importación automática'
        };
      default:
        return {
          title: '',
          subtitle: ''
        };
    }
  };

  const { title, subtitle } = getTitle();

  return (
    <div className={`fixed top-0 ${sidebarCollapsed ? 'left-20' : 'left-64'} right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-1">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        {renderActions()}
      </div>
    </div>
  );
}
