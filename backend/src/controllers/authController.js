const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const SALT_ROUNDS = 10;

/** Generate a signed JWT for a user */
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/** Format user for API response (omit password) */
const formatUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  isActive: user.isActive,
  role: user.role,
  companyId: user.companyId,
  createdAt: user.createdAt,
});

/**
 * POST /api/auth/register
 * Body: { name, email, password, roleName: 'TRAVELER' | 'EVENT_PLANNER' }
 */
const register = async (req, res) => {
  const { name, email, password, roleName = 'TRAVELER', company } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ status: 'error', message: 'Name, email and password are required.' });
  }

  // Check for existing user
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ status: 'error', message: 'An account with this email already exists.' });
  }

  // Resolve role
  const role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) {
    return res.status(400).json({ status: 'error', message: `Role "${roleName}" does not exist.` });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // If registering as EVENT_PLANNER and company details are provided
  if (roleName === 'EVENT_PLANNER' && company) {
    const { companyName, businessEmail, phone, address, description, logo = '', licenseDocument = '' } = company;
    
    if (!companyName || !businessEmail || !phone || !address || !description) {
      return res.status(400).json({
        status: 'error',
        message: 'All company details (name, email, phone, address, description) are required for planner registration.'
      });
    }

    const existingCompany = await prisma.company.findUnique({ where: { businessEmail } });
    if (existingCompany) {
      return res.status(409).json({ status: 'error', message: 'A company with this business email already exists.' });
    }

    try {
      const result = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            roleId: role.id,
          },
          include: { role: true },
        });

        const newCompany = await tx.company.create({
          data: {
            companyName,
            businessEmail,
            phone,
            address,
            description,
            logo,
            licenseDocument,
            ownerId: newUser.id,
            status: 'PENDING'
          }
        });

        const updatedUser = await tx.user.update({
          where: { id: newUser.id },
          data: { companyId: newCompany.id },
          include: { role: true }
        });

        return { user: updatedUser, company: newCompany };
      });

      const token = signToken(result.user.id);
      return res.status(201).json({
        status: 'success',
        message: 'Registration successful. Company registration pending approval.',
        token,
        user: formatUser(result.user),
      });
    } catch (err) {
      return res.status(500).json({ status: 'error', message: err.message || 'Transaction failed.' });
    }
  }

  // Normal traveler or admin registration (no company profile)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      roleId: role.id,
    },
    include: { role: true },
  });

  const token = signToken(user.id);

  return res.status(201).json({
    status: 'success',
    message: 'Registration successful.',
    token,
    user: formatUser(user),
  });
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  if (!user || !user.isActive) {
    return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
  }

  const token = signToken(user.id);

  return res.status(200).json({
    status: 'success',
    token,
    user: formatUser(user),
  });
};

module.exports = { register, login };
