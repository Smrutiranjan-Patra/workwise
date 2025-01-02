const { seats, users } = require("../migration/index.js");

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
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
