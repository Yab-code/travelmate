const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const prisma = require('../config/prisma');

const toPackageDto = (pkg) => ({
  id: pkg.id,
  title: pkg.title,
  description: pkg.description,
  location: pkg.location,
  type: pkg.type,
  lodging: pkg.lodging,
  price: Number(pkg.price),
  duration: pkg.duration,
  image: pkg.image,
  tags: pkg.tags || [],
  difficulty: pkg.difficulty,
  groupSize: pkg.groupSize,
  language: pkg.language,
  rating: Number(pkg.rating),
  reviewsCount: pkg.reviewsCount,
  itinerary: pkg.itinerary || [],
  companyId: pkg.companyId,
  company: pkg.company,
});

const getPlannerCompanyId = async (user) => {
  if (user.role?.name === 'SUPER_ADMIN') return null;

  const company = await prisma.company.findFirst({ where: { ownerId: user.id } });
  if (!company) {
    const error = new Error('Create or approve a company profile before managing packages.');
    error.statusCode = 403;
    throw error;
  }

  return company.id;
};

router.get('/', async (req, res) => {
  const { search, destination, category, guests, limit, country } = req.query;
  const take = limit ? Math.min(parseInt(limit, 10) || 12, 50) : undefined;
  const keyword = (destination || search || '').trim();
  const guestCount = guests ? parseInt(guests, 10) : null;

  if (country && country.toLowerCase() !== 'ethiopia') {
    return res.json({ status: 'success', packages: [] });
  }

  if (guests && (!Number.isInteger(guestCount) || guestCount < 1)) {
    return res.status(400).json({ status: 'error', message: 'Guests must be a whole number greater than zero.' });
  }

  const packages = await prisma.travelPackage.findMany({
    where: {
      ...(category ? { type: { equals: category, mode: 'insensitive' } } : {}),
      ...(keyword
        ? {
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { location: { contains: keyword, mode: 'insensitive' } },
              { type: { contains: keyword, mode: 'insensitive' } },
              { description: { contains: keyword, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    include: { company: true },
    orderBy: { createdAt: 'desc' },
  });

  const filtered = Number.isInteger(guestCount)
    ? packages.filter((pkg) => {
        const match = String(pkg.groupSize || '').match(/\d+/);
        return !match || parseInt(match[0], 10) >= guestCount;
      })
    : packages;

  res.json({ status: 'success', packages: filtered.slice(0, take).map(toPackageDto) });
});

router.get('/:id', async (req, res) => {
  const pkg = await prisma.travelPackage.findUnique({
    where: { id: parseInt(req.params.id, 10) },
    include: { company: true },
  });

  if (!pkg) {
    return res.status(404).json({ status: 'error', message: 'Package not found.' });
  }

  res.json({ status: 'success', package: toPackageDto(pkg) });
});

router.post('/', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  const companyId = req.body.companyId ? parseInt(req.body.companyId, 10) : await getPlannerCompanyId(req.user);
  const { title, description, location, type, lodging, price, duration, image, tags, difficulty, groupSize, language, itinerary } = req.body;

  if (!title || !description || !location || !type || !lodging || !price || !duration || !companyId) {
    return res.status(400).json({ status: 'error', message: 'Title, description, location, type, lodging, price, duration and company are required.' });
  }

  const pkg = await prisma.travelPackage.create({
    data: {
      title,
      description,
      location,
      type,
      lodging,
      price,
      duration: parseInt(duration, 10),
      image: image || null,
      tags: Array.isArray(tags) ? tags : [],
      difficulty: difficulty || 'Easy',
      groupSize: groupSize || 'Max 10',
      language: language || 'English',
      itinerary: itinerary || [],
      companyId,
    },
    include: { company: true },
  });

  res.status(201).json({ status: 'success', package: toPackageDto(pkg) });
});

router.put('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  const packageId = parseInt(req.params.id, 10);
  const existing = await prisma.travelPackage.findUnique({ where: { id: packageId } });

  if (!existing) {
    return res.status(404).json({ status: 'error', message: 'Package not found.' });
  }

  if (req.user.role?.name !== 'SUPER_ADMIN') {
    const companyId = await getPlannerCompanyId(req.user);
    if (existing.companyId !== companyId) {
      return res.status(403).json({ status: 'error', message: 'You can only update packages from your company.' });
    }
  }

  const allowed = ['title', 'description', 'location', 'type', 'lodging', 'price', 'duration', 'image', 'tags', 'difficulty', 'groupSize', 'language', 'itinerary'];
  const data = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) data[key] = key === 'duration' ? parseInt(req.body[key], 10) : req.body[key];
  }

  const pkg = await prisma.travelPackage.update({
    where: { id: packageId },
    data,
    include: { company: true },
  });

  res.json({ status: 'success', package: toPackageDto(pkg) });
});

router.delete('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  const packageId = parseInt(req.params.id, 10);
  const existing = await prisma.travelPackage.findUnique({ where: { id: packageId } });

  if (!existing) {
    return res.status(404).json({ status: 'error', message: 'Package not found.' });
  }

  if (req.user.role?.name !== 'SUPER_ADMIN') {
    const companyId = await getPlannerCompanyId(req.user);
    if (existing.companyId !== companyId) {
      return res.status(403).json({ status: 'error', message: 'You can only delete packages from your company.' });
    }
  }

  await prisma.travelPackage.delete({ where: { id: packageId } });
  res.json({ status: 'success', message: 'Package deleted successfully.' });
});

module.exports = router;



