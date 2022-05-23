const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, lowercase: true },
    admin: { type: Boolean, default: false },
    location: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
