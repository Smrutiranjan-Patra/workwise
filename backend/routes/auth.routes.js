const router = require("express").Router();

const authController = require('../controller/auth.controller.js');


// Register route
router.post('/register', authController.registerUser);

// Login route
router.post('/login', authController.loginUser);

module.exports = router;