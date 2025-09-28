const jwt = require("jsonwebtoken");
const User = require("../model/User");
require("dotenv").config();
const cookie = require("cookie");

const protect = async (req, res, next) => {
  try {
    let cookiee =  cookie.parse(req.headers.cookie);

    let token=cookiee.token

    console.log(token)
     
    console.log("req.cookies:", req.cookies); // needs cookie-parser to work
    console.log("req.cookies:", req.headers.cookie); 
    if (!token) {
      return res.status(401).json({ message: "No token provided. Please login." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    const userId = decoded.id;
    console.log(decoded)
    console.log(userId)
    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");
    console.log(req.user)
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
