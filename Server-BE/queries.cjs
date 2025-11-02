// Server-BE/queries.js
const { pool } = require('./db.cjs');

// Función para la ruta raíz (no requiere token)
const displayHome = (req, res) => {
    res.status(200).json({ info: 'Node.cjs, Express, PostgreSQL API - Lab VIII' });
};

// ------------------- CRUD: Requieren Token -------------------

// GET: /users | getUsers() [cite: 52]
const getUsers = (req, res) => {
    pool.query('SELECT id, name, email FROM users ORDER BY id ASC', (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows);
    });
};

// GET: /users/:id | getUserById() [cite: 53]
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT id, name, email FROM users WHERE id = $1', [id], (error, results) => {
        if (error) { throw error; }
        res.status(200).json(results.rows);
    });
};

// POST: /users | createUser() [cite: 54]
const createUser = (req, res) => {
    const { name, email, password } = req.body;
    // ⚠️ En un escenario real, hashearías 'password' aquí antes de INSERTAR.
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email], (error, results) => {
        if (error) { throw error; }
        res.status(201).send(`Usuario agregado con ID: ${results.rows[0].id}`);
    });
};

// PUT: /users/:id | updateUser() [cite: 55]
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) { throw error; }
            res.status(200).send(`Usuario modificado con ID: ${id}`);
        }
    );
};

// DELETE: /users/:id | deleteUser() [cite: 56]
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) { throw error; }
        res.status(200).send(`Usuario eliminado con ID: ${id}`);
    });
};

module.exports = {
    displayHome,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};