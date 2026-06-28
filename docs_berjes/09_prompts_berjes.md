# Bitácora de Uso de Inteligencia Artificial — auditoria_berjes

## 1. Herramienta utilizada

| Campo | Detalle |
|-------|---------|
| **Herramienta** | Claude (Anthropic) — claude.ai |
| **Modelo** | Claude Sonnet 4.6 |
| **Modalidad** | Conversacional (chat) |
| **Período de uso** | Junio 2026 |

---

## 2. Registro de interacciones

| # | Sección trabajada | Prompt utilizado | Qué acepté | Qué corregí o ajusté |
|---|-------------------|-----------------|------------|----------------------|
| 1 | General — comprensión de la evaluación | "Hola Claude, necesito que me ayudes a comprender un poco mejor las instrucciones presentes en el documento adjunto; ¿qué es lo que debo hacer?, ¿cuál sería la mejor forma de poder abordar la problemática presentada?, ¿cómo sería el paso a paso? (la empresa que me tocó fue Clínica Vista Hermosa, del rubro Salud privada, siendo los datos que custodia su portal las fichas clínicas, exámenes, diagnósticos)" | La estructura general del paso a paso: preparar entorno, ejecutar ataques, redactar Markdown, calcular CVSS, construir React y desplegar en Vercel. La distinción entre fases fue útil como hoja de ruta. | Ninguna corrección; fue una respuesta orientadora general que no producía contenido del informe directamente. |
| 2 | `01_resumen_berjes.md` | "En ese caso, necesito que elabores un contexto para la clínica 'Vista Hermosa', dedicada a proveer servicios de salud privada y siendo sus principales activos las fichas clínicas de usuarios, exámenes, diagnósticos, entre otros, esto con el fin de poder resolver el primer archivo .md" | El contexto general de la clínica, la referencia a las leyes 19.628 y 20.584, la tabla preliminar de ataques y la diferenciación del riesgo en salud vs. otros rubros. | Se aceptó el contenido íntegro. Se ajustó el sufijo del nombre del archivo una vez definidas las iniciales `berjes`. |
| 3 | Laboratorio DVWA — SQLi | "Entonces, si quisiera mostrar que logré hacer una inyección SQL, según lo requerido por la pauta, éstas imágenes serán suficiente?" (adjuntando 3 capturas) | La advertencia de que las capturas no cumplían el requisito porque no mostraban el resultado del ataque, solo el payload antes de enviar. | Se siguió la recomendación de volver a DVWA, ejecutar el payload y capturar payload + resultado en una sola pantalla. |
| 4 | `05_activos_berjes.md` — Estructura | "Para el archivo 05 (activos), cómo podría ser la estructura del md, según tú criterio?" | La estructura en cinco secciones: introducción, clasificación por tipo de activo (datos, software, infraestructura, humanos), valoración CIA, riesgos por activo y marco legal. | Se solicitó aclaración sobre el origen de la metodología CIA antes de aceptar la estructura, lo que derivó en la interacción siguiente. |
| 5 | `06_matriz_berjes.md` — Lógica de construcción | "Entonces, en función de tu anterior respuesta, cómo podríamos hacer el punto 06, siguiendo una estructura similar?" | La explicación de la fórmula Nivel de Riesgo = Probabilidad × Impacto, la visualización del mapa de calor 3×3 y la estructura propuesta para el archivo con sus tres partes. | Se revisó la tabla preliminar de riesgos para ajustar los valores de probabilidad e impacto al contexto específico de la clínica antes de aprobar la generación del archivo. |
| 6 | `05_activos_berjes.md` — Fuente de valoración CIA | "La 'valoración de activos', de dónde sacaste la forma de clasificar y asignar puntajes? hay alguna fuente que puedas citar con formato APA7?" | Las referencias a ISO/IEC 27001:2022 e ISO/IEC 27005:2022 como marco metodológico de la valoración CIA semicuantitativa. El párrafo explicativo para incorporar en la sección 3 del archivo. | Se verificó que las normas ISO citadas existen y corresponden a las versiones vigentes (2022) antes de incluirlas como referencia. |
| 7 | `07_controles_berjes.md` y `08_recuperacion_berjes.md` — Reformateo en tablas | "Necesito que los contenidos de ambos archivos estén contenidos en tablas, para que estos sean más fáciles de leer, por favor" | Ambos archivos completamente reestructurados con tablas para cada sección: prevención, mitigación, fases DR, obligaciones legales y resumen ejecutivo. | Se aceptó el reformateo íntegro. El contenido no varió, solo la presentación. |
---