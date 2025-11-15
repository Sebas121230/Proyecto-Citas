const mysql = require('mysql2/promise');
require('dotenv').config();

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL   // desde Render/Railway
});

module.exports = pool;
