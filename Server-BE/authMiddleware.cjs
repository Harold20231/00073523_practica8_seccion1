// Server-BE/authMiddleware.js
const jwt = require('jsonwebtoken');

// ⚠️ ¡IMPORTANTE! Usar una clave secreta fuerte y la misma en auth.js y authMiddleware.js
const SECRET_KEY = 'clave_secreta_del_lab'; 

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    // Verificar si existe el token Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Error si no hay token (código 401: No autorizado)
        return res.status(401).json({ error: 'Acceso denegado. Se requiere un token Bearer.' });
    }

    // Extraer el token (eliminar 'Bearer ')
    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token con la clave secreta
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Adjuntar el usuario al objeto request
        next(); // Continuar con la ruta solicitada
    } catch (err) {
        // Error si el token es inválido o ha expirado (código 403: Prohibido)
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
}

module.exports = verifyToken;