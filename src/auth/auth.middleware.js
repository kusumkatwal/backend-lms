const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    console.log('Headers:', req.headers); // Log all headers
    const authHeader = req.headers['authorization'];
    console.log('Auth header:', authHeader); // Log the auth header

    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, 'secretKey');
      console.log('Decoded token:', decoded); // Log the decoded token

      // Fetch user details
      const userDetail = await User.findOne({ _id: decoded.id });
      console.log(userDetail);
      if (!userDetail) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('User details:', userDetail); // Log the user details

      if (!Array.isArray(roles)) {
        roles = [roles];
      }

      console.log('Required roles:', roles); // Log the required roles
      console.log('User role:', userDetail.role); // Log the user's role

      if (!roles.includes(userDetail.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      req.user = userDetail; // Attach user details to request object
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = { roleMiddleware };
