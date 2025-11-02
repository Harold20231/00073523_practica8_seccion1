// Server-BE/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-curly-sound-ahcrxe5b-pooler.c-3.us-east-1.aws.neon.tech',
  database: 'neondb',
  password: 'npg_WUmQdXwNZ2f6',
  ssl: { rejectUnauthorized: false }, // Requerido para bases de datos externas como Neon
});

pool.connect()
  .then(() => console.log('✅ Conectado exitosamente a PostgreSQL.'))
  .catch(err => console.error('❌ Error de conexión a PostgreSQL:', err.stack));

module.exports = { pool };