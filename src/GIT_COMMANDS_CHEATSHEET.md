# 🔧 Git Commands Cheatsheet - Kontrol

Comandos útiles de Git para el workflow diario del equipo.

---

## 📚 Índice Rápido

- [Setup Inicial](#setup-inicial)
- [Trabajo Diario](#trabajo-diario)
- [Branching](#branching)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Sincronización](#sincronización)
- [Resolución de Conflictos](#resolución-de-conflictos)
- [Comandos Avanzados](#comandos-avanzados)
- [Emergencias](#emergencias)

---

## Setup Inicial

### Configurar Git

```bash
# Configurar nombre y email
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Verificar configuración
git config --list

# Configurar editor por defecto (VS Code)
git config --global core.editor "code --wait"

# Configurar default branch como 'main'
git config --global init.defaultBranch main

# Aliases útiles
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

### Clonar Repositorio

```bash
# Clonar repo
git clone https://github.com/tu-usuario/kontrol.git
cd kontrol

# Ver remotes
git remote -v

# Añadir upstream (si es fork)
git remote add upstream https://github.com/original/kontrol.git
```

---

## Trabajo Diario

### Ver Estado

```bash
# Estado actual
git status

# Estado corto
git st  # (si configuraste el alias)

# Ver diferencias
git diff

# Ver diferencias staged
git diff --staged

# Ver log
git log

# Ver log gráfico (bonito)
git lg  # (si configuraste el alias)

# Ver últimos 5 commits
git log -5 --oneline
```

### Añadir Cambios

```bash
# Añadir archivo específico
git add archivo.tsx

# Añadir todos los archivos modificados
git add .

# Añadir interactivamente (elegir qué partes)
git add -p

# Ver qué se va a commitear
git diff --staged
```

### Quitar del Staging

```bash
# Quitar archivo del staging
git reset HEAD archivo.tsx

# Quitar todos del staging
git reset HEAD

# Descartar cambios en archivo (CUIDADO: irreversible)
git checkout -- archivo.tsx

# Descartar todos los cambios (CUIDADO)
git checkout -- .
```

---

## Branching

### Crear y Cambiar Branch

```bash
# Ver branches
git branch

# Ver todos los branches (incluyendo remotos)
git branch -a

# Crear nuevo branch
git branch feature/nueva-feature

# Cambiar a branch
git checkout feature/nueva-feature

# Crear y cambiar en un comando
git checkout -b feature/nueva-feature

# Crear branch desde otro branch específico
git checkout -b feature/nueva-feature develop
```

### Eliminar Branch

```bash
# Eliminar branch local
git branch -d feature/terminada

# Forzar eliminación (si no está merged)
git branch -D feature/terminada

# Eliminar branch remoto
git push origin --delete feature/terminada
```

### Renombrar Branch

```bash
# Renombrar branch actual
git branch -m nuevo-nombre

# Renombrar otra branch
git branch -m viejo-nombre nuevo-nombre
```

---

## Commits

### Hacer Commit

```bash
# Commit con mensaje
git commit -m "feat(dashboard): add bot detection widget"

# Commit con mensaje multilínea
git commit -m "feat(dashboard): add bot detection widget" -m "- Added new component
- Integrated with API
- Updated tests"

# Commit añadiendo todos los cambios tracked
git commit -am "fix: resolve styling issue"

# Commit vacío (para trigger CI)
git commit --allow-empty -m "chore: trigger CI"
```

### Modificar Último Commit

```bash
# Añadir cambios al último commit
git add archivo.tsx
git commit --amend --no-edit

# Cambiar mensaje del último commit
git commit --amend -m "feat(dashboard): new message"

# Modificar autor del último commit
git commit --amend --author="Nombre <email@example.com>"
```

### Deshacer Commits

```bash
# Deshacer último commit (mantiene cambios)
git reset --soft HEAD~1

# Deshacer último commit (descarta cambios) ⚠️
git reset --hard HEAD~1

# Deshacer 3 commits
git reset --soft HEAD~3

# Revertir commit específico (crea nuevo commit)
git revert abc123
```

---

## Pull Requests

### Preparar PR

```bash
# 1. Asegurarse de estar actualizado
git checkout develop
git pull origin develop

# 2. Actualizar tu branch
git checkout feature/mi-feature
git rebase develop

# O merge si prefieres
git merge develop

# 3. Resolver conflictos si hay

# 4. Push
git push origin feature/mi-feature

# 5. Si hiciste rebase, force push
git push --force-with-lease origin feature/mi-feature
```

### Crear PR desde CLI

```bash
# Con GitHub CLI
gh pr create --base develop --title "feat(dashboard): add bot detection"

# Con template
gh pr create --base develop --fill

# Ver PRs
gh pr list

# Ver detalles de PR
gh pr view 123

# Checkout a PR
gh pr checkout 123
```

---

## Sincronización

### Pull (traer cambios)

```bash
# Pull del branch actual
git pull

# Pull con rebase
git pull --rebase

# Pull de branch específico
git pull origin main
```

### Push (enviar cambios)

```bash
# Push del branch actual
git push

# Push y setear upstream
git push -u origin feature/mi-feature

# Force push (CUIDADO: sobrescribe historial remoto)
git push --force

# Force push seguro (falla si hay cambios remotos)
git push --force-with-lease
```

### Fetch (solo descargar info)

```bash
# Fetch de origin
git fetch

# Fetch de todos los remotes
git fetch --all

# Fetch y limpiar branches eliminados
git fetch --prune
```

---

## Resolución de Conflictos

### Durante Merge

```bash
# 1. Intentar merge
git merge develop

# 2. Si hay conflictos, verlos
git status

# 3. Abrir archivos con conflictos y resolver
# Buscar marcadores: <<<<<<<, =======, >>>>>>>

# 4. Marcar como resuelto
git add archivo-resuelto.tsx

# 5. Continuar merge
git commit

# Si quieres abortar
git merge --abort
```

### Durante Rebase

```bash
# 1. Intentar rebase
git rebase develop

# 2. Si hay conflictos, resolverlos

# 3. Continuar rebase
git add archivo-resuelto.tsx
git rebase --continue

# Saltar commit problemático
git rebase --skip

# Abortar rebase
git rebase --abort
```

### Ver Conflictos

```bash
# Ver archivos con conflictos
git diff --name-only --diff-filter=U

# Ver diferencias con 3-way merge
git diff --merge

# Usar herramienta visual
git mergetool
```

---

## Comandos Avanzados

### Stash (guardar cambios temporalmente)

```bash
# Guardar cambios actuales
git stash

# Guardar con mensaje
git stash save "WIP: trabajando en feature X"

# Ver lista de stashes
git stash list

# Aplicar último stash
git stash apply

# Aplicar y eliminar stash
git stash pop

# Aplicar stash específico
git stash apply stash@{2}

# Eliminar stash
git stash drop stash@{0}

# Eliminar todos los stashes
git stash clear

# Crear branch desde stash
git stash branch nueva-branch stash@{0}
```

### Cherry-pick (aplicar commit específico)

```bash
# Aplicar commit de otro branch
git cherry-pick abc123

# Aplicar varios commits
git cherry-pick abc123 def456

# Cherry-pick sin commitear
git cherry-pick --no-commit abc123
```

### Rebase Interactivo

```bash
# Rebase interactivo de últimos 5 commits
git rebase -i HEAD~5

# En el editor, puedes:
# pick   - usar commit
# reword - cambiar mensaje
# edit   - modificar commit
# squash - fusionar con anterior
# fixup  - como squash pero descarta mensaje
# drop   - eliminar commit

# Ejemplo:
pick abc123 feat: add feature
squash def456 fix: typo in feature
reword ghi789 docs: update readme
```

### Buscar en Historial

```bash
# Buscar texto en commits
git log --all --grep="bot detection"

# Buscar cambios en archivo
git log --follow -- archivo.tsx

# Ver quién modificó cada línea
git blame archivo.tsx

# Ver cambios en línea específica
git log -L 15,20:archivo.tsx

# Buscar commit que introdujo bug (bisect)
git bisect start
git bisect bad  # commit actual es malo
git bisect good abc123  # este commit era bueno
# Git hace checkout a commits intermedios
# Marcar cada uno como good/bad hasta encontrar el culpable
git bisect reset  # terminar
```

### Limpiar

```bash
# Ver qué se eliminaría (dry-run)
git clean -n

# Eliminar archivos no tracked
git clean -f

# Eliminar también directorios
git clean -fd

# Eliminar también archivos ignorados
git clean -fdx
```

---

## Emergencias

### "¡Hice commit en el branch equivocado!"

```bash
# 1. Anotar el hash del commit
git log -1

# 2. Cambiar al branch correcto
git checkout branch-correcto

# 3. Aplicar el commit
git cherry-pick abc123

# 4. Volver al branch incorrecto
git checkout branch-incorrecto

# 5. Eliminar el commit
git reset --hard HEAD~1
```

### "¡Hice force push sin querer!"

```bash
# Recuperar usando reflog
git reflog

# Encontrar el commit antes del force push
git reset --hard HEAD@{5}

# Push de nuevo
git push --force-with-lease
```

### "¡Eliminé un branch sin querer!"

```bash
# Ver reflog para encontrar el commit
git reflog

# Recrear branch
git branch branch-recuperado abc123
```

### "¡Necesito deshacer un merge!"

```bash
# Si no has pusheado
git reset --hard HEAD~1

# Si ya pusheaste
git revert -m 1 abc123
```

### "¡Commiteé credenciales/secrets!"

```bash
# ⚠️ URGENTE: Rotar las credenciales INMEDIATAMENTE

# Eliminar del historial (requiere force push)
# Opción 1: BFG Repo Cleaner
java -jar bfg.jar --delete-files .env

# Opción 2: git filter-branch (más lento)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push a todos los branches
git push --force --all
git push --force --tags
```

---

## Workflow Completo (Ejemplo)

### Crear Nueva Feature

```bash
# 1. Actualizar main
git checkout main
git pull origin main

# 2. Crear branch
git checkout -b feature/bot-detection

# 3. Hacer cambios
# ... código ...

# 4. Commit
git add .
git commit -m "feat(dashboard): add bot activity detection widget"

# 5. Push
git push -u origin feature/bot-detection

# 6. Crear PR
gh pr create --base develop

# 7. Después de approval, merge y limpiar
git checkout main
git pull origin main
git branch -d feature/bot-detection
git push origin --delete feature/bot-detection
```

### Hotfix en Producción

```bash
# 1. Crear branch desde main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# 2. Fix
# ... código ...

# 3. Commit
git commit -am "fix(transactions): resolve calculation bug"

# 4. Push
git push -u origin hotfix/critical-bug

# 5. PR directo a main (con etiqueta hotfix)
gh pr create --base main --label hotfix

# 6. Después de merge, actualizar develop también
git checkout develop
git merge main
git push origin develop
```

---

## Configuración Avanzada

### Git Hooks

Crear `.git/hooks/pre-commit`:

```bash
#!/bin/bash
# Pre-commit hook

# Lint
pnpm lint

# Type check
pnpm typecheck

# Si falla, abortar commit
if [ $? -ne 0 ]; then
  echo "❌ Pre-commit checks failed"
  exit 1
fi

echo "✅ Pre-commit checks passed"
```

### Commit Message Template

```bash
# Crear template
cat > ~/.gitmessage << 'EOF'
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>
#
# Type: feat, fix, docs, style, refactor, test, chore
# Scope: dashboard, fiscal, transactions, assets, banks, aml
EOF

# Configurar
git config --global commit.template ~/.gitmessage
```

---

## Tips & Best Practices

### Commits

✅ **Hacer:**
- Commits pequeños y atómicos
- Mensajes descriptivos
- Seguir Conventional Commits
- Commitear frecuentemente

❌ **Evitar:**
- Commits gigantes con muchos cambios
- Mensajes vagos: "fix", "update", "wip"
- Commitear código que no compila
- Commitear credenciales o secrets

### Branches

✅ **Hacer:**
- Branches de corta duración (< 1 semana)
- Nombres descriptivos: `feature/bot-detection`
- Mantener actualizado con main/develop
- Eliminar branches después de merge

❌ **Evitar:**
- Branches de larga duración
- Nombres genéricos: `fix`, `test`, `branch1`
- Olvidar actualizar con upstream
- Acumular branches viejos

### Merging

✅ **Hacer:**
- Resolver conflictos localmente
- Testear después de merge
- Squash commits si hace sentido
- Usar `--force-with-lease` en lugar de `--force`

❌ **Evitar:**
- Force push a main/develop
- Rebase de branches compartidos
- Merge sin revisar cambios
- Ignorar conflictos

---

## Recursos

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flight Rules](https://github.com/k88hudson/git-flight-rules)

---

## Ayuda Rápida

```bash
# Ver ayuda de cualquier comando
git help <command>
git <command> --help

# Ejemplos
git help commit
git rebase --help
```

---

¡Guarda este cheatsheet como referencia rápida! 📖
