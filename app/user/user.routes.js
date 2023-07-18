const express = require("express");
const { createUser, loginUser, getUserInfo } = require("./user.controller");
const { verifyAuth } = require("../../middleware/verifyAuth");

const router = express.Router();

router.post("/register-user", createUser);
router.post("/login-user", loginUser);
router.get("/user-id/:id",verifyAuth ,getUserInfo);

module.exports = router;
