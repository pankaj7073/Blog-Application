const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const getTime = require("../config/getTime");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

// Date and time
userModel.pre("save", function (next) {
  this.createdAt = getTime();
  this.updatedAt = getTime();
  next();
});

// Hash the password
userModel.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare the password
userModel.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = new mongoose.model("User", userModel);

module.exports = user;
