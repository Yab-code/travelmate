const prisma = require('../config/prisma');

/**
 * GET /api/users/profile
 * Returns the authenticated user's profile.
 */
const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { role: true, memberOf: true, ownedCompany: true },
  });
  res.json({ status: 'success', user });
};

/**
 * PUT /api/users/profile
 * Updates name (email changes require separate flow).
 */
const updateProfile = async (req, res) => {
  const { name } = req.body;
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { name },
    include: { role: true },
  });
  res.json({ status: 'success', user: updated });
};

/**
 * GET /api/users (SUPER_ADMIN only)
 */
const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: { role: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ status: 'success', users });
};

module.exports = { getProfile, updateProfile, getAllUsers };
