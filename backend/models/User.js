const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define unique index explicitly
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
