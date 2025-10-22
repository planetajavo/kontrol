# 🔄 Guía de Migración - Kontrol v2.0

## Resumen de Cambios

Esta guía te ayudará a actualizar componentes existentes para usar la nueva arquitectura profesional de Kontrol.

---

## 1. Context API en lugar de Props Drilling

### ❌ Antes (v1.0)
```tsx
// App.tsx
<TopNavBar 
  theme={theme}
  onThemeChange={setTheme}
  isDarkMode={isDarkMode}
  onDarkModeToggle={toggleDarkMode}
/>

// TopNavBar.tsx
interface Props {
  theme: ThemeColor;
  onThemeChange: (theme: ThemeColor) => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
}
```

### ✅ Ahora (v2.0)
```tsx
// TopNavBar.tsx - SOLO necesitas esto
import { useTheme } from '../contexts/ThemeContext';

function TopNavBar() {
  const { theme, setTheme, isDarkMode, toggleDarkMode } = useTheme();
  // Usa directamente sin props
}
```

**Migración:**
1. Importa `useTheme` o `useAuth`
2. Elimina props relacionadas
3. Usa valores del hook directamente

---

## 2. Toast Notifications

### ❌ Antes
```tsx
// Sin feedback visual
const handleDelete = () => {
  deleteWallet(id);
  // Usuario no sabe si funcionó
};
```

### ✅ Ahora
```tsx
import { useToast } from '../hooks/useToast';

function Component() {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await walletService.deleteWallet(id);
      toast.success({
        title: 'Wallet eliminada',
        description: 'La wallet se eliminó correctamente'
      });
    } catch (error) {
      toast.error({
        title: 'Error',
        description: 'No se pudo eliminar la wallet'
      });
    }
  };
}
```

**No olvides añadir `<Toaster />` en App.tsx (ya está añadido)**

---

## 3. Loading States

### ❌ Antes
```tsx
// Loading sin indicador visual
const [wallets, setWallets] = useState([]);

useEffect(() => {
  fetchWallets().then(setWallets);
}, []);

return <div>{wallets.map(...)}</div>;
```

### ✅ Ahora
```tsx
import LoadingState from '../components/shared/LoadingState';

const [wallets, setWallets] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  setIsLoading(true);
  walletService.getWallets()
    .then(res => {
      if (res.success) setWallets(res.data);
    })
    .finally(() => setIsLoading(false));
}, []);

if (isLoading) return <LoadingState message="Cargando wallets..." />;

return <div>{wallets.map(...)}</div>;
```

---

## 4. Empty States

### ❌ Antes
```tsx
{wallets.length === 0 && (
  <div>
    <p>No hay wallets</p>
    <button>Añadir</button>
  </div>
)}
```

### ✅ Ahora
```tsx
import EmptyState from '../components/shared/EmptyState';
import { Wallet, Plus } from 'lucide-react';

{wallets.length === 0 && (
  <EmptyState
    icon={Wallet}
    title="No hay wallets conectadas"
    description="Conecta tu primera wallet para empezar a gestionar tus activos crypto"
    action={{
      label: "Conectar Wallet",
      onClick: handleAddWallet,
      icon: Plus
    }}
  />
)}
```

---

## 5. Confirmación de Acciones Destructivas

### ❌ Antes
```tsx
// Sin confirmación
<button onClick={() => deleteWallet(id)}>
  Eliminar
</button>
```

### ✅ Ahora
```tsx
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { useState } from 'react';

const [showConfirm, setShowConfirm] = useState(false);

<>
  <button onClick={() => setShowConfirm(true)}>
    Eliminar
  </button>

  <ConfirmDialog
    isOpen={showConfirm}
    onClose={() => setShowConfirm(false)}
    onConfirm={handleDelete}
    title="¿Eliminar wallet?"
    description="Esta acción no se puede deshacer. La wallet será eliminada permanentemente."
    confirmText="Eliminar"
    variant="destructive"
  />
</>
```

---

## 6. Service Layer

### ❌ Antes
```tsx
// Mock data en componente
const [wallets] = useState([
  { id: 1, name: 'Wallet 1', balance: 100 },
  { id: 2, name: 'Wallet 2', balance: 200 },
]);
```

