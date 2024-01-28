const User = require("../models/userModel");
const { createToken, verifyToken } = require("../config/tokenGenerator");
const maxAge = 7 * 24 * 60 * 60 * 1000; //7 days in milisecond
const getTime = require("../config/getTime");

module.exports.registerUser = async (req, res) => {
  try {
    let profile;
    if (req.file) {
      profile = req.file.buffer.toString("base64");
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        error: "All field are required",
      });
    }
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      const data = new User({
        name,
        email,
        password,
        profile,
      });
      await data
        .save()
        .then(async (result) => {
          const token = await createToken(result._id);
          res.cookie("authToken", token, { maxAge, path: "/", httpOnly: true });
          res.status(200).json({
            message: "Registration Successfully",
            profile: result.profile,
          });
        })
        .catch((err) => {
          res.status(400);
          res.send(err.message);
        });
    } else {
      res.status(400).json({ error: "User already exists" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExists = await User.findOne({ email });
    if (isUserExists && (await isUserExists.matchPassword(password))) {
      const token = await createToken(isUserExists._id);
      res.cookie("authToken", token, { maxAge, path: "/", httpOnly: true });
      res
        .status(200)
        .json({ message: "Login successfully", profile: isUserExists.profile });
    } else {
      res.status(400).json({ error: "Email and password are invalid" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.locals.userId = null;
    res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (err) {
    res.status(400).json({ er: err.message });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const updatedData = req.body;
    updatedData.updatedAt = getTime();
    if (req.file) {
      updatedData.profile = req.file.buffer.toString("base64");
    }
    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: updatedData },
      { new: true }
    )
      .then((result) => {
        res
          .status(200)
          .json({
            message: "Profile update successfully",
            profile: result.profile,
          });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {}
};

module.exports.getUserDetail = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    await User.findById({ _id: userId }, { password: 0 })
      .then((result) => {
        res.status(200).json({ result });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
