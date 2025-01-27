const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(cors({ origin: "*", methods : "GET,POST", allowedHeaders: ["Content-Type", "Authorization"] })); // deployed route
app.use(express.json());

// Routes without authentication
app.use("/api/auth", require("./routes/auth.routes.js"));

// Routes with authentication
app.use("/api/seats", require("./routes/seats.routes.js"));

app.get("/", (req, res) => {
  res.send("Welcome to the Backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
