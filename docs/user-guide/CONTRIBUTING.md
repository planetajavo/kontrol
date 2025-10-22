# Guía de Contribución - Kontrol

¡Gracias por tu interés en contribuir a Kontrol! 🎉

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Features](#sugerir-features)
- [Proceso de Development](#proceso-de-development)
- [Convenciones de Código](#convenciones-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)

---

## Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor reporta comportamiento inapropiado a [email@example.com].

---

## Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor:

1. **Verifica** que no haya sido reportado ya en [Issues](https://github.com/tu-usuario/kontrol/issues)
2. **Crea un nuevo issue** usando la plantilla de bug report
3. **Incluye**:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots (si aplica)
   - Información del sistema (navegador, OS, versión)

### Sugerir Features

Para sugerir nuevas características:

1. **Verifica** que no exista ya en [Issues](https://github.com/tu-usuario/kontrol/issues)
2. **Crea un nuevo issue** usando la plantilla de feature request
3. **Describe**:
   - El problema que resuelve
   - La solución propuesta
   - Alternativas consideradas
   - Mockups o ejemplos (si aplica)

---

## Proceso de Development

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/kontrol.git
cd kontrol
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Crear Branch

```bash
git checkout -b feature/mi-nueva-feature
# o
git checkout -b fix/mi-bug-fix
```

### 4. Desarrollar

- Haz tus cambios
- Asegúrate de seguir las [convenciones de código](#convenciones-de-código)
- Añade tests si es necesario
- Actualiza documentación

### 5. Verificar

```bash
# Linting
pnpm lint

# Type checking
pnpm typecheck

# Tests
pnpm test

# Build
pnpm build
```

### 6. Commit

```bash
git add .
git commit -m "feat(dashboard): add new metric widget"
```

Ver [convenciones de commits](#commits)

### 7. Push y PR

```bash
git push origin feature/mi-nueva-feature
```

Luego abre un Pull Request en GitHub.

---

## Convenciones de Código

### TypeScript

- **Usa TypeScript estricto** - No uses `any` sin justificación
- **Define tipos explícitos** para props y returns
- **Usa interfaces** para objetos complejos

```typescript
// ✅ Bien
interface UserProps {
  name: string;
  age: number;
  isActive?: boolean;
}

function UserCard({ name, age, isActive = true }: UserProps) {
  // ...
}

// ❌ Mal
function UserCard(props: any) {
  // ...
}
```

### React

- **Componentes funcionales** con hooks
- **Nombres en PascalCase** para componentes
- **Props destructuradas** en la firma de función
- **Usa `memo`** para componentes que renderizan frecuentemente

```typescript
// ✅ Bien
import { memo } from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card = memo(({ title, children }: CardProps) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
});

Card.displayName = 'Card';
```

### Tailwind CSS

- **No uses clases de tamaño de fuente** a menos que sea necesario
- **Usa variables CSS** para colores
- **Sigue el orden de clases**: Layout → Spacing → Typography → Colors → Effects

```tsx
// ✅ Bien
<div className="flex items-center gap-4 p-6 bg-card border border-border rounded-lg">

// ❌ Mal
<div className="rounded-lg bg-card p-6 border-border flex border gap-4 items-center">
```

### Estructura de Archivos

```
components/
├── ui/              # Solo componentes shadcn/ui
├── shared/          # Componentes reutilizables globales
└── ComponentName.tsx # Componentes específicos de sección
```

---

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

### Formato

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Tipos

- `feat`: Nueva funcionalidad
- `fix`: Bug fix
- `docs`: Cambios en documentación
- `style`: Formateo, espacios, etc (no afecta código)
- `refactor`: Refactorización sin cambiar funcionalidad
- `test`: Añadir o modificar tests
- `chore`: Mantenimiento (deps, config, etc)
- `perf`: Mejoras de performance

### Ejemplos

```bash
feat(dashboard): add bot activity detection widget
fix(transactions): resolve infinite scroll pagination bug
docs(readme): update installation instructions
style(ui): adjust spacing in transaction cards
refactor(api): extract validation logic to shared service
test(wallet): add unit tests for wallet service
chore(deps): update react to v18.3.0
perf(charts): optimize recharts rendering
```

### Scope

El scope indica qué parte del proyecto se modifica:

- `dashboard`
- `fiscal`
- `transactions`
- `assets`
- `banks`
- `aml`
- `api`
- `ui`
- `docs`

---

## Pull Requests

### Checklist antes de crear PR

- [ ] El código compila sin errores
- [ ] Pasa lint (`pnpm lint`)
- [ ] Pasa type checking (`pnpm typecheck`)
- [ ] Tests pasan (`pnpm test`)
- [ ] Documentación actualizada
- [ ] Commits siguen convenciones
- [ ] Branch actualizado con `main`

### Título del PR

Sigue el mismo formato que los commits:

```
feat(dashboard): Add bot activity detection widget
```

### Descripción del PR

Usa esta plantilla:

```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo se probó?
Describe cómo probaste los cambios

## Screenshots (si aplica)
Añade screenshots o GIFs

## Checklist
- [ ] Mi código sigue las convenciones del proyecto
- [ ] He revisado mi propio código
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevos warnings
- [ ] He añadido tests
- [ ] Tests nuevos y existentes pasan
```

### Proceso de Review

1. **Automated checks** se ejecutan automáticamente
2. **Code review** por al menos un maintainer
3. **Cambios solicitados** (si aplica)
4. **Aprobación** y merge

---

## Workflow de Desarrollo Completo

### Feature Branch

```bash
# 1. Actualizar main
git checkout main
git pull origin main

# 2. Crear branch
git checkout -b feature/nueva-funcionalidad

# 3. Desarrollar
# ... hacer cambios ...

# 4. Commit
git add .
git commit -m "feat(scope): descripción"

# 5. Push
git push origin feature/nueva-funcionalidad

# 6. Crear PR en GitHub
```

### Sincronizar con main

```bash
# Opción A: Rebase (recomendado para feature branches)
git checkout feature/mi-feature
git fetch origin
git rebase origin/main

# Opción B: Merge
git checkout feature/mi-feature
git merge origin/main
```

### Hotfix

```bash
# Para bugs críticos en producción
git checkout main
git pull origin main
git checkout -b hotfix/descripcion-bug

# ... fix ...

git commit -m "fix(scope): descripción del fix"
git push origin hotfix/descripcion-bug

# PR directo a main con etiqueta 'hotfix'
```

---

## Preguntas Frecuentes

### ¿Puedo trabajar en múltiples features al mismo tiempo?

Sí, pero cada feature debe estar en su propio branch:

```bash
git checkout -b feature/feature-1
# ... trabajo en feature 1 ...

git checkout main
git checkout -b feature/feature-2
# ... trabajo en feature 2 ...
```

### ¿Cómo actualizo mi fork?

```bash
# Añadir upstream (solo una vez)
git remote add upstream https://github.com/original/kontrol.git

# Sincronizar
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### ¿Qué hago si mi PR tiene conflictos?

```bash
# Opción 1: Rebase
git checkout tu-branch
git fetch origin
git rebase origin/main
# Resolver conflictos
git add .
git rebase --continue
git push --force-with-lease

# Opción 2: Merge
git checkout tu-branch
git merge origin/main
# Resolver conflictos
git add .
git commit
git push
```

---

## Recursos

- [Documentación oficial](https://kontrol-docs.vercel.app)
- [Guía de arquitectura](ARCHITECTURE.md)
- [Guía de estilo](STYLING_GUIDE.md)
- [Discord community](https://discord.gg/kontrol)

---

## Agradecimientos

¡Gracias por contribuir a Kontrol! Cada contribución, grande o pequeña, es valiosa. 💜

Si tienes preguntas, no dudes en:
- Abrir un [Discussion](https://github.com/tu-usuario/kontrol/discussions)
- Unirte a nuestro [Discord](https://discord.gg/kontrol)
- Contactar a [@tu-usuario](https://github.com/tu-usuario)
