const express = require('express');
const router = express.Router();
const { protect, requireRole, requireApprovedPlanner } = require('../middleware/auth');
const prisma = require('../config/prisma');

const toEventDto = (event) => ({
  id: event.id,
  title: event.title,
  description: event.description,
  category: event.category,
  price: Number(event.price),
  date: event.date.toISOString(),
  time: event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  location: event.location,
  image: event.image,
  organizer: event.organizer || event.company?.companyName,
  featured: event.featured,
  featuredRequested: event.featuredRequested,
  companyId: event.companyId,
  company: event.company,
});

const getPlannerCompanyId = async (user) => {
  if (user.role?.name === 'SUPER_ADMIN') return null;

  const company = await prisma.company.findFirst({ where: { ownerId: user.id } });
  if (!company) {
    const error = new Error('Create or approve a company profile before managing events.');
    error.statusCode = 403;
    throw error;
  }

  return company.id;
};

router.get('/featured-requests', protect, requireRole('SUPER_ADMIN'), async (req, res) => {
  const events = await prisma.event.findMany({
    where: { featuredRequested: true, featured: false },
    include: { company: true },
    orderBy: { updatedAt: 'desc' },
  });
  res.json({ status: 'success', events: events.map(toEventDto) });
});

router.put('/:id/featured', protect, requireRole('SUPER_ADMIN'), async (req, res) => {
  const { approved } = req.body;
  const event = await prisma.event.update({
    where: { id: parseInt(req.params.id, 10) },
    data: {
      featured: Boolean(approved),
      featuredRequested: false,
    },
    include: { company: true },
  });
  res.json({ status: 'success', event: toEventDto(event) });
});

router.get('/', async (req, res) => {
  const { search, destination, category, date, limit, country, featured } = req.query;
  const take = limit ? Math.min(parseInt(limit, 10) || 12, 50) : undefined;
  if (country && country.toLowerCase() !== 'ethiopia') {
    return res.json({ status: 'success', events: [] });
  }

  const keyword = (destination || search || '').trim();
  const selectedDate = date ? new Date(date) : null;
  const dateFilter = selectedDate && !Number.isNaN(selectedDate.getTime())
    ? {
        gte: selectedDate,
        lt: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000),
      }
    : undefined;

  const events = await prisma.event.findMany({
    where: {
      ...(featured === 'true' ? { featured: true } : {}),
      ...(category && category.toLowerCase() !== 'all' ? { category: { equals: category, mode: 'insensitive' } } : {}),
      ...(dateFilter ? { date: dateFilter } : {}),
      ...(keyword
        ? {
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { description: { contains: keyword, mode: 'insensitive' } },
              { location: { contains: keyword, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    include: { company: true },
    orderBy: { date: 'asc' },
    take,
  });

  res.json({ status: 'success', events: events.map(toEventDto) });
});

router.get('/:id', async (req, res) => {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(req.params.id, 10) },
    include: { company: true },
  });

  if (!event) {
    return res.status(404).json({ status: 'error', message: 'Event not found.' });
  }

  res.json({ status: 'success', event: toEventDto(event) });
});

router.post('/', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), requireApprovedPlanner, async (req, res) => {
  const companyId = req.body.companyId ? parseInt(req.body.companyId, 10) : await getPlannerCompanyId(req.user);
  const { title, description, category, price, date, location, image, organizer, featured = false } = req.body;

  if (!title || !description || !category || !price || !date || !location || !companyId) {
    return res.status(400).json({ status: 'error', message: 'Title, description, category, price, date, location and company are required.' });
  }

  const isSuperAdmin = req.user.role?.name === 'SUPER_ADMIN';
  const requestedFeatured = Boolean(featured);
  const event = await prisma.event.create({
    data: {
      title,
      description,
      category,
      price,
      date: new Date(date),
      location,
      image: image || null,
      organizer: organizer || null,
      featured: isSuperAdmin ? requestedFeatured : false,
      featuredRequested: !isSuperAdmin && requestedFeatured,
      companyId,
    },
    include: { company: true },
  });

  res.status(201).json({ status: 'success', event: toEventDto(event) });
});

router.put('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), requireApprovedPlanner, async (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const existing = await prisma.event.findUnique({ where: { id: eventId } });

  if (!existing) {
    return res.status(404).json({ status: 'error', message: 'Event not found.' });
  }

  if (req.user.role?.name !== 'SUPER_ADMIN') {
    const companyId = await getPlannerCompanyId(req.user);
    if (existing.companyId !== companyId) {
      return res.status(403).json({ status: 'error', message: 'You can only update events from your company.' });
    }
  }

  const allowed = ['title', 'description', 'category', 'price', 'date', 'location', 'image', 'organizer'];
  const data = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) data[key] = key === 'date' ? new Date(req.body[key]) : req.body[key];
  }

  if (req.body.featured !== undefined) {
    if (req.user.role?.name === 'SUPER_ADMIN') {
      data.featured = Boolean(req.body.featured);
      data.featuredRequested = false;
    } else if (Boolean(req.body.featured) && !existing.featured) {
      data.featured = false;
      data.featuredRequested = true;
    } else if (!Boolean(req.body.featured)) {
      data.featured = false;
      data.featuredRequested = false;
    }
  }

  const event = await prisma.event.update({
    where: { id: eventId },
    data,
    include: { company: true },
  });

  res.json({ status: 'success', event: toEventDto(event) });
});

router.delete('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), requireApprovedPlanner, async (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const existing = await prisma.event.findUnique({ where: { id: eventId } });

  if (!existing) {
    return res.status(404).json({ status: 'error', message: 'Event not found.' });
  }

  if (req.user.role?.name !== 'SUPER_ADMIN') {
    const companyId = await getPlannerCompanyId(req.user);
    if (existing.companyId !== companyId) {
      return res.status(403).json({ status: 'error', message: 'You can only delete events from your company.' });
    }
  }

  await prisma.event.delete({ where: { id: eventId } });
  res.json({ status: 'success', message: 'Event deleted successfully.' });
});

module.exports = router;
