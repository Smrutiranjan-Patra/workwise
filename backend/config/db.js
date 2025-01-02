const { seats, users } = require("../migration/index.js");

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool
  .query(seats)
  .then((res) => {
    console.log("Seats Table is successfully created");
  })
  .catch((err) => {
    console.log("Error creating table", err);
  });

pool
  .query(users)
  .then((res) => {
    console.log("Users Table is successfully created");
  })
  .catch((err) => {
    console.log("Error creating table", err);
  });

pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = pool;
