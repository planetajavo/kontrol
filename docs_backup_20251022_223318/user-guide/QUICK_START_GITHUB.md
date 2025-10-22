# ⚡ Quick Start - Configurar GitHub en 5 minutos

Guía rápida para publicar Kontrol en GitHub y hacer el primer deploy.

---

## 🚀 Paso 1: Crear Repositorio (2 minutos)

### Opción A: GitHub CLI (Más rápido)

```bash
# Instalar GitHub CLI si no lo tienes
# macOS: brew install gh
# Windows: winget install --id GitHub.cli
# Linux: https://github.com/cli/cli/blob/trunk/docs/install_linux.md

# Autenticarse
gh auth login

# Crear repo y hacer push en un comando
gh repo create kontrol --public --source=. --remote=origin --push

# ✅ Listo! Tu repo ya está en GitHub
```

### Opción B: Interfaz Web (Tradicional)

```bash
# 1. Crear repo en https://github.com/new
#    Nombre: kontrol
#    Descripción: "Dashboard financiero cripto profesional"
#    Público
#    NO inicializar con README

# 2. Inicializar git local
git init
git add .
git commit -m "feat: initial commit with complete Kontrol dashboard"

# 3. Añadir remote y push (reemplaza tu-usuario)
git remote add origin https://github.com/tu-usuario/kontrol.git
git branch -M main
git push -u origin main
```

---

## 🔐 Paso 2: Configurar Secrets para CI/CD (1 minuto)

### Por GitHub CLI:

```bash
# Setear secrets para Vercel
gh secret set VERCEL_TOKEN
# Pega tu token de https://vercel.com/account/tokens

gh secret set VERCEL_ORG_ID
# Pega tu org ID de Vercel settings

gh secret set VERCEL_PROJECT_ID
# Pega tu project ID de Vercel project settings

# Opcional: Supabase
gh secret set VITE_SUPABASE_URL
gh secret set VITE_SUPABASE_ANON_KEY
```

### Por Interfaz Web:

1. Ve a: `https://github.com/tu-usuario/kontrol/settings/secrets/actions`
2. Click **"New repository secret"**
3. Añade cada secret:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VITE_SUPABASE_URL` (opcional)
   - `VITE_SUPABASE_ANON_KEY` (opcional)

---

## 🌐 Paso 3: Deploy a Vercel (2 minutos)

### Opción A: Automático con GitHub

```bash
# 1. Ve a https://vercel.com
# 2. Click "Add New Project"
# 3. Importa tu repo kontrol desde GitHub
# 4. Vercel detecta automáticamente Vite
# 5. Click "Deploy"
# 6. ✅ Listo! Tu app está en https://kontrol-xxxx.vercel.app
```

### Opción B: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# URL: https://kontrol.vercel.app (o similar)
```

---

## ✅ Verificar que Todo Funciona

```bash
# Ver el workflow de CI/CD
gh workflow list

# Ver status del último run
gh run list --limit 1

# Ver tu repo en browser
gh repo view --web

# Ver deployments en Vercel
vercel ls
```

---

## 🎯 Siguiente: Crear Branches

```bash
# Crear branch de staging
git checkout -b staging
git push origin staging

# Crear branch de develop
git checkout -b develop
git push origin develop

# Volver a main
git checkout main
```

---

## 🔒 Opcional: Proteger Branch Main

```bash
# Por CLI (requiere admin access)
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks[strict]=true \
  --field required_status_checks[contexts][]=lint \
  --field required_status_checks[contexts][]=build \
  --field required_pull_request_reviews[required_approving_review_count]=1

# O por interfaz: Settings → Branches → Add rule
```

---

## 📝 Variables de Entorno en Vercel

### Por Dashboard:

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Añade:
   ```
   VITE_SUPABASE_URL = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   VITE_API_BASE_URL = https://api.kontrol.app
   ```
4. Selecciona environments: Production, Preview, Development
5. **Save**

### Por CLI:

```bash
vercel env add VITE_SUPABASE_URL
# Pega el valor cuando te lo pida
# Selecciona: Production, Preview, Development

vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_API_BASE_URL
```

---

## 🎉 ¡Listo!

Tu proyecto ya está:
- ✅ En GitHub
- ✅ Con CI/CD configurado
- ✅ Deployed en Vercel
- ✅ Con secrets configurados

### URLs:
- **Repo:** https://github.com/tu-usuario/kontrol
- **Production:** https://kontrol.vercel.app
- **Documentación:** https://kontrol.vercel.app/docs

---

## 🔄 Workflow de Ahora en Adelante

```bash
# 1. Crear feature
git checkout -b feature/nueva-cosa
# ... código ...
git commit -m "feat: nueva cosa"
git push origin feature/nueva-cosa

# 2. Crear PR
gh pr create --base develop

# 3. Review → Merge → Auto-deploy!
```

---

## 🆘 Ayuda Rápida

### Ver logs de CI/CD:
```bash
gh run list
gh run view
```

### Ver deployment logs en Vercel:
```bash
vercel logs
```

### Redeploy:
```bash
vercel --prod
```

### Rollback en Vercel:
```bash
# Ver deployments
vercel ls

# Promover deployment anterior
vercel promote [deployment-url]
```

---

## 📚 Documentación Completa

Para más detalles, ver:
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - Setup completo
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución
- [FIGMA_TO_CODE_WORKFLOW.md](./FIGMA_TO_CODE_WORKFLOW.md) - Workflow completo

---

¡Todo configurado en 5 minutos! 🚀
