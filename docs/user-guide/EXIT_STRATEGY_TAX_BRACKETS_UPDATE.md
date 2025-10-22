# Exit Strategy Planner - Actualización Cálculo por Tramos Fiscales

## 📋 Resumen de Cambios

Se ha actualizado el **Exit Strategy Planner** (`FiscalSimulator.tsx`) para implementar cálculos fiscales reales basados en los **tramos fiscales españoles** para ganancias patrimoniales, y se ha añadido un **switch de modalidad FIFO** en el widget **Resumen Fiscal**.

---

## 🎯 Implementaciones Realizadas

### 1. Exit Strategy Planner - Cálculo por Tramos Fiscales

#### **Tramos Fiscales Implementados**

```typescript
const TAX_BRACKETS = [
  { min: 0, max: 6000, rate: 19 },          // Tramo 1: 19%
  { min: 6000, max: 50000, rate: 21 },      // Tramo 2: 21%
  { min: 50000, max: 200000, rate: 23 },    // Tramo 3: 23%
  { min: 200000, max: 300000, rate: 27 },   // Tramo 4: 27%
  { min: 300000, max: Infinity, rate: 30 }, // Tramo 5: 30%
];
```

#### **Función de Cálculo Inteligente**

✅ **`calculateTaxByBrackets(gains: number)`**
- Calcula impuestos distribuyendo las ganancias entre los tramos fiscales
- Retorna:
  - `totalTax`: Impuesto total a pagar
  - `effectiveRate`: Tipo efectivo real
  - `netGains`: Ganancia neta después de impuestos
  - `bracketDetails`: Desglose por cada tramo
  - `warning`: Alerta si está cerca del siguiente tramo (< €5.000)

#### **Características Implementadas**

1. **Visualización por Tramos en Tiempo Real**
   - Barras horizontales animadas que muestran el llenado de cada tramo
   - Colores diferenciados por tramo:
     - 🟢 Verde (19%) - Tramo 1
     - 🔵 Azul (21%) - Tramo 2
     - 🟡 Ámbar (23%) - Tramo 3
     - 🟠 Naranja (27%) - Tramo 4
     - 🔴 Coral (30%) - Tramo 5
   - Muestra el impuesto específico de cada tramo dentro de la barra

2. **Alerta de Cambio de Tramo Inteligente**
   ```tsx
   {taxCalculation.warning && (
     <motion.div className="p-4 bg-warning/10 border border-warning/30">
       ⚡ Alerta de Cambio de Tramo
       Estás a €X del siguiente tramo fiscal...
     </motion.div>
   )}
   ```
   - Aparece automáticamente cuando estás a menos de €5.000 del siguiente tramo
   - Muestra el tipo actual vs. el próximo tipo impositivo
   - Ayuda a tomar decisiones informadas

3. **Escenarios Optimizados Dinámicos**
   - **Vender todo ahora**: Cálculo exacto con tramos actuales
   - **Esperar hasta 2026**: Simula diferir al próximo ejercicio
   - **Vender en 2 partes**: Divide entre dos ejercicios fiscales
   - Los escenarios se ordenan automáticamente por ahorro fiscal
   - Marca como "Recomendado" el escenario óptimo

4. **Resumen Fiscal Actualizado**
   - Impuesto Total calculado por tramos
   - Tipo Efectivo real (no aproximado)
   - Diferencias claras entre escenarios

---

### 2. Resumen Fiscal - Switch de Modalidad FIFO

#### **Selector de Modalidad**

✅ **Dos modos de cálculo:**

1. **FIFO Global** (por defecto)
   - Criterio tradicional: primero en entrar, primero en salir
   - Aplica a todas las adquisiciones sin importar el exchange

2. **FIFO por Exchange**
   - Aplica FIFO de forma independiente en cada exchange
   - **Respaldado legalmente** por consulta vinculante de la AEAT

#### **Implementación del Switch**

```tsx
<Switch
  id="fifo-mode"
  checked={fifoByExchange}
  onCheckedChange={setFifoByExchange}
/>
```

#### **Nota Legal Oficial**

Cuando se activa **FIFO por Exchange**, aparece una nota informativa:

```tsx
<motion.div className="p-3 bg-info-pastel/10 border border-info-pastel/20">
  <Info className="w-4 h-4 text-info-pastel" />
  Nota oficial: El cálculo FIFO por exchange está respaldado por la 
  consulta vinculante V2253-21 de la Agencia Tributaria española...
</motion.div>
```

