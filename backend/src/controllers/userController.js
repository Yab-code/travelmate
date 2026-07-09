const prisma = require('../config/prisma');

const formatUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  isActive: user.isActive,
  role: user.role,
  companyId: user.companyId,
  companyStatus: user.ownedCompany?.status || user.memberOf?.status || null,
  createdAt: user.createdAt,
});

const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { role: true, memberOf: true, ownedCompany: true },
  });
  res.json({ status: 'success', user: formatUser(user) });
};

const updateProfile = async (req, res) => {
  const { name } = req.body;
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { name },
    include: { role: true, memberOf: true, ownedCompany: true },
  });
  res.json({ status: 'success', user: formatUser(updated) });
};

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: { role: true, memberOf: true, ownedCompany: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ status: 'success', users: users.map(formatUser) });
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { roleId } = req.body;
  const updated = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { roleId: parseInt(roleId) },
    include: { role: true, memberOf: true, ownedCompany: true },
  });
  res.json({ status: 'success', user: formatUser(updated) });
};

module.exports = { getProfile, updateProfile, getAllUsers, updateUserRole };
