const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../models/UserModel');

exports.authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    //const token = req.header('x-auth-token');

// Check if not token
if (!token) {
  return res.status(401).json({ msg: 'No token, authorization denied' });
}

// Verify token
try {
  jwt.verify(token, config.get('jwtSecret'), async (error, decoded) => {
    if (error) {
      return res.status(401).json({ msg: 'Token is not valid' });
    } else {
      req.user = await UserModel.findById(decoded._id);
      next();
    }
  });
} catch (err) {
  console.error('something wrong with auth middleware');
  res.status(500).json({ msg: 'Server Error' });
}
};