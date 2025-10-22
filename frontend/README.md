# 🎯 KONTROL Frontend - MVP Minimalista

## 🚀 Inicio Rápido

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará en: **http://localhost:3000**

---

## 📁 Estructura Simple

```
frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── AddressImporter.tsx   # Importador de direcciones
│   │   └── DebugConsole.tsx      # Consola de debug
│   ├── App.tsx              # Componente principal
│   ├── App.css              # Estilos principales
│   └── main.tsx             # Entry point
├── package.json             # Dependencias
└── vite.config.ts           # Configuración Vite
```

---

## 🎨 Funcionalidades Actuales

### ✅ Implementado
- **Importador de Direcciones**: Pega direcciones de wallet (Ethereum, Bitcoin, Polygon)
- **Validación Básica**: Valida formato de direcciones
- **Consola de Debug**: Muestra logs en tiempo real de todas las operaciones
- **UI Moderna**: Diseño oscuro y minimalista

### 🚧 Para Conectar con Backend
1. El frontend ya tiene proxy configurado a `http://localhost:8000`
2. En `AddressImporter.tsx` hay un comentario donde hacer la llamada API
3. Busca: `// Aquí podrías hacer una llamada al backend`

---

## 🔧 Cómo Agregar Nueva Funcionalidad

### Paso 1: Crear el Componente
```tsx
// src/components/MiNuevoComponente.tsx
interface Props {
  onLog: (type, message, data?) => void;
}

const MiNuevoComponente = ({ onLog }: Props) => {
  // Tu código aquí
  onLog('info', 'Esto aparecerá en la consola de debug');
  
  return <div>Mi componente</div>;
};
```

### Paso 2: Agregar CSS
```css
/* src/components/MiNuevoComponente.css */
.mi-clase {
  background: #1a1a1a;
  padding: 1rem;
}
```

### Paso 3: Usar en App.tsx
```tsx
import MiNuevoComponente from './components/MiNuevoComponente';

// En el return de App:
<MiNuevoComponente onLog={addLog} />
```

---

## 🐛 Sistema de Debug

El sistema de logs está integrado. Úsalo así:

```tsx
// En cualquier componente que reciba onLog:
onLog('info', 'Mensaje informativo');
onLog('success', '✅ Operación exitosa');
onLog('warning', '⚠️ Advertencia');
onLog('error', '❌ Error', { errorDetails: '...' });
```

Los logs aparecerán automáticamente en la consola de debug en la parte inferior.

---

## 🔌 Conectar con el Backend

### Opción 1: Usar el Proxy (recomendado)
```tsx
// Ya configurado en vite.config.ts
const response = await fetch('/api/addresses/import', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ addresses: ['0x...'] })
});
```

### Opción 2: URL Directa
```tsx
const response = await fetch('http://localhost:8000/api/addresses/import', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ addresses: ['0x...'] })
});
```

---

## 📝 Próximos Pasos Sugeridos

### Fase 1: Conectar con Backend (Semana 1)
- [ ] Crear endpoint `/api/addresses/import` en el backend
- [ ] Conectar AddressImporter con el endpoint
- [ ] Mostrar respuesta del backend en la UI

### Fase 2: Mostrar Datos (Semana 2)
- [ ] Crear componente para mostrar balance de cada dirección
- [ ] Crear componente para listar transacciones
- [ ] Agregar filtros básicos

### Fase 3: Features Avanzadas (Semana 3+)
- [ ] Gráficas de portfolio con Recharts
- [ ] Exportar datos a CSV/PDF
- [ ] Cálculos fiscales básicos

---

## 🆘 Troubleshooting

### Puerto 3000 ya en uso
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Error de TypeScript
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema con Vite
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## 💡 Tips para Solopreneurs

### 1. **Commit Frecuente**
```bash
git add .
git commit -m "✅ Feature: Importador de direcciones funcionando"
```

### 2. **Documenta Todo**
- Escribe comentarios en español
- Actualiza este README con cada cambio importante
- Usa emojis para facilitar la lectura

### 3. **Testing Manual**
- Prueba cada feature inmediatamente después de crearla
- Usa la consola de debug para ver qué está pasando
- No avances sin que la feature anterior funcione

### 4. **Pide Ayuda a la IA Correctamente**
```
❌ "Arregla el proyecto"
✅ "El componente AddressImporter no valida direcciones Bitcoin, 
    necesito agregar regex para formato bc1..."
```

---

## 🎯 Checkpoint Actual

**Fecha**: 2025-10-22
**Estado**: ✅ Frontend minimalista creado y funcionando
**Funciona**: 
- Importador de direcciones
- Validación básica de addresses
- Consola de debug en tiempo real
- UI responsive y moderna

**No funciona aún**:
- Conexión con backend (endpoint no existe)
- Persistencia de datos
- Mostrar balances/transacciones

**Próximo paso**: Crear endpoint `/api/addresses/import` en el backend

---

**Desarrollado con ❤️ para solopreneurs | MVP v0.1.0**
