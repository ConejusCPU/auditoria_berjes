# Matriz de Riesgo — Clínica Vista Hermosa

## ¿Qué buscamos identificar con una Matriz de Riesgo?

Como instrumento de evaluación, nos permite priorizar los riesgos detectados en función de dos dimensiones: la **probabilidad** de que una amenaza se materialice y el **impacto** que
tendría sobre los activos de Clínica Vista Hermosa si lo hiciera. 

El resultado es un nivel de riesgo numérico que orienta las decisiones de inversión en seguridad y define el orden en que deben aplicarse los controles. Siendo así, la metodología utilizada sigue las directrices de la norma **ISO/IEC 27001:2022**, que recomienda evaluar cada riesgo identificado en estas dos dimensiones y compararlos contra criterios de aceptación previamente definidos, generando como resultado una lista priorizada de riesgos que requieren tratamiento (ISO, 2022).

---

## 1. Escala de valoración 

### Probabilidad/Factiblidad del ataque

- ¿Cómo evaluamos la probabilidad de que un atacante explote las vulnerabilidades identificadas?

| Nivel | Valor | Criterio en contexto clínico |
|-------|:-----:|-------------------------------|
| Baja | 1 | La explotación requiere conocimientos avanzados, acceso físico o condiciones muy específicas que son poco frecuentes |
| Media | 2 | La vulnerabilidad es conocida y explotable con herramientas disponibles públicamente, pero requiere cierto nivel de conocimiento técnico |
| Alta | 3 | La vulnerabilidad es trivialmente explotable, está documentada públicamente y no requiere autenticación previa ni conocimientos especializados |

---

### Impacto 

- ¿De qué manera evaluamos la magnitud del daño ocasionado sobre los activos críticos si es que una amenaza se materializara?

| Nivel | Valor | Criterio en contexto clínico |
|-------|:-----:|-------------------------------|
| Bajo | 1 | Afecta activos de baja criticidad; el daño es reversible y no compromete datos clínicos ni la continuidad de la atención |
| Medio | 2 | Compromete datos de identificación o la disponibilidad del sistema de agendamiento; el daño es significativo pero acotado |
| Alto | 3 | Compromete fichas clínicas, credenciales médicas o el control del servidor; el daño puede ser irreversible, con consecuencias legales bajo la Ley N°20.584 y la Ley N°19.628 |

---

### Metodología para el cálculo del nivel de riesgo

Formalmente, el nivel de riesgo se obtiene con la siguiente fórmula dispuesta:


                        Nivel de Riesgo = Probabilidad * Impacto

Siendo los resultados, clasificados en cuatro categorías correspondientes al nivel de acción:

| Rango | Clasificación | Acción requerida |
|:-----:|---------------|-----------------|
| 1 – 2 | Bajo | Monitoreo periódico; no requiere acción inmediata |
| 3 – 4 | Medio | Planificar controles en el corto plazo |
| 6 | Alto | Implementar controles de forma prioritaria |
| 9 | Crítico | Acción inmediata; inaceptable sin tratamiento |

---

### Mapa de Calor

Formalmente, el mapa de calor representa visualmente la posición de cada riesgo en la matriz de probabilidad × impacto. Los riesgos ubicados en la esquina superior derecha (alta probabilidad, alto impacto) son los que requieren atención inmediata.

```
                                            IMPACTO
                                        1-Bajo  2-Medio  3-Alto
                                    ┌────────┬────────┬────────┐
                        3-Alta      │        │  R3,R5 │   R1   │
                                    ├────────┼────────┼────────┤
                        PROB 2-Media  │        │   R6   │ R2, R4 │
                                    ├────────┼────────┼────────┤
                        1-Baja      │        │        │   R7   │
                                    └────────┴────────┴────────┘

                        Verde  (1–2): Bajo      ■ Amarillo (3–4): Medio
                        Naranja  (6): Alto      ■ Rojo       (9): Crítico
```
### Lectura del mapa de calor

**R1 — Crítico (9):** La inyección SQL es trivialmente ejecutable en nivel
Low de DVWA (payload `' OR '1'='1` sin ningún conocimiento previo), y su
impacto en una clínica es máximo: expone la base de datos completa de
pacientes, incluyendo diagnósticos, tratamientos y credenciales. Es el riesgo
más grave de esta auditoría y el que debe tratarse primero.

**R2, R4 — Alto (6):** La inyección de comandos y la modificación de registros
médicos tienen impacto máximo, pero su probabilidad es media porque requieren
un acceso ligeramente más elaborado que una SQLi básica. Aun así, su nivel de
riesgo es inaceptable sin controles.

**R3, R5 — Alto (6):** El XSS reflejado y la exposición de datos de identidad
tienen probabilidad alta (el payload `<script>alert('XSS')</script>` es
igualmente trivial), pero su impacto inmediato es medio comparado con la
extracción directa de fichas. En el contexto clínico, el robo de sesión de un
médico puede escalar rápidamente a un impacto mayor si el atacante usa esa
sesión para acceder a fichas ajenas.

**R6, R7 — Medio (3–4):** Riesgos significativos pero de menor prioridad
relativa. La interrupción del agendamiento (R7) afecta la continuidad
operacional de la clínica pero no expone datos clínicos directamente.

---

## Recursos Bibliográficos

1. International Organization for Standardization. (2022). ISO/IEC 27001:2022 Information Security, Cybersecurity and Privacy Protection — Information security managment systems — Requirements. ISO. Recuperado de: https://www.exactls.com/wp-content/uploads/2025/02/ISO_IEC-270012022-ed.3.pdf

2. Congreso Nacional de Chile. (09 de mayo de 2023). Ley no. 19.628. Sobre Proteccion de la Vida Privada. 28 de agosto de 1999. https://bcn.cl/2eqfn

3. Congreso Nacional de Chile. (16 de febrero de 2026). Ley no. 20.584. Regula los Derechos y Deberes que tienen las Personas en Relación con Acciones Vinculadas a su Atención en Salud. 24 de abril de 2012. https://bcn.cl/25b3z


