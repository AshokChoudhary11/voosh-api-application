// Create a file named "middleware.js"

const jwt = require("jsonwebtoken");
const { User } = require("../model");

const protect = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - Missing Bearer token" });
      }
  
      const token = authHeader.replace("Bearer ", "");
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        return res.status(401).json({ error: "Unauthorized - Invalid token" });
      }
  
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
  };

module.exports = { protect };
