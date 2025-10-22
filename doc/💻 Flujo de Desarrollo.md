# 💻 Flujo de Desarrollo (Lógica, Datos y Escalabilidad)

Este documento detalla el proceso para implementar nueva **funcionalidad y lógica de negocio** en el proyecto KONTROL. Este flujo se enfoca en proteger la capa de UI generada por Figma Make, asegurando que el código sea escalable y robusto.

## 🏗️ I. Estructura de Arquitectura para Escalabilidad

**Objetivo:** Separar completamente la lógica del negocio de los componentes visuales (UI) de Figma Make.

| Capa | Carpeta | Responsabilidad | Ejemplo de Contenido |
| :--- | :--- | :--- | :--- |
| **1. UI (Vista)** | `src/components/` | **Dibujo:** Componentes visuales "tontos" sin lógica. Solo renderizan datos recibidos vía props. | `CryptoBalanceCard.tsx` (Generado por Figma Make) |
| **2. Contenedor/Lógica** | `src/containers/` | **Conexión:** Obtiene el estado/datos (de `contexts` o `services`), aplica reglas de negocio, y pasa datos formateados a la UI. | `PortfolioSummaryContainer.tsx` (Tu código manual) |
| **3. Estado/Core** | `src/contexts/` | **Estado Global:** Manejo de sesiones, *theme*, y estado de aplicación principal. | `AuthContext.tsx`, `ThemeContext.tsx` |
| **4. Servicios/Data** | `src/services/` | **Datos:** Conexión a la API, IA, bases de datos históricas (millones de registros), y Web3. | `HistoricalDataService.ts`, `AIService.ts` |

**Principio Clave:** El código de **Figma Make** solo debe estar en la capa **`src/components/`**.

---

## 💻 II. Ciclo de Desarrollo de una Feature (Lógica)

Sigue estos pasos cada vez que implementes una nueva funcionalidad o lógica de negocio.

### A. Preparación y Ramificación

1.  **Actualizar `main`:** Asegúrate de que tu rama `main` esté al día con GitHub.
    ```bash
    git checkout main
    git pull origin main
    ```
2.  **Crear Rama:** Crea una nueva rama para aislar tu trabajo.
    ```bash
    git checkout -b feature/nombre-de-la-tarea
    ```

### B. Implementación de Lógica

1.  **Definir Servicio (si es necesario):** Si necesitas obtener datos externos (precios, IA), escribe la función en un archivo dentro de `src/services/`.
2.  **Crear Contenedor:** Crea un nuevo archivo en `src/containers/` (ej: `TransactionListContainer.tsx`).
3.  **Implementar Lógica:** En el **Contenedor**, escribe la lógica: llama al `Service`, aplica filtros, calcula resultados, y formatea los datos.
4.  **Renderizar UI:** El **Contenedor** importa el componente visual de Figma Make (`src/components/`) y le pasa **solo los datos finales**.

### C. Finalización y Despliegue (Git)

1.  **Revisar en Local:** Ejecuta `npm run dev` para verificar que la nueva lógica funciona en el navegador.
2.  **Añadir y Commit:** Registra tu trabajo con un mensaje de *commit* claro.
    ```bash
    git add .
    git commit -m "feat: Implementación de la lógica de optimización fiscal."
    ```
3.  **Subir y Pull Request:** Sube la rama a GitHub e inicia el proceso de revisión.
    ```bash
    git push -u origin feature/nombre-de-la-tarea
    ```
4.  **Merge:** Una vez aprobado, fusiona el PR a `main`. Esto dispara el CI/CD y despliega tu nueva funcionalidad.

---

## 🎯 Próximo Paso (Subir la Guía)

Ahora que tienes ambos archivos (`WORKFLOW.md` y `DEVELOPMENT_FLOW.md`) listos en tu carpeta local, vamos a subirlos a GitHub.

Ejecuta estos comandos en tu terminal:

```bash
# 1. Añade el nuevo archivo DEVELOPMENT_FLOW.md
git add DEVELOPMENT_FLOW.md

# 2. Registra el commit (junto con WORKFLOW.md si no lo hiciste antes)
git commit -m "docs: Se añade DEVELOPMENT_FLOW.md y se completa la documentación del workflow."

# 3. Sube el cambio a GitHub
git push origin main