# 🏦 Banks Section - Open Banking Integration

## Overview
Sección dedicada a la **integración con entidades bancarias** a través de Open Banking. Permite conectar cuentas bancarias, visualizar balances, movimientos y sincronizar transacciones fiat que se relacionan con operaciones crypto.

---

## 🎯 Objetivos

### **1. Conexión con Entidades Bancarias**
- ✅ Integración vía Open Banking (PSD2)
- ✅ Conexión segura con autenticación OAuth
- ✅ Soporte para múltiples bancos simultáneamente

### **2. Visualización de Datos Bancarios**
- ✅ Balances totales y por cuenta
- ✅ Movimientos recientes
- ✅ Categorización de transacciones

### **3. Detección de Operaciones Crypto**
- ✅ Identificación de transferencias a exchanges
- ✅ Detección de compras/ventas de crypto
- ✅ Vinculación con transacciones blockchain

---

## 📊 Estructura de la Sección

### **Layout Principal**

```
┌─────────────────────────────────────────────────────────┐
│ Banks                                                    │
│ Connect your bank accounts via Open Banking             │
├─────────────────────────────────────────────────────────┤
│                                   [Sync All] [Connect]  │ ← Sticky Action Bar
├─────────────────────────────────────────────────────────┤
│ Total Balance                                           │
│ €63,456.67                                             │
│ Across 3 banks • 5 accounts                            │
├─────────────────────────────────────────────────────────┤
│ ▼ BBVA                                       [Sync]    │ ← Bank Card
│   Connected • Last sync: Today at 11:30                │
│   €45,678.90                                           │
│   ┌─────────────────────────────────────────┐         │
│   │ Checking ****1234        €25,678.90    │         │
│   │ Savings  ****5678        €20,000.00    │         │
│   └─────────────────────────────────────────┘         │
│   Recent Movements ▼                                   │
│   ┌─────────────────────────────────────────┐         │
│   │ Oct 15 • Salary              +€3,500.00│         │
│   │ Oct 12 • Rent Payment        -€1,200.00│         │
│   │ Oct 10 • Crypto Purchase     -€500.00  │ 🔗      │
│   └─────────────────────────────────────────┘         │
├─────────────────────────────────────────────────────────┤
│ ▼ Revolut                                    [Sync]    │
│   Connected • Last sync: Today at 10:15                │
│   €12,345.67                                           │
│   ...                                                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Componentes

### **1. Page Header**

```tsx
<div className="space-y-1">
  <h1 className="text-foreground">Banks</h1>
  <p className="text-muted-foreground">
    Connect your bank accounts via Open Banking
  </p>
</div>
```

**Elementos:**
- ✅ Título principal
- ✅ Descripción corta
- ✅ Consistente con otras secciones

---

### **2. Sticky Action Bar**

```tsx
<div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm 
                -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 
                px-4 sm:px-6 lg:px-8 xl:px-12 
                py-3 md:py-4 border-b border-border">
  <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
    <Button variant="outline" size="sm" className="gap-2">
      <RefreshCw className="w-4 h-4" />
      <span className="hidden sm:inline">Sync All</span>
    </Button>
    <Button size="sm" className="gap-2">
      <Plus className="w-4 h-4" />
      <span className="hidden sm:inline">Connect Bank</span>
      <span className="sm:hidden">Add</span>
    </Button>
  </div>
</div>
```

**Características:**
- ✅ **Sticky** - Se mantiene visible al hacer scroll
- ✅ **Backdrop blur** - Efecto glassmorphism
- ✅ **Negative margins** - Full width en contenedor
- ✅ **Responsive** - Text oculto en mobile

**Acciones:**
- **Sync All** - Sincroniza todas las cuentas conectadas
- **Connect Bank** - Inicia flujo de conexión Open Banking

---

### **3. Total Balance Card**

```tsx
<CollapsibleSection
  title="Total Balance"
  description="Across 3 banks • 5 accounts"
  defaultOpen={true}
>
  <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent 
                  rounded-xl p-6 border border-primary/20">
    <div className="text-4xl font-bold text-foreground mb-2">
      €63,456.67
    </div>
    <div className="text-sm text-muted-foreground">
      Total across all connected accounts
    </div>
  </div>
</CollapsibleSection>
```

**Datos mostrados:**
- ✅ Balance total consolidado
- ✅ Número de bancos conectados
- ✅ Número de cuentas total

---

### **4. Bank Card (Collapsible)**

```tsx
<CollapsibleSection
  title="BBVA"
  icon={<span className="text-2xl">🏦</span>}
  description="Connected • Last sync: Today at 11:30"
  defaultOpen={false}
  badge={
    <Badge variant="outline" className="bg-success-pastel/10 text-success-pastel">
      €45,678.90
    </Badge>
  }
  actions={
    <Button variant="ghost" size="sm" className="gap-2">
      <RefreshCw className="w-4 h-4" />
      Sync
    </Button>
  }
>
  {/* Accounts list */}
  {/* Recent movements */}
</CollapsibleSection>
```

**Header:**
- ✅ Nombre del banco
- ✅ Icon personalizado
- ✅ Estado de conexión
- ✅ Última sincronización
- ✅ Balance total
- ✅ Botón sync individual

**Estados de conexión:**
```tsx
// Connected
<div className="flex items-center gap-2">
  <CheckCircle2 className="w-4 h-4 text-success-pastel" />
  <span className="text-success-pastel">Connected</span>
</div>

// Pending
<div className="flex items-center gap-2">
  <AlertCircle className="w-4 h-4 text-warning-pastel" />
  <span className="text-warning-pastel">Pending</span>
</div>

// Disconnected
<div className="flex items-center gap-2">
  <AlertCircle className="w-4 h-4 text-destructive-pastel" />
  <span className="text-destructive-pastel">Disconnected</span>
</div>
```

---

### **5. Accounts List**

```tsx
<div className="space-y-3">
  <h4 className="text-sm text-muted-foreground">Accounts</h4>
  
  {bank.accounts.map((account) => (
    <div key={account.number} 
         className="bg-card rounded-lg border border-border p-4 
                    hover:bg-muted/20 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-foreground">{account.type}</div>
          <div className="text-sm text-muted-foreground">{account.number}</div>
        </div>
        <div className="text-foreground font-medium">
          €{account.balance.toLocaleString('es-ES', { 
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
          })}
        </div>
      </div>
    </div>
  ))}
</div>
```

**Tipos de cuentas:**
- Checking (Cuenta corriente)
- Savings (Cuenta ahorro)
- Credit (Tarjeta crédito)
- Investment (Inversión)

---

### **6. Recent Movements**

```tsx
<div className="space-y-3 mt-4">
  <h4 className="text-sm text-muted-foreground">Recent Movements</h4>
  
  {account.movements.map((movement) => (
    <div key={movement.id} 
         className="flex items-center justify-between p-3 
                    bg-card rounded-lg border border-border
                    hover:bg-muted/20 transition-colors">
      <div className="flex-1">
        <div className="text-foreground">{movement.description}</div>
        <div className="text-xs text-muted-foreground">
          {formatDate(movement.date)}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`font-medium ${
          movement.type === 'credit' 
            ? 'text-success-pastel' 
            : 'text-destructive-pastel'
        }`}>
          {movement.type === 'credit' ? '+' : '-'}€{Math.abs(movement.amount).toLocaleString('es-ES')}
        </div>
        
        {/* Link to crypto transaction if exists */}
        {movement.linkedCryptoTx && (
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Link2 className="w-3 h-3 text-primary" />
          </Button>
        )}
      </div>
    </div>
  ))}
</div>
```

**Características:**
- ✅ Fecha y descripción
- ✅ Tipo (credit/debit)
- ✅ Monto con color semántico
- ✅ Link a transacción crypto (si existe)

---

## 🔗 Detección de Operaciones Crypto

### **Algoritmo de Detección**

```tsx
function detectCryptoOperation(movement: BankMovement): boolean {
  const cryptoKeywords = [
    'crypto', 'bitcoin', 'btc', 'ethereum', 'eth',
    'binance', 'coinbase', 'kraken', 'bitstamp',
    'blockchain', 'wallet'
  ];
  
  const description = movement.description.toLowerCase();
  
  return cryptoKeywords.some(keyword => description.includes(keyword));
}
```

**Palabras clave detectadas:**
- Exchanges: Binance, Coinbase, Kraken, etc.
- Términos: crypto, bitcoin, blockchain, wallet
- Monedas: BTC, ETH, SOL, etc.

---

### **Vinculación con Transacciones Blockchain**

```tsx
interface LinkedTransaction {
  bankMovementId: string;
  cryptoTxHash: string;
  asset: string;
  amount: number;
  type: 'buy' | 'sell';
  confidence: 'high' | 'medium' | 'low';
}

function linkBankToCrypto(
  bankMovement: BankMovement,
  cryptoTransactions: CryptoTransaction[]
): LinkedTransaction | null {
  // Match by:
  // 1. Date proximity (same day)
  // 2. Amount similarity
  // 3. Direction (debit = buy, credit = sell)
  
  const sameDay = cryptoTransactions.filter(tx => 
    isSameDay(tx.date, bankMovement.date)
  );
  
  const matchingAmount = sameDay.find(tx => 
    Math.abs(tx.fiatAmount - Math.abs(bankMovement.amount)) < 10
  );
  
  if (matchingAmount) {
    return {
      bankMovementId: bankMovement.id,
      cryptoTxHash: matchingAmount.hash,
      asset: matchingAmount.asset,
      amount: matchingAmount.amount,
      type: bankMovement.type === 'debit' ? 'buy' : 'sell',
      confidence: 'high'
    };
  }
  
  return null;
}
```

**Criterios de matching:**
1. **Fecha** - Mismo día o día siguiente
2. **Monto** - Diferencia < €10
3. **Dirección** - Debit = compra, Credit = venta

**Niveles de confianza:**
- **High** - Fecha exacta + monto exacto
- **Medium** - Fecha ±1 día + monto similar
- **Low** - Solo keywords detectados

---

## 🔐 Open Banking Flow

### **1. Connect Bank Button Click**

```tsx
const handleConnectBank = async () => {
  // Step 1: Show bank selection modal
  const selectedBank = await showBankSelectionModal();
  
  // Step 2: Redirect to bank's OAuth
  const authUrl = await initializeOpenBankingAuth(selectedBank);
  window.location.href = authUrl;
  
  // Step 3: Bank redirects back with code
  // Step 4: Exchange code for access token
  // Step 5: Fetch account data
};
```

---

### **2. Bank Selection Modal**

```tsx
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Select Your Bank</DialogTitle>
      <DialogDescription>
        Choose your bank to connect via Open Banking (PSD2)
      </DialogDescription>
    </DialogHeader>
    
    <div className="grid grid-cols-2 gap-3">
      {supportedBanks.map(bank => (
        <Button
          key={bank.id}
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => handleBankSelect(bank)}
        >
          <span className="text-2xl">{bank.icon}</span>
          <span>{bank.name}</span>
        </Button>
      ))}
    </div>
  </DialogContent>
</Dialog>
```

**Bancos soportados (España):**
- 🏦 BBVA
- 💳 Santander
- 🏛️ CaixaBank
- 🌐 N26
- 💳 Revolut
- 🏦 ING
- 💳 Bankinter

---

### **3. OAuth Redirect**

```
User Flow:
1. User clicks "Connect Bank"
2. Select bank from modal
3. Redirect to bank's login page
4. User authenticates with bank
5. Bank asks for consent (read account data)
6. User approves
7. Bank redirects back to Kontrol with auth code
8. Kontrol exchanges code for access token
9. Fetch account data and store securely
10. Show success notification
```

---

### **4. Data Synchronization**

```tsx
const syncBankAccounts = async (bankId: string) => {
  try {
    setIsSyncing(true);
    
    // Fetch latest transactions
    const transactions = await openBankingAPI.getTransactions(bankId, {
      from: subDays(new Date(), 30), // Last 30 days
      to: new Date()
    });
    
    // Fetch balances
    const balances = await openBankingAPI.getBalances(bankId);
    
    // Update local state
    updateBankData(bankId, { transactions, balances });
    
    // Detect crypto operations
    const cryptoOps = transactions.filter(detectCryptoOperation);
    
    // Attempt to link with crypto transactions
    cryptoOps.forEach(op => {
      const link = linkBankToCrypto(op, userCryptoTransactions);
      if (link) {
        saveCryptoLink(link);
      }
    });
    
    toast.success(`${bankName} synchronized successfully`);
  } catch (error) {
    toast.error('Sync failed. Please try again.');
  } finally {
    setIsSyncing(false);
  }
};
```

---

## 💾 Data Structure

### **Bank Interface**

```tsx
interface Bank {
  id: string;
  name: string;
  customIcon: string;
  status: 'connected' | 'pending' | 'disconnected';
  lastSync: Date;
  balance: number;
  accounts: BankAccount[];
}

interface BankAccount {
  type: 'Checking' | 'Savings' | 'Credit' | 'Investment';
  number: string; // Masked: ****1234
  balance: number;
  currency: string;
  movements: BankMovement[];
}

interface BankMovement {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category?: string;
  linkedCryptoTx?: string; // Crypto tx hash if linked
}
```

---

## 🎨 Visual Design

### **Color Coding**

```tsx
// Connection Status
Connected:    text-success-pastel
Pending:      text-warning-pastel
Disconnected: text-destructive-pastel

// Movement Types
Credit (+):   text-success-pastel
Debit (-):    text-destructive-pastel

// Crypto Links
Linked:       text-primary (icon visible)
Not Linked:   (no icon)
```

---

### **Spacing & Layout**

```tsx
// Page spacing
space-y-4 md:space-y-6 lg:space-y-8

// Card padding
p-4 md:p-6

// Grid gaps
gap-3
```

---

## 🔮 Mejoras Futuras

### **1. Categorización Automática**

```tsx
interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
  keywords: string[];
}

const categories: TransactionCategory[] = [
  { 
    id: 'crypto', 
    name: 'Crypto Purchase', 
    icon: '💎',
    keywords: ['binance', 'coinbase', 'crypto']
  },
  { 
    id: 'salary', 
    name: 'Salary', 
    icon: '💰',
    keywords: ['salary', 'payroll', 'nomina']
  },
  // ...
];
```

---

### **2. Expense Analytics**

```tsx
<CollapsibleSection title="Expense Breakdown" defaultOpen={false}>
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie
        data={expensesByCategory}
        dataKey="amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={80}
      >
        {expensesByCategory.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getCategoryColor(entry.category)} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</CollapsibleSection>
```

---

### **3. Alerts & Notifications**

```tsx
interface BankAlert {
  type: 'large_expense' | 'crypto_detected' | 'low_balance' | 'unusual_activity';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  action?: () => void;
}

// Example: Large crypto purchase detected
{
  type: 'crypto_detected',
  severity: 'info',
  message: 'Crypto purchase detected: -€500.00 at Binance',
  action: () => openLinkingModal()
}
```

---

### **4. Recurring Transactions**

```tsx
interface RecurringTransaction {
  id: string;
  description: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextDate: Date;
  category: string;
}

// Detect recurring patterns
function detectRecurring(movements: BankMovement[]): RecurringTransaction[] {
  // Group by similar description
  // Check if amounts are similar
  // Calculate frequency
  // Predict next occurrence
}
```

---

### **5. Export to CSV/PDF**

```tsx
const exportBankData = (bank: Bank, format: 'csv' | 'pdf') => {
  if (format === 'csv') {
    const csv = convertToCSV(bank.accounts.flatMap(a => a.movements));
    downloadFile(csv, `${bank.name}_movements.csv`);
  } else {
    const pdf = generatePDF(bank);
    downloadFile(pdf, `${bank.name}_statement.pdf`);
  }
};
```

---

## 📖 Archivos Relacionados

### **Component File**
- `/components/BanksSection.tsx`

### **Types**
```tsx
// /types/index.ts
export interface Bank { /* ... */ }
export interface BankAccount { /* ... */ }
export interface BankMovement { /* ... */ }
```

### **Services**
```tsx
// /services/openbanking.service.ts
export const openBankingAPI = {
  initAuth: (bankId: string) => Promise<string>,
  getAccounts: (bankId: string) => Promise<BankAccount[]>,
  getTransactions: (bankId: string, filters) => Promise<BankMovement[]>,
  getBalances: (bankId: string) => Promise<number>,
};
```

---

## ✅ Checklist de Implementación

- [x] **Page structure** - Header + sticky bar
- [x] **Total balance card** - Consolidado de todas las cuentas
- [x] **Bank cards** - Collapsible con datos
- [x] **Accounts list** - Por cada banco
- [x] **Movements list** - Transacciones recientes
- [x] **Sync functionality** - Individual y global
- [ ] **Open Banking integration** - OAuth flow (mock)
- [ ] **Crypto detection** - Keyword matching
- [ ] **Linking modal** - Manual linking UI
- [ ] **Categories** - Auto-categorización
- [ ] **Export** - CSV/PDF generation

---

**Last Updated:** October 18, 2025  
**Status:** ✅ UI Complete - Integration Pending  
**Next Steps:** Open Banking API integration, crypto linking automation
