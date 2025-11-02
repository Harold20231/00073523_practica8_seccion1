// Server-BE/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'clave_secreta_del_lab'; // La misma clave secreta

// Simulamos la búsqueda en la BD para el usuario Jerry (ID 1)
const users = [
    {
        id: 1,
        name: 'Jerry',
        email: 'jerry@example.com',
        // Hash de 'password'
        hash: '$2b$10$iI2XeM5sQItLLuM40FiwlekGXlzBAkSEYDxKDKXR5gjuC58y44c0.'
    }
];

const signIn = async (req, res) => {
    const { email, password } = req.body;

    // 1. Buscar al usuario
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // 2. Comparar la contraseña ingresada con el hash (esto verifica si 'password' es correcta)
    const match = await bcrypt.compare(password, user.hash); 

    if (!match) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // 3. Generar el JWT tipo Bearer
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, type: 'Bearer', message: 'Inicio de sesión exitoso. Use este token para las rutas protegidas.' });
};

module.exports = { signIn };