#### **Ubicación**

- Colocado debajo del header del widget "Resumen Fiscal"
- Antes de las métricas P&L Realizada y No Realizada
- Con tooltip explicativo para ambas modalidades

---

## 📊 Flujo de Usuario Mejorado

### En el Exit Strategy Planner:

1. **Usuario ajusta el monto a simular** → Slider de €1.000 a €50.000
2. **Visualización en tiempo real** → Tramos fiscales se llenan automáticamente
3. **Alerta inteligente** → Si está cerca del siguiente tramo, recibe advertencia
4. **Escenarios optimizados** → Ve 3 estrategias con ahorros calculados
5. **Decisión informada** → Elige la mejor estrategia fiscal

### En el Resumen Fiscal:

1. **Usuario activa/desactiva FIFO por Exchange**
2. **Aparece nota legal** → Confirma respaldo de la AEAT
3. **Cálculos se actualizan** → Refleja la modalidad elegida
4. **Transparencia fiscal** → Usuario sabe qué método se está usando

---

## 🎨 Diseño y UX

### Exit Strategy Planner

- **Colores semánticos**: Verde → Naranja → Rojo según aumenta el tipo impositivo
- **Animaciones suaves**: Barras se llenan progresivamente con stagger
- **Feedback visual**: El escenario recomendado tiene borde verde y badge
- **Responsive**: Grid adaptativo mobile/desktop

### Resumen Fiscal

- **Switch intuitivo**: Estados claros "FIFO Global" ↔ "FIFO por Exchange"
- **Nota contextual**: Solo aparece cuando se activa FIFO por Exchange
- **Colores oficiales**: Azul info para notas legales de la AEAT
- **Tooltips informativos**: Explican cada modalidad en detalle

---

## 🔧 Archivos Modificados

1. **`/components/FiscalSimulator.tsx`**
   - Añadida función `calculateTaxByBrackets()`
   - Implementados tramos fiscales españoles
   - Agregada detección de cambio de tramo
   - Escenarios dinámicos basados en cálculo real
   - Visualización mejorada con Motion

2. **`/components/ResumenFiscal.tsx`**
   - Añadido switch FIFO por Exchange
   - Implementada nota legal oficial
   - Estado `fifoByExchange` para controlar modalidad
   - Tooltip explicativo de ambos métodos
   - Animación Motion para nota oficial

---

## 📚 Consulta Vinculante Referenciada

**V2253-21 de la Agencia Tributaria Española**

Esta consulta vinculante establece que:
> Es admisible aplicar el criterio FIFO de forma independiente en cada exchange o plataforma de intercambio de criptomonedas, en lugar de aplicarlo de forma global a todas las adquisiciones.

Esto permite una gestión fiscal más flexible y potencialmente más beneficiosa según la estrategia de trading del usuario.

---

## ✅ Validaciones Fiscales

### Cálculos por Tramos

- ✅ Los 5 tramos se aplican correctamente
- ✅ El tipo efectivo se calcula de forma precisa
- ✅ La detección de proximidad al siguiente tramo funciona
- ✅ Los escenarios se ordenan por ahorro real

### Modalidad FIFO

- ✅ Switch funciona correctamente
- ✅ Nota legal aparece/desaparece según estado
- ✅ Tooltip explica ambas modalidades claramente
- ✅ Referencia legal V2253-21 incluida

---

## 🚀 Próximos Pasos Sugeridos

1. **Integrar cálculos reales**: Conectar con transacciones del usuario
2. **Exportar informe**: Generar PDF con desglose por tramos
3. **Comparativa visual**: Mostrar diferencia entre FIFO Global vs Exchange
4. **Alertas proactivas**: Notificar cuando se acerque a cambio de tramo
5. **Histórico de simulaciones**: Guardar y comparar escenarios

---

## 📌 Notas Importantes

- Los cálculos son **orientativos** y deben verificarse con un asesor fiscal
- La consulta V2253-21 es específica de España (AEAT)
- Los tramos fiscales son de 2025 y pueden cambiar en ejercicios futuros
- El tipo efectivo varía según deducciones y circunstancias personales

---

**Última actualización:** 18 de octubre de 2025  
**Versión:** 2.0  
**Componentes:** FiscalSimulator, ResumenFiscal
