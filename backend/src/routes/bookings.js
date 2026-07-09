const express = require('express');
const router = express.Router();
const { protect, requireRole, requireApprovedPlanner } = require('../middleware/auth');
const prisma = require('../config/prisma');

const includeBookingItem = {
  traveler: { select: { id: true, name: true, email: true } },
  travelPackage: { include: { company: true } },
  event: { include: { company: true } },
};

router.get('/me', protect, requireRole('TRAVELER'), async (req, res) => {
  const bookings = await prisma.booking.findMany({
    where: { travelerId: req.user.id },
    include: includeBookingItem,
    orderBy: { createdAt: 'desc' },
  });

  res.json({ status: 'success', bookings: bookings.map(toBookingDto) });
});

const toBookingDto = (booking) => {
  const item = booking.type === 'TRAVEL_PACKAGE' ? booking.travelPackage : booking.event;
  return {
    id: booking.id,
    type: booking.type,
    itemName: item?.title || 'Unknown item',
    quantity: booking.quantity,
    status: booking.status,
    travelDate: booking.travelDate?.toISOString() || null,
    traveler: booking.traveler,
    companyId: item?.companyId || null,
    companyName: item?.company?.companyName || null,
    createdAt: booking.createdAt,
  };
};

const getPlannerCompanyId = async (user) => {
  if (user.role?.name === 'SUPER_ADMIN') return null;
  const company = await prisma.company.findFirst({ where: { ownerId: user.id } });
  if (!company) {
    const error = new Error('Create or approve a company profile before managing bookings.');
    error.statusCode = 403;
    throw error;
  }
  return company.id;
};

router.get('/', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  const companyId = await getPlannerCompanyId(req.user);
  const bookings = await prisma.booking.findMany({
    where: companyId
      ? {
          OR: [
            { travelPackage: { companyId } },
            { event: { companyId } },
          ],
        }
      : {},
    include: includeBookingItem,
    orderBy: { createdAt: 'desc' },
  });
  res.json({ status: 'success', bookings: bookings.map(toBookingDto) });
});

router.post('/', protect, requireRole('TRAVELER'), async (req, res) => {
  const { type, itemId, quantity, travelDate } = req.body;
  const normalizedType = type === 'EVENT' ? 'EVENT' : 'TRAVEL_PACKAGE';
  const parsedItemId = parseInt(itemId, 10);
  const parsedQuantity = parseInt(quantity, 10);

  if (!parsedItemId || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
    return res.status(400).json({ status: 'error', message: 'Item and quantity are required.' });
  }

  const booking = await prisma.booking.create({
    data: {
      type: normalizedType,
      quantity: parsedQuantity,
      travelDate: travelDate ? new Date(travelDate) : null,
      travelerId: req.user.id,
      travelPackageId: normalizedType === 'TRAVEL_PACKAGE' ? parsedItemId : null,
      eventId: normalizedType === 'EVENT' ? parsedItemId : null,
    },
    include: includeBookingItem,
  });

  res.status(201).json({ status: 'success', booking: toBookingDto(booking) });
});

router.put('/:id/status', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  const { status } = req.body;
  if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
    return res.status(400).json({ status: 'error', message: 'Invalid booking status.' });
  }

  const bookingId = parseInt(req.params.id, 10);
  const existing = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: includeBookingItem,
  });

  if (!existing) {
    return res.status(404).json({ status: 'error', message: 'Booking not found.' });
  }

  if (req.user.role?.name !== 'SUPER_ADMIN') {
    const companyId = await getPlannerCompanyId(req.user);
    const bookingCompanyId = existing.type === 'TRAVEL_PACKAGE' ? existing.travelPackage?.companyId : existing.event?.companyId;
    if (bookingCompanyId !== companyId) {
      return res.status(403).json({ status: 'error', message: 'You can only manage bookings for your company.' });
    }
  }

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
    include: includeBookingItem,
  });

  res.json({ status: 'success', booking: toBookingDto(booking) });
});

module.exports = router;
