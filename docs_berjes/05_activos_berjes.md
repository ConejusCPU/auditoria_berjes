# Activos de Información — Clínica Vista Hermosa

## Clasificación de Activos

Cada activo se evalúa según la triada CIA (ISO, 2022) en una escala de 1 a 3:

- **1 — Bajo:** el impacto de su compromiso es menor o recuperable fácilmente.
- **2 — Medio:** el impacto es significativo pero acotado.
- **3 — Alto:** el impacto es severo, con consecuencias legales, económicas
  o de continuidad operacional.

La **criticidad total** se determina por el valor máximo entre los tres criterios.

### 1. Activos de Datos

Apunta a los datos mismos generados, almacenados y procesados por la clínica mediante el portal.

| ID | Activo | Descripción | Clasificación |
|----|--------|-------------|---------------|
| D_1 | Fichas clínicas electrónicas | Diagnósticos, antecedentes médicos, alergias, tratamientos activos | Confidencial |
| D_2 | Resultados de exámenes | Informes de laboratorio e imagenología (radiografías, ecografías) | Confidencial |
| D_3 | Datos de identificación de pacientes | RUT, nombre completo, dirección, teléfono, correo electrónico | Privado |
| D_4 | Credenciales de acceso | Usuarios y contraseñas del portal (pacientes y personal médico) | Confidencial |
| D_5 | Historial de agendamiento | Registro de horas médicas solicitadas y atendidas | Interno |
| D_6 | Registros de auditoría del sistema | Logs de acceso, modificaciones y eventos del portal | Interno |

### 2. Activos de Software

Corresponden a las aplicaciones y sistemas que procesan, almacenan o transmiten los datos de la clínica.

| ID | Activo | Descripción | Clasificación |
|----|--------|-------------|---------------|
| S_1 | Portal web de clientes | Aplicación web principal de acceso a fichas y resultados | Crítico |
| S_2 | Motor de base de datos | Sistema gestor que almacena toda la información clínica | Crítico |
| S_3 | Sistema de agendamiento | Módulo de gestión de horas y agenda médica | Importante |
| S_4 | Sistema operativo del servidor | Plataforma sobre la que corren todos los servicios web | Crítico |

### 3. Activos de Infraestructura

Corresponde a los componentes físicos y de red que sustentan los sistemas
de la clínica.

| ID | Activo | Descripción | Clasificación |
|----|--------|-------------|---------------|
| I_1 | Servidor web | Aloja y sirve el portal de clientes a través de internet | Crítico |
| I_2 | Servidor de base de datos | Almacena las fichas clínicas, exámenes y credenciales | Crítico |
| I_3 | Sistema de copias de respaldo | Backups periódicos de la base de datos y archivos del servidor | Importante |
| I_4 | Infraestructura de red | Conexiones, firewall y configuración de acceso al servidor | Importante |

### 4. Clasificación de Activos

| ID | Activo | Confidencialidad | Integridad | Disponibilidad | Criticidad |
|----|--------|:----------------:|:----------:|:--------------:|:----------:|
| D_1 | Fichas clínicas electrónicas | 3 | 3 | 2 | **Alta** |
| D_2 | Resultados de exámenes | 3 | 3 | 2 | **Alta** |
| D_3 | Datos de identificación | 3 | 2 | 1 | **Alta** |
| D_4 | Credenciales de acceso | 3 | 3 | 2 | **Alta** |
| D_5 | Historial de agendamiento | 1 | 2 | 2 | **Media** |
| D_6 | Registros de auditoría | 2 | 3 | 1 | **Media** |
| S1 | Portal web de clientes | 2 | 3 | 3 | **Alta** |
| S_2 | Motor de base de datos | 3 | 3 | 3 | **Crítica** |
| S_3 | Sistema de agendamiento | 1 | 2 | 3 | **Media** |
| S_4 | Sistema operativo del servidor | 2 | 3 | 3 | **Alta** |
| I_1 | Servidor web | 2 | 3 | 3 | **Alta** |
| I_2 | Servidor de base de datos | 3 | 3 | 3 | **Crítica** |
| I_3 | Sistema de copias de respaldo | 2 | 3 | 2 | **Alta** |
| I_4 | Infraestructura de red | 2 | 2 | 3 | **Alta** |

## Marco Legal Regulatorio

Las principales normas aplicables (en conformidad a la regulación nacional) son:

**Ley N° 19.628: Protección de la Vida Privada (1999)**
Regula el tratamiento de datos de carácter personal. Establece que los datos
sensibles (entre los cuales se encuentran los datos relativos a la salud de
las personas) solo pueden ser tratados con el consentimiento explícito del
titular, y que el responsable del registro debe adoptar los resguardos
necesarios para garantizar su seguridad.

**Ley N° 20.584: Derechos y Deberes de los Pacientes (2012)**
En su artículo N°2, se consagra el derecho de toda persona a que los datos sobre su salud sean tratados de manera confidencial, estableciéndose expresamente que la ficha clínica es un instrumento de uso estrictamente médico y que su contenido es
reservado. Una filtración de fichas clínicas constituye una infracción
directa a esta ley, con consecuencias legales para la institución.

## Recursos Bibliográficos

1. International Organization for Standardization. (2022). ISO/IEC 27001:2022 Information Security, Cybersecurity and Privacy Protection — Information security managment systems — Requirements. ISO. Recuperado de: https://www.exactls.com/wp-content/uploads/2025/02/ISO_IEC-270012022-ed.3.pdf

2. Congreso Nacional de Chile. (09 de mayo de 2023). Ley no. 19.628. Sobre Proteccion de la Vida Privada. 28 de agosto de 1999. https://bcn.cl/2eqfn

3. Congreso Nacional de Chile. (16 de febrero de 2026). Ley no. 20.584. Regula los Derechos y Deberes que tienen las Personas en Relación con Acciones Vinculadas a su Atención en Salud. 24 de abril de 2012. https://bcn.cl/25b3z
