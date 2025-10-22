# 📚 KONTROL - Documentación

> **Plataforma integral para la gestión fiscal y compliance de activos digitales**

## 🗂️ Estructura de la Documentación

### 📖 [Guías](./guides/)
- **[Inicio Rápido](./guides/getting-started.md)** - Cómo comenzar con KONTROL
- **[Flujo de Trabajo IA](./guides/ai-workflow.md)** - Trabajar con asistentes de IA
- **[Troubleshooting](./guides/troubleshooting.md)** - Solución de problemas comunes

### 🏗️ [Arquitectura](./architecture/)
- **[Visión General](./architecture/overview.md)** - Arquitectura completa del sistema
- **[Stack Tecnológico](./architecture/tech-stack.md)** - Tecnologías utilizadas
- **[Base de Datos](./architecture/database.md)** - Diseño de base de datos

### ⚙️ [Backend](./backend/)
- **[Plan de Implementación](./backend/implementation-plan.md)** - Roadmap del backend
- **[API Reference](./backend/api-reference.md)** - Documentación de endpoints
- **[Naming Conventions](./backend/naming-conventions.md)** - Convenciones de código

### 🎯 [Producto](./product/)
- **[Visión y Estrategia](./product/vision.md)** - Propuesta de valor
- **[Modelo de Negocio](./product/business-model.md)** - Monetización
- **[Roadmap](./product/roadmap.md)** - Plan de desarrollo

---

## 🚀 Estado Actual del Proyecto

### ✅ Completado
- Frontend minimalista con React + TypeScript + Vite
- Importador de direcciones con validación
- Consola de debug integrada
- Estructura del backend con FastAPI
- Sistema de documentación organizado

### 🚧 En Desarrollo
- Endpoints del backend API
- Conexión frontend-backend
- Persistencia en base de datos

### 📋 Próximos Pasos
1. Implementar endpoint `/api/addresses/import`
2. Conectar frontend con backend
3. Configurar Supabase
4. Implementar matching engine

---

## 📝 Convenciones del Proyecto

### Naming Conventions

#### Archivos
```
✅ CORRECTO:
- getting-started.md
- api-reference.md
- implementation-plan.md

❌ INCORRECTO:
- Getting_Started.md
- API Reference.md
- implementationPlan.md
```

#### Carpetas
```
✅ CORRECTO:
- docs/
- backend/
- architecture/

❌ INCORRECTO:
- Docs/
- Backend/
- ARCHITECTURE/
```

#### Componentes React (frontend)
```
✅ CORRECTO:
- AddressImporter.tsx
- DebugConsole.tsx
- UserProfile.tsx

❌ INCORRECTO:
- addressImporter.tsx
- debug-console.tsx
- user_profile.tsx
```

#### Archivos Python (backend)
```
✅ CORRECTO:
- address_service.py
- matching_engine.py
- api_gateway.py

❌ INCORRECTO:
- AddressService.py
- matchingEngine.py
- API-Gateway.py
```

---

## 🎯 Filosofía del Proyecto

### Principios de Desarrollo

1. **Simplicidad Primero** 🎯
   - Código simple > Código complejo
   - Una feature a la vez
   - Testing manual antes de avanzar

2. **Documentación Viviente** 📝
   - README siempre actualizado
   - Comentarios en español
   - Checkpoints después de cada sesión

3. **Progreso Incremental** 📈
   - Commits frecuentes
   - Features pequeñas y manejables
   - Rollback sin miedo

4. **Debugging Visible** 🐛
   - Consola de debug integrada
   - Logs claros y descriptivos
   - Errores informativos

---

## 🆘 ¿Necesitas Ayuda?

1. **Primero**: Lee [Getting Started](./guides/getting-started.md)
2. **Segundo**: Consulta [Troubleshooting](./guides/troubleshooting.md)
3. **Tercero**: Revisa [AI Workflow](./guides/ai-workflow.md)

---

**Última actualización**: 2025-10-22
**Versión**: MVP v0.1.0
