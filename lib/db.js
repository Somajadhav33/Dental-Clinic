const { Pool } = require("pg");


const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "User",
  password: process.env.DB_PASS || "3322",
  port: process.env.DB_PORT || 5432
});


const initializeDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INTEGER,
        gender VARCHAR(50),
        no VARCHAR(50),
        jwt TEXT
      );

      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INTEGER,
        stclass VARCHAR(50)
      );


    `);

    console.log("Database connected & tables ready.");
  } catch (error) {
    console.error("Database initialization error:", error.message);
  }
};

export default initializeDb;

