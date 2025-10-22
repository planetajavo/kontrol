# 🔄 Workflow de Sincronización: Figma Make ↔ GitHub ↔ Local

Este documento explica cómo mantener sincronizado el proyecto Kontrol entre Figma Make, GitHub y tu directorio local.

---

## 📋 Conceptos Clave

### **3 Ubicaciones del Código**

1. **Figma Make** (Entorno de desarrollo en la nube)
   - Aquí haces cambios en vivo
   - Ves el preview en tiempo real
   - Es tu "IDE en la nube"

2. **GitHub** (Repositorio remoto)
   - Almacenamiento central del código
   - Control de versiones
   - Colaboración y backup

3. **Local** (Tu computadora)
   - Copia local del proyecto
   - Puedes editar con VS Code, Cursor, etc.
   - Ejecutar `npm run dev` para ver en local

---

## 🔄 Flujos de Trabajo

### **Opción A: Desarrollo en Figma Make → GitHub**

**Cuándo usar:** Cambios rápidos, prototipos, pruebas visuales.

```bash
# 1. Haces cambios en Figma Make
# 2. Descargas el código actualizado (ZIP)
# 3. En tu terminal local:

cd /ruta/a/KONTROL

# Extraer el ZIP descargado
unzip ~/Downloads/kontrol-*.zip -d ~/Downloads/kontrol-new

# Copiar archivos actualizados (excepto node_modules, .git)
rsync -av --exclude='node_modules' --exclude='.git' --exclude='dist' \
  ~/Downloads/kontrol-new/ ./

# Ver cambios
git status

# Añadir cambios
git add .

# Commit
git commit -m "feat: descripción de los cambios realizados en Figma Make"

# Push a GitHub
git push origin main

# Limpiar
rm -rf ~/Downloads/kontrol-new
```

---

### **Opción B: Desarrollo Local → GitHub**

**Cuándo usar:** Cambios complejos, refactorings, múltiples archivos.

```bash
# 1. Asegúrate de tener la última versión
cd /ruta/a/KONTROL
git pull origin main

# 2. Haz cambios en tu editor local (VS Code, Cursor, etc.)

# 3. Ver cambios
git status
git diff

# 4. Añadir cambios
git add .

# 5. Commit
git commit -m "tipo: descripción del cambio"

# 6. Push a GitHub
git push origin main
```

---

### **Opción C: Sincronizar Local → Figma Make**

**Cuándo usar:** Quieres ver cambios locales en Figma Make.

⚠️ **IMPORTANTE:** No puedes "subir" código directamente a Figma Make. 

**Solución:** Copia y pega archivos específicos que quieras probar.

1. Abre el archivo en tu editor local
2. Copia el contenido
3. En Figma Make, edita el archivo correspondiente
4. Pega el contenido

---

## 📥 Descarga desde Figma Make

### **Método 1: Descarga Manual (ZIP)**

1. En Figma Make, busca el botón de **descarga** (🔽)
2. Se descargará un archivo `kontrol-[timestamp].zip`
3. Extrae y sincroniza con el método de Opción A arriba

### **Método 2: Copiar Archivos Específicos**

Si solo cambiaste 1-2 archivos:

1. En Figma Make, abre el archivo modificado
2. Copia todo el contenido (`Ctrl+A`, `Ctrl+C`)
3. En tu editor local, abre el mismo archivo
4. Reemplaza el contenido (`Ctrl+A`, `Ctrl+V`)
5. Guarda y haz commit

---

## 🎯 Workflow Recomendado (Best Practice)

### **Para Desarrollo Activo**

```
┌─────────────────┐
│  Figma Make     │  ← Prototipos rápidos, pruebas visuales
└────────┬────────┘
         │
         ↓ (Download ZIP)
┌─────────────────┐
│  Local          │  ← Desarrollo principal, refactoring
└────────┬────────┘
         │
         ↓ (git push)
┌─────────────────┐
│  GitHub         │  ← Source of truth, backup
└─────────────────┘
```

### **Reglas de Oro**

1. **GitHub es la fuente de verdad**
   - Siempre haz `git pull` antes de hacer cambios locales
   - Siempre haz `git push` después de commits importantes

2. **Commits frecuentes y descriptivos**
   ```bash
   git commit -m "feat: añadir filtro de fecha en transacciones"
   git commit -m "fix: corregir cálculo de ganancia fiscal"
   git commit -m "style: mejorar responsive en dashboard"
   git commit -m "docs: actualizar README con instrucciones de deploy"
   ```

3. **Prefijos de commit (Conventional Commits)**
   - `feat:` - Nueva funcionalidad
   - `fix:` - Corrección de bug
   - `style:` - Cambios de estilo/UI
   - `refactor:` - Refactorización de código
   - `docs:` - Cambios en documentación
   - `test:` - Añadir o modificar tests
   - `chore:` - Tareas de mantenimiento

4. **Ramas para features grandes**
   ```bash
   # Crear rama para nueva feature
   git checkout -b feature/tax-calculator-v2
   
   # Hacer cambios y commits
   git add .
   git commit -m "feat: implementar cálculo por tramos"
   
   # Push de la rama
   git push origin feature/tax-calculator-v2
   
   # En GitHub, crear Pull Request
   # Después de merge, volver a main
   git checkout main
   git pull origin main
   ```

---

## 🔧 Comandos Útiles

### **Ver Estado del Repositorio**

```bash
# Ver archivos modificados
git status

# Ver diferencias
git diff

# Ver historial de commits
git log --oneline

# Ver últimos 5 commits
git log --oneline -5
```

### **Deshacer Cambios**

```bash
# Descartar cambios en un archivo
git checkout -- archivo.tsx

# Descartar TODOS los cambios locales (¡CUIDADO!)
git reset --hard HEAD

# Deshacer último commit (manteniendo cambios)
git reset --soft HEAD~1

# Deshacer último commit (descartando cambios)
git reset --hard HEAD~1
```

### **Sincronizar con GitHub**

```bash
# Descargar cambios sin merge
git fetch origin

# Descargar y aplicar cambios
git pull origin main

# Subir cambios
git push origin main

# Forzar push (¡CUIDADO! Sobrescribe historia)
git push origin main --force
```

### **Resolver Conflictos**

```bash
# Si hay conflicto al hacer pull
git pull origin main

# Editar archivos con conflictos (marcados con <<<<<<, =====, >>>>>>)
# Resolver manualmente

# Añadir archivos resueltos
git add archivo-con-conflicto.tsx

# Completar el merge
git commit -m "merge: resolver conflictos de main"

# Push
git push origin main
```

---

## 📦 Sincronización Completa (Paso a Paso)

### **Escenario: Has trabajado en Figma Make y quieres actualizar GitHub + Local**

```bash
# 1. Descargar ZIP desde Figma Make
# (Archivo: kontrol-20250119.zip en ~/Downloads)

# 2. Navegar a tu proyecto local
cd ~/projects/KONTROL

# 3. Ver estado actual (debe estar limpio)
git status

# 4. Si hay cambios sin commit, guardarlos
git stash

# 5. Asegurar que estás en main
git checkout main

# 6. Pull por si hay cambios remotos
git pull origin main

# 7. Crear carpeta temporal
mkdir -p ~/temp-kontrol

# 8. Extraer ZIP
unzip ~/Downloads/kontrol-20250119.zip -d ~/temp-kontrol

# 9. Sincronizar archivos (excluyendo node_modules, .git, dist)
rsync -av --delete \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  --exclude='.env' \
  ~/temp-kontrol/ ./

# 10. Ver cambios
git status
git diff

# 11. Si todo está bien, añadir cambios
git add .

# 12. Commit
git commit -m "sync: actualización desde Figma Make - [describir cambios]"

# 13. Push a GitHub
git push origin main

# 14. Limpiar
rm -rf ~/temp-kontrol
rm ~/Downloads/kontrol-20250119.zip

# 15. Restaurar stash si lo hubo
git stash pop

# ✅ LISTO: GitHub y Local están sincronizados
```

---

## 🚀 Deployment Automático

Si configuraste Vercel conectado a GitHub:

```bash
# Cada vez que hagas push a main:
git push origin main

# → Vercel detecta el push
# → Ejecuta build automáticamente
# → Deploya a producción (3-5 min)
# → URL: https://kontrol-crypto-dashboard.vercel.app
```

**Ver deployment:**
1. Ve a https://vercel.com
2. Selecciona tu proyecto
3. Ve a "Deployments"
4. Verás el status: Building → Deploying → Ready

---

## 📝 Checklist Diario

### **Antes de Empezar a Trabajar**

- [ ] `git pull origin main` (sincronizar con GitHub)
- [ ] `git status` (verificar que no hay cambios pendientes)
- [ ] `npm install` (si hubo cambios en package.json)

### **Después de Terminar Cambios**

- [ ] `git status` (ver qué cambió)
- [ ] `git diff` (revisar cambios línea por línea)
- [ ] `git add .` (añadir todos los cambios)
- [ ] `git commit -m "tipo: descripción"` (commit descriptivo)
- [ ] `git push origin main` (subir a GitHub)
- [ ] Verificar en GitHub que se subió correctamente
- [ ] (Opcional) Verificar deploy en Vercel

---

## 🆘 Problemas Comunes

### **"Error: Your local changes would be overwritten by merge"**

```bash
# Opción 1: Guardar cambios temporalmente
git stash
git pull origin main
git stash pop

# Opción 2: Commit antes de pull
git add .
git commit -m "wip: trabajo en progreso"
git pull origin main
```

### **"Error: failed to push some refs"**

```bash
# Alguien más hizo push antes que tú
# Primero pull, luego push
git pull origin main
git push origin main
```

### **"Tengo cambios en Figma Make y Local, ¿cuál usar?"**

```bash
# Opción A: Priorizar Figma Make
# Descarga ZIP y sobrescribe local (método Opción A arriba)

# Opción B: Priorizar Local
# Haz commit y push de local, ignora cambios de Figma Make

# Opción C: Fusionar manualmente
# Compara archivo por archivo y decide qué mantener
```

### **"Quiero revertir a una versión anterior"**

```bash
# Ver historial
git log --oneline

# Revertir a un commit específico (sin perder historia)
git revert [hash-del-commit]

# O volver a un commit y descartar todo lo posterior (¡CUIDADO!)
git reset --hard [hash-del-commit]
git push origin main --force
```

---

## 📊 Diagrama de Flujo Completo

```
┌───────────────────────────────────────────────────────────┐
│                    WORKFLOW KONTROL                        │
└───────────────────────────────────────────────────────────┘

  ┌─────────────┐
  │ Figma Make  │  Desarrollo rápido, preview visual
  └──────┬──────┘
         │
         │ Download ZIP
         ↓
  ┌─────────────┐
  │   Local     │  Edición con VS Code/Cursor
  └──────┬──────┘  npm run dev, testing
         │
         │ git add/commit/push
         ↓
  ┌─────────────┐
  │   GitHub    │  Source of truth, control de versiones
  └──────┬──────┘
         │
         │ Webhook trigger
         ↓
  ┌─────────────┐
  │   Vercel    │  Deploy automático a producción
  └─────────────┘
         │
         ↓
    🌐 https://kontrol-crypto-dashboard.vercel.app
```

---

## ✅ Resumen Rápido

**Para sincronizar Figma Make → GitHub → Local:**

1. **Descarga** el ZIP desde Figma Make
2. **Extrae** en carpeta temporal
3. **Copia** archivos con `rsync` (excluyendo node_modules, .git)
4. **Revisa** cambios con `git status` y `git diff`
5. **Commit** con mensaje descriptivo
6. **Push** a GitHub
7. **Verifica** en GitHub y Vercel

**Tiempo estimado:** 2-5 minutos

---

¿Necesitas ayuda con algún paso específico? 🚀
