const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const decodedToken = jwt.verify(token, 'secretKey');
      const user = await User.findById(decodedToken.userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Attach the authenticated user to the request object
      req.user = user;

      next(); // Move on to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  },
};
