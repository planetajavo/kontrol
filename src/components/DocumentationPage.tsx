import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Book, 
  Code2, 
  Rocket, 
  Settings, 
  GitBranch, 
  FileCode, 
  Palette, 
  Database,
  Server,
  Layout,
  Zap,
  Shield,
  Search,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Github
} from 'lucide-react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { copyToClipboard } from '../utils/clipboard';

interface DocSection {
  id: string;
  title: string;
  icon: any;
  subsections: {
    id: string;
    title: string;
  }[];
}

const documentationSections: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introducción',
    icon: Book,
    subsections: [
      { id: 'what-is-kontrol', title: '¿Qué es Kontrol?' },
      { id: 'features', title: 'Características Principales' },
      { id: 'tech-stack', title: 'Stack Tecnológico' },
    ]
  },
  {
    id: 'getting-started',
    title: 'Primeros Pasos',
    icon: Rocket,
    subsections: [
      { id: 'installation', title: 'Instalación' },
      { id: 'quick-start', title: 'Inicio Rápido' },
      { id: 'configuration', title: 'Configuración' },
    ]
  },
  {
    id: 'architecture',
    title: 'Arquitectura',
    icon: Layout,
    subsections: [
      { id: 'overview', title: 'Visión General' },
      { id: 'folder-structure', title: 'Estructura de Carpetas' },
      { id: 'data-flow', title: 'Flujo de Datos' },
    ]
  },
  {
    id: 'api',
    title: 'API Reference',
    icon: Server,
    subsections: [
      { id: 'authentication', title: 'Autenticación' },
      { id: 'endpoints', title: 'Endpoints' },
      { id: 'webhooks', title: 'Webhooks' },
    ]
  },
  {
    id: 'components',
    title: 'Componentes',
    icon: Code2,
    subsections: [
      { id: 'ui-components', title: 'Componentes UI' },
      { id: 'shared-components', title: 'Componentes Compartidos' },
      { id: 'custom-hooks', title: 'Custom Hooks' },
    ]
  },
  {
    id: 'design-system',
    title: 'Sistema de Diseño',
    icon: Palette,
    subsections: [
      { id: 'colors', title: 'Paleta de Colores' },
      { id: 'typography', title: 'Tipografía' },
      { id: 'tokens', title: 'Design Tokens' },
    ]
  },
  {
    id: 'workflow',
    title: 'Workflow & Handoff',
    icon: GitBranch,
    subsections: [
      { id: 'figma-integration', title: 'Integración con Figma' },
      { id: 'version-control', title: 'Control de Versiones' },
      { id: 'ci-cd', title: 'CI/CD Pipeline' },
      { id: 'team-workflow', title: 'Workflow del Equipo' },
    ]
  },
  {
    id: 'deployment',
    title: 'Despliegue',
    icon: Zap,
    subsections: [
      { id: 'production', title: 'Producción' },
      { id: 'staging', title: 'Staging' },
      { id: 'monitoring', title: 'Monitoreo' },
    ]
  },
];

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute right-3 top-3 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success-pastel" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-foreground font-mono">{code}</code>
      </pre>
    </div>
  );
}

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('what-is-kontrol');
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-foreground">Documentación Kontrol</h1>
                <p className="text-sm text-muted-foreground">Guía completa para desarrolladores</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Github className="w-4 h-4" />
              Ver en GitHub
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar en docs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Navigation */}
              <ScrollArea className="h-[calc(100vh-200px)]">
                <nav className="space-y-1">
                  {documentationSections.map((section) => (
                    <div key={section.id} className="space-y-1">
                      <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                        <section.icon className="w-4 h-4" />
                        <span>{section.title}</span>
                      </div>
                      {section.subsections.map((subsection) => (
                        <button
                          key={subsection.id}
                          onClick={() => scrollToSection(subsection.id)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all flex items-center justify-between group ${
                            activeSection === subsection.id
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                          }`}
                        >
                          <span className="ml-6">{subsection.title}</span>
                          {activeSection === subsection.id && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      ))}
                    </div>
                  ))}
                </nav>
              </ScrollArea>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-invert max-w-none">
              
              {/* Introduction */}
              <section id="what-is-kontrol" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/10 text-primary">Introducción</Badge>
                </div>
                <h2 className="text-3xl text-foreground mb-4">¿Qué es Kontrol?</h2>
                <p className="text-muted-foreground mb-6">
                  Kontrol es un dashboard financiero cripto profesional diseñado para ofrecer control total sobre tus activos digitales. 
                  Combina análisis fiscal avanzado, seguimiento de transacciones en tiempo real, y cumplimiento normativo (AML/KYT) en una interfaz moderna y responsive.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Shield className="w-8 h-8 text-success-pastel mb-3" />
                    <h3 className="text-lg text-foreground mb-2">Seguro</h3>
                    <p className="text-sm text-muted-foreground">
                      Implementación de mejores prácticas de seguridad y cumplimiento normativo.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Zap className="w-8 h-8 text-warning-pastel mb-3" />
                    <h3 className="text-lg text-foreground mb-2">Rápido</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimizado para rendimiento con lazy loading y code splitting.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Palette className="w-8 h-8 text-info-pastel mb-3" />
                    <h3 className="text-lg text-foreground mb-2">Moderno</h3>
                    <p className="text-sm text-muted-foreground">
                      Diseño glassmorphism con paleta pastel y animaciones fluidas.
                    </p>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section id="features" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Características Principales</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground mb-1">Dashboard Unificado</h3>
                      <p className="text-muted-foreground">
                        Vista consolidada de portfolio con P&L realizada/no realizada, base imponible y detección de actividad de bots.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground mb-1">Análisis Fiscal Avanzado</h3>
                      <p className="text-muted-foreground">
                        Cálculo automático de impuestos, pérdidas compensables, simulador fiscal y generación de informes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground mb-1">Gestión Multi-Wallet</h3>
                      <p className="text-muted-foreground">
                        Soporte para múltiples wallets, exchanges (CEX/DEX), y visualización de red blockchain.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground mb-1">AML & KYT Compliance</h3>
                      <p className="text-muted-foreground">
                        Seguimiento de riesgos, análisis de transacciones sospechosas y cumplimiento normativo.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground mb-1">Sistema de Componentes Reutilizables</h3>
                      <p className="text-muted-foreground">
                        Arquitectura modular con componentes compartidos, custom hooks y service layer.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tech Stack */}
              <section id="tech-stack" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Stack Tecnológico</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-4 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-primary" />
                      Frontend
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        React 18 + TypeScript
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Tailwind CSS v4
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Motion (Framer Motion)
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Recharts
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        shadcn/ui
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Lucide Icons
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-4 flex items-center gap-2">
                      <Server className="w-5 h-5 text-primary" />
                      Backend (Planeado)
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Node.js / Python FastAPI
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Supabase / PostgreSQL
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        OpenAPI / Swagger
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary" />
                        Zod (Validación)
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Installation */}
              <section id="installation" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-success-pastel/10 text-success-pastel">Primeros Pasos</Badge>
                </div>
                <h2 className="text-3xl text-foreground mb-6">Instalación</h2>
                <p className="text-muted-foreground mb-6">
                  Sigue estos pasos para configurar el proyecto localmente:
                </p>

                <h3 className="text-xl text-foreground mb-3">1. Clonar el repositorio</h3>
                <CodeBlock code={`git clone https://github.com/tu-usuario/kontrol.git
cd kontrol`} />

                <h3 className="text-xl text-foreground mb-3 mt-6">2. Instalar dependencias</h3>
                <CodeBlock code={`pnpm install
# o
npm install`} />

                <h3 className="text-xl text-foreground mb-3 mt-6">3. Configurar variables de entorno</h3>
                <CodeBlock code={`# Crear archivo .env
cp .env.example .env

# Configurar las siguientes variables:
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_key
VITE_FIGMA_TOKEN=tu_figma_token`} />

                <h3 className="text-xl text-foreground mb-3 mt-6">4. Iniciar servidor de desarrollo</h3>
                <CodeBlock code={`pnpm dev
# La aplicación estará disponible en http://localhost:5173`} />
              </section>

              {/* Architecture Overview */}
              <section id="overview" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-info-pastel/10 text-info-pastel">Arquitectura</Badge>
                </div>
                <h2 className="text-3xl text-foreground mb-6">Visión General de la Arquitectura</h2>
                <p className="text-muted-foreground mb-6">
                  Kontrol sigue una arquitectura modular y escalable con separación clara de responsabilidades:
                </p>

                <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
                  <pre className="text-sm text-foreground overflow-x-auto">
{`┌─────────────────────────────────────────────┐
│           PRESENTATION LAYER                │
│  - React Components                         │
│  - UI Components (shadcn/ui)                │
│  - Shared Components                        │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│          BUSINESS LOGIC LAYER               │
│  - Custom Hooks                             │
│  - Context API (Auth, Theme)                │
│  - Utilities & Formatters                   │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│            SERVICE LAYER                    │
│  - API Services                             │
│  - Data Transformation                      │
│  - Mock Data Generators                     │
└──────────────┬──────────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────────┐
│             DATA LAYER                      │
│  - Supabase / Backend API                   │
│  - TypeScript Types                         │
│  - Validation Schemas                       │
└─────────────────────────────────────────────┘`}
                  </pre>
                </div>

                <h3 className="text-xl text-foreground mb-3">Principios Clave</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span><strong className="text-foreground">Separación de Responsabilidades:</strong> Cada capa tiene una función específica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span><strong className="text-foreground">Reutilización:</strong> Componentes y hooks compartidos en toda la app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span><strong className="text-foreground">Type Safety:</strong> TypeScript estricto en todos los niveles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <span><strong className="text-foreground">Performance:</strong> Lazy loading y code splitting para optimización</span>
                  </li>
                </ul>
              </section>

              {/* Folder Structure */}
              <section id="folder-structure" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Estructura de Carpetas</h2>
                <CodeBlock 
                  language="text"
                  code={`kontrol/
├── components/              # Componentes React
│   ├── ui/                 # Componentes shadcn/ui
│   ├── shared/             # Componentes reutilizables
│   ├── figma/              # Componentes de Figma imports
│   └── *.tsx               # Componentes de página/sección
│
├── contexts/               # Context API providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── hooks/                  # Custom React hooks
│   ├── useAnimatedCounter.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
├── services/               # Lógica de negocio & API calls
│   └── wallet.service.ts
│
├── types/                  # TypeScript type definitions
│   └── index.ts
│
├── utils/                  # Utilidades y helpers
│   ├── constants.ts
│   ├── formatters.ts
│   └── validators.ts
│
├── styles/                 # Estilos globales
│   └── globals.css
│
└── App.tsx                 # Punto de entrada principal`}
                />
              </section>

              {/* API Authentication */}
              <section id="authentication" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-warning-pastel/10 text-warning-pastel">API Reference</Badge>
                </div>
                <h2 className="text-3xl text-foreground mb-6">Autenticación</h2>
                <p className="text-muted-foreground mb-6">
                  Kontrol utiliza JWT (JSON Web Tokens) para autenticación. Todas las peticiones a la API deben incluir un token válido.
                </p>

                <h3 className="text-xl text-foreground mb-3">Login</h3>
                <CodeBlock 
                  language="http"
                  code={`POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}`}
                />

                <h3 className="text-xl text-foreground mb-3 mt-6">Uso del Token</h3>
                <CodeBlock 
                  language="http"
                  code={`GET /api/transactions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}
                />
              </section>

              {/* API Endpoints */}
              <section id="endpoints" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Endpoints Principales</h2>

                <div className="space-y-6">
                  {/* Transactions */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-success-pastel/10 text-success-pastel">GET</Badge>
                      <code className="text-sm text-foreground">/api/transactions</code>
                    </div>
                    <p className="text-muted-foreground mb-4">Obtiene las transacciones del usuario</p>
                    <CodeBlock code={`// Request
GET /api/transactions?limit=50&offset=0&type=buy

// Response
{
  "data": [
    {
      "id": "tx_123",
      "type": "buy",
      "amount": 1.5,
      "crypto": "BTC",
      "fiat": 45000,
      "date": "2025-10-15T10:30:00Z",
      "wallet": "wallet_456"
    }
  ],
  "total": 500,
  "hasMore": true
}`} />
                  </div>

                  {/* Wallets */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-success-pastel/10 text-success-pastel">GET</Badge>
                      <code className="text-sm text-foreground">/api/wallets</code>
                    </div>
                    <p className="text-muted-foreground mb-4">Lista todas las wallets del usuario</p>
                    <CodeBlock code={`// Response
{
  "wallets": [
    {
      "id": "wallet_123",
      "name": "Main Wallet",
      "type": "hot",
      "blockchain": "ethereum",
      "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "balance": {
        "ETH": 2.5,
        "USDT": 10000
      }
    }
  ]
}`} />
                  </div>

                  {/* Tax Report */}
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-info-pastel/10 text-info-pastel">POST</Badge>
                      <code className="text-sm text-foreground">/api/tax/report</code>
                    </div>
                    <p className="text-muted-foreground mb-4">Genera un informe fiscal</p>
                    <CodeBlock code={`// Request
POST /api/tax/report
{
  "year": 2025,
  "country": "ES"
}

// Response
{
  "report": {
    "totalGains": 15000,
    "totalLosses": 3000,
    "netGains": 12000,
    "taxableBase": 11400,
    "estimatedTax": 2280
  },
  "downloadUrl": "https://api.kontrol.app/reports/2025_tax_report.pdf"
}`} />
                  </div>
                </div>
              </section>

              {/* UI Components */}
              <section id="ui-components" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-destructive-pastel/10 text-destructive-pastel">Componentes</Badge>
                </div>
                <h2 className="text-3xl text-foreground mb-6">Componentes UI</h2>
                <p className="text-muted-foreground mb-6">
                  Kontrol utiliza <strong className="text-foreground">shadcn/ui</strong> como base de componentes. 
                  Todos los componentes están ubicados en <code className="text-primary">/components/ui/</code>.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {['Button', 'Card', 'Dialog', 'Input', 'Select', 'Tabs', 'Table', 'Badge', 'Tooltip', 'Dropdown', 'Sheet', 'Accordion'].map((comp) => (
                    <div key={comp} className="bg-card border border-border rounded-lg p-3 text-center text-sm text-foreground">
                      {comp}
                    </div>
                  ))}
                </div>

                <h3 className="text-xl text-foreground mb-3">Ejemplo de Uso</h3>
                <CodeBlock 
                  language="tsx"
                  code={`import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

function MyComponent() {
  return (
    <Card className="p-6">
      <h2>Título</h2>
      <p>Contenido de la tarjeta</p>
      <Button variant="default">
        Acción Principal
      </Button>
    </Card>
  );
}`}
                />
              </section>

              {/* Shared Components */}
              <section id="shared-components" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Componentes Compartidos</h2>
                <p className="text-muted-foreground mb-6">
                  Componentes reutilizables específicos de Kontrol ubicados en <code className="text-primary">/components/shared/</code>:
                </p>

                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="text-foreground mb-2">LoadingState</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Spinner animado con mensaje personalizable y diferentes tamaños.
                    </p>
                    <CodeBlock code={`<LoadingState message="Cargando..." size="lg" />`} language="tsx" />
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="text-foreground mb-2">EmptyState</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Estado vacío con icono, título, descripción y acción opcional.
                    </p>
                    <CodeBlock code={`<EmptyState
  icon={Wallet}
  title="No hay wallets"
  description="Crea tu primera wallet para empezar"
  action={
    <Button onClick={handleCreate}>
      Crear Wallet
    </Button>
  }
/>`} language="tsx" />
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="text-foreground mb-2">InfoTooltip</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tooltip informativo con icono de ayuda.
                    </p>
                    <CodeBlock code={`<InfoTooltip 
  content="Información adicional sobre este campo"
  side="right"
/>`} language="tsx" />
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="text-foreground mb-2">GradientCard</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Tarjeta con efecto glassmorphism y gradiente animado.
                    </p>
                    <CodeBlock code={`<GradientCard 
  gradient="purple"
  glowEffect={true}
>
  {children}
</GradientCard>`} language="tsx" />
                  </div>
                </div>
              </section>

              {/* Custom Hooks */}
              <section id="custom-hooks" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Custom Hooks</h2>
                <p className="text-muted-foreground mb-6">
                  Hooks personalizados para lógica reutilizable:
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl text-foreground mb-3">useAnimatedCounter</h3>
                    <p className="text-muted-foreground mb-3">
                      Anima números con efecto de conteo incremental.
                    </p>
                    <CodeBlock 
                      language="tsx"
                      code={`import { useAnimatedCounter } from './hooks/useAnimatedCounter';

const value = useAnimatedCounter(42500, 1000); // 0 → 42500 en 1s`}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl text-foreground mb-3">useDebounce</h3>
                    <p className="text-muted-foreground mb-3">
                      Debounce para inputs y búsquedas.
                    </p>
                    <CodeBlock 
                      language="tsx"
                      code={`import { useDebounce } from './hooks/useDebounce';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);

// Hacer búsqueda con debouncedSearch`}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl text-foreground mb-3">useLocalStorage</h3>
                    <p className="text-muted-foreground mb-3">
                      Persistencia en localStorage con TypeScript.
                    </p>
                    <CodeBlock 
                      language="tsx"
                      code={`import { useLocalStorage } from './hooks/useLocalStorage';

const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('theme', 'dark');`}
                    />
                  </div>
                </div>
              </section>

              {/* Design System - Colors */}
              <section id="colors" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/10 text-primary">Sistema de Diseño</Badge>
                </div>
                <h2 className="text-3xl text-foreground mb-6">Paleta de Colores</h2>
                <p className="text-muted-foreground mb-6">
                  Kontrol utiliza una paleta moderna de colores pastel con excelente contraste WCAG AA.
                </p>

                <h3 className="text-xl text-foreground mb-4">Colores Principales</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg bg-primary" />
                    <p className="text-sm text-foreground">Primary</p>
                    <code className="text-xs text-muted-foreground">#8B5CF6</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg bg-success-pastel" />
                    <p className="text-sm text-foreground">Success</p>
                    <code className="text-xs text-muted-foreground">#34D399</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg bg-warning-pastel" />
                    <p className="text-sm text-foreground">Warning</p>
                    <code className="text-xs text-muted-foreground">#FBBF24</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-20 rounded-lg bg-destructive-pastel" />
                    <p className="text-sm text-foreground">Destructive</p>
                    <code className="text-xs text-muted-foreground">#F87171</code>
                  </div>
                </div>

                <h3 className="text-xl text-foreground mb-4">Uso en Tailwind</h3>
                <CodeBlock 
                  language="tsx"
                  code={`// Texto
<p className="text-primary">Primary color</p>
<p className="text-success-pastel">Success color</p>

// Fondo
<div className="bg-primary/10">Fondo primary suave</div>
<div className="bg-warning-pastel">Fondo warning</div>

// Bordes
<div className="border-info-pastel">Border info</div>`}
                />
              </section>

              {/* Typography */}
              <section id="typography" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Tipografía</h2>
                <p className="text-muted-foreground mb-6">
                  Kontrol utiliza <strong className="text-foreground">Inter</strong> como fuente principal con pesos de 300 a 700.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-baseline gap-4">
                    <h1 className="text-foreground">Heading 1</h1>
                    <span className="text-sm text-muted-foreground">2.5rem / 40px</span>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <h2 className="text-foreground">Heading 2</h2>
                    <span className="text-sm text-muted-foreground">2rem / 32px</span>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <h3 className="text-foreground">Heading 3</h3>
                    <span className="text-sm text-muted-foreground">1.5rem / 24px</span>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <p className="text-foreground">Body Text</p>
                    <span className="text-sm text-muted-foreground">1rem / 16px</span>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <p className="text-sm text-foreground">Small Text</p>
                    <span className="text-sm text-muted-foreground">0.875rem / 14px</span>
                  </div>
                </div>

                <CodeBlock 
                  language="css"
                  code={`/* No uses clases de tamaño de fuente a menos que sea necesario */
/* Los elementos HTML tienen estilos por defecto en globals.css */

h1 { } /* Ya tiene estilos definidos */
h2 { } /* Ya tiene estilos definidos */
p  { } /* Ya tiene estilos definidos */`}
                />
              </section>

              {/* Workflow - Figma Integration */}
              <section id="figma-integration" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-info-pastel/10 text-info-pastel">Workflow & Handoff</Badge>
                </div>
                <h2 className="text-3xl text-foreground mb-6">Integración con Figma</h2>
                <p className="text-muted-foreground mb-6">
                  Kontrol utiliza un sistema automatizado de sincronización de design tokens desde Figma.
                </p>

                <h3 className="text-xl text-foreground mb-3">Estructura en Figma</h3>
                <CodeBlock 
                  language="text"
                  code={`📁 Kontrol (Organization)
  ├── 📁 Design System
  │   ├── 📄 Tokens (Colors, Spacing, Typography)
  │   ├── 📄 Components Library
  │   └── 📄 Icons & Assets
  │
  ├── 📁 Product Screens
  │   ├── 📄 v1.0.0 - Dashboard [CURRENT]
  │   ├── 📄 v1.1.0 - Tax Module [WIP]
  │   └── 📄 Archive (old versions)
  │
  └── 📁 Prototypes
      ├── 📄 User Flow - Onboarding
      └── 📄 User Flow - Tax Report`}
                />

                <h3 className="text-xl text-foreground mb-3 mt-6">Versionado Semántico</h3>
                <p className="text-muted-foreground mb-4">
                  Usa páginas con nombres versionados en Figma:
                </p>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">MAJOR</Badge>
                    <span>v2.0.0 - Cambios que rompen la estructura existente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">MINOR</Badge>
                    <span>v1.1.0 - Nuevas features sin romper lo existente</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">PATCH</Badge>
                    <span>v1.0.1 - Bug fixes y mejoras pequeñas</span>
                  </li>
                </ul>

                <h3 className="text-xl text-foreground mb-3">Configurar Sync Automático</h3>
                <CodeBlock code={`# Instalar dependencias
pnpm add -D @figma/figma-api style-dictionary

# Crear script de sync
node packages/design-tokens/sync-figma.js

# El script exportará:
# - tokens.json (Design tokens)
# - tokens.css (CSS variables)
# - tokens.js (JS constants)`} />
              </section>

              {/* Version Control */}
              <section id="version-control" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Control de Versiones</h2>
                <p className="text-muted-foreground mb-6">
                  Estrategia de branching basada en Git Flow adaptado.
                </p>

                <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
                  <pre className="text-sm text-foreground overflow-x-auto">
{`main (production)
  ├── staging (pre-production)
  │     ├── develop (integration)
  │     │     ├── feature/dashboard-v2
  │     │     ├── feature/tax-module
  │     │     └── fix/transaction-list
  │     └── hotfix/critical-bug
  └── release/v1.2.0`}
                  </pre>
                </div>

                <h3 className="text-xl text-foreground mb-3">Convenciones de Commits</h3>
                <p className="text-muted-foreground mb-4">
                  Usar <strong className="text-foreground">Conventional Commits</strong>:
                </p>
                <CodeBlock code={`# Features
git commit -m "feat(dashboard): add bot activity detection module"

# Fixes
git commit -m "fix(transactions): resolve infinite scroll bug"

# Chores
git commit -m "chore(deps): update react to v18.3.0"

# Documentation
git commit -m "docs(readme): update deployment instructions"

# Styles
git commit -m "style(ui): adjust spacing in transaction cards"

# Refactor
git commit -m "refactor(api): extract validation logic to shared"

# Tests
git commit -m "test(wallet): add unit tests for wallet service"`} />
              </section>

              {/* CI/CD */}
              <section id="ci-cd" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">CI/CD Pipeline</h2>
                <p className="text-muted-foreground mb-6">
                  Pipeline automatizado con GitHub Actions para testing, building y deployment.
                </p>

                <div className="bg-muted/30 border border-border rounded-lg p-6 mb-6">
                  <pre className="text-sm text-foreground overflow-x-auto">
{`┌─────────────┐
│  Git Push   │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────┐
│   GitHub Actions Trigger    │
└──────┬──────────────────────┘
       │
       ├─→ Sync Design Tokens from Figma
       │
       ├─→ Lint & Type Check
       │
       ├─→ Run Tests (Unit + E2E)
       │
       ├─→ Build Application
       │
       └─→ Deploy
            ├─→ Staging (on 'staging' branch)
            └─→ Production (on 'main' branch)`}
                  </pre>
                </div>

                <h3 className="text-xl text-foreground mb-3">Ejemplo de Workflow</h3>
                <CodeBlock 
                  language="yaml"
                  code={`name: Kontrol CI/CD

on:
  push:
    branches: [main, staging, develop]
  pull_request:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'`}
                />
              </section>

              {/* Team Workflow */}
              <section id="team-workflow" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Workflow del Equipo</h2>
                <p className="text-muted-foreground mb-6">
                  Proceso completo desde diseño hasta producción.
                </p>

                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">1</span>
                      Diseñador (Figma)
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-10">
                      <li>• Crear nueva feature en Figma con versión (e.g., "Dashboard v1.1.0")</li>
                      <li>• Actualizar Design System si hay nuevos componentes</li>
                      <li>• Exportar assets necesarios</li>
                      <li>• Notificar al equipo con link a Figma</li>
                    </ul>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">2</span>
                      Frontend Developer
                    </h3>
                    <CodeBlock code={`# Crear branch
git checkout develop
git pull origin develop
git checkout -b feature/bot-detection

# Sync tokens desde Figma (si hay cambios)
cd packages/design-tokens
node sync-figma.js

# Desarrollar feature
# ... código ...

# Commit y push
git add .
git commit -m "feat(dashboard): add bot activity detection"
git push origin feature/bot-detection

# Crear PR
gh pr create --base develop`} />
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">3</span>
                      Backend Developer (en paralelo)
                    </h3>
                    <CodeBlock code={`git checkout -b feature/bot-detection-api

# Crear endpoint
# packages/backend/routes/analytics.py
@router.get("/bot-activity")
async def get_bot_activity(period: str):
    # ... lógica ...
    return {...}

# Actualizar OpenAPI schema
# Regenerar types compartidos

git commit -m "feat(api): add bot activity analytics endpoint"
git push origin feature/bot-detection-api`} />
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">4</span>
                      Code Review & QA
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-10">
                      <li>✅ Automated checks (Lint, Type, Tests, Build)</li>
                      <li>👀 Manual review del código</li>
                      <li>🔍 Probar en preview deployment (Vercel)</li>
                      <li>✔️ Aprobar PR</li>
                      <li>🔀 Merge to develop</li>
                    </ul>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">5</span>
                      Release a Producción
                    </h3>
                    <CodeBlock code={`# Crear release branch
git checkout -b release/v1.1.0 staging

# Bump version
npm version minor # 1.0.0 → 1.1.0

# Merge a main
git checkout main
git merge release/v1.1.0
git tag v1.1.0
git push origin main --tags

# Auto-deploy a producción por CI/CD`} />
                  </div>
                </div>
              </section>

              {/* Production Deployment */}
              <section id="production" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-success-pastel/10 text-success-pastel">Despliegue</Badge>
                </div>
                <h2 className="text-3xl text-foreground mb-6">Despliegue a Producción</h2>
                <p className="text-muted-foreground mb-6">
                  Kontrol se puede desplegar en múltiples plataformas. Recomendamos Vercel para frontend.
                </p>

                <h3 className="text-xl text-foreground mb-3">Vercel (Recomendado)</h3>
                <CodeBlock code={`# Instalar Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel --prod

# O configurar deployment automático desde GitHub:
# 1. Conectar repo en vercel.com
# 2. Configurar variables de entorno
# 3. Cada push a 'main' deploya automáticamente`} />

                <h3 className="text-xl text-foreground mb-3 mt-6">Variables de Entorno en Producción</h3>
                <CodeBlock code={`VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_BASE_URL=https://api.kontrol.app
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx`} />
              </section>

              {/* Monitoring */}
              <section id="monitoring" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl text-foreground mb-6">Monitoreo y Observabilidad</h2>
                <p className="text-muted-foreground mb-6">
                  Herramientas recomendadas para monitorear la aplicación en producción.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-3">Sentry (Error Tracking)</h3>
                    <CodeBlock code={`// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});`} language="tsx" />
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-foreground mb-3">Posthog (Analytics)</h3>
                    <CodeBlock code={`// Analytics.tsx
import posthog from 'posthog-js';

posthog.init(
  'YOUR_API_KEY',
  { api_host: 'https://app.posthog.com' }
);

posthog.capture('page_view');`} language="tsx" />
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
