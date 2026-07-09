const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

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
      include: { role: true, ownedCompany: true, memberOf: true },
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

const requireApprovedPlanner = (req, res, next) => {
  if (req.user?.role?.name !== 'EVENT_PLANNER') return next();
  const approvalStatus = req.user.ownedCompany?.status || req.user.memberOf?.status || 'PENDING';
  if (approvalStatus !== 'APPROVED') {
    return res.status(403).json({
      status: 'error',
      message: 'Your account is pending Super Admin approval.',
      approvalStatus,
    });
  }
  next();
};

module.exports = { protect, requireRole, requireApprovedPlanner };
