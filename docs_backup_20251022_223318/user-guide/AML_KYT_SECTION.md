# 🔍 AML & KYT Section - Anti-Money Laundering & Know Your Transaction

## Overview
Sección dedicada a **compliance**, **análisis de riesgo** y **trazabilidad de transacciones crypto**. Implementa detección de patrones sospechosos, screening de addresses, y alertas de actividad inusual según estándares AML/CFT.

---

## 🎯 Objetivos

### **1. Compliance & Risk Assessment**
- ✅ Score de riesgo por wallet
- ✅ Screening de addresses contra listas negras
- ✅ Detección de mixers y tumblers
- ✅ Análisis de origin of funds

### **2. Know Your Transaction (KYT)**
- ✅ Trazabilidad completa de cada transacción
- ✅ Cadena de custodia de fondos
- ✅ Detección de co-mingling
- ✅ Reporting para autoridades

### **3. Alertas y Monitoreo**
- ✅ Alertas en tiempo real
- ✅ Notificaciones de actividad sospechosa
- ✅ Dashboard de compliance
- ✅ Histórico de alertas

---

## 📊 Estructura de la Sección

### **Layout Principal**

```
┌─────────────────────────────────────────────────────────┐
│ AML & KYT                                                │
│ Compliance and transaction monitoring                    │
├─────────────────────────────────────────────────────────┤
│                              [Export Report] [Settings]  │ ← Action Bar
├─────────────────────────────────────────────────────────┤
│ ▼ Risk Overview                                         │
│   ┌─────────────────┬─────────────────┬───────────────┐│
│   │ Overall Risk    │ High Risk Txs   │ Flagged Addr  ││
│   │ ⚠️ MEDIUM       │ 3               │ 1             ││
│   │ Score: 45/100   │ Last 30 days    │ Blacklisted   ││
│   └─────────────────┴─────────────────┴───────────────┘│
├─────────────────────────────────────────────────────────┤
│ ▼ Recent Alerts                                         │
│   ┌─────────────────────────────────────────────────┐  │
│   │ 🔴 High Risk • Today 14:32                      │  │
│   │ Transaction to mixer detected                    │  │
│   │ 0.5 BTC → bc1q...abc (Tornado Cash)            │  │
│   │ [View Details] [Mark Reviewed]                  │  │
│   └─────────────────────────────────────────────────┘  │
│   ┌─────────────────────────────────────────────────┐  │
│   │ 🟡 Medium Risk • Today 09:15                    │  │
│   │ Large transaction above threshold               │  │
│   │ 10 ETH → 0x...def (Unknown)                    │  │
│   │ [View Details] [Mark Reviewed]                  │  │
│   └─────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│ ▼ Address Screening                                     │
│   [Paste address or tx hash] [Analyze]                 │
│   Results: ...                                          │
├─────────────────────────────────────────────────────────┤
│ ▼ Transaction Timeline                                  │
│   Visual flow chart of fund movement                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🏗️ Componentes

### **1. Risk Overview Dashboard**

```tsx
<CollapsibleSection
  title="Risk Overview"
  description="Current compliance status"
  defaultOpen={true}
>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Overall Risk Score */}
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          riskLevel === 'low' ? 'bg-success-pastel/20' :
          riskLevel === 'medium' ? 'bg-warning-pastel/20' :
          'bg-destructive-pastel/20'
        }`}>
          {riskLevel === 'low' ? '✅' : riskLevel === 'medium' ? '⚠️' : '🔴'}
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Overall Risk</div>
          <div className={`text-xl font-bold ${
            riskLevel === 'low' ? 'text-success-pastel' :
            riskLevel === 'medium' ? 'text-warning-pastel' :
            'text-destructive-pastel'
          }`}>
            {riskLevel.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Risk Score</span>
          <span className="font-medium">{riskScore}/100</span>
        </div>
        <Progress value={riskScore} className="h-2" />
      </div>
    </div>

    {/* High Risk Transactions */}
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5 text-destructive-pastel" />
        <span className="text-sm text-muted-foreground">High Risk Txs</span>
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">
        {highRiskTxCount}
      </div>
      <div className="text-xs text-muted-foreground">Last 30 days</div>
    </div>

    {/* Flagged Addresses */}
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center gap-2 mb-2">
        <Flag className="w-5 h-5 text-warning-pastel" />
        <span className="text-sm text-muted-foreground">Flagged Addresses</span>
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">
        {flaggedAddressCount}
      </div>
      <div className="text-xs text-muted-foreground">Blacklisted/Sanctioned</div>
    </div>
  </div>
</CollapsibleSection>
```

