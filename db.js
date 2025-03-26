// db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Successfully connected to database");
    // Create books table if it doesn't exist
    client.query(
      `
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                isbn VARCHAR(13),
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                notes TEXT,
                read_date DATE
            );
        `,
      (err, result) => {
        if (err) {
          console.error("Error creating table:", err);
        } else {
          console.log("Books table is ready");
        }
        done();
      }
    );
  }
});

module.exports = pool;
