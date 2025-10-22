# 🚀 Configuración de GitHub para Kontrol

Esta guía te ayudará a configurar el repositorio de Kontrol en GitHub con todas las características necesarias para un workflow profesional.

---

## 📦 Paso 1: Crear el Repositorio en GitHub

### Opción A: Por Interfaz Web

1. Ve a [github.com/new](https://github.com/new)
2. Configura:
   - **Repository name:** `kontrol`
   - **Description:** "Dashboard financiero cripto profesional con análisis fiscal avanzado"
   - **Visibility:** Public (o Private si prefieres)
   - **NO inicialices** con README, .gitignore o licencia (ya los tenemos)
3. Click en **"Create repository"**

### Opción B: Por CLI (GitHub CLI)

```bash
# Instalar GitHub CLI si no lo tienes
# macOS: brew install gh
# Windows: winget install --id GitHub.cli

# Login
gh auth login

# Crear repo
gh repo create kontrol \
  --public \
  --description "Dashboard financiero cripto profesional con análisis fiscal avanzado" \
  --source=. \
  --remote=origin \
  --push
```

---

## 🔧 Paso 2: Inicializar Git Local y Push

```bash
# Inicializar git (si no está inicializado)
git init

# Añadir todos los archivos
git add .

# Primer commit
git commit -m "feat: initial commit with complete Kontrol dashboard"

# Añadir remote (reemplaza tu-usuario con tu username de GitHub)
git remote add origin https://github.com/tu-usuario/kontrol.git

# Renombrar branch a main (si es necesario)
git branch -M main

# Push inicial
git push -u origin main
```

---

## 🔑 Paso 3: Configurar Secrets

### En GitHub.com:

1. Ve a tu repositorio
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** y añade:

```
VERCEL_TOKEN
  → Obtén en: https://vercel.com/account/tokens
  
VERCEL_ORG_ID
  → Encuentra en: https://vercel.com/[tu-org]/settings
  
VERCEL_PROJECT_ID
  → Encuentra en: Project Settings → General
  
VITE_SUPABASE_URL
  → Tu URL de Supabase
  
VITE_SUPABASE_ANON_KEY
  → Tu anon key de Supabase
  
FIGMA_TOKEN (opcional)
  → Token de Figma para sync de design tokens
  
FIGMA_FILE_KEY (opcional)
  → Key del archivo de Figma
```

---

## 🌿 Paso 4: Configurar Branch Protection

### En GitHub.com:

1. **Settings** → **Branches**
2. Click **"Add branch protection rule"**
3. Configura para `main`:

```
✅ Require a pull request before merging
   ✅ Require approvals (1)
   ✅ Dismiss stale pull request approvals when new commits are pushed

✅ Require status checks to pass before merging
   ✅ Require branches to be up to date before merging
   Status checks:
   - lint
   - build

✅ Require conversation resolution before merging

✅ Do not allow bypassing the above settings

⬜ Allow force pushes (NO)
⬜ Allow deletions (NO)
```

4. Opcional: Repetir para `staging` branch

---

## 🏷️ Paso 5: Configurar Labels

### Por CLI:

```bash
# Tipos de issues
gh label create "bug" --color "d73a4a" --description "Something isn't working"
gh label create "feature" --color "0e8a16" --description "New feature or request"
gh label create "enhancement" --color "a2eeef" --description "Improvement to existing feature"
gh label create "documentation" --color "0075ca" --description "Documentation improvements"

# Prioridad
gh label create "priority: high" --color "b60205" --description "High priority"
gh label create "priority: medium" --color "fbca04" --description "Medium priority"
gh label create "priority: low" --color "0e8a16" --description "Low priority"

# Estado
gh label create "status: in progress" --color "yellow" --description "Currently being worked on"
gh label create "status: blocked" --color "red" --description "Blocked by another issue"
gh label create "status: ready for review" --color "green" --description "Ready for code review"

# Áreas
gh label create "area: frontend" --color "1d76db" --description "Frontend related"
gh label create "area: backend" --color "5319e7" --description "Backend related"
gh label create "area: design" --color "d876e3" --description "Design related"
```

### Por Interfaz Web:

1. **Issues** → **Labels** → **New label**
2. Crea los labels manualmente con los colores indicados

---

## 📋 Paso 6: Crear Issue Templates

### Por CLI:

```bash
mkdir -p .github/ISSUE_TEMPLATE
```

Crea estos archivos:

**`.github/ISSUE_TEMPLATE/bug_report.yml`:**

```yaml
name: Bug Report
description: Reportar un bug o error
title: "[Bug]: "
labels: ["bug"]
body:
  - type: markdown
    attributes:
      value: |
        Gracias por reportar un bug! Por favor completa la siguiente información.
  
  - type: textarea
    id: description
    attributes:
      label: Descripción
      description: Describe el bug claramente
      placeholder: ¿Qué salió mal?
    validations:
      required: true
  
  - type: textarea
    id: steps
    attributes:
      label: Pasos para reproducir
      description: ¿Cómo reproducir el error?
      placeholder: |
        1. Ve a '...'
        2. Click en '...'
        3. Ver error
    validations:
      required: true
  
  - type: textarea
    id: expected
    attributes:
      label: Comportamiento esperado
      description: ¿Qué esperabas que pasara?
    validations:
      required: true
  
  - type: textarea
    id: actual
    attributes:
      label: Comportamiento actual
      description: ¿Qué pasó en realidad?
    validations:
      required: true
  
  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: Añade screenshots si ayudan a explicar el problema
  
  - type: input
    id: browser
    attributes:
      label: Navegador
      placeholder: Chrome 120, Firefox 115, etc
  
  - type: input
    id: os
    attributes:
      label: Sistema Operativo
      placeholder: macOS 14, Windows 11, etc
```

**`.github/ISSUE_TEMPLATE/feature_request.yml`:**

```yaml
name: Feature Request
description: Sugerir una nueva funcionalidad
title: "[Feature]: "
labels: ["feature"]
body:
  - type: markdown
    attributes:
      value: |
        ¡Gracias por sugerir una nueva feature!
  
  - type: textarea
    id: problem
    attributes:
      label: ¿Qué problema resuelve?
      description: Describe el problema que esta feature resolvería
    validations:
      required: true
  
  - type: textarea
    id: solution
    attributes:
      label: Solución propuesta
      description: Describe cómo imaginas que funcione esta feature
    validations:
      required: true
  
  - type: textarea
    id: alternatives
    attributes:
      label: Alternativas consideradas
      description: ¿Consideraste otras soluciones?
  
  - type: textarea
    id: additional
    attributes:
      label: Contexto adicional
      description: Mockups, referencias, etc
```

---

## 🎯 Paso 7: Crear Project Board (Opcional)

1. Ve a **Projects** → **New project**
2. Selecciona **"Board"** template
3. Nombra: "Kontrol Roadmap"
4. Añade columnas:
   - 📋 Backlog
   - 🔄 In Progress
   - 👀 In Review
   - ✅ Done

---

## 🌐 Paso 8: Configurar Vercel

### Por Interfaz Web:

1. Ve a [vercel.com](https://vercel.com)
2. **Add New** → **Project**
3. Importa tu repositorio de GitHub
4. Configura:
   - **Framework Preset:** Vite
   - **Build Command:** `pnpm build`
   - **Output Directory:** `dist`
5. Añade Environment Variables:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_API_BASE_URL
   ```
6. Click **Deploy**

### Deployment Automático:

- Cada push a `main` → Deploy a producción
- Cada PR → Deploy preview
- Push a `staging` → Deploy staging

---

## 📊 Paso 9: Configurar GitHub Pages (Para Docs)

1. **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / `docs` (o crea un branch específico)
4. **Folder:** `/` o `/docs`
5. Click **Save**

Tu documentación estará en: `https://tu-usuario.github.io/kontrol`

---

## 🔔 Paso 10: Configurar Webhooks (Opcional)

Para integración con Figma o notificaciones:

1. **Settings** → **Webhooks** → **Add webhook**
2. **Payload URL:** Tu endpoint (ej: `https://api.kontrol.app/webhooks/github`)
3. **Content type:** `application/json`
4. **Events:** Select individual events
   - Pull requests
   - Push
   - Issues
5. Click **Add webhook**

---

## ✅ Checklist Final

Verifica que todo esté configurado:

- [ ] Repositorio creado en GitHub
- [ ] Código inicial pusheado a `main`
- [ ] Secrets configurados
- [ ] Branch protection en `main`
- [ ] Labels creadas
- [ ] Issue templates creados
- [ ] Vercel conectado y deploying
- [ ] CI/CD workflow funcionando
- [ ] README.md visible en GitHub
- [ ] Licencia añadida

---

## 🚀 Siguiente Paso: Primer Deploy

```bash
# Crear staging branch
git checkout -b staging
git push origin staging

# Vercel automáticamente creará un deployment para staging
```

---

## 📖 Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

---

## 🆘 Problemas Comunes

### Error: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/tu-usuario/kontrol.git
```

### Error: "failed to push some refs"

```bash
# Si el repo remoto tiene commits que no tienes local
git pull origin main --rebase
git push origin main
```

### CI/CD no se ejecuta

1. Verifica que el archivo esté en `.github/workflows/ci.yml`
2. Verifica permisos de Actions: **Settings** → **Actions** → **General** → **Allow all actions**

---

¡Listo! Tu repositorio está completamente configurado para un workflow profesional de desarrollo. 🎉
