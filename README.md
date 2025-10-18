
  # KONTROL

  This is a code bundle for KONTROL. The original project is available at https://www.figma.com/design/ZQIHaAfy1iFMHzvHgOKcwC/KONTROL.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  
###   INSTALACION

ya he descargado el proyecto como lo ejecuto en local?
¡Perfecto! Ya tienes el proyecto descargado. Ahora vamos a configurarlo para ejecutarlo en local. Te guiaré paso a paso:



🚀 Guía de Instalación Local - Kontrol Dashboard


Paso 1: Verificar Node.js


Abre una terminal y verifica que tienes Node.js instalado:



```bash
node --version
npm --version
```



Necesitas: Node.js v18 o superior. Si no lo tienes, descárgalo de nodejs.org



Paso 2: Navegar al directorio del proyecto


```bash
cd kontrol-dashboard

o el nombre de tu carpeta descargada
```



Paso 3: Crear archivos de configuración faltantes


Necesitas crear algunos archivos que no vienen en la descarga. Crea estos archivos en la raíz del proyecto:



3.1 - `package.json`


Crea un archivo llamado `package.json`:



```json
{
  "name": "kontrol-crypto-dashboard",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^10.18.0",
    "framer-motion": "^11.5.4",
    "lucide-react": "^0.445.0",
    "recharts": "^2.12.7",
    "sonner": "^2.0.3",
    "react-hook-form": "^7.55.0",
    "date-fns": "^3.6.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2",
    "embla-carousel-react": "^8.3.0",
    "react-day-picker": "^8.10.1",
    "vaul": "^0.9.1",
    "cmdk": "^1.0.0",
    "input-otp": "^1.2.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0-alpha.25",
    "autoprefixer": "^10.4.20"
  }
}
```



3.2 - `vite.config.ts`


```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';



export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
  server: {
    port: 5173,
    open: true,
  },
});
```



3.3 - `tsconfig.json`


```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,



    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",



    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,



    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/": ["./"]
    }
  },
  "include": ["/*.ts", "/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```



3.4 - `tsconfig.node.json`


```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```



3.5 - `index.html`


```html
<!DOCTYPE html>
<html lang="es" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kontrol - Crypto Tax Dashboard</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
```



3.6 - `main.tsx`


```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```



Paso 4: Instalar dependencias


Ahora instala todas las dependencias:



```bash
npm install
```



Nota: Si encuentras errores de peer dependencies, usa:



```bash
npm install --legacy-peer-deps
```



Paso 5: Ejecutar el proyecto


Una vez instaladas las dependencias, ejecuta:



```bash
npm run dev
```



Deberías ver algo como:



```
  VITE v5.4.2  ready in 500 ms



  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```



Paso 6: Abrir en el navegador


Abre tu navegador y ve a:



```
http://localhost:5173
```



¡Deberías ver Kontrol Dashboard funcionando! 🎉



---



🔧 Comandos Útiles


```bash

Desarrollo
npm run dev          # Inicia servidor de desarrollo



Producción
npm run build        # Compila para producción
npm run preview      # Preview del build



Utilidades
npm run lint         # Linter de código
```



---



⚠️ Troubleshooting


Error: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```



Error: Tailwind CSS no funciona
Asegúrate de que `@tailwindcss/vite` esté en el `vite.config.ts` y que `globals.css` esté importado en `main.tsx`



Error: Motion/Framer Motion
```bash
npm install motion@latest framer-motion@latest
```



Puerto 5173 ya está en uso
Cambia el puerto en `vite.config.ts`:
```typescript
server: {
  port: 3000, // o cualquier otro puerto
}
```



Errores de TypeScript
```bash
npm run build

Revisa los errores específicos
```



---



📱 Acceder desde otros dispositivos (móvil/tablet)


Para probar en tu móvil/tablet en la misma red:



```bash
npm run dev -- --host
```



Luego accede desde tu móvil usando la IP que aparece (ej: `http://192.168.1.100:5173`)



---



🚀 Deploy a Producción (Opcional)


Vercel (Recomendado)
```bash
npm install -g vercel
npm run build
vercel
```



Netlify
```bash
npm run build

Arrastra la carpeta dist/ a netlify.com
```



---



¿Encuentras algún error al ejecutar? ¡Compárteme el mensaje de error y te ayudo a solucionarlo! 🛠️