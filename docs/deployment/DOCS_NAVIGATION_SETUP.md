# 📚 Configuración de Navegación de Documentación

## ✅ Estado Actual

La documentación está integrada en el prototipo local y lista para producción en subdominio separado.

---

## 🔄 Flujo de Navegación

### En Desarrollo Local (Prototipo)

```
Landing Page
    ↓
    ├─→ [Link Footer] → Documentación (vista embebida)
    │                        ↓
    │                   [Volver a Home] → Landing Page
    │
    └─→ [Login] → App Dashboard
                     ↓
                     ├─→ [Sidebar: Documentación] → Docs (pantalla completa)
                     │                                  ↓
                     │                             [Volver a Home] → Landing Page
                     │
                     └─→ [Mobile: More → Docs] → Docs (pantalla completa)
                                                      ↓
                                                 [Volver a Home] → Landing Page
```

### En Producción

```
Landing Page (kontrol.app)
    ↓
    └─→ [Link Footer] → docs.kontrol.crypto (nueva ventana/pestaña)

App Dashboard (kontrol.app)
    ↓
    ├─→ [Sidebar: Documentación] → docs.kontrol.crypto (nueva ventana)
    └─→ [Mobile: More → Docs] → docs.kontrol.crypto (nueva ventana)
```

---

## 🎯 Implementación

### 1. App.tsx

```tsx
// Añadido state para página 'docs'
const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'register' | 'app' | 'docs'>('landing');

// Lazy load de DocsApp
const DocsApp = lazy(() => import('./DocsApp'));

// Render condicional para docs (sin authenticated)
if (currentPage === 'docs') {
  return <DocsApp onBackToHome={() => setCurrentPage('landing')} />;
}

// Full-screen docs cuando está logueado
if (currentView === 'docs') {
  return <DocsApp onBackToHome={() => setCurrentPage('landing')} />;
}
```

### 2. Sidebar.tsx

```tsx
<button onClick={() => onViewChange('docs')}>
  <BookOpen />
  Documentación
</button>
```

### 3. BottomNav.tsx

```tsx
const moreMenuItems = [
  { id: 'banks', label: 'Banks', icon: Landmark },
  { id: 'aml', label: 'AML & KYT', icon: Shield },
  { id: 'docs', label: 'Documentación', icon: BookOpen }, // ← Añadido
];
```

### 4. LandingPage.tsx

```tsx
// Props
interface LandingPageProps {
  onNavigateToDocs?: () => void; // ← Añadido
}

// Footer - Sección Resources
<div>
  <h4>Resources</h4>
  <ul>
    <li>
      <button onClick={onNavigateToDocs}>
        Documentación
      </button>
    </li>
  </ul>
</div>
```

### 5. DocsApp.tsx

```tsx
interface DocsAppProps {
  onBackToHome?: () => void; // ← Callback para volver
}

// Header con botón de vuelta
{onBackToHome && (
  <Button onClick={onBackToHome}>
    <Home /> Volver a Home
  </Button>
)}

// Scroll automático al montar
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

// Observer para actualizar sección activa
useEffect(() => {
  const observer = new IntersectionObserver(...);
  // ... observa todas las secciones
}, []);
```

---

## 🧪 Testing

### Prueba 1: Navegación desde Landing
1. Ir a landing page
2. Scroll hasta footer
3. Click en "Documentación" (sección Resources)
4. ✅ Debe cargar DocsApp con navegación fluida
5. Click en "Volver a Home"
6. ✅ Debe volver a landing page

### Prueba 2: Navegación desde Sidebar (Desktop)
1. Login en la app
2. En sidebar, click en "Documentación"
3. ✅ Debe mostrar docs en pantalla completa
4. ✅ Sidebar y TopNav deben estar ocultos
5. Click en "Volver a Home"
6. ✅ Debe volver a landing (deslogueado)

### Prueba 3: Navegación desde BottomNav (Mobile)
1. Login en la app (vista mobile)
2. Click en "More" (menú hamburguesa)
3. Click en "Documentación"
4. ✅ Debe mostrar docs
5. Click en menú hamburguesa de docs
6. Click en "Volver a Home"
7. ✅ Debe volver a landing

