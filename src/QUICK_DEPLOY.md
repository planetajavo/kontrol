# 🚀 Kontrol - Quick Deploy Guide

Guía rápida para deployar Kontrol en producción usando Vercel.

---

## 📋 Requisitos Previos

- ✅ Proyecto en GitHub (público o privado)
- ✅ Cuenta en [Vercel](https://vercel.com) (gratis)
- ✅ Código funcionando en local (`npm run dev`)

---

## 🚀 Opción 1: Deploy desde GitHub (Recomendado)

### **Paso 1: Subir a GitHub**

Si aún no has subido el proyecto:

```bash
# Inicializar git (si no está inicializado)
git init

# Añadir archivos
git add .

# Commit inicial
git commit -m "🚀 Initial commit - Kontrol v1.0"

# Crear repo en GitHub y conectar
git remote add origin https://github.com/TU-USUARIO/kontrol-crypto-dashboard.git
git branch -M main
git push -u origin main
```

### **Paso 2: Importar a Vercel**

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Click en **"Import Git Repository"**
3. Selecciona tu repo **kontrol-crypto-dashboard**
4. Configura el proyecto:

```yaml
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Click **"Deploy"**

### **Paso 3: ¡Listo!**

Tu app estará en: `https://kontrol-crypto-dashboard.vercel.app`

---

## 🚀 Opción 2: Deploy con CLI de Vercel

### **Instalación de Vercel CLI**

```bash
npm install -g vercel
```

### **Deploy**

```bash
# Desde la raíz del proyecto
vercel

# Sigue las instrucciones:
# ? Set up and deploy "~/kontrol-dashboard"? [Y/n] y
# ? Which scope do you want to deploy to? Your Account
# ? Link to existing project? [y/N] n
# ? What's your project's name? kontrol-crypto-dashboard
# ? In which directory is your code located? ./
```

### **Production Deploy**

```bash
# Deploy a producción
vercel --prod
```

### **Ver Deploy**

```bash
# Abrir en el navegador
vercel open
```

---

## ⚙️ Configuración Avanzada

### **Variables de Entorno**

Si necesitas variables de entorno:

#### **Desde Vercel Dashboard:**

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Añade variables:

```
VITE_API_URL=https://api.example.com
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Redeploy para aplicar cambios

#### **Desde CLI:**

```bash
vercel env add VITE_API_URL
# Ingresa el valor cuando lo pida
```

### **Custom Domain**

Para usar un dominio personalizado:

1. Vercel Dashboard → Tu proyecto → Settings → Domains
2. Añade tu dominio: `kontrol.yourdomain.com`
3. Configura DNS según las instrucciones

**Ejemplo de configuración DNS:**

```
Type: CNAME
Name: kontrol
Value: cname.vercel-dns.com
```

---

## 🔧 Optimizaciones de Build

### **Optimizar Bundle Size**

Añade al `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'sonner'],
          'chart-vendor': ['recharts'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

### **Habilitar Compression**

Vercel ya incluye Gzip/Brotli automáticamente. Para verificar:

```bash
# Headers en Vercel
vercel.json:
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Encoding",
          "value": "gzip"
        }
      ]
    }
  ]
}
```

---

## 📊 Analytics y Monitoring

### **Vercel Analytics**

Habilitar analytics (gratis):

1. Vercel Dashboard → Tu proyecto → Analytics
2. Click "Enable Analytics"
3. Añade el snippet a `App.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### **Vercel Speed Insights**

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <>
      <YourApp />
      <SpeedInsights />
    </>
  );
}
```

---

## 🔄 CI/CD Automático

Vercel despliega automáticamente:

- **Cada push a `main`** → Production deploy
- **Cada PR** → Preview deploy (URL única)
- **Cada branch** → Preview deploy

### **Preview Deployments**

```bash
# Crear branch
git checkout -b feature/nueva-feature

# Hacer cambios y push
git push origin feature/nueva-feature

# Vercel automáticamente crea un preview deploy
# Recibirás un comentario en el PR con la URL
```

### **Rollback**

Para volver a una versión anterior:

1. Vercel Dashboard → Deployments
2. Encuentra el deployment anterior
3. Click en "..." → "Promote to Production"

---

## 🌍 Deploy en Otras Plataformas

### **Netlify**

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
npm run build
netlify deploy --prod --dir=dist
```

### **GitHub Pages**

Añade a `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

```bash
npm install -D gh-pages
npm run deploy
```

### **Railway**

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

---

## 🧪 Testing Pre-Deploy

Antes de deployar, verifica:

```bash
# Build local
npm run build

# Preview del build
npm run preview

# Abrir en navegador
# http://localhost:4173
```

### **Lighthouse Audit**

```bash
# Instalar Lighthouse
npm install -g @lhci/cli

# Ejecutar audit
lhci autorun --collect.url=http://localhost:4173
```

**Targets:**
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

---

## 🐛 Troubleshooting

### **Error: Build failed**

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Error: Environment variables not working**

Las variables de entorno deben:
- Empezar con `VITE_` (para Vite)
- Estar configuradas en Vercel Dashboard
- Redeploy después de añadirlas

### **Error: 404 en rutas**

Añade `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **Error: Bundle too large**

```bash
# Analizar bundle
npm install -D rollup-plugin-visualizer

# Añadir al vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});

# Build y ver análisis
npm run build
```

---

## 📈 Post-Deploy Checklist

Después del deploy, verifica:

- [ ] ✅ App carga correctamente
- [ ] ✅ Todas las secciones funcionan
- [ ] ✅ Responsive en móvil/tablet/desktop
- [ ] ✅ Lighthouse score >90
- [ ] ✅ No hay errores en console
- [ ] ✅ Analytics configurado
- [ ] ✅ Custom domain (si aplica)
- [ ] ✅ SSL/HTTPS activo
- [ ] ✅ OG tags para compartir en redes

---

## 🔗 Links Útiles

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com

---

## 💡 Tips Pro

### **1. Preview URLs**

Comparte preview URLs con tu equipo:

```bash
# Cada PR genera una URL única
https://kontrol-xyz123.vercel.app
```

### **2. Branch-based Deployments**

```bash
# Branch 'staging' → staging.kontrol.app
# Branch 'main' → kontrol.app
```

Configura en Vercel Dashboard → Git → Branch Deployments

### **3. Edge Functions**

Para funcionalidad serverless:

```typescript
// api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Kontrol!' });
}
```

Deploy automático en: `https://kontrol.app/api/hello`

---

## 🎉 ¡Listo!

Tu app Kontrol debería estar en producción. Si tienes problemas, revisa:

1. **Vercel Dashboard:** Logs de build
2. **Browser Console:** Errores de runtime
3. **Network Tab:** Requests fallidos

**¿Necesitas ayuda?**
- Discord: https://discord.gg/kontrol
- GitHub Issues: https://github.com/TU-USUARIO/kontrol/issues

---

**Hecho con 💜 por el equipo de Kontrol**
