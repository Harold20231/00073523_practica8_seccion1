// Server-BE/index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // Usaremos 3001 para el Backend, por si el Frontend usa 3000

const db = require('./queries.cjs');
const { signIn } = require('./auth.cjs');
const verifyToken = require('./authMiddleware.cjs');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// RUTA PÚBLICA (displayHome) [cite: 51]
app.get('/', db.displayHome);

// RUTA PÚBLICA (signIn)
app.post('/signIn', signIn); 

// ------------------- RUTAS PROTEGIDAS -------------------
// Aplica el middleware verifyToken a todas estas rutas 
app.get('/users', verifyToken, db.getUsers); 
app.get('/users/:id', verifyToken, db.getUserById); 
app.post('/users', verifyToken, db.createUser);
app.put('/users/:id', verifyToken, db.updateUser); 
app.delete('/users/:id', verifyToken, db.deleteUser); 

app.listen(port, () => {
    console.log(`✅ Servidor BE corriendo en http://localhost:${port}.`);
});