**Métricas:**
- **Overall Risk** - Score 0-100 con nivel (Low/Medium/High)
- **High Risk Txs** - Transacciones marcadas en último mes
- **Flagged Addresses** - Addresses en listas negras

---

### **2. Recent Alerts**

```tsx
<CollapsibleSection
  title="Recent Alerts"
  description="Latest suspicious activity detected"
  defaultOpen={true}
  badge={
    unreviewedAlerts > 0 ? (
      <Badge variant="destructive">{unreviewedAlerts} new</Badge>
    ) : null
  }
>
  <div className="space-y-3">
    {alerts.map((alert) => (
      <div
        key={alert.id}
        className={`rounded-lg border p-4 ${
          alert.severity === 'critical'
            ? 'bg-destructive-pastel/5 border-destructive-pastel/20'
            : alert.severity === 'high'
            ? 'bg-warning-pastel/5 border-warning-pastel/20'
            : 'bg-info-pastel/5 border-info-pastel/20'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getSeverityIcon(alert.severity)}
            <span className={`font-medium ${
              alert.severity === 'critical' ? 'text-destructive-pastel' :
              alert.severity === 'high' ? 'text-warning-pastel' :
              'text-info-pastel'
            }`}>
              {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Risk
            </span>
            <span className="text-sm text-muted-foreground">
              • {formatDate(alert.timestamp)}
            </span>
          </div>
          {!alert.reviewed && (
            <Badge variant="outline" className="bg-warning-pastel/10 text-warning-pastel">
              Unreviewed
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-foreground font-medium">{alert.title}</div>
          <div className="text-sm text-muted-foreground">{alert.description}</div>
          
          {alert.transactionHash && (
            <div className="flex items-center gap-2 text-sm">
              <code className="px-2 py-1 bg-muted rounded font-mono">
                {truncateHash(alert.transactionHash)}
              </code>
              <Button variant="ghost" size="sm" className="h-6 gap-1">
                <ExternalLink className="w-3 h-3" />
                View on Explorer
              </Button>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          {!alert.reviewed && (
            <Button variant="ghost" size="sm" onClick={() => markReviewed(alert.id)}>
              Mark Reviewed
            </Button>
          )}
        </div>
      </div>
    ))}
  </div>
</CollapsibleSection>
```

**Tipos de alertas:**
- 🔴 **Critical** - Mixer/tumbler, sanctioned address
- 🟡 **High** - Large tx, unknown counterparty
- 🔵 **Medium** - Unusual pattern, new address
- ⚪ **Low** - Informational

---

### **3. Address Screening**

```tsx
<CollapsibleSection
  title="Address Screening"
  description="Check addresses against watchlists"
  defaultOpen={false}
>
  <div className="space-y-4">
    {/* Input */}
    <div className="flex gap-2">
      <Input
        placeholder="Paste address or transaction hash..."
        value={screeningInput}
        onChange={(e) => setScreeningInput(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleScreen} disabled={isScreening}>
        {isScreening ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'Analyze'
        )}
      </Button>
    </div>

    {/* Results */}
    {screeningResult && (
      <div className="space-y-4">
        {/* Risk Score */}
        <div className={`rounded-lg border p-4 ${
          screeningResult.riskLevel === 'high'
            ? 'bg-destructive-pastel/5 border-destructive-pastel/20'
            : screeningResult.riskLevel === 'medium'
            ? 'bg-warning-pastel/5 border-warning-pastel/20'
            : 'bg-success-pastel/5 border-success-pastel/20'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {screeningResult.riskLevel === 'high' ? '🔴' : 
               screeningResult.riskLevel === 'medium' ? '🟡' : '✅'}
              <span className="font-medium">
                Risk Level: {screeningResult.riskLevel.toUpperCase()}
              </span>
            </div>
            <div className="text-2xl font-bold">
              {screeningResult.score}/100
            </div>
          </div>
          <Progress value={screeningResult.score} className="h-2" />
        </div>

        {/* Flags */}
        {screeningResult.flags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Risk Factors</h4>
            {screeningResult.flags.map((flag, i) => (
              <div key={i} className="flex items-start gap-2 text-sm p-2 bg-muted/50 rounded">
                <AlertCircle className="w-4 h-4 text-warning-pastel flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">{flag.category}</div>
                  <div className="text-muted-foreground">{flag.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Entity Info */}
        {screeningResult.entity && (
          <div className="bg-card rounded-lg border border-border p-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Entity Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{screeningResult.entity.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Category:</span>
                <Badge variant="outline">{screeningResult.entity.category}</Badge>
              </div>
              {screeningResult.entity.labels.length > 0 && (
                <div className="flex items-start justify-between">
                  <span className="text-muted-foreground">Labels:</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {screeningResult.entity.labels.map((label, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
</CollapsibleSection>
```

**Screening sources:**
- OFAC Sanctions List
- Chainalysis Watchlists
- Known Mixers/Tumblers
- Scam Database
- Darknet Markets

---

### **4. Transaction Flow Visualization**

```tsx
<CollapsibleSection
  title="Transaction Flow"
  description="Visualize fund movement"
  defaultOpen={false}
>
  <div className="bg-card rounded-xl border border-border p-6">
    {/* Select Transaction */}
    <Select value={selectedTxHash} onValueChange={setSelectedTxHash}>
      <SelectTrigger>
        <SelectValue placeholder="Select transaction to trace..." />
      </SelectTrigger>
      <SelectContent>
        {recentTransactions.map(tx => (
          <SelectItem key={tx.hash} value={tx.hash}>
            {truncateHash(tx.hash)} • {tx.amount} {tx.asset}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* Flow Diagram */}
    {selectedTxHash && (
      <div className="mt-6">
        <TransactionFlowDiagram
          transactionHash={selectedTxHash}
          depth={3} // Trace 3 hops
          onAddressClick={handleAddressClick}
        />
      </div>
    )}
  </div>
</CollapsibleSection>
```

**Visualización:**
```
[Your Wallet]
    ↓ 1.5 BTC
[Exchange Hot Wallet] ← 🔴 High Volume
    ↓ 0.8 BTC
[Unknown Address] ← ⚠️ New
    ↓ 0.8 BTC
[Mixer Service] ← 🔴 Tornado Cash
```

---

## 🎯 Risk Scoring Algorithm

### **Score Calculation**

```tsx
interface RiskFactor {
  category: string;
  weight: number;
  score: number; // 0-100
}

function calculateRiskScore(transaction: Transaction): number {
  const factors: RiskFactor[] = [
    {
      category: 'Counterparty',
      weight: 0.4,
      score: assessCounterpartyRisk(transaction.to)
    },
    {
      category: 'Amount',
      weight: 0.2,
      score: assessAmountRisk(transaction.amount)
    },
    {
      category: 'Frequency',
      weight: 0.15,
      score: assessFrequencyRisk(transaction)
    },
    {
      category: 'Origin of Funds',
      weight: 0.15,
      score: assessOriginRisk(transaction)
    },
    {
      category: 'Destination',
      weight: 0.1,
      score: assessDestinationRisk(transaction)
    }
  ];

  const weightedScore = factors.reduce(
    (total, factor) => total + (factor.score * factor.weight),
    0
  );

  return Math.round(weightedScore);
}
```

---

### **Counterparty Risk**

```tsx
function assessCounterpartyRisk(address: string): number {
  // Check against databases
  const sanctions = checkSanctionsList(address);
  if (sanctions) return 100; // Maximum risk

  const mixer = checkMixerList(address);
  if (mixer) return 90;

  const darknet = checkDarknetMarkets(address);
  if (darknet) return 85;

  const scam = checkScamDatabase(address);
  if (scam) return 80;

  const exchange = checkExchangeList(address);
  if (exchange?.regulated) return 10; // Low risk

  const known = checkKnownEntities(address);
  if (known) return 20;

  // Unknown address
  return 50; // Medium risk by default
}
```

---

### **Amount Risk**

```tsx
function assessAmountRisk(amount: number, asset: string): number {
  const thresholds = {
    BTC: {
      low: 0.1,
      medium: 1,
      high: 10,
      veryHigh: 50
    },
    ETH: {
      low: 1,
      medium: 10,
      high: 100,
      veryHigh: 500
    }
  };

  const limits = thresholds[asset] || thresholds.BTC;

  if (amount >= limits.veryHigh) return 90;
  if (amount >= limits.high) return 70;
  if (amount >= limits.medium) return 40;
  if (amount >= limits.low) return 20;
  return 5;
}
```

---

## 🚨 Alert Types

### **Alert Categories**

```tsx
type AlertType = 
  | 'mixer_detected'
  | 'sanctioned_address'
  | 'large_transaction'
  | 'unusual_pattern'
  | 'rapid_movement'
  | 'new_address'
  | 'high_risk_entity'
  | 'co_mingling';

interface Alert {
  id: string;
  type: AlertType;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  timestamp: Date;
  transactionHash?: string;
  address?: string;
  reviewed: boolean;
  reviewedBy?: string;
  reviewedAt?: Date;
  notes?: string;
}
```

---

### **Alert Triggers**

```tsx
// Mixer Detection
if (isMixer(transaction.to)) {
  createAlert({
    type: 'mixer_detected',
    severity: 'critical',
    title: 'Transaction to Mixer Detected',
    description: `Sent ${transaction.amount} ${transaction.asset} to known mixer service`,
    transactionHash: transaction.hash,
    address: transaction.to
  });
}

// Large Transaction
if (transaction.usdValue > 10000) {
  createAlert({
    type: 'large_transaction',
    severity: 'high',
    title: 'Large Transaction Above Threshold',
    description: `Transaction of $${transaction.usdValue.toLocaleString()} exceeds reporting limit`,
    transactionHash: transaction.hash
  });
}

// Sanctioned Address
if (isSanctioned(transaction.to)) {
  createAlert({
    type: 'sanctioned_address',
    severity: 'critical',
    title: 'Transaction to Sanctioned Address',
    description: 'Address appears on OFAC sanctions list',
    transactionHash: transaction.hash,
    address: transaction.to
  });
}
```

---

## 📊 Compliance Reports

### **Report Generation**

```tsx
interface ComplianceReport {
  period: { from: Date; to: Date };
  summary: {
    totalTransactions: number;
    totalVolume: number;
    highRiskTxs: number;
    flaggedAddresses: number;
    alertsGenerated: number;
  };
  transactions: TransactionReport[];
  alerts: Alert[];
  riskAssessment: RiskAssessment;
}

async function generateComplianceReport(
  startDate: Date,
  endDate: Date
): Promise<ComplianceReport> {
  const transactions = await getTransactions({ from: startDate, to: endDate });
  const alerts = await getAlerts({ from: startDate, to: endDate });
  
  return {
    period: { from: startDate, to: endDate },
    summary: {
      totalTransactions: transactions.length,
      totalVolume: calculateTotalVolume(transactions),
      highRiskTxs: transactions.filter(tx => tx.riskScore > 70).length,
      flaggedAddresses: new Set(transactions.map(tx => tx.to)).size,
      alertsGenerated: alerts.length
    },
    transactions: transactions.map(formatTransactionForReport),
    alerts,
    riskAssessment: performRiskAssessment(transactions, alerts)
  };
}
```

---

### **Export Options**

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="gap-2">
      <Download className="w-4 h-4" />
      Export Report
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => exportReport('pdf')}>
      <FileText className="w-4 h-4 mr-2" />
      PDF Report
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => exportReport('csv')}>
      <Table className="w-4 h-4 mr-2" />
      CSV Export
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => exportReport('json')}>
      <Code className="w-4 h-4 mr-2" />
      JSON Data
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 🔮 Mejoras Futuras

### **1. Machine Learning Risk Detection**

```tsx
// Train model on historical data
const riskModel = await trainRiskModel({
  features: ['amount', 'frequency', 'counterpartyType', 'timeOfDay'],
  labels: historicalTransactions.map(tx => tx.confirmed_risk_level)
});

// Predict risk for new transaction
const predictedRisk = riskModel.predict({
  amount: transaction.amount,
  frequency: calculateFrequency(user, transaction),
  counterpartyType: identifyCounterparty(transaction.to),
  timeOfDay: transaction.timestamp.getHours()
});
```

---

### **2. Real-time Monitoring Dashboard**

```tsx
<div className="grid grid-cols-3 gap-4">
  <MetricCard
    title="Transactions/Hour"
    value={realtimeMetrics.txPerHour}
    trend={calculateTrend(realtimeMetrics.txPerHour, previousHour)}
  />
  <MetricCard
    title="Average Risk Score"
    value={realtimeMetrics.avgRiskScore}
    trend={calculateTrend(realtimeMetrics.avgRiskScore, previousScore)}
  />
  <MetricCard
    title="Active Alerts"
    value={realtimeMetrics.activeAlerts}
    severity={realtimeMetrics.activeAlerts > 5 ? 'high' : 'normal'}
  />
</div>
```

---

### **3. Whitelist/Blacklist Management**

```tsx
<CollapsibleSection title="Address Lists" defaultOpen={false}>
  <Tabs defaultValue="whitelist">
    <TabsList>
      <TabsTrigger value="whitelist">Whitelist</TabsTrigger>
      <TabsTrigger value="blacklist">Blacklist</TabsTrigger>
    </TabsList>
    
    <TabsContent value="whitelist">
      {/* List of trusted addresses */}
      {whitelistedAddresses.map(addr => (
        <AddressListItem address={addr} onRemove={removeFromWhitelist} />
      ))}
      <Button onClick={addToWhitelist}>Add Address</Button>
    </TabsContent>
    
    <TabsContent value="blacklist">
      {/* List of blocked addresses */}
    </TabsContent>
  </Tabs>
</CollapsibleSection>
```

---

## ✅ Checklist de Implementación

- [x] **Risk overview** - Dashboard con métricas principales
- [x] **Recent alerts** - Lista de alertas con severidad
- [x] **Address screening** - Input y análisis
- [ ] **Transaction flow** - Visualización de cadena
- [ ] **Alert management** - Mark reviewed, add notes
- [ ] **Report generation** - PDF/CSV export
- [ ] **Whitelist/Blacklist** - Address management
- [ ] **Real-time monitoring** - WebSocket updates
- [ ] **ML risk detection** - Predictive scoring

---

**Last Updated:** October 18, 2025  
**Status:** ✅ UI Complete - Advanced Features Pending  
**Next Steps:** API integration for screening, ML model, real-time monitoring
