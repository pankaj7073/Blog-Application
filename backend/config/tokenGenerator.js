const { json } = require("express");
const jsonwebtoken = require("jsonwebtoken");

const createToken = async (id) => {
  const token = await jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const verifyToken = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (token) {
    await jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else {
        res.locals.userId = decoded.id;
        next();
      }
    });
  } else {
    res.status(400).json({ error: "Login First" });
  }
};
module.exports = { createToken, verifyToken };
