const jwt = require('jsonwebtoken');
const config = require('config');
const asyncHandler = require('../middleware/async');

const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
  
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        
        token = req.headers.authorization.split(' ')[1];
        
      }
        if (req.cookies.token) {
          token = req.cookies.token;
        }
  
    if (!token) {
        return res.status(401).json({ msg: 'Not authorized' });
    }
  
    try {
      // Verify token
      const decoded = jwt.verify(token, config.get('jwtSecret'));
  
      req.user = await User.findById(decoded.id);
  
      next();
    } catch (err) {
        return res.status(401).json({ msg: 'Not authorized to access this route' });
    }
});

exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Not authorized to access this route' });
      }
      next();
    };
};