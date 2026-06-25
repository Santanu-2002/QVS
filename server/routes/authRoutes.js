const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/signUp");
const { logIn } = require("../controllers/logIn");

// POST /api/auth/register
router.post("/register", signUp);

// POST /api/auth/login
router.post("/login", logIn);

module.exports = router;