### Prueba 4: Navegación interna en Docs
1. Abrir docs
2. Click en diferentes secciones del sidebar
3. ✅ Scroll suave a cada sección
4. ✅ Indicador activo se actualiza
5. Scroll manual por la página
6. ✅ Indicador activo se actualiza automáticamente

---

## 📱 Responsive

### Desktop (≥1024px)
- Sidebar sticky con navegación
- Header sticky con botones de acción
- Content max-width: 1920px
- Sidebar width: 320px

### Tablet (768px - 1023px)
- Menu hamburguesa
- Header sticky
- Full width content

### Mobile (<768px)
- Menu hamburguesa full screen
- Header compacto
- Padding reducido

---

## 🎨 Estilos

### Navegación Activa
```tsx
// Indicador visual en sidebar
{activeSection === subsection.id && (
  <motion.div
    layoutId="active-indicator"
    className="w-1.5 h-1.5 rounded-full bg-primary"
  />
)}
```

### Animaciones
- **Scroll suave:** `behavior: 'smooth'`
- **Menu mobile:** Motion slide-in from left
- **Hover en nav:** Motion whileHover={{ x: 4 }}
- **Active indicator:** layoutId para smooth transition

---

## 🔧 Configuración de Producción

### Para cambiar a URLs externas (producción):

**Sidebar.tsx:**
```tsx
// Cambiar de:
<button onClick={() => onViewChange('docs')}>

// A:
<a href="https://docs.kontrol.crypto" target="_blank">
```

**BottomNav.tsx:**
```tsx
// Cambiar de:
{ id: 'docs', label: 'Documentación', icon: BookOpen }

// A:
// Eliminar de moreMenuItems
// Y añadir después del map:
<a
  href="https://docs.kontrol.crypto"
  target="_blank"
  className="border-t"
>
  Documentación
</a>
```

**LandingPage.tsx:**
```tsx
// Cambiar de:
<button onClick={onNavigateToDocs}>

// A:
<a href="https://docs.kontrol.crypto" target="_blank">
```

---

## 🚀 Variables de Entorno

Para hacer esto dinámico, crear en `.env`:

```env
# Desarrollo
VITE_DOCS_URL=/docs

# Producción
VITE_DOCS_URL=https://docs.kontrol.crypto
```

Luego en el código:
```tsx
const docsUrl = import.meta.env.VITE_DOCS_URL || '/docs';

// Si es URL externa
if (docsUrl.startsWith('http')) {
  return <a href={docsUrl} target="_blank">Docs</a>;
}

// Si es ruta interna
return <button onClick={() => onViewChange('docs')}>Docs</button>;
```

---

## ✨ Mejoras Futuras

1. **Búsqueda funcional** - Integrar Algolia DocSearch
2. **Versioning** - v1.0, v2.0, etc
3. **i18n** - Español, Inglés
4. **Dark/Light toggle** - Para docs (opcional)
5. **Table of contents flotante** - En desktop, sidebar derecho con TOC de sección actual
6. **Breadcrumbs** - Navegación jerárquica
7. **Copy link to section** - Share button para cada sección

---

## 🐛 Troubleshooting

### Problema: Scroll no funciona suavemente
**Causa:** Offset incorrecto o elemento no encontrado
**Solución:** Verificar que el ID del elemento coincide con el subsection.id

### Problema: Active indicator no se actualiza
**Causa:** IntersectionObserver no configurado correctamente
**Solución:** Verificar rootMargin y que los elementos tienen IDs correctos

### Problema: DocsApp no carga
**Causa:** Lazy loading fallando
**Solución:** Verificar que DocsApp.tsx está en la raíz y exporta por defecto

### Problema: Volver a Home no funciona
**Causa:** Callback no pasado o no definido
**Solución:** Verificar que onBackToHome está en props y se llama correctamente

---

## 📝 Checklist de Testing

- [ ] Landing → Docs → Volver funciona
- [ ] Sidebar → Docs → Volver funciona  
- [ ] BottomNav → Docs → Volver funciona
- [ ] Navegación interna en docs es fluida
- [ ] Scroll automático al cambiar sección
- [ ] Active indicator se actualiza
- [ ] Mobile menu funciona
- [ ] Responsive en todos los tamaños
- [ ] No hay errores en consola
- [ ] Performance es buena (Lighthouse > 90)

---

¡Todo configurado para navegación fluida local y producción en subdominio! 🎉
