import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';


dotenv.config();

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};


if (!config.password) {
  throw new Error('DB_PASSWORD is not set in environment variables');
}

const pool = new Pool(config);

export default pool;