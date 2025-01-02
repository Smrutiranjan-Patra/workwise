const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const client = require("../config/db.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res
        .status(200)
        .json({ message: "User already exists", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await client.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res
      .status(200)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error Occured, Please Try again Later ",
        success: false,
      });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const userResult = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res
        .status(200)
        .json({ token: "", message: "Invalid credentials", success: false });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res
        .status(200)
        .json({ token: "", message: "Invalid credentials", success: false });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    // Save token in local storage (this part is typically done on the client side, not server side)
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error Occured, Please try again later",
      success: false,
      token: "",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
