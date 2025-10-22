# 📋 Design System TODOs

> Tracking de componentes fuera del DS y próximos componentes a crear

## 🔄 Componentes a Migrar

### Alta Prioridad
- [ ] **AddressImporter** → Migrar a usar `FormField` y `Button` del DS
- [ ] **DebugConsole** → Migrar a usar `Card` del DS
- [ ] **App.tsx** → Migrar estilos custom a clases del DS

### Media Prioridad
- [ ] Revisar todos los componentes actuales
- [ ] Eliminar CSS custom de componentes
- [ ] Usar spacing system consistentemente

## ➕ Próximos Componentes a Crear

### Atoms
- [ ] **Textarea** - Para inputs multilinea
- [ ] **Checkbox** - Para selección múltiple
- [ ] **Radio** - Para selección única
- [ ] **Switch** - Para toggles on/off
- [ ] **Spinner** - Loading indicator
- [ ] **Icon** - Sistema de iconos
- [ ] **Link** - Enlaces estilizados
- [ ] **Avatar** - Para usuarios

### Molecules
- [ ] **SearchBar** - Input + Icon + Button
- [ ] **Alert** - Mensajes de notificación
- [ ] **Toast** - Notificaciones temporales
- [ ] **Tooltip** - Info on hover
- [ ] **Breadcrumb** - Navegación
- [ ] **Pagination** - Para listas
- [ ] **ProgressBar** - Para procesos

### Organisms
- [ ] **Header** - Navigation bar
- [ ] **Table** - Tablas de datos
- [ ] **Modal** - Diálogos
- [ ] **Dropdown** - Menús desplegables
- [ ] **Tabs** - Pestañas
- [ ] **Sidebar** - Menú lateral
- [ ] **Footer** - Pie de página

### Templates
- [ ] **DashboardLayout** - Layout principal
- [ ] **AuthLayout** - Para login/register
- [ ] **SettingsLayout** - Para configuración

## 📊 Métricas de Adopción

```
Componentes usando DS:  0/3  (0%)
Colores hardcoded:      ❓ (pendiente audit)
Spacing hardcoded:      ❓ (pendiente audit)
```

## 🎯 Objetivo Q1 2026

- ✅ 100% componentes usan DS
- ✅ 0 colores hardcoded
- ✅ 0 spacing hardcoded
- ✅ Todos los atoms principales creados
- ✅ Top 10 molecules creados

## 📝 Notas

### Convenciones
- Todos los componentes deben tener JSDoc
- Todos deben tener ejemplo de uso
- Seguir naming de GitHub cuando sea posible
- Props con tipos TypeScript estrictos

### Próxima Sesión
- Migrar AddressImporter al DS
- Migrar DebugConsole al DS
- Crear componente Table
- Crear componente Modal

---

**Última actualización**: 2025-10-22  
**Próxima revisión**: Después de cada sprint
