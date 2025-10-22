# DevOps, CI/CD y Despliegue: Resiliencia y Auditabilidad ⚙️

## 1. Estrategia de Infraestructura: Kubernetes (K8s) ☁️

* **Cloud Provider:** **GCP** o **AWS (EKS)**.
* **Orquestación:** **Kubernetes (K8s)** para **self-healing**, balanceo de carga y escalabilidad horizontal de los microservicios.
* **Infraestructura como Código (IaC):** Uso de **Terraform** para el despliegue de toda la infraestructura, clave para la **Localización Geográfica** (desplegar un *cluster* idéntico en una nueva jurisdicción).

## 2. Pipeline CI/CD (GitOps con ArgoCD) 🔄

Adoptamos un flujo **GitOps** para garantizar la auditabilidad y la estabilidad de los despliegues.

1.  **Continuous Integration (CI):** **GitHub Actions** o **GitLab CI** para *Linting* (**Rust Clippy**, Black), **Tests Unitarios (>80% Cobertura)** y *Security Scanning* (SAST).
2.  **Continuous Delivery (CD):** **ArgoCD** monitorea el repositorio de configuración (`manifests/helm charts`) y aplica los cambios automáticamente a K8s.

## 3. Observabilidad (SLA 99.99%) 📈

Una plataforma de *Wealth Control* exige alta disponibilidad.

* **Logs:** Stack centralizado con **Loki** o **ELK**.
* **Métricas:** **Prometheus** y **Grafana** para el monitoreo de *latency*, tasas de error (*SLIs/SLOs*).
* **Tracing:** Implementación de **OpenTelemetry** en todos los microservicios para trazar la ruta de una solicitud de Ingesta de extremo a extremo.