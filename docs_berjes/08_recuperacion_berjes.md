# Mecanismos de Recuperación — Clínica Vista Hermosa

## Nota Preliminar

El marco normativo referencial utilizado en la construcción de este plan es la norma ISO/IEC 27035:2023 sobre gestión de incidentes de seguridad de la información, y la norma
ISO 22301:2019 sobre continuidad del negocio, que establecen los principios para preparar, detectar, contener, recuperar y aprender de incidentes de seguridad (ISO,2019; 2023).

---

## 1. Introducción 

Este documento aborda dos dimensiones complementarias de la respuesta ante los riesgos identificados en la auditoría:

| Dimensión | Descripción |
|-----------|-------------|
| **Mejora tecnológica** | Cambios estructurales que debe adoptar Clínica Vista Hermosa para elevar su postura de seguridad de forma sostenible en el tiempo |
| **Plan de recuperación ante desastres (DR)** | Procedimientos que debe seguir la clínica si un ataque se materializa exitosamente, minimizando el tiempo de inactividad y el daño a los pacientes. |

El marco de referencia es la norma **ISO/IEC 27035:2023** sobre gestión de incidentes de seguridad de la información, y la norma **ISO 22301:2019** sobre continuidad del negocio (ISO, 2019; 2023).

---

## 2. Mejoras Tecnológicas y Estratégicas

- ¿Qué buscamos establecer en la organización?

| Iniciativa | Descripción | Vulnerabilidad que atiende | Plazo |
|------------|-------------|---------------------------|-------|
| Ciclo de desarrollo seguro (DevSecOps) | Integrar la seguridad en cada etapa del ciclo de vida del software, apuntando al threat modeling en diseño, revisión de código con foco en seguridad, pruebas SAST/DAST automatizadas en el pipeline de CI/CD, y escaneo de dependencias antes de cada release. | SQLi, XSS, Command Injection (causa raíz común: ausencia de validación de entradas en el desarrollo) | Mediano plazo |
| Adopción de un ORM | Reemplazar la construcción manual de consultas SQL por un ORM (Doctrine, Eloquent, SQLAlchemy). El ORM genera consultas parametrizadas de forma transparente, eliminando estructuralmente el riesgo de SQLi sin depender de que cada desarrollador lo recuerde. | Inyección SQL | Corto plazo |
| Gestión centralizada de identidades y accesos (IAM) | Implementar 2FA obligatorio para personal médico, gestión de roles granular (un médico solo ve fichas de sus propios pacientes), y registro de auditoría inmutable de todos los accesos a fichas clínicas para cumplir con la Ley N° 20.584. | XSS Reflejado | Corto plazo |
| Monitoreo continuo (SIEM) | Centralizar y correlacionar los logs de todos los sistemas (servidor web, base de datos, firewall, sistema operativo) en un SIEM. Configurar alertas automáticas ante patrones de ataque: consultas masivas, accesos fuera de horario, transferencias inusuales de datos. | SQLi, XSS, Inyección de Comandos | Mediano plazo |
| Programa de pruebas de seguridad periódicas | Establecer escaneos de vulnerabilidades automáticos mensuales (OWASP ZAP, Nessus), pentesting anual por equipo externo independiente sobre el portal y la infraestructura, y revisión trimestral de configuraciones de seguridad. | Todas las vulnerabilidades | Largo plazo (continuo) |

---

## 3. Plan de Recuperación ante Desastres (DR)

- ¿Cuáles objetivos buscamos establecer en el plan?

| Métrica | Definición | Valor para Clínica Vista Hermosa | Justificación |
|---------|------------|----------------------------------|---------------|
| **RTO** (Recovery Time Objective) | Tiempo máximo tolerable de inactividad desde el incidente hasta que el servicio es restaurado | 4 horas | En caso de requerirse, la clínica puede operar manualmente (fichas en papel, agendamiento telefónico, medios analógicos, etc) por un período breve, entendiendo que pasadas 4 horas el impacto en la atención de pacientes se vuelve crítico. |
| **RPO** (Recovery Point Objective) | Cantidad máxima de datos que se puede perder, expresada en tiempo | 24 horas | Implica que los backups deben ejecutarse al menos una vez al día para garantizar que la pérdida de información no supere un día de registros clínicos. |

---

## 4. Fases del plan de recuperación

- ¿Cómo se reanudarán las funciones durante y posterior a una crisis?

| Fase | Duración | Responsable | Acciones clave |
|------|----------|-------------|----------------|
| **1 — Detección y contención** | 0 a 1 hora | TI + Seguridad | 1. El SIEM o IDS genera alerta ante actividad anómala (consultas masivas, acceso a `/etc/passwd`, tráfico saliente inusual). 2. El encargado de seguridad TI verifica y clasifica el incidente. 3. Si es real: aislar el servidor de la red, revocar todas las sesiones activas del portal, preservar evidencia forense (no apagar el servidor; tomar imagen de memoria y logs). 4. Notificar al Director Médico y Dirección de la clínica. |
| **2 — Evaluación del daño** | 1 a 2 horas | TI + Seguridad | 1. Determinar qué datos fueron comprometidos (fichas, credenciales, exámenes). 2. Identificar el vector de ataque y la vulnerabilidad explotada. 3. Estimar el número de pacientes afectados. 4. Documentar todo en el registro de incidentes. |
| **3 — Notificación** | 2 a 4 horas | Dirección + Legal | 1. Notificar a los pacientes afectados (tipo de datos comprometidos y medidas tomadas), según Ley N°19.628 y Ley N°20.584. 2. Notificar a la autoridad sanitaria (MINSAL). 3. Evaluar la obligación de reporte al Consejo para la Transparencia. 4. Activar asesoría legal para gestionar el riesgo de demandas civiles. |
| **4 — Recuperación del servicio** | 2 a 4 horas (en paralelo con fase 3) | TI | 1. Corregir la vulnerabilidad explotada antes de restaurar el servicio. 2. Restaurar la base de datos desde el último backup verificado previo al incidente. 3. Restaurar el servidor desde una imagen limpia o snapshot previo al ataque. 4. Verificar integridad de los datos restaurados (comparar hashes). 5. Realizar pruebas en ambiente de staging antes de volver a producción. 6. Restablecer el servicio progresivamente con monitoreo intensivo. |
| **5 — Revisión post-incidente** | 48 a 72 horas después | TI + Dirección | 1. Realizar análisis de causa raíz (RCA) completo. 2. Documentar línea de tiempo del ataque y decisiones tomadas. 3. Identificar qué falló en los controles preventivos. 4. Actualizar el plan DR y los controles establecidos en ésta auditoría 5. Comunicar a la dirección el informe final del incidente. |

---

## Recursos Bibliográficos

1. International Organization for Standardization. (2022). ISO/IEC 27001:2022 Information Security, Cybersecurity and Privacy Protection — Information security managment systems — Requirements. ISO. Recuperado de: https://www.exactls.com/wp-content/uploads/2025/02/ISO_IEC-270012022-ed.3.pdf

2. Congreso Nacional de Chile. (09 de mayo de 2023). Ley no. 19.628. Sobre Proteccion de la Vida Privada. 28 de agosto de 1999. https://bcn.cl/2eqfn

3. Congreso Nacional de Chile. (16 de febrero de 2026). Ley no. 20.584. Regula los Derechos y Deberes que tienen las Personas en Relación con Acciones Vinculadas a su Atención en Salud. 24 de abril de 2012. https://bcn.cl/25b3z

4. Schirn, A. (1 de marzo de 2023). ISO/IEC 27035-1:2023 — Gestión de la seguridad de la información. blog.ansi.org. Recuperado de: https://blog.ansi.org/ansi/iso-iec-27035-1-2023-information-security-management/

5. ISO 22301. (2013, diciembre 10). Software ISO; ISOTools. https://isotools.org/normas/riesgos-y-seguridad/iso-22301/

