const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: [true, "email is required"] },
  password: { type: String, required: [true, "password is required"] },
  createdEvents: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", UserSchema);
