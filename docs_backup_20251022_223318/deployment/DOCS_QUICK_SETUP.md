# ⚡ Quick Setup - Documentación Separada

Configuración rápida en 3 pasos para tener docs en subdominio separado.

---

## 🚀 Paso 1: Desarrollo Local (30 segundos)

```bash
# Terminal 1: App principal
npm run dev
# → http://localhost:5173

# Terminal 2: Documentación
npm run dev:docs
# → http://localhost:5174
```

✅ Navega ambas para verificar que funcionan

---

## 📦 Paso 2: Build & Preview (1 minuto)

```bash
# Build ambos proyectos
npm run build          # App principal → dist/
npm run build:docs     # Documentación → dist-docs/

# Preview local
npm run preview        # → http://localhost:4173
npm run preview:docs   # → http://localhost:4174
```

---

## 🌐 Paso 3: Deploy a Vercel (2 minutos)

### Opción A: Un Proyecto con Subdominios

```bash
# 1. Deploy inicial
vercel

# 2. Deploy a producción
vercel --prod

# 3. En Vercel Dashboard:
# Settings → Domains → Add Domain
# - kontrol.app (Principal)
# - docs.kontrol.crypto (Docs)

# 4. Configurar DNS en tu proveedor:
# Type: CNAME
# Name: docs
# Value: cname.vercel-dns.com
```

### Opción B: Dos Proyectos Separados (Recomendado)

**Proyecto 1: App Principal**
```bash
vercel --name kontrol-app --prod
# Domain: kontrol.app
```

**Proyecto 2: Docs**
```bash
vercel --name kontrol-docs --prod
# Domain: docs.kontrol.crypto
# Build Command: npm run build:docs
# Output Directory: dist-docs
```

---

## ✅ Verificar

1. **App principal:** https://kontrol.app
2. **Documentación:** https://docs.kontrol.crypto
3. **Link en Sidebar** → Abre docs en nueva ventana ✓
4. **Link en BottomNav (mobile)** → Abre docs en nueva ventana ✓

---

## 🔧 Configurar Secrets en GitHub

Para CI/CD automático:

```bash
# App principal
gh secret set VERCEL_TOKEN
gh secret set VERCEL_ORG_ID  
gh secret set VERCEL_PROJECT_ID

# Docs (si es proyecto separado)
gh secret set VERCEL_DOCS_PROJECT_ID
```

---

## 🎨 Personalizar Docs

Edita estos archivos:

```
DocsApp.tsx              # Componente principal de docs
index-docs.html          # HTML base de docs
main-docs.tsx           # Entry point de docs
```

Luego:

```bash
npm run dev:docs         # Desarrollo
npm run build:docs       # Build
git push                 # Auto-deploy vía GitHub Actions
```

---

## 📝 Estructura de Archivos

```
kontrol/
│
├── # APP PRINCIPAL
├── index.html
├── App.tsx
├── main.tsx
│
├── # DOCUMENTACIÓN
├── index-docs.html      ← Entry point de docs
├── DocsApp.tsx          ← App de docs
├── main-docs.tsx        ← Main de docs
│
├── # CONFIGURACIÓN
├── vite.config.docs.ts  ← Config de build docs
├── vercel.json          ← Routing config
│
└── # DEPLOYMENT
    ├── .github/workflows/ci.yml          ← Deploy app
    └── .github/workflows/deploy-docs.yml ← Deploy docs
```

---

## 🐛 Troubleshooting Rápido

**❌ Error: "Cannot find module DocsApp"**
```bash
# Verificar que DocsApp.tsx existe en la raíz
ls -la DocsApp.tsx

# Si no existe, crearlo
```

**❌ Error: "404 on docs.kontrol.crypto"**
```bash
# Verificar DNS
dig docs.kontrol.crypto

# Esperar propagación (hasta 48h)
# Verificar en Vercel que el dominio está añadido
```

**❌ Error: "Styles not loading in docs"**
```bash
# Verificar import en main-docs.tsx
# Debe incluir: import './styles/globals.css'
```

---

## 💡 Tips

- **Desarrollo paralelo:** Corre ambos dev servers simultáneamente
- **Hot reload:** Funciona en ambos proyectos independientemente
- **Shared styles:** `globals.css` se comparte automáticamente
- **Shared components:** Importa componentes desde `/components/` si necesitas

---

## 🎯 Next Steps

1. [ ] Personaliza contenido en `DocsApp.tsx`
2. [ ] Añade más secciones de documentación
3. [ ] Configura analytics (Google Analytics / Vercel Analytics)
4. [ ] Añade sitemap para SEO
5. [ ] Configura Algolia DocSearch (opcional)

---

**¿Todo listo?** 
Accede a https://docs.kontrol.crypto y verifica que todo funciona! 🎉

Para más detalles ver [DOCS_DEPLOYMENT.md](./DOCS_DEPLOYMENT.md)
