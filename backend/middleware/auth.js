// auth.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization failed. No token provided." });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authorization failed. Invalid token." });
  }
};

module.exports = authMiddleware;
