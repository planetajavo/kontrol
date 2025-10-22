# 🐛 Troubleshooting Guide - Solución de Problemas

> Guía completa para resolver problemas comunes en KONTROL

## 🚨 Problemas del Frontend

### Puerto 3000 ya en uso

**Síntoma**: Error `EADDRINUSE: address already in use :::3000`

**Solución**:
```bash
# Matar el proceso en puerto 3000
lsof -ti:3000 | xargs kill -9

# Reiniciar el servidor
cd frontend
npm run dev
```

---

### Error de Dependencias npm

**Síntoma**: Errores al instalar o correr `npm install`

**Solución**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

### Error de TypeScript

**Síntoma**: Errores de tipos o compilación

**Solución**:
```bash
# Limpiar cache de Vite
rm -rf node_modules/.vite

# Reinstalar
npm install

# Verificar tsconfig.json
cat tsconfig.json

# Reiniciar
npm run dev
```

---

### Frontend no se actualiza en el navegador

**Síntoma**: Los cambios no se reflejan en el navegador

**Solución**:
1. Limpia el cache del navegador (Cmd + Shift + R)
2. Reinicia el servidor de desarrollo
3. Verifica que no haya errores en la consola del navegador (F12)

---

## 🔧 Problemas del Backend

### Python no encontrado

**Síntoma**: `python: command not found`

**Solución**:
```bash
# Verificar instalación de Python
python3 --version

# Usar python3 en lugar de python
python3 main.py

# O crear alias
alias python=python3
```

---

### Módulos de Python no encontrados

**Síntoma**: `ModuleNotFoundError: No module named 'fastapi'`

**Solución**:
```bash
cd backend

# Activar entorno virtual
python -m venv venv
source venv/bin/activate  # Mac/Linux
# o
venv\Scripts\activate  # Windows

# Instalar dependencias
pip install -r requirements.txt
```

---

### Puerto 8000 ya en uso

**Síntoma**: Backend no puede iniciar en puerto 8000

**Solución**:
```bash
# Matar proceso en puerto 8000
lsof -ti:8000 | xargs kill -9

# O cambiar puerto en main.py
uvicorn.run(app, host="0.0.0.0", port=8001)
```

---

## 🗄️ Problemas de Base de Datos

### Conexión a Supabase falla

**Síntoma**: Error al conectar con Supabase

**Solución**:
```bash
# Verificar variables de entorno
cat backend/.env

# Asegurarse de que existen:
# SUPABASE_URL=...
# SUPABASE_KEY=...

# Si no existe .env, copiar del ejemplo
cp backend/env.example backend/.env
# Editar con tus credenciales
```

---

### PostgreSQL no conecta

**Síntoma**: `could not connect to server`

**Solución**:
```bash
# Verificar que PostgreSQL está corriendo
pg_isready

# Iniciar PostgreSQL
brew services start postgresql

# O con Docker
docker-compose up -d postgres
```

---

## 📦 Problemas con Docker

### Docker Compose falla

**Síntoma**: Servicios no inician con docker-compose

**Solución**:
```bash
# Detener todos los contenedores
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Reconstruir imágenes
docker-compose build --no-cache

# Iniciar de nuevo
docker-compose up -d
```

---

### Contenedores sin espacio

**Síntoma**: `no space left on device`

**Solución**:
```bash
# Limpiar contenedores no usados
docker system prune -a

# Limpiar volúmenes no usados
docker volume prune

# Ver espacio usado
docker system df
```

---

## 🔀 Problemas con Git

### Conflictos de merge

**Síntoma**: Git no puede hacer merge

**Solución**:
```bash
# Ver archivos en conflicto
git status

# Opción 1: Aceptar cambios remotos
git checkout --theirs [archivo]

# Opción 2: Mantener cambios locales
git checkout --ours [archivo]

# Opción 3: Abortar merge
git merge --abort
```

---

### Commits no deseados

**Síntoma**: Hiciste commit de algo que no querías

**Solución**:
```bash
# Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Deshacer último commit (eliminar cambios)
git reset --hard HEAD~1

# Deshacer múltiples commits
git reset --hard HEAD~3  # últimos 3 commits
```

---

### Branch equivocada

**Síntoma**: Trabajaste en la branch incorrecta

**Solución**:
```bash
# Guardar cambios
git stash

# Cambiar a branch correcta
git checkout main

# Aplicar cambios
git stash pop
```

---

## 🌐 Problemas de Red/API

### CORS Error

**Síntoma**: `Access to fetch has been blocked by CORS policy`

**Solución**:
```python
# En backend/main.py, verificar CORS:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### API no responde

**Síntoma**: Fetch falla con error de red

**Solución**:
```bash
# Verificar que backend está corriendo
curl http://localhost:8000/health

# Verificar proxy en vite.config.ts
cat frontend/vite.config.ts

# Verificar network tab en DevTools (F12)
```

---

## 💻 Problemas del Sistema

### Permisos denegados

**Síntoma**: `Permission denied` al ejecutar comandos

**Solución**:
```bash
# Dar permisos de ejecución
chmod +x script.sh

# Usar sudo si es necesario
sudo comando

# Verificar ownership
ls -la
```

---

### Memoria insuficiente

**Síntoma**: Sistema lento o comandos fallan

**Solución**:
```bash
# Ver uso de memoria
top

# Matar procesos pesados
# Encuentra el PID y:
kill -9 [PID]

# Reiniciar servicios
docker-compose restart
```

---

## 🔍 Debugging Avanzado

### Habilitar Debug Logs

```python
# En backend/main.py
import logging
logging.basicConfig(level=logging.DEBUG)
```

```typescript
// En frontend
console.log('Debug:', variable);
onLog('info', 'Debug information', { data });
```

---

### Usar Debugger

**Frontend (Chrome DevTools)**:
1. F12 para abrir DevTools
2. Sources tab
3. Click en línea para breakpoint
4. Recargar página

**Backend (Python)**:
```python
import pdb; pdb.set_trace()  # Breakpoint
```

---

## 📞 Cuando Todo Falla

### Protocolo de Reset Completo

```bash
# 1. Volver al último commit funcional
git log --oneline -10
git reset --hard [hash-del-commit-bueno]

# 2. Limpiar todo
cd frontend
rm -rf node_modules package-lock.json .vite
npm install

cd ../backend
rm -rf venv __pycache__
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 3. Reiniciar servicios
cd frontend && npm run dev
# En otra terminal:
cd backend && python main.py
```

---

## 🆘 Pedir Ayuda

Cuando pidas ayuda a una IA, incluye:

1. **Descripción del problema**: Qué estabas intentando hacer
2. **Error exacto**: Copia completa del mensaje de error
3. **Lo que ya probaste**: Qué soluciones intentaste
4. **Contexto**: Archivos relevantes, versiones, sistema operativo
5. **Logs**: Output completo de la consola

### Template de Reporte de Bug

```markdown
## 🐛 Problema
[Descripción clara]

## 📋 Pasos para Reproducir
1. Primero hice...
2. Luego hice...
3. Y entonces...

## ❌ Error
```
[Pega aquí el error completo]
```

## 💻 Entorno
- OS: macOS / Windows / Linux
- Node: v18.x.x
- Python: 3.11.x
- Browser: Chrome 120

## 🔍 Lo que Intenté
- Probé X
- Probé Y
- No funcionó

## 📎 Archivos Relevantes
- /path/to/file.ts
- /path/to/other.py
```

---

## 📚 Recursos Adicionales

- [Getting Started](./getting-started.md) - Setup inicial
- [AI Workflow](./ai-workflow.md) - Trabajar con IAs
- [Architecture](../architecture/overview.md) - Entender el sistema

---

**Recuerda**: La mayoría de los problemas se resuelven con:
1. ✅ Leer el error completo
2. ✅ Verificar que todo está corriendo
3. ✅ Limpiar cache y reinstalar
4. ✅ Volver al último commit funcional

**🎯 ¡No te rindas! Cada error es una oportunidad de aprender.**
