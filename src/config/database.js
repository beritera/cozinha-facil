const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cozinha_facil',
    password: '159731',
    port: 5432,
});

module.exports = pool;