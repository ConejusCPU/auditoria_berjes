# Controles de Seguridad — Clínica Vista Hermosa

A continuación, se definen las políticas de prevención y los controles de mitigación correspondientes a cada riesgo identificado en el presente caso:

## Controles por Vulnerabilidad

### Inyección SQL 

#### - Acciones de Prevención 

| Control| Descripción | Ejemplo |
|----------|-------------|---------|
| Consultas parametrizadas obligatorias | Toda consulta a la base de datos debe construirse mediante sentencias preparadas (*prepared statements*). Queda prohibida la concatenación directa de datos del usuario en la instrucción SQL. | `$stmt = $pdo->prepare("SELECT * FROM pacientes WHERE rut = ?");` `$stmt->execute([$_GET['rut']]);` |
| Validación y sanitización de entradas | Todo dato del usuario debe validarse contra una lista blanca antes de procesarse. Los campos numéricos solo aceptan dígitos; los de texto tienen longitud máxima y rechazan caracteres especiales SQL (`'`, `;`, `--`). | Rechazar cualquier input que contenga comillas simples, punto y coma o comentarios SQL. |
| Mínimo privilegio en base de datos | El usuario de base de datos de la aplicación web debe tener únicamente los permisos necesarios para operar. No debe tener permisos de `DROP`, `ALTER` ni acceso a tablas del sistema. | Crear un usuario `app_clinica` con solo `SELECT`, `INSERT`, `UPDATE` sobre las tablas del portal. |

#### - Acciones de Mitigación

| Control | Descripción | Beneficio en contexto clínico |
|---------|-------------|-------------------------------|
| Web Application Firewall (WAF) | Inspecciona el tráfico HTTP entrante y bloquea patrones conocidos de inyección SQL (`OR '1'='1`, `UNION SELECT`, `--`) antes de que lleguen a la aplicación. | Detiene ataques automatizados que escanean el portal de la clínica en busca de vulnerabilidades. |
| Cifrado de datos en reposo (AES-256) | Las fichas clínicas, diagnósticos y credenciales almacenadas en la base de datos deben estar cifradas. | Aunque un atacante extraiga datos mediante SQLi, obtendrá información ilegible sin la clave de cifrado. |
| Monitoreo de consultas anómalas | Sistema que detecta y alerta sobre consultas inusuales: múltiples consultas desde una misma IP, consultas que devuelven un número anormalmente alto de registros, o accesos a tablas del sistema. | Permite detectar un ataque en curso antes de que se complete la exfiltración de fichas clínicas. |

---
### Ataque XSS 

#### - Acciones de Prevención 

| Control | Descripción | Ejemplo |
|----------|-------------|---------|
| Codificación de salida (*output encoding*) | Todo dato del usuario mostrado en la página debe codificarse antes de renderizarse en HTML. Los caracteres `<`, `>`, `"` y `&` se convierten en sus equivalentes HTML (`&lt;`, `&gt;`, `&quot;`, `&amp;`). | `echo htmlspecialchars($_GET['nombre'], ENT_QUOTES, 'UTF-8');` |
| Content Security Policy (CSP) | Configurar la cabecera HTTP `Content-Security-Policy` para restringir los orígenes desde los cuales el navegador puede cargar y ejecutar scripts. | `Content-Security-Policy: default-src 'self'; script-src 'self'` |
| Validación de entradas en el servidor | Toda entrada del usuario debe validarse en el lado del servidor. No confiar en la validación del lado del cliente (JavaScript), ya que puede ser desactivada o manipulada por el atacante. | Verificar en el servidor que el campo "nombre" no contenga etiquetas HTML antes de procesarlo. |

#### - Acciones de mitigación

| Control | Descripción | Beneficio en contexto clínico |
|---------|-------------|-------------------------------|
| Atributo HttpOnly en cookies de sesión | Las cookies de sesión se configuran con `HttpOnly`, impidiendo que JavaScript las lea. | Aunque un script malicioso se ejecute en el navegador de un médico, no podrá leer ni exfiltrar su token de sesión. |
| Autenticación de dos factores (2FA) | 2FA obligatorio para todo el personal médico con acceso a fichas clínicas. | Aunque un token de sesión sea robado, el atacante no podrá usarlo desde un nuevo dispositivo sin el segundo factor. |
| Expiración automática de sesiones | Las sesiones del portal expiran automáticamente tras 15 minutos de inactividad para personal médico. | Reduce la ventana de tiempo durante la cual un token robado puede ser utilizado por el atacante. |

---

### Inyección de Comandos

#### - Acciones de Prevención

| Control | Descripción | Ejemplo |
|----------|-------------|---------|
| Prohibición de llamadas directas al shell | La aplicación no debe pasar input del usuario a funciones como `exec()`, `shell_exec()`, `system()` o `passthru()`. Si se requiere ejecutar un comando, usar una lista blanca estricta de comandos permitidos. | En vez de `exec("ping " . $_GET['ip'])`, usar una biblioteca de red nativa del lenguaje. |
| Uso de APIs nativas en vez de comandos del sistema | Toda funcionalidad que dependa de llamadas al shell debe reemplazarse por bibliotecas nativas del lenguaje de programación. | Para hacer ping a un host, usar una biblioteca de red en vez del comando `ping` del sistema operativo. |
| Mínimo privilegio para el proceso web | El proceso del servidor web (Apache, Nginx) debe ejecutarse con un usuario del sistema operativo de mínimos privilegios, sin acceso a directorios críticos como `/etc/` o `/home/`. | Crear un usuario `www-data` sin shell y sin permisos de lectura fuera del directorio del portal. |

#### - Acciones de Mitigación

| Control | Descripción | Beneficio en contexto clínico |
|---------|-------------|-------------------------------|
| Segmentación de red y firewall | El servidor web no tiene acceso directo a internet saliente ni a otros servidores internos más allá de lo necesario. | Impide que un atacante que tome control del servidor web lo use como pivote para atacar el servidor de base de datos. |
| Sistema de detección de intrusos (IDS/IPS) | Monitorea el comportamiento del sistema operativo en tiempo real y alerta ante accesos a `/etc/passwd`, creación de nuevos usuarios o conexiones salientes no autorizadas. | Detecta en tiempo real si un atacante está ejecutando comandos arbitrarios en el servidor de la clínica. |
| Copias de respaldo automatizadas y verificadas | Backups automáticos diarios del servidor y la base de datos, almacenados en una ubicación separada e inaccesible desde el servidor web, con verificación periódica de restaurabilidad. | Permite recuperar fichas clínicas y la operación de la clínica si un atacante destruye o cifra

---

## Recursos Bibliográficos

1. International Organization for Standardization. (2022). ISO/IEC 27001:2022 Information Security, Cybersecurity and Privacy Protection — Information security managment systems — Requirements. ISO. Recuperado de: https://www.exactls.com/wp-content/uploads/2025/02/ISO_IEC-270012022-ed.3.pdf

2. Centro de Especializaciones NOEDER. (s/f). NORMA ISO 22301:2019. Recuperado de: https://campusvirtual.cenoeder.com/wp-content/uploads/2025/08/Norma-ISO-22301_2019.pdf

3. OWASP Foundation. (s. f.). SQL Injection Prevention Cheat Sheet. OWASP Cheat Sheet Series. https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

4. OWASP Foundation. (s. f.). Cross Site Scripting Prevention Cheat Sheet. OWASP Cheat Sheet Series. https://cheatsheetseries.owasp.org/cheatsheetsross_Site_Scripting_Prevention_Cheat_Sheet.html

5. OWASP Foundation. (s. f.). OS Command Injection Defense Cheat Sheet. OWASP Cheat Sheet Series. https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html