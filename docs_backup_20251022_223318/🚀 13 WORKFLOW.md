# 🚀 Workflow de Desarrollo KONTROL: Figma Make ↔ GitHub ↔ Local

Este documento detalla el flujo de trabajo recomendado para mantener la escalabilidad y la sincronización entre el diseño de Figma Make, el código local, y el repositorio de GitHub.

## 🏗️ I. Arquitectura por Capas (El Principio de Protección)

Para asegurar la **escalabilidad** y evitar que Figma Make sobrescriba la lógica de negocio (manejo de millones de registros, IA, Web3), separamos el código en capas.

| Capa | Carpeta | Responsabilidad | ¿Figma Make la toca? |
| :--- | :--- | :--- | :--- |
| **1. Presentación (UI)** | `src/components/` | **Dibuja:** Componentes visuales "tontos" sin lógica. Reciben datos formateados. | **SÍ (Reemplazable)** |
| **2. Contenedores/Vistas**| `src/containers/` | **Conecta:** Lógica de negocio (cómo formatear, qué datos pedir). Es la capa de protección. | **NO (Tu código manual)** |
| **3. Servicios/Data** | `src/services/` | **Obtiene:** Conexión a APIs, Blockchain, Modelos de IA, Bases de Datos. | **NO (Tu código manual)** |

**Regla de Oro:** Si modificas el diseño, usas la sincronización de Figma Make. Si modificas la lógica, usas Git.

---

## 🔄 II. Sincronización Figma Make → GitHub (Cambios de Diseño)

Este flujo se utiliza exclusivamente para transferir **cambios visuales o estructurales** desde Figma Make al repositorio.

### A. Preparación (Solo una vez)

1.  **Obtener Scripts:** Descargar `KONTROL.zip` desde Figma Make y asegurar que `sync-from-figma.sh` esté en la raíz de tu proyecto.
2.  **Permisos:** Dar permisos de ejecución al script.

    ```bash
    chmod +x sync-from-figma.sh
    ```

### B. Ciclo Diario de Sincronización

Cada vez que finalices un cambio de diseño en Figma Make:

| Paso | Acción | Herramienta | Nota |
| :--- | :--- | :--- | :--- |
| **1. Descargar Nuevo ZIP** | Descargar el proyecto actualizado desde Figma Make y guardarlo en `~/Downloads/KONTROL.zip`. | Figma Make | Sobrescribe el ZIP anterior. |
| **2. Ejecutar Script** | Iniciar la sincronización en la raíz de tu proyecto local (`KONTROL`). | Terminal | El script aplica el cambio de diseño. |
| **3. Commit** | Responder **`y`** para hacer commit del cambio. | Terminal | Se registra la actualización de la UI. |
| **4. Push** | Responder **`y`** para subir los cambios a GitHub. | Terminal | Inicia el proceso de CI/CD (despliegue en Vercel). |

**Comando de Sincronización:**

```bash
bash sync-from-figma.sh ~/Downloads/KONTROL.zip