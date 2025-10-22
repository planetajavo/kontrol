# 🏗️ Kontrol - Arquitectura del Proyecto

## 📁 Estructura del Proyecto

```
kontrol/
├── 📂 components/
│   ├── 📂 shared/              # Componentes reutilizables
│   │   ├── EmptyState.tsx      # Estado vacío con acción
│   │   ├── LoadingState.tsx    # Indicador de carga
│   │   ├── ConfirmDialog.tsx   # Diálogo de confirmación
│   │   ├── ErrorBoundary.tsx   # Manejo de errores React
│   │   ├── PageHeader.tsx      # Header de página estándar
│   │   └── ActionBar.tsx       # Barra de acciones sticky
│   ├── 📂 ui/                  # ShadCN components
│   ├── 📂 figma/               # Componentes específicos Figma
│   ├── 📂 hooks/               # React hooks personalizados (legacy)
│   └── [Secciones].tsx         # Componentes de secciones principales
│
├── 📂 contexts/                # React Context API
│   ├── AuthContext.tsx         # Autenticación y usuario
│   └── ThemeContext.tsx        # Tema y modo oscuro
│
├── 📂 hooks/                   # Custom Hooks
│   ├── useAuth.ts              # Hook de autenticación (re-export)
│   ├── useTheme.ts             # Hook de tema (re-export)
│   ├── useToast.ts             # Notificaciones toast
│   ├── useLocalStorage.ts      # Persistencia local
│   └── useDebounce.ts          # Debounce para búsquedas
│
├── 📂 services/                # Capa de datos y API
│   ├── wallet.service.ts       # Gestión de wallets
│   ├── exchange.service.ts     # Gestión de exchanges
│   ├── transaction.service.ts  # Transacciones
│   └── api.ts                  # Cliente HTTP base
│
├── 📂 types/                   # TypeScript types
│   └── index.ts                # Todos los tipos del proyecto
│
├── 📂 utils/                   # Utilidades
│   ├── constants.ts            # Constantes globales
│   ├── formatters.ts           # Formateo de datos
│   └── validators.ts           # Validaciones de formularios
│
├── 📂 styles/
│   └── globals.css             # Estilos globales Tailwind v4
│
└── App.tsx                     # Componente raíz
```

---

## 🎯 Patrones y Arquitectura

### 1. **Context API Pattern**

#### AuthContext
Maneja toda la lógica de autenticación:
```tsx
import { useAuth } from './contexts/AuthContext';

function Component() {
  const { user, isAuthenticated, login, logout } = useAuth();
  // ...
}
```

#### ThemeContext
Maneja tema y modo oscuro:
```tsx
import { useTheme } from './contexts/ThemeContext';

function Component() {
  const { theme, isDarkMode, setTheme, toggleDarkMode } = useTheme();
  // ...
}
```

### 2. **Service Layer Pattern**

Toda la lógica de datos está encapsulada en servicios:
```tsx
import { walletService } from '../services/wallet.service';

const response = await walletService.getWallets();
if (response.success) {
  setWallets(response.data);
}
```

**Ventajas:**
- Fácil migración de mock a API real
- Testing simplificado
- Centralización de lógica de negocio

### 3. **Compound Components Pattern**

Componentes reutilizables con composición:
```tsx
<EmptyState
  icon={Wallet}
  title="No hay wallets"
  description="Conecta tu primera wallet para empezar"
  action={{
    label: "Conectar Wallet",
    onClick: handleConnect,
    icon: Plus
  }}
/>
```

### 4. **Error Boundaries**

Captura errores en componentes hijos:
```tsx
<ErrorBoundary fallback={<CustomError />}>
  <SuspiciousComponent />
</ErrorBoundary>
```

### 5. **Lazy Loading**

Carga diferida de secciones:
```tsx
const DashboardSection = lazy(() => import('./components/DashboardSection'));

<Suspense fallback={<LoadingState />}>
  <DashboardSection />
</Suspense>
```

---

## 🔧 Utilities y Helpers

### Formatters
```tsx
import { formatCurrency, formatDate, formatAddress } from '../utils/formatters';

formatCurrency(1234.56, 'EUR');        // "€1,234.56"
formatDate(new Date(), 'long');        // "15 de enero de 2024"
formatAddress('0x742d35Cc...', 6);     // "0x742d...634C0"
```

### Validators
```tsx
import { validateEmail, validateWalletAddress } from '../utils/validators';

const result = validateEmail(email);
if (!result.isValid) {
  setError(result.error);
}
```

### Constants
```tsx
import { STORAGE_KEYS, THEME_COLORS, TAX_BRACKETS } from '../utils/constants';

localStorage.getItem(STORAGE_KEYS.AUTH);
```

