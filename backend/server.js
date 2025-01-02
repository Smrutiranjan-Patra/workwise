const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const verifyToken = require("./middleware/index.js");

const app = express();

const port = process.env.PORT || 3001;

app.use(cors(), {origin : 'https://seat-booking-app-xwr9.onrender.com'}); // deployed route
app.use(cors({ origin: 'http://localhost:3001' })); // Replace with your frontend origin
app.use(express.json());

// Routes without authentication
app.use("/api/auth", require("./routes/auth.routes.js"));

// Apply the middleware to all routes
// app.use(verifyToken);

// Routes with authentication
app.use("/api/seats", require("./routes/seats.routes.js"));

app.get("/", (req, res) => {
  res.send("Welcome to the Backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
