const mongoose = require("mongoose");
const rewardSchema = new mongoose.Schema({
  title: String,
  message: String,
  points: Number,
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  points: { type: Number, default: 0 },
  rewards: [rewardSchema], 
});

module.exports = mongoose.model("User", userSchema);