### ✅ Ahora
```tsx
// Servicio separado
import { walletService } from '../services/wallet.service';

const [wallets, setWallets] = useState([]);

useEffect(() => {
  loadWallets();
}, []);

const loadWallets = async () => {
  const response = await walletService.getWallets();
  if (response.success) {
    setWallets(response.data);
  }
};

const handleDelete = async (id: string) => {
  const response = await walletService.deleteWallet(id);
  if (response.success) {
    toast.success({ title: 'Wallet eliminada' });
    loadWallets(); // Recargar
  }
};
```

---

## 7. Formateo de Datos

### ❌ Antes
```tsx
// Formateo inline inconsistente
<div>€{balance.toFixed(2)}</div>
<div>{new Date(date).toLocaleDateString()}</div>
<div>{address.substring(0, 6)}...{address.substring(38)}</div>
```

### ✅ Ahora
```tsx
import { formatCurrency, formatDate, formatAddress } from '../utils/formatters';

<div>{formatCurrency(balance, 'EUR')}</div>
<div>{formatDate(date, 'short')}</div>
<div>{formatAddress(address)}</div>
```

---

## 8. Validación de Formularios

### ❌ Antes
```tsx
// Validación manual sin feedback
const handleSubmit = () => {
  if (!email.includes('@')) {
    alert('Email inválido');
    return;
  }
  // ...
};
```

### ✅ Ahora
```tsx
import { validateEmail, hasErrors } from '../utils/validators';
import { useState } from 'react';

const [errors, setErrors] = useState({});

const handleSubmit = () => {
  const newErrors = {};
  
  const emailResult = validateEmail(email);
  if (!emailResult.isValid) {
    newErrors.email = emailResult.error;
  }
  
  if (hasErrors(newErrors)) {
    setErrors(newErrors);
    return;
  }
  
  // Proceder con submit
};

// En el JSX
<Input 
  type="email" 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
{errors.email && (
  <p className="text-sm text-destructive mt-1">{errors.email}</p>
)}
```

---

## 9. TypeScript Types

### ❌ Antes
```tsx
// Tipos inline inconsistentes
interface Wallet {
  id: string;
  name: string;
  // ...repetido en varios archivos
}
```

### ✅ Ahora
```tsx
// Tipos centralizados
import { Wallet, Transaction, User } from '../types';

// Uso directo sin redefinir
const wallet: Wallet = { ... };
const user: User = { ... };
```

---

## 10. Constantes

### ❌ Antes
```tsx
// Magic numbers y strings hardcoded
localStorage.getItem('kontrol_theme');
if (balance > 0 && balance < 6000) { /* tax bracket */ }
```

### ✅ Ahora
```tsx
import { STORAGE_KEYS, TAX_BRACKETS } from '../utils/constants';

localStorage.getItem(STORAGE_KEYS.THEME);

const taxBracket = TAX_BRACKETS.find(
  bracket => balance >= bracket.min && balance < bracket.max
);
```

---

## 11. Error Boundaries

### ✅ Envolver secciones propensas a errores
```tsx
import ErrorBoundary from '../components/shared/ErrorBoundary';

<ErrorBoundary>
  <ComplexChart data={data} />
</ErrorBoundary>
```

Ya está implementado en App.tsx a nivel global, pero puedes añadir más específicos.

---

## 12. Lazy Loading

### ❌ Antes
```tsx
import DashboardSection from './components/DashboardSection';
```

### ✅ Ahora
```tsx
import { lazy, Suspense } from 'react';
import LoadingState from './components/shared/LoadingState';

const DashboardSection = lazy(() => import('./components/DashboardSection'));

<Suspense fallback={<LoadingState />}>
  <DashboardSection />
</Suspense>
```

Ya está implementado en App.tsx para todas las secciones principales.

---

## Checklist de Migración por Componente

Cuando migres un componente, verifica:

- [ ] ¿Usa `useAuth()` en lugar de props de usuario?
- [ ] ¿Usa `useTheme()` en lugar de props de tema?
- [ ] ¿Muestra `<LoadingState />` mientras carga?
- [ ] ¿Muestra `<EmptyState />` cuando no hay datos?
- [ ] ¿Usa `useToast()` para feedback de acciones?
- [ ] ¿Usa `<ConfirmDialog />` para acciones destructivas?
- [ ] ¿Usa servicios en lugar de mock data inline?
- [ ] ¿Usa formatters de `utils/formatters`?
- [ ] ¿Usa validadores de `utils/validators`?
- [ ] ¿Usa tipos de `types/index`?
- [ ] ¿Usa constantes de `utils/constants`?
- [ ] ¿Está envuelto en `<ErrorBoundary />` si es complejo?

---

## Ejemplo Completo: Antes y Después

### ❌ ANTES (v1.0)
```tsx
function WalletList({ theme, isDarkMode }) {
  const [wallets] = useState([
    { id: 1, name: 'Wallet 1', balance: 100 }
  ]);

  const handleDelete = (id) => {
    // Sin confirmación ni feedback
    wallets.splice(wallets.findIndex(w => w.id === id), 1);
  };

  return (
    <div>
      {wallets.map(wallet => (
        <div key={wallet.id}>
          <span>{wallet.name}</span>
          <span>€{wallet.balance.toFixed(2)}</span>
          <button onClick={() => handleDelete(wallet.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

### ✅ DESPUÉS (v2.0)
```tsx
import { useState, useEffect } from 'react';
import { Wallet, Trash2 } from 'lucide-react';
import { walletService } from '../services/wallet.service';
import { useToast } from '../hooks/useToast';
import { formatCurrency } from '../utils/formatters';
import { Wallet as WalletType } from '../types';
import EmptyState from '../components/shared/EmptyState';
import LoadingState from '../components/shared/LoadingState';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { Button } from '../components/ui/button';

function WalletList() {
  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    loadWallets();
  }, []);

  const loadWallets = async () => {
    setIsLoading(true);
    const response = await walletService.getWallets();
    if (response.success) {
      setWallets(response.data);
    } else {
      toast.error({
        title: 'Error',
        description: response.error || 'No se pudieron cargar las wallets'
      });
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const response = await walletService.deleteWallet(deleteId);
    
    if (response.success) {
      toast.success({
        title: 'Wallet eliminada',
        description: 'La wallet se eliminó correctamente'
      });
      loadWallets();
    } else {
      toast.error({
        title: 'Error',
        description: response.error || 'No se pudo eliminar la wallet'
      });
    }
    
    setDeleteId(null);
  };

  if (isLoading) {
    return <LoadingState message="Cargando wallets..." />;
  }

  if (wallets.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title="No hay wallets"
        description="Añade tu primera wallet para empezar"
        action={{
          label: "Añadir Wallet",
          onClick: () => {/* handler */}
        }}
      />
    );
  }

  return (
    <>
      <div className="space-y-3">
        {wallets.map(wallet => (
          <div 
            key={wallet.id}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
          >
            <div>
              <h3 className="text-foreground">{wallet.name}</h3>
              <p className="text-muted-foreground">
                {formatCurrency(wallet.balanceUSD, 'EUR')}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteId(wallet.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="¿Eliminar wallet?"
        description="Esta acción no se puede deshacer."
        confirmText="Eliminar"
        variant="destructive"
      />
    </>
  );
}
```

---

## Prioridad de Migración

### Alta Prioridad (Migrar Primero)
1. **Auth logic** → Usar `useAuth()`
2. **Theme logic** → Usar `useTheme()`
3. **Acciones destructivas** → Añadir `<ConfirmDialog />`
4. **Estados vacíos** → Añadir `<EmptyState />`

### Media Prioridad
5. **Loading states** → Añadir `<LoadingState />`
6. **Formateo** → Usar utils/formatters
7. **Validaciones** → Usar utils/validators
8. **Toast notifications** → Añadir feedback

### Baja Prioridad (Pero Importante)
9. **Service layer** → Mover mock data
10. **Tipos** → Importar de types/
11. **Constantes** → Importar de utils/constants

---

¿Necesitas ayuda migrando un componente específico? ¡Avísame! 🚀
