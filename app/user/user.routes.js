const express = require("express");
const { createUser, loginUser, getUserInfo } = require("./user.controller");

const router = express.Router();

router.post("/register-user", createUser);
router.post("/login-user", loginUser);
router.get("/user-id/:id", getUserInfo);

module.exports = router;
