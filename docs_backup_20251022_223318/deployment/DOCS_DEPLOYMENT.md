# 📚 Despliegue de Documentación - docs.kontrol.crypto

Guía para configurar y desplegar la documentación en un subdominio separado.

---

## 🏗️ Arquitectura

La documentación de Kontrol está completamente separada de la aplicación principal:

```
kontrol/
├── index.html              # App principal (kontrol.app)
├── App.tsx                 # Aplicación principal
├── main.tsx               # Entry point principal
│
├── index-docs.html         # Docs (docs.kontrol.crypto)
├── DocsApp.tsx            # Aplicación de documentación
├── main-docs.tsx          # Entry point de docs
│
└── vercel.json            # Configuración de routing
```

---

## 🚀 Deploy Local

### 1. Desarrollo Local - Docs

```bash
# Terminal 1: App principal
npm run dev

# Terminal 2: Documentación
npm run dev:docs
```

### 2. Build Separado

```bash
# Build app principal
npm run build

# Build documentación
npm run build:docs
```

---

## 🌐 Configuración en Vercel

### Opción A: Proyectos Separados (Recomendado)

**1. Proyecto Principal (kontrol.app)**

```bash
# Crear proyecto en Vercel
vercel --prod

# Configuración:
Project Name: kontrol
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Root Directory: ./
```

**2. Proyecto de Docs (docs.kontrol.crypto)**

```bash
# En la misma carpeta, crear otro proyecto
vercel --prod

# Configuración:
Project Name: kontrol-docs
Framework Preset: Vite
Build Command: npm run build:docs
Output Directory: dist-docs
Root Directory: ./
```

**3. Configurar Subdominios**

En Vercel Dashboard:

1. Ve a **kontrol-docs** project
2. **Settings** → **Domains**
3. Añade: `docs.kontrol.crypto`
4. Configura DNS:
   ```
   Type: CNAME
   Name: docs
   Value: cname.vercel-dns.com
   ```

### Opción B: Proyecto Único con Rutas

**vercel.json (ya incluido):**

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/docs/(.*)",
      "dest": "/index-docs.html"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

Luego configurar subdominios en Vercel:
- `kontrol.app` → `/`
- `docs.kontrol.crypto` → `/docs/`

---

## 📝 Scripts de Package.json

Añade estos scripts a tu `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "dev:docs": "vite --config vite.config.docs.ts",
    "build": "tsc && vite build",
    "build:docs": "tsc && vite build --config vite.config.docs.ts",
    "preview": "vite preview",
    "preview:docs": "vite preview --outDir dist-docs",
    "deploy": "vercel --prod",
    "deploy:docs": "vercel --prod --cwd ."
  }
}
```

---

## 🔗 Links de Acceso

Una vez desplegado:

- **App Principal:** https://kontrol.app
- **Documentación:** https://docs.kontrol.crypto

Los links en la app principal (Sidebar y BottomNav) apuntan a `docs.kontrol.crypto` y se abren en nueva pestaña.

---

## 🔄 Workflow de Actualización

### Actualizar Docs

```bash
# 1. Hacer cambios en DocsApp.tsx
# ... editar ...

# 2. Build local para probar
npm run build:docs
npm run preview:docs

# 3. Commit y push
git add .
git commit -m "docs: update installation guide"
git push origin main

# 4. Deploy automático por Vercel
# O manual:
vercel --prod
```

### CI/CD Automático

El archivo `.github/workflows/ci.yml` ya incluye deployment automático.

Para separar los deployments:

**.github/workflows/deploy-docs.yml:**

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]
    paths:
      - 'DocsApp.tsx'
      - 'index-docs.html'
      - 'main-docs.tsx'
      - 'FIGMA_TO_CODE_WORKFLOW.md'
      - 'GITHUB_SETUP.md'
      - '**.md'

jobs:
  deploy-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build docs
        run: npm run build:docs
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_DOCS_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🎨 Personalizar Dominio

### DNS Configuration

En tu proveedor de DNS (Cloudflare, Namecheap, etc):

```
# Para docs.kontrol.crypto
Type: CNAME
Name: docs
Value: cname.vercel-dns.com
TTL: Auto
```

### SSL/TLS

Vercel proporciona SSL automáticamente para subdominios.

---

## 📊 Analytics & Monitoring

### Google Analytics

Añade en `index-docs.html`:

```html
<head>
  <!-- ... -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

### Vercel Analytics

```tsx
// DocsApp.tsx
import { Analytics } from '@vercel/analytics/react';

export default function DocsApp() {
  return (
    <>
      {/* ... componentes ... */}
      <Analytics />
    </>
  );
}
```

---

## 🔍 SEO para Docs

El archivo `index-docs.html` ya incluye meta tags optimizados:

- Open Graph para redes sociales
- Twitter Cards
- Meta descriptions
- Keywords relevantes

### Sitemap

Crear `public/sitemap-docs.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://docs.kontrol.crypto/</loc>
    <lastmod>2024-10-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://docs.kontrol.crypto/#installation</loc>
    <lastmod>2024-10-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Más URLs de secciones -->
</urlset>
```

---

## 🐛 Troubleshooting

### Problema: 404 en docs.kontrol.crypto

**Solución:**
1. Verificar DNS propagación: https://dnschecker.org
2. Verificar dominio en Vercel Settings → Domains
3. Esperar hasta 48h para propagación completa

### Problema: Estilos no cargan

**Solución:**
```bash
# Verificar que globals.css está importado en main-docs.tsx
# Limpiar cache de build
rm -rf dist-docs
npm run build:docs
```

### Problema: Links rotos

**Solución:**
- Todos los links deben ser absolutos: `href="https://kontrol.app"`
- O usar rutas relativas correctamente

---

## ✅ Checklist de Deployment

- [ ] Build de docs funciona localmente
- [ ] Preview de docs funciona
- [ ] DNS configurado correctamente
- [ ] Dominio añadido en Vercel
- [ ] SSL activo
- [ ] Links desde app principal funcionan
- [ ] Analytics configurado (opcional)
- [ ] Sitemap creado (opcional)
- [ ] Open Graph tags verificados

---

## 📚 Recursos

- [Vercel Domains Documentation](https://vercel.com/docs/concepts/projects/custom-domains)
- [Vercel Multi-Site Setup](https://vercel.com/docs/concepts/monorepos)
- [DNS Configuration Guide](https://vercel.com/docs/concepts/projects/custom-domains#dns-configuration)

---

¡Tu documentación ahora está completamente separada y accesible en docs.kontrol.crypto! 🎉
