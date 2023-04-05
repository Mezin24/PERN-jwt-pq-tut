const Pool = require('pg').Pool;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Lilaze1871',
  database: 'jwttutorial',
});

module.exports = pool;
