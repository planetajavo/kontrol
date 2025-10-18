# 🎨 Workflow Figma → Código

Guía completa del proceso de handoff desde diseño en Figma hasta código en producción.

---

## 📋 Tabla de Contenidos

1. [Preparación en Figma](#1-preparación-en-figma)
2. [Versionado de Diseño](#2-versionado-de-diseño)
3. [Exportación de Assets](#3-exportación-de-assets)
4. [Sincronización de Design Tokens](#4-sincronización-de-design-tokens)
5. [Implementación Frontend](#5-implementación-frontend)
6. [Review & Testing](#6-review--testing)
7. [Deploy](#7-deploy)

---

## 1. Preparación en Figma

### 1.1 Estructura de Archivos

Organiza tu proyecto en Figma siguiendo esta estructura:

```
📁 Kontrol (Organization)
├── 📁 Design System
│   ├── 📄 Foundation (Colors, Typography, Spacing)
│   ├── 📄 Components Library
│   ├── 📄 Icons
│   └── 📄 Illustrations
│
├── 📁 Product Screens
│   ├── 📄 Dashboard v1.0.0 [PRODUCTION]
│   ├── 📄 Dashboard v1.1.0 [STAGING]
│   ├── 📄 Tax Module v1.0.0 [PRODUCTION]
│   └── 📄 Archive/
│
└── 📁 Prototypes & Flows
    ├── 📄 Onboarding Flow
    └── 📄 Transaction Flow
```

### 1.2 Naming Conventions

**Páginas:**
```
[Component Name] v[X.Y.Z] [Status]
Ejemplo: Dashboard v1.2.0 [WIP]
```

**Frames:**
```
[Screen]/[State]/[Variant]
Ejemplo: Dashboard/Desktop/Default
Ejemplo: Dashboard/Mobile/With-Filters
```

**Componentes:**
```
[Category]/[Name]/[Variant]
Ejemplo: Button/Primary/Default
Ejemplo: Card/Transaction/Expanded
```

### 1.3 Figma Variables

Crea variables para colores, spacing y otros tokens:

**Colores:**
```
primitives/purple/500     → #8B5CF6
primitives/purple/600     → #7C3AED
semantic/primary          → {primitives/purple/500}
semantic/success-pastel   → #34D399
```

**Spacing:**
```
spacing/xs   → 4px
spacing/sm   → 8px
spacing/md   → 16px
spacing/lg   → 24px
spacing/xl   → 32px
```

**Radius:**
```
radius/sm    → 8px
radius/md    → 12px
radius/lg    → 16px
```

---

## 2. Versionado de Diseño

### 2.1 Semantic Versioning en Figma

Sigue el formato: `MAJOR.MINOR.PATCH`

**MAJOR (v2.0.0):**
- Cambios que rompen la estructura existente
- Rediseño completo de sección
- Cambio de arquitectura de información

**MINOR (v1.1.0):**
- Nuevas features sin romper lo existente
- Nuevos componentes
- Mejoras visuales significativas

**PATCH (v1.0.1):**
- Bug fixes en diseño
- Ajustes de spacing/colores
- Correcciones tipográficas

### 2.2 Status Tags

Usa estos sufijos en nombres de página:

```
[PRODUCTION]  → En producción actual
[STAGING]     → En staging, próximo a producción
[WIP]         → Work in progress
[REVIEW]      → Listo para review de equipo
[ARCHIVED]    → Versión antigua archivada
```

### 2.3 Change Log en Figma

Crea una página "Changelog" en tu archivo:

```
## v1.1.0 [2024-10-15]
### Added
- Bot activity detection widget
- New fiscal simulator
- Transaction grouping by month

### Changed
- Updated color palette to pastel theme
- Improved mobile responsiveness

### Fixed
- Alignment issues in transaction cards
- Chart tooltip positioning
```

---

## 3. Exportación de Assets

### 3.1 Configurar Exports

**Para íconos SVG:**
1. Selecciona el ícono
2. Export settings:
   - Format: SVG
   - ✅ Include "id" attribute
   - ✅ Outline text
   - Suffix: `@svg`

**Para imágenes:**
1. Selecciona el frame/layer
2. Export settings:
   - Format: PNG
   - Scale: 1x, 2x, 3x (para diferentes densidades)
   - Suffix: `@1x`, `@2x`, `@3x`

### 3.2 Scripts de Exportación Automática

Usa el plugin **"Export to Code"** o crea un script:

```javascript
// Figma Plugin: Auto-export assets
figma.currentPage.selection.forEach((node) => {
  if (node.type === "COMPONENT" || node.type === "FRAME") {
    node.exportAsync({
      format: "SVG",
      svgIdAttribute: true,
      svgOutlineText: true
    }).then((bytes) => {
      // Guardar en /assets/icons/ o /assets/images/
    });
  }
});
```

---

## 4. Sincronización de Design Tokens

### 4.1 Setup de Figma API

**Obtener Token:**
1. Figma → Settings → Personal access tokens
2. Generate new token
3. Guardar en `.env`:
   ```
   FIGMA_TOKEN=figd_xxxxxxxxxxxxx
   FIGMA_FILE_KEY=xxxxxxxxxxxxx
   ```

### 4.2 Script de Sincronización

Crea `packages/design-tokens/sync-figma.js`:

```javascript
import { Figma } from '@figma/figma-api';
import StyleDictionary from 'style-dictionary';
import fs from 'fs/promises';

const figma = new Figma({
  personalAccessToken: process.env.FIGMA_TOKEN
});

const FILE_KEY = process.env.FIGMA_FILE_KEY;

async function syncTokens() {
  console.log('🎨 Syncing design tokens from Figma...');
  
  // 1. Obtener variables de Figma
  const variables = await figma.getLocalVariables(FILE_KEY);
  
  // 2. Transformar a formato Design Tokens
  const tokens = transformToTokens(variables);
  
  // 3. Guardar tokens.json
  await fs.writeFile(
    './tokens.json',
    JSON.stringify(tokens, null, 2)
  );
  
  console.log('✅ Tokens synced successfully!');
  
  // 4. Generar CSS y JS
  buildTokens();
}

function transformToTokens(variables) {
  const tokens = {
    color: {},
    spacing: {},
    typography: {},
    borderRadius: {}
  };
  
  variables.meta.variables.forEach(variable => {
    const category = variable.resolvedType;
    const name = variable.name.replace(/\//g, '-').toLowerCase();
    
    if (category === 'COLOR') {
      const rgba = variable.valuesByMode.default;
      tokens.color[name] = {
        value: rgbaToHex(rgba),
        type: 'color'
      };
    }
    
    if (category === 'FLOAT') {
      if (variable.name.includes('spacing')) {
        tokens.spacing[name] = {
          value: `${variable.valuesByMode.default}px`,
          type: 'dimension'
        };
      }
      if (variable.name.includes('radius')) {
        tokens.borderRadius[name] = {
          value: `${variable.valuesByMode.default}px`,
          type: 'dimension'
        };
      }
    }
  });
  
  return tokens;
}

function rgbaToHex(rgba) {
  const r = Math.round(rgba.r * 255);
  const g = Math.round(rgba.g * 255);
  const b = Math.round(rgba.b * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function buildTokens() {
  StyleDictionary.extend({
    source: ['tokens.json'],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: '../frontend/styles/',
        files: [{
          destination: 'tokens.css',
          format: 'css/variables'
        }]
      },
      js: {
        transformGroup: 'js',
        buildPath: '../frontend/src/',
        files: [{
          destination: 'tokens.js',
          format: 'javascript/es6'
        }]
      },
      typescript: {
        transformGroup: 'js',
        buildPath: '../frontend/src/',
        files: [{
          destination: 'tokens.ts',
          format: 'typescript/es6-declarations'
        }]
      }
    }
  }).buildAllPlatforms();
  
  console.log('✅ Tokens built for all platforms!');
}

syncTokens().catch(console.error);
```

### 4.3 Automatizar con Webhook

Configura un webhook en Figma para sincronización automática:

```javascript
// backend/webhooks/figma-webhook.js
import express from 'express';
import { exec } from 'child_process';

const app = express();

app.post('/webhooks/figma', async (req, res) => {
  const { event_type, file_key, timestamp } = req.body;
  
  if (event_type === 'FILE_UPDATE' && file_key === process.env.FIGMA_FILE_KEY) {
    console.log(`🎨 Figma file updated at ${timestamp}`);
    
    // Ejecutar sync
    exec('cd packages/design-tokens && node sync-figma.js', (error, stdout) => {
      if (error) {
        console.error('Error syncing tokens:', error);
        return;
      }
      
      console.log(stdout);
      
      // Crear PR automático
      exec(`
        git checkout -b figma-sync-${Date.now()}
        git add packages/design-tokens
        git commit -m "chore: auto-sync design tokens from Figma"
        git push origin HEAD
        gh pr create \
          --title "🎨 Auto-sync: Design tokens from Figma" \
          --body "Automated sync triggered by Figma webhook at ${timestamp}"
      `);
    });
  }
  
  res.sendStatus(200);
});

app.listen(3001);
```

---

## 5. Implementación Frontend

### 5.1 Workflow del Desarrollador

**Cuando hay un nuevo diseño:**

```bash
# 1. Revisar diseño en Figma
# URL: figma.com/file/xxxxx/Dashboard-v1.1.0

# 2. Crear branch
git checkout develop
git pull origin develop
git checkout -b feature/dashboard-v1.1.0

# 3. Sync design tokens (si hay cambios)
cd packages/design-tokens
node sync-figma.js

# 4. Revisar cambios en tokens
git diff styles/tokens.css

# 5. Implementar componentes
# ... código ...

# 6. Commit
git add .
git commit -m "feat(dashboard): implement bot activity widget from Figma v1.1.0"

# 7. Push y crear PR
git push origin feature/dashboard-v1.1.0
gh pr create --base develop
```

### 5.2 Figma to React Guidelines

**Traducir diseño a componentes:**

```typescript
// ❌ NO copies styles manualmente
<div style={{ 
  width: '320px',
  height: '200px',
  backgroundColor: '#8B5CF6',
  borderRadius: '12px'
}} />

// ✅ USA tokens y Tailwind
<div className="w-80 h-50 bg-primary rounded-xl" />
```

**Respetar estructura de Figma:**
- Si en Figma hay un Auto Layout → usa Flexbox/Grid
- Si hay spacing de 16px → usa `gap-4` (16px)
- Si hay padding de 24px → usa `p-6` (24px)

**Mantener nomenclatura:**
```typescript
// Figma component: "Card/Transaction/Expanded"
// React component: TransactionCard.tsx

interface TransactionCardProps {
  variant?: 'default' | 'expanded';
}
```

### 5.3 Responsive Implementation

Si el diseño tiene breakpoints en Figma:

```
📱 Mobile:   320px - 767px
💻 Tablet:   768px - 1023px
🖥️  Desktop:  1024px+
```

Implementa con Tailwind responsive classes:

```tsx
<div className="
  p-4               // mobile
  md:p-6            // tablet
  lg:p-8            // desktop
  grid
  grid-cols-1       // mobile: 1 columna
  md:grid-cols-2    // tablet: 2 columnas
  lg:grid-cols-3    // desktop: 3 columnas
  gap-4
">
  {/* content */}
</div>
```

---

## 6. Review & Testing

### 6.1 Design QA Checklist

Antes de marcar como "listo", verifica:

**Visual:**
- [ ] Colores coinciden con Figma (usa extensiones de browser)
- [ ] Spacing correcto (padding, margins, gaps)
- [ ] Typography (tamaños, pesos, line-height)
- [ ] Border radius y shadows
- [ ] Iconos correctos y tamaño apropiado

**Interactividad:**
- [ ] Hover states
- [ ] Focus states (accesibilidad)
- [ ] Active/pressed states
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

**Responsive:**
- [ ] Mobile (375px, 320px)
- [ ] Tablet (768px, 1024px)
- [ ] Desktop (1280px, 1440px, 1920px)
- [ ] No overflow horizontal
- [ ] Touch targets ≥ 44px en mobile

**Performance:**
- [ ] Imágenes optimizadas
- [ ] Lazy loading implementado
- [ ] No layout shift (CLS < 0.1)

### 6.2 Tools para QA Visual

**Figma DevMode:**
1. Abre el archivo en DevMode (Shift + D)
2. Selecciona el frame
3. Compara con tu implementación
4. Usa "Inspect" para ver CSS exacto

**Browser Extensions:**
- **Figma Inspector** - Compara diseño vs implementación
- **Perfect Pixel** - Overlay de diseño sobre página
- **ColorZilla** - Verificar colores exactos

**Lighthouse:**
```bash
# Performance audit
npm install -g lighthouse
lighthouse http://localhost:5173 --view
```

---

## 7. Deploy

### 7.1 Preview Deployment (Automático)

Cuando creas un PR:

```bash
# GitHub Actions auto-deploy a Vercel
# URL preview: https://kontrol-git-feature-xxx.vercel.app
```

**Proceso:**
1. Creas PR
2. CI/CD ejecuta tests
3. Vercel crea preview deployment
4. Bot comenta en PR con URL
5. Designer revisa preview

### 7.2 Staging Deployment

```bash
# Merge a staging branch
git checkout staging
git merge develop
git push origin staging

# Auto-deploy a staging.kontrol.app
```

### 7.3 Production Deployment

```bash
# 1. Crear release branch
git checkout -b release/v1.1.0 staging

# 2. Bump version
npm version minor  # 1.0.0 → 1.1.0

# 3. Update CHANGELOG
# Documenta cambios en CHANGELOG.md

# 4. Merge a main
git checkout main
git merge release/v1.1.0

# 5. Tag
git tag -a v1.1.0 -m "Release v1.1.0: Bot activity detection"
git push origin main --tags

# 6. Auto-deploy a kontrol.app (production)
```

---

## 📊 Métricas de Éxito

### Design → Code Quality

**Time to Code:**
- Target: < 2 días desde diseño aprobado
- Actual: tracking en GitHub Projects

**Design Fidelity:**
- Target: 95%+ de precisión visual
- Medición: QA checklist score

**Design Debt:**
- Target: 0 inconsistencias
- Tracking: Issues etiquetadas como "design-debt"

---

## 🔄 Ciclo Completo (Ejemplo Real)

### Escenario: Nueva feature "Bot Detection Widget"

**Día 1 - Diseño (Designer):**
```
9:00  → Crear página "Dashboard v1.1.0 [WIP]" en Figma
10:00 → Diseñar widget de bot detection
11:00 → Actualizar Design System (nuevos colores warning)
12:00 → Crear prototype interactivo
14:00 → Presentar a equipo en daily
15:00 → Incorporar feedback
16:00 → Marcar como [REVIEW]
17:00 → Exportar assets y actualizar Figma variables
```

**Día 2 - Handoff (Designer → Dev):**
```
9:00  → Crear task en GitHub: "Implement bot detection widget"
9:15  → Añadir link a Figma en descripción
9:30  → Notificar en Slack #dev-frontend
10:00 → Figma webhook trigger auto-sync de tokens
10:05 → PR automático creado con tokens actualizados
```

**Día 2-3 - Implementación (Developer):**
```
10:30 → Review Figma design
11:00 → Crear branch feature/bot-detection
11:30 → Merge PR de tokens
12:00 → Implementar componente BotActivityWidget
14:00 → Integrar en DashboardSection
15:00 → Tests unitarios
16:00 → Commit y push
16:30 → Crear PR con screenshots
```

**Día 3 - Review (Team):**
```
9:00  → Code review por senior dev
9:30  → Design QA por designer en Vercel preview
10:00 → Feedback: "Ajustar spacing en mobile"
11:00 → Developer hace ajustes
12:00 → Re-review: Approved ✅
13:00 → Merge a develop
```

**Día 4 - Staging:**
```
9:00  → Merge develop → staging
9:15  → Auto-deploy a staging.kontrol.app
10:00 → QA testing
11:00 → Product owner approval
```

**Día 5 - Production:**
```
9:00  → Crear release/v1.1.0
9:30  → Update CHANGELOG
10:00 → Merge a main
10:15 → Auto-deploy a kontrol.app
11:00 → Monitor Sentry for errors
12:00 → Success! 🎉
```

---

## 🛠️ Tools & Plugins Recomendados

### Figma Plugins:
- **Figma to Code** - Export a React/Vue/HTML
- **Design Tokens** - Gestión de tokens
- **Auto Layout** - Optimizar Auto Layouts
- **Stark** - Accesibilidad (contraste, etc)

### VS Code Extensions:
- **Figma for VS Code** - Ver diseños en editor
- **SVG Preview** - Preview de SVGs exportados
- **Tailwind CSS IntelliSense** - Autocompletado

### CI/CD Tools:
- **Chromatic** - Visual regression testing
- **Percy** - Screenshot diffing
- **Loki** - Visual regression con Storybook

---

## 📚 Recursos Adicionales

- [Figma REST API Docs](https://www.figma.com/developers/api)
- [Style Dictionary Docs](https://amzn.github.io/style-dictionary)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

¡Con este workflow, el proceso de Figma a código es seamless y automatizado! 🚀
