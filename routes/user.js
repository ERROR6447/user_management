const express = require("express");

const {
  getToken,
  signup,
  validateToken,
  verifyEmail,
} = require("../controller/user");

const router = express.Router();

router.post("/login", getToken);

router.post("/signup", signup);

router.get("/validate", validateToken);

router.get("/verify-email/:token", verifyEmail);

module.exports = router;