---

## 📊 Tipos TypeScript

Todos los tipos están centralizados en `/types/index.ts`:

```tsx
import { 
  User, 
  Wallet, 
  Transaction, 
  ApiResponse 
} from '../types';
```

**Tipos principales:**
- `User` - Usuario y preferencias
- `Wallet` - Billetera crypto
- `Exchange` - Exchange conectado
- `Transaction` - Transacción
- `BankAccount` - Cuenta bancaria
- `ApiResponse<T>` - Respuesta API tipada

---

## 🎨 Sistema de Temas

### CSS Variables
Todos los colores usan CSS custom properties:
```css
--primary: #F97316;
--background: #FAFAFA;
--foreground: #1A1A1A;
```

### Tailwind Classes
```tsx
className="bg-primary text-primary-foreground"
className="bg-card border-border"
```

### Dark Mode
Automático con clase `.dark`:
```tsx
className="bg-white dark:bg-gray-900"
className="text-gray-900 dark:text-gray-100"
```

---

## 🚀 Mejores Prácticas

### ✅ DO

```tsx
// ✅ Usa hooks de contexto
const { user } = useAuth();

// ✅ Usa servicios para datos
const wallets = await walletService.getWallets();

// ✅ Usa formatters
{formatCurrency(amount, 'EUR')}

// ✅ Usa tipos TypeScript
const wallet: Wallet = { ... };

// ✅ Muestra estados vacíos
{wallets.length === 0 && <EmptyState ... />}

// ✅ Usa loading states
{isLoading && <LoadingState />}

// ✅ Valida formularios
const errors = validateLoginForm(email, password);
```

### ❌ DON'T

```tsx
// ❌ No uses localStorage directamente
localStorage.getItem('user');  // ❌
const { user } = useAuth();    // ✅

// ❌ No hardcodees colores
className="bg-orange-500"      // ❌
className="bg-primary"         // ✅

// ❌ No uses mock data en componentes
const wallets = [{ ... }];     // ❌
const { data } = await service.getWallets(); // ✅

// ❌ No ignores estados de error
<div>{data}</div>              // ❌
{error ? <Error /> : <div>{data}</div>}  // ✅
```

---

## 🧪 Testing Guidelines

### Componentes
```tsx
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';

test('renders wallet list', () => {
  render(
    <AuthProvider>
      <WalletList />
    </AuthProvider>
  );
});
```

### Servicios
```tsx
import { walletService } from '../services/wallet.service';

test('fetches wallets', async () => {
  const response = await walletService.getWallets();
  expect(response.success).toBe(true);
});
```

---

## 📦 Migración de Código Legacy

### Paso 1: Reemplazar localStorage
```tsx
// Antes
const [theme, setTheme] = useState(localStorage.getItem('theme'));

// Después
const { theme, setTheme } = useTheme();
```

### Paso 2: Usar servicios
```tsx
// Antes
const [wallets, setWallets] = useState([{ mock: 'data' }]);

// Después
const [wallets, setWallets] = useState([]);
useEffect(() => {
  walletService.getWallets().then(res => {
    if (res.success) setWallets(res.data);
  });
}, []);
```

### Paso 3: Componentes compartidos
```tsx
// Antes
{wallets.length === 0 && (
  <div>
    <h3>No hay wallets</h3>
    <button onClick={handleAdd}>Añadir</button>
  </div>
)}

// Después
{wallets.length === 0 && (
  <EmptyState
    icon={Wallet}
    title="No hay wallets"
    action={{ label: "Añadir", onClick: handleAdd }}
  />
)}
```

---

## 🔄 Flujo de Datos

```
User Action
    ↓
Component Handler
    ↓
Service Layer (API/Mock)
    ↓
Update State (Context/Local)
    ↓
Re-render UI
    ↓
Toast Notification (optional)
```

---

## 📚 Recursos

- [React Context](https://react.dev/learn/passing-data-deeply-with-context)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [ShadCN UI](https://ui.shadcn.com/)

---

## 🎯 Roadmap

### ✅ Completado (Fase 1-2)
- Context API (Auth + Theme)
- Tipos TypeScript centralizados
- Utilities y helpers
- Componentes compartidos (Empty, Loading, Confirm)
- Error Boundaries
- Lazy Loading
- Toast notifications
- Service Layer básico

### 🚧 En Progreso (Fase 3)
- Búsqueda global (Cmd+K)
- Filtros avanzados
- Onboarding flow
- Deep linking

### 📋 Pendiente (Fase 4+)
- Internacionalización (i18n)
- Optimistic UI
- React Query integration
- Real-time updates
- PWA features
- Analytics integration

---

**Última actualización:** 2025-01-17  
**Versión:** 2.0.0
