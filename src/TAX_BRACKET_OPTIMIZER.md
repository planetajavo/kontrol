# Optimizador de Tramos - Tax Bracket Optimizer

## 📋 Descripción General

El **Optimizador de Tramos** es un widget profesional diseñado para ayudar a los usuarios a entender y optimizar su tributación de capital gains en España. Utiliza una visualización innovadora de "vasos comunicantes" para mostrar de forma intuitiva cómo las ganancias se distribuyen entre los diferentes tramos fiscales.

## 🎯 Características Principales

### 1. Visualización de "Vasos Comunicantes"
- **Diseño Único**: Los tramos fiscales se representan como vasos que se llenan progresivamente
- **Comportamiento Secuencial**: Cada vaso solo comienza a llenarse cuando el anterior está completo
- **Animaciones Fluidas**: Transiciones suaves con efectos de "ripple" en el vaso activo
- **Indicadores Visuales**: 
  - ✅ Check verde cuando un tramo está completo
  - ⚠️ Alerta amarilla parpadeante en el tramo actual
  - Porcentaje de llenado mostrado dentro de cada vaso
  - Gradientes de color específicos por tramo

### 2. Tramos Fiscales de Capital Gains (España 2025)
```
Tramo 1: 0€ - 6.000€        → 19% (Verde - Success)
Tramo 2: 6.001€ - 50.000€   → 21% (Azul - Info)
Tramo 3: 50.001€ - 200.000€ → 23% (Ámbar - Warning)
Tramo 4: 200.001€ - 300.000€ → 27% (Naranja-Rojo)
Tramo 5: Más de 300.000€    → 30% (Rojo - Destructive)
```

### 3. Información Clave en 3 Tarjetas Principales

#### 💰 Ganancias Realizadas
- Muestra el total de capital gains del año fiscal actual
- Diseño con gradiente violeta (tema principal)
- Formato monetario español (€)

#### 💸 Impuesto Total
- Cálculo automático basado en los tramos
- Muestra el tipo efectivo real aplicado
- Color coral pastel para destacar el coste fiscal

#### ✅ Ganancia Neta
- Ganancia después de impuestos
- Color verde menta para indicar beneficio final
- Cálculo: Ganancias - Impuestos

### 4. Sugerencias Inteligentes de Optimización

El widget incluye un **sistema de alertas proactivo** que avisa cuando estás cerca de cambiar de tramo:

```typescript
Cuando quedan menos de 5.000€ para el siguiente tramo:
⚡ ALERTA: "Estás a €X del siguiente tramo fiscal"

📊 INFORMACIÓN:
- Tramo actual: Y%
- Siguiente tramo: Z%
- Diferencia: +N puntos porcentuales

💡 RECOMENDACIÓN:
"Si vendes más de €X, el excedente tributará al Z% en lugar 
del actual Y%. Considera diferir ventas al próximo ejercicio 
o usar estrategias de compensación de pérdidas."
```

### 5. Desglose Detallado (Expandible)

Vista detallada mostrando:
- Cantidad de ganancias en cada tramo
- Impuesto calculado por tramo
- Barra de color identificativa
- Rangos de cada tramo

## 🎨 Diseño Visual

### Paleta de Colores por Tramo
1. **Tramo 1 (19%)**: Gradiente verde menta → éxito
2. **Tramo 2 (21%)**: Gradiente azul cielo → información
3. **Tramo 3 (23%)**: Gradiente ámbar → advertencia
4. **Tramo 4 (27%)**: Gradiente ámbar-coral → precaución
5. **Tramo 5 (30%)**: Gradiente coral-rojo → máximo

### Efectos Visuales
- **Glassmorphism**: Fondo semitransparente con blur
- **Glow Effects**: Sombras con efecto de brillo violeta
- **Ripple Animation**: En el vaso activo (pulsación continua)
- **Progressive Fill**: Animación de llenado secuencial con delay escalonado

## 💻 Implementación Técnica

### Props del Componente

```typescript
interface TaxBracketOptimizerProps {
  isVisible?: boolean;      // Control de visibilidad (ocultar montos)
  currentGains?: number;    // Ganancias actuales del año
}
```

### Uso en TaxFiscalSection

```tsx
<TaxBracketOptimizer 
  isVisible={isVisible} 
  currentGains={48200} 
/>
```

### Cálculo de Impuestos

El widget utiliza el sistema de **tributación marginal progresiva**:

```typescript
// Para cada tramo:
1. Calcular cuánto entra en el tramo
2. Aplicar el tipo impositivo del tramo
3. Sumar al total
4. Restar del remanente y pasar al siguiente tramo

// Ejemplo con 48.200€:
Tramo 1: 6.000€ × 19% = 1.140€
Tramo 2: 42.200€ × 21% = 8.862€
Total impuestos: 10.002€
Tipo efectivo: 20.75%
```

## 🔄 Estados Interactivos

### Botones de Acción
1. **Simular escenarios**: Permite probar diferentes cantidades
2. **Estrategia fiscal**: Acceso a planificación avanzada

### Modo Oculto
Cuando `isVisible={false}`:
- Montos se muestran como `€••••••`
- Mantiene la estructura visual
- Útil para capturas de pantalla/demos

## 📱 Responsive Design

- **Desktop (>1024px)**: Grid de 5 columnas para los vasos
- **Tablet (768-1024px)**: Ajuste de espaciado
- **Mobile (<768px)**: 
  - Vasos más pequeños pero legibles
  - Texto adaptativo (10px → 12px)
  - Stack vertical para tarjetas principales

## 🎯 Casos de Uso

### 1. Planificación de Ventas
Usuario quiere vender activos y necesita saber:
- ¿Cuánto puedo vender antes de cambiar de tramo?
- ¿Cuánto pagaré de impuestos en total?
- ¿Vale la pena esperar al próximo año fiscal?

### 2. Optimización Fiscal
Usuario tiene pérdidas acumuladas:
- Ver cómo las pérdidas compensan ganancias
- Calcular el ahorro fiscal real
- Decidir qué activos vender primero

### 3. Reporting & Educación
- Entender el sistema de tramos marginal
- Visualizar el impacto de diferentes escenarios
- Compartir con asesor fiscal

## 🚀 Mejoras Futuras Planificadas

1. **Simulador Interactivo**
   - Slider para ajustar ganancias en tiempo real
   - Ver cambios dinámicos en los vasos

2. **Comparación Anual**
   - Ver tramos de años anteriores
   - Proyección para próximo año

3. **Exportación de Informe**
   - PDF con análisis fiscal completo
   - Gráficos exportables

4. **Integración con Pérdidas**
   - Mostrar compensación de pérdidas
   - Calcular ahorro fiscal real

5. **Multi-jurisdicción**
   - Soporte para otros países
   - Selector de régimen fiscal

## ⚖️ Disclaimer Legal

El widget incluye una nota legal clara:

> **Nota:** Cálculos basados en tramos de IRPF para ganancias patrimoniales. 
> Tu tipo efectivo puede variar según deducciones, compensaciones y 
> circunstancias personales. Consulta con un asesor fiscal profesional.

## 📊 Métricas de Utilidad

El widget está diseñado para proporcionar **información fiscalmente útil de verdad**:

✅ **Cuánto has ganado** - Tracking claro  
✅ **Cuánto vas a pagar** - Cálculo preciso  
✅ **En qué tramo estás** - Visualización inmediata  
✅ **Cuándo cambiarás de tramo** - Alertas proactivas  
✅ **Cómo optimizar** - Recomendaciones accionables  

## 🔗 Archivos Relacionados

- `/components/TaxBracketOptimizer.tsx` - Componente principal
- `/components/TaxFiscalSection.tsx` - Sección que lo contiene
- `/styles/globals.css` - Sistema de colores y variables CSS
- `/types/index.ts` - TypeScript types

---

**Versión:** 1.0  
**Fecha:** Octubre 2025  
**Autor:** Kontrol Dashboard Team  
**Estado:** ✅ Implementado y Funcional
