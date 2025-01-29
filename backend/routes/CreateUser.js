const express = require("express");
const router = express.Router(); // Make sure to initialize router
const bcrypt = require('bcrypt');
const user = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisEndtoEndYouTubeChannel$#"

// Create user route
router.post("/createuser", [
  body('email').isEmail(),
  body('password', "Password must be at least 5 characters long").isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await user.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      location: req.body.location,
      date: req.body.date || Date.now(),
    });

    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating user", error });
  }
});

// Login user route
router.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;

  try {
    let userData = await user.findOne({ email });

    if (!userData) {
      return res.status(400).json({ errors: "Invalid email or password" });
    }

    const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
    if(!pwdCompare){
      return res.status(400).json({errors : "Try logging with correct credentials"})
    }

    const data ={
      user: {
        id: userData.id 
      }
    }
    const authToken = jwt.sign(data, jwtSecret)
    return res.json({ success: true , authToken});

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error logging in", error });
  }
});

module.exports = router; // Don't forget to export the router
  