const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  username: String,
  email: String,
  password: String,
  user_role: {
    type: String,
    enum: ["student", "admin"],
  },
  verificationToken: String,
  is_verified: Boolean,
  Enable_2FactAuth: Boolean,
  twoFactSecret: String,
  otpauth_url: String,
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
