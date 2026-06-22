# Resumen sobre Auditoría de Seguridad: Caso Clínica Vista Hermosa

## 1. Sobre la Empresa

**Clínica Vista Hermosa** es un centro de salud privado que entrega atención ambulatoria y hospitalaria en especialidades médicas generales, incluyendo consultas, exámenes de laboratorio, imagenología y seguimiento de tratamientos con personal especializado.

Como parte de su transformación digital, la clínica opera un **portal de clientes** donde pacientes y profesionales médicos pueden acceder a:

- Fichas clínicas electrónicas
- Resultados de exámenes de laboratorio
- Diagnósticos y antecedentes médicos
- Agendamiento de horas médicas
- Historoal de tratamientos y recetas

Este portal es el activo de mayor importancia para la organización como tal, entendiendo que en éste se concentran datos e información médica sensible de miles de pacientes y constituye, a su vez, la mayor superficie de riesgo ante ciberataques.

## 2. Importancia crítica 

En una institución dedicada a la prestación de servicios de salud, un portal de clientes custodia **datos de salud** que, como tal, es una categoría de datos especialmente protegidos en Chile bajo la **Ley 19.628 sobre Protección de la Vida Privada** (Congreso Nacional de Chile, 2023) y los derechos del paciente, formalmente reconocidos en la **Ley 20.584** (Congreso Nacional de Chile, 2026). Una exfiltración de fichas clínicas no solo expone nombres y RUTs, expone  también diagnósticos de enfermedades crónicas, tratamientos psiquiátricos, resultados de exámenes de VIH u otras condiciones estigmatizantes y que el paciente nunca consintió hacer pública. Las consecuencias de ésta situación puede, potencialmente, provocar daño reputacional irreversible para el paciente, discriminación laboral y/ó consecuencias legales severas para la clínica.

## 3. Alcance de la Auditoría

Esta auditoría se realiza sobre una réplica del portal de clientes, desplegada en un ambiente controlado y deliberadamentes vulnerable (DVWA), que simula las mismas clases de fallas que podrían existir en el sistema real de Clínica Vista Hermosa. Se evaluaron tres vectores de ataque representativos de las amenazas más comunes en aplicaciones web de salud:

| Ataque | Qué compromete en este contexto |
|---|---|
| Inyección SQL | Acceso no autorizado a la base de datos completa de fichas clínicas y pacientes |
| XSS Reflejado | Robo de sesión de un médico o paciente autenticado, permitiendo ver o alterar fichas ajenas |
| Inyección de comandos | Control del servidor donde residen exámenes, imágenes médicas y backups |

En conformidad a esto, se documentará evidencia técnica, grado de severidad, causas raíces y medidas de prevención/mitigación, en las secciones siguientes de este informe.

## 4. Importancia y Justificación de Auditoría



## 5. Activos en juego (vista preliminar)

- Fichas clínicas electrónicas (diagnósticos, antecedentes, alergias)
- Resultados de exámenes de laboratorio e imagenología
- Datos de identificación de pacientes (RUT, nombre, dirección, contacto)
- Credenciales de acceso de personal médico y administrativo
- Disponibilidad del sistema de agendamiento (continuidad de atención)

## 6. Bibliografía Consultada

1. Congreso Nacional de Chile. (09 de mayo de 2023). Ley no. 19.628. Sobre Proteccion de la Vida Privada. 28 de agosto de 1999. https://bcn.cl/2eqfn

2. Congreso Nacional de Chile. (16 de febrero de 2026). Ley no. 20.584. Regula los Derechos y Deberes que tienen las Personas en Relación con Acciones Vinculadas a su Atención en Salud. 24 de abril de 2012. https://bcn.cl/25b3z