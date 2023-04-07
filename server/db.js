const Pool = require('pg').Pool;

const pool = new Pool({
  password: 'Lilaze1871',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  database: 'jwttutorial',
});

module.exports = pool;
