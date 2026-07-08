const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

/**
 * Protect: validates JWT from Authorization header and attaches user to req.user.
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: 'error', message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ status: 'error', message: 'Not authorized, user not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ status: 'error', message: 'Not authorized, invalid token' });
  }
};

/**
 * requireRole: restricts access to specific role names.
 * Usage: router.get('/admin', protect, requireRole('SUPER_ADMIN'), handler)
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', message: 'Not authenticated' });
    }
    const userRole = req.user.role?.name;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        status: 'error',
        message: `Access denied. Required role: ${roles.join(' or ')}`,
      });
    }
    next();
  };
};

module.exports = { protect, requireRole };
