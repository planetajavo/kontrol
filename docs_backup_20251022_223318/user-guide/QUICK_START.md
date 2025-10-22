# ⚡ Guía Rápida de Inicio - Kontrol

Esta guía te ayudará a ejecutar Kontrol en tu máquina local en **menos de 5 minutos**.

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- ✅ **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- ✅ **Git** - [Descargar aquí](https://git-scm.com/)

Para verificar:

```bash
node --version   # Debe mostrar v18.0.0 o superior
npm --version    # Debe mostrar 9.0.0 o superior
git --version    # Cualquier versión reciente
```

---

## 🚀 Instalación en 4 Pasos

### **1️⃣ Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/kontrol.git
cd kontrol
```

### **2️⃣ Instalar dependencias**

```bash
npm install
```

**💡 Nota:** Si encuentras errores, prueba:
```bash
npm install --legacy-peer-deps
```

### **3️⃣ Ejecutar en desarrollo**

```bash
npm run dev
```

### **4️⃣ Abrir en el navegador**

Abre tu navegador en:

```
http://localhost:5173
```

**¡Listo! 🎉 Kontrol está corriendo en tu máquina.**

---

## 🛠️ Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Preview del build de producción |
| `npm run lint` | Ejecuta el linter |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run format` | Formatea el código |

---

## 🐛 Troubleshooting

### **Error: Puerto 5173 ya está en uso**

```bash
# Opción 1: Matar el proceso
lsof -ti:5173 | xargs kill -9

# Opción 2: Usar otro puerto
npm run dev -- --port 3000
```

### **Error: Module not found**

```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### **Error: Cannot find module '@tailwindcss/vite'**

```bash
npm install --save-dev @tailwindcss/vite tailwindcss
```

### **Errores de TypeScript**

```bash
# Verificar errores
npm run typecheck

# Si es necesario, regenerar tipos
rm -rf node_modules/@types
npm install
```

---

## 📱 Acceder desde Móvil/Tablet

Para probar en dispositivos móviles en tu red local:

```bash
npm run dev -- --host
```

Luego accede desde tu móvil usando la IP que aparece en la terminal:
```
http://192.168.1.X:5173
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno

Si necesitas configurar variables de entorno:

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar con tu editor favorito
nano .env
```

### Cambiar Puerto por Defecto

Edita `vite.config.ts`:

```typescript
server: {
  port: 3000, // Cambia 5173 por el puerto que quieras
  open: true,
}
```

---

## 📚 Documentación Adicional

- **Arquitectura del Proyecto:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Guía de Componentes Compartidos:** [SHARED_COMPONENTS_USAGE.md](SHARED_COMPONENTS_USAGE.md)
- **Sistema de Colores:** [COLOR_SYSTEM.md](COLOR_SYSTEM.md)
- **Guía de Estilos:** [STYLING_GUIDE.md](STYLING_GUIDE.md)
- **Contribuir:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🆘 ¿Necesitas Ayuda?

- 📖 Lee la [documentación completa](README.md)
- 🐛 [Reportar un bug](https://github.com/tu-usuario/kontrol/issues)
- 💬 [Discusiones](https://github.com/tu-usuario/kontrol/discussions)

---

## ✅ Checklist Post-Instalación

Después de la instalación, verifica que todo funciona:

- [ ] El servidor de desarrollo se inicia sin errores
- [ ] Puedes acceder a `http://localhost:5173`
- [ ] La página de landing carga correctamente
- [ ] Puedes hacer login (user: `demo@kontrol.app`, pass: `demo123`)
- [ ] El dashboard muestra widgets y gráficos
- [ ] No hay errores en la consola del navegador

---

**¡Ya estás listo para desarrollar con Kontrol! 🚀**

[← Volver al README](README.md)
