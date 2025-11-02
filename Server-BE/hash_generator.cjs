// Server-BE/hash_generator.cjs
const bcrypt = require('bcrypt');
const saltRounds = 10; // El mismo nivel de sal que usa el hash original

const password = 'password';

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error generando hash:", err);
        return;
    }
    console.log("-----------------------------------------------------------------");
    console.log("Nuevo Hash Generado para 'password':");
    console.log(hash);
    console.log("-----------------------------------------------------------------");
    console.log("Copia y pega el hash de arriba en el archivo auth.cjs");
});