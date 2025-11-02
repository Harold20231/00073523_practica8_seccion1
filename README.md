# 00073523_Repositorio_labo7
Harold Arturo Escobar López 00073523 seccion 1

##  Pruebas en Postman

1. ¿Cuál es la diferencia entre autenticación y autorización?

La diferencia es fundamental en seguridad: la autenticación verifica la identidad del usuario, mientras que la autorización verifica los permisos que tiene ese usuario para acceder a un recurso específico.
Autenticación (Authentication): Es el proceso de verificar quién es el usuario. Responde a la pregunta: "¿Eres realmente quien dices ser?". En esta práctica, la autenticación ocurrió cuando se proporcionó el email (jerry@example.com) y la contraseña (password) al endpoint /signIn, y el servidor validó esa identidad contra el hash almacenado.
Autorización (Authorization): Es el proceso de verificar qué puede hacer el usuario (los permisos) después de haber sido autenticado. Responde a la pregunta: "¿Tienes permiso para acceder a este recurso?". En esta práctica, la autorización se implementó en el middleware verifyToken que se aplicó a las rutas CRUD (/users, /users/:id, etc.), garantizando que solo un usuario con un token válido (autenticado) pudiera consumir esos endpoints.

2. ¿Cuál es la función del token JWT en la guía?

La función principal del JSON Web Token (JWT) en esta guía es actuar como una credencial segura y autosuficiente para mantener la sesión abierta y validar la identidad del usuario en cada solicitud protegida.
Reemplazar la Sesión: El JWT reemplaza la necesidad de un mecanismo de sesión tradicional. Una vez que el usuario se autentica en /signIn, el servidor emite el token.
Transmisión de Identidad: El Frontend (React) almacena este token y lo adjunta en el header Authorization: Bearer <token> de cada solicitud a las rutas protegidas (CRUD).
Autorización Sin Base de Datos: El middleware verifyToken del Backend puede leer el token, verificar su firma criptográfica y extraer la identidad del usuario (sin necesidad de consultar la base de datos) para otorgar acceso a los recursos. Si el token es inválido o falta, se garantiza el error respectivo (401/403).s
