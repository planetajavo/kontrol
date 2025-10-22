# 🚀 Getting Started - KONTROL

> Guía rápida para comenzar a desarrollar en KONTROL

## 📋 Prerequisitos

### Software Requerido
- **Node.js** 18+ (para frontend)
- **Python** 3.11+ (para backend)
- **Git** (control de versiones)
- **VS Code** o editor de tu preferencia

### Conocimientos Recomendados
- Conceptos básicos de React y TypeScript
- Python básico
- Git básico
- Terminal/línea de comandos

---

## 🏁 Setup Inicial

### 1. Clonar el Proyecto

```bash
cd /Users/javo/Projects/KONTROL
```

### 2. Configurar Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ El frontend debería estar corriendo en **http://localhost:3000**

### 3. Configurar Backend (Próximamente)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Mac/Linux
pip install -r requirements.txt
python main.py
```

✅ El backend debería estar corriendo en **http://localhost:8000**

---

## 📁 Estructura del Proyecto

```
KONTROL/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── App.tsx       # App principal
│   │   └── main.tsx      # Entry point
│   └── package.json
│
├── backend/              # Python + FastAPI
│   ├── api/             # Endpoints REST/GraphQL
│   ├── core/            # Servicios principales
│   ├── models/          # Modelos de datos
│   ├── main.py          # App FastAPI
│   └── requirements.txt
│
├── docs/                # Documentación
│   ├── guides/          # Guías de uso
│   ├── architecture/    # Arquitectura
│   └── backend/         # Docs del backend
│
└── README.md            # Documentación principal
```

---

## 🎯 Primer Uso

### Paso 1: Iniciar el Frontend

```bash
cd frontend
npm run dev
```

Abre http://localhost:3000 en tu navegador.

### Paso 2: Probar el Importador

1. Click en **"📋 Cargar Ejemplo"**
2. Click en **"🚀 Importar Direcciones"**
3. Observa la consola de debug abajo

### Paso 3: Verificar que Funciona

Deberías ver:
- ✅ Direcciones importadas mostradas en tarjetas
- ✅ Logs en la consola de debug
- ✅ UI responsive y moderna

---

## 🛠️ Comandos Esenciales

### Frontend

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Backend (cuando esté listo)

```bash
# Desarrollo
python main.py

# Tests
pytest

# Linting
black . && flake8
```

### Git

```bash
# Ver estado
git status

# Hacer commit
git add .
git commit -m "✅ Feature: descripción clara"

# Ver historial
git log --oneline -10

# Volver a commit anterior
git reset --hard [commit-hash]
```

---

## 🔍 Verificar que Todo Funciona

### Frontend
```bash
cd frontend && npm run dev
# Abre http://localhost:3000
# Deberías ver la página de importar direcciones
```

### Backend (cuando esté implementado)
```bash
curl http://localhost:8000/health
# Respuesta: {"status": "ok"}
```

---

## 🐛 Problemas Comunes

### Puerto 3000 ya en uso
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Error de dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema con TypeScript
```bash
rm -rf node_modules/.vite
npm run dev
```

---

## 📖 Próximos Pasos

1. ✅ Has completado el setup inicial
2. 📖 Lee [AI Workflow Guide](./ai-workflow.md) para aprender a trabajar con IAs
3. 🏗️ Revisa [Architecture Overview](../architecture/overview.md) para entender el sistema
4. ⚙️ Consulta [Implementation Plan](../backend/implementation-plan.md) para el roadmap

---

## 🎯 Checkpoint

Antes de continuar, asegúrate de que:
- [ ] Frontend corre sin errores
- [ ] Puedes importar direcciones
- [ ] La consola de debug muestra logs
- [ ] Entiendes la estructura del proyecto

---

**¿Listo para continuar?** → Lee [AI Workflow Guide](./ai-workflow.md)
