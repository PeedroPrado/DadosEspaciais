import { Pool } from "pg";
import dotenv from "dotenv";

// Carrega as variáveis do arquivo .env
dotenv.config();

const pool = new Pool({
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE,
  port: process.env.BD_PORT ? Number(process.env.BD_PORT) : 5432, // Porta padrão do PostgreSQL
});

export default pool;
