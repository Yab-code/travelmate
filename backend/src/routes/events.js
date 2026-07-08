const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
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

router.get('/', async (req, res) => {
  const { search, category, limit } = req.query;
  const take = limit ? Math.min(parseInt(limit, 10) || 12, 50) : undefined;

  const events = await prisma.event.findMany({
    where: {
      ...(category ? { category: { equals: category, mode: 'insensitive' } } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
              { location: { contains: search, mode: 'insensitive' } },
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

router.post('/', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  const companyId = req.body.companyId ? parseInt(req.body.companyId, 10) : await getPlannerCompanyId(req.user);
  const { title, description, category, price, date, location, image, organizer, featured = false } = req.body;

  if (!title || !description || !category || !price || !date || !location || !companyId) {
    return res.status(400).json({ status: 'error', message: 'Title, description, category, price, date, location and company are required.' });
  }

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
      featured: Boolean(featured),
      companyId,
    },
    include: { company: true },
  });

  res.status(201).json({ status: 'success', event: toEventDto(event) });
});

router.put('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
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

  const allowed = ['title', 'description', 'category', 'price', 'date', 'location', 'image', 'organizer', 'featured'];
  const data = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) data[key] = key === 'date' ? new Date(req.body[key]) : req.body[key];
  }

  const event = await prisma.event.update({
    where: { id: eventId },
    data,
    include: { company: true },
  });

  res.json({ status: 'success', event: toEventDto(event) });
});

router.delete('/:id', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
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
