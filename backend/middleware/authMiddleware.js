// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware function to protect routes
exports.protect = async (req, res, next) => {
  try {
    // Check if token exists
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: 'Authorization denied' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authorization denied' });
  }
};
