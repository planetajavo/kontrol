# 🤖 AI Workflow Guide - Trabajar con Asistentes de IA

> Guía definitiva para solopreneurs: cómo trabajar con IAs sin perder contexto

## 🎯 El Problema

Como solopreneur no técnico, tu mayor desafío es:
- ❌ Avanzas mucho con una IA pero no puedes continuar después
- ❌ La próxima IA no entiende el contexto
- ❌ El código se rompe y no sabes cómo arreglarlo
- ❌ Te pierdes en el proyecto y no sabes dónde estabas

## ✅ La Solución: Flujo de Trabajo Estructurado

---

## 📋 Paso 1: Al Iniciar Cada Sesión

### Template para la IA

Copia y pega esto **cada vez que empieces**:

```markdown
Hola, soy solopreneur trabajando en KONTROL (plataforma crypto-fiscal).

CONTEXTO RÁPIDO:
- Frontend: React + TypeScript minimalista ✅ FUNCIONA
- Backend: FastAPI ⏸️ Estructura lista, sin implementar
- Última sesión: [FECHA]
- Última feature: [LO QUE HICISTE]

LEE ESTOS ARCHIVOS:
1. /CHECKPOINT_[FECHA].md
2. /docs/guides/getting-started.md
3. /frontend/README.md

NECESITO AYUDA CON:
[Describe específicamente qué quieres hacer]

IMPORTANTE: 
- Una feature a la vez
- Probar antes de avanzar
- Explicar en español qué hace cada cosa
```

---

## 📝 Paso 2: Durante el Desarrollo

### Regla de Oro: Una Feature a la Vez

```
✅ CORRECTO:
"Implementa solo el endpoint /api/addresses/import.
Después lo probamos antes de continuar."

❌ INCORRECTO:
"Implementa todo el backend con todos los endpoints,
base de datos, auth, y conexión con blockchain."
```

### Checklist por Feature

Antes de continuar a la siguiente feature:
- [ ] El código compila sin errores
- [ ] La feature funciona al probarla manualmente
- [ ] Hiciste commit con mensaje descriptivo
- [ ] Actualizaste el README si es necesario
- [ ] La consola de debug no muestra errores

---

## 💾 Paso 3: Commits Frecuentes

### Naming Convention para Commits

```bash
# ✅ Buenos commits
git commit -m "✅ Feature: Importador de direcciones funcionando"
git commit -m "🐛 Fix: Validación de direcciones Bitcoin"
git commit -m "📝 Docs: Actualizado README con setup"
git commit -m "♻️ Refactor: Simplificado componente AddressImporter"

# ❌ Malos commits
git commit -m "cambios"
git commit -m "fix"
git commit -m "wip"
git commit -m "asdfasdf"
```

### Cuándo Hacer Commit

```
Haz commit después de:
✅ Completar una feature que funciona
✅ Arreglar un bug importante
✅ Antes de hacer cambios grandes
✅ Al final de cada sesión

NO hagas commit de:
❌ Código que no compila
❌ Features a medias
❌ Código con TODOs sin resolver
```

---

## 📊 Paso 4: Checkpoints al Terminar

### Template de Checkpoint

Al final de cada sesión, pide a la IA que cree un checkpoint:

```markdown
Crea un archivo CHECKPOINT_[FECHA].md con:

## ✅ Lo que Funciona Hoy
[Lista de features funcionando]

## 🚧 Lo que NO Funciona
[Lista de cosas rotas o pendientes]

## 📝 Próximo Paso Específico
[Exactamente qué hacer mañana]

## 🐛 Problemas Encontrados
[Bugs o issues pendientes]

## 💡 Notas Importantes
[Apuntes para recordar]
```

---

## 🎯 Paso 5: Cómo Pedir Ayuda a la IA

### ✅ Peticiones Específicas (BIEN)

```markdown
Problema: El componente AddressImporter no valida direcciones Bitcoin 
con formato bc1.

Archivo: /frontend/src/components/AddressImporter.tsx
Línea: 42
Regex actual: /^(1|3)[a-zA-HJ-NP-Z0-9]{25,62}$/

Necesito: Agregar soporte para direcciones bc1 (Bech32).

¿Puedes actualizar el regex y explicar el cambio?
```

### ❌ Peticiones Vagas (MAL)

```markdown
"No funciona el frontend"
"Arregla el proyecto"
"Implementa todo"
"Hay un error"
```

---

## 🔄 Paso 6: Cuando Algo se Rompe

### Protocolo de Rollback

```bash
# 1. Ver últimos commits
git log --oneline -10

# 2. Identificar el último commit que funcionaba
# Ejemplo: abc1234

# 3. Volver a ese commit
git reset --hard abc1234

# 4. Verificar que funciona
cd frontend && npm run dev

# 5. Empezar de nuevo con la feature
```

### Debugging con la Consola

La consola de debug del frontend está para ayudarte:

```typescript
// En cualquier componente:
onLog('info', 'Iniciando importación de direcciones');
onLog('success', '✅ 5 direcciones importadas correctamente');
onLog('error', '❌ Error al validar dirección', { address, error });
```

---

## 📚 Paso 7: Recursos Rápidos

### Cuando te Trabas

1. **Lee el README** del módulo en el que estás trabajando
2. **Revisa el último checkpoint** (CHECKPOINT_[FECHA].md)
3. **Mira los últimos commits**: `git log --oneline -5`
4. **Verifica que el frontend corre**: `cd frontend && npm run dev`

### Comandos de Emergencia

```bash
# Frontend no arranca
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Git está confuso
git status
git reset --hard HEAD

# Ver qué cambió
git diff

# Deshacer último commit (sin perder cambios)
git reset --soft HEAD~1
```

---

## 🎓 Lecciones Clave

### DO (Haz Esto)

1. ✅ **Sé específico** con la IA (archivo, línea, problema)
2. ✅ **Pide documentación** después de cada cambio
3. ✅ **Prueba inmediatamente** cada feature
4. ✅ **Commit frecuente** cuando algo funciona
5. ✅ **Lee los READMEs** antes de preguntar

### DON'T (No Hagas Esto)

1. ❌ **No avances** sin probar la feature anterior
2. ❌ **No pidas** "implementa todo de una vez"
3. ❌ **No hagas** cambios en muchos archivos a la vez
4. ❌ **No olvides** hacer commits
5. ❌ **No ignores** los errores de la consola

---

## 🚀 Plan de Sesión Ideal

### Estructura de una Sesión Productiva

```markdown
⏰ 10:00 - Inicio
- Leo CHECKPOINT de la sesión anterior
- Arranco el frontend: cd frontend && npm run dev
- Verifico que funciona
- Planeo QUÉ feature voy a implementar (una sola)

⏰ 10:15 - Desarrollo
- Pido a la IA que implemente la feature
- Reviso el código generado
- Pruebo que funcione
- Hago ajustes si es necesario

⏰ 10:45 - Testing
- Pruebo la feature manualmente
- Verifico la consola de debug
- Confirmo que todo funciona

⏰ 11:00 - Commit y Documentación
- Hago commit: git commit -m "✅ Feature: [descripción]"
- Actualizo README si es necesario
- Creo CHECKPOINT para mañana

⏰ 11:15 - Fin
- Tengo UNA feature funcionando
- Código commiteado
- Listo para continuar mañana
```

---

## 🎯 Métricas de Éxito

Una sesión es exitosa si:
- ✅ Implementaste AL MENOS una feature pequeña
- ✅ La feature funciona al probarla
- ✅ Hiciste commit del código
- ✅ Sabes exactamente qué hacer mañana

Una sesión NO es exitosa si:
- ❌ Tienes código roto
- ❌ No hiciste commits
- ❌ No sabes en qué estado está el proyecto
- ❌ La próxima IA no podrá continuar

---

## 📖 Próximos Pasos

1. ✅ Has aprendido el flujo de trabajo con IA
2. 🏗️ Lee [Architecture Overview](../architecture/overview.md)
3. ⚙️ Revisa [Implementation Plan](../backend/implementation-plan.md)
4. 🐛 Consulta [Troubleshooting](./troubleshooting.md) si tienes problemas

---

**Recuerda**: Progreso incremental > Perfección

**🎉 Con este flujo, SIEMPRE podrás continuar tu proyecto!**
