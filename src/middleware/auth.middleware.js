const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header' });
    }

    const token = authHeader.split(' ').pop();
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, 'secretKey');
      const userDetail = await User.findOne({ _id: decoded.userId });
      if (!userDetail) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!Array.isArray(roles)) {
        roles = [roles];
      }

      if (!roles.includes(userDetail.role)) {
        return res.status(403).json({ message: 'Access Denied' });
      }
      req.user = userDetail;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = { roleMiddleware };
