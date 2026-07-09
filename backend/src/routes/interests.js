const express = require('express');
const router = express.Router();
const { protect, requireRole, requireApprovedPlanner } = require('../middleware/auth');
const prisma = require('../config/prisma');

const includeInterestItem = {
  travelPackage: { include: { company: true } },
  event: { include: { company: true } },
};

const toInterestDto = (interest) => {
  const item = interest.travelPackage || interest.event;
  const type = interest.travelPackage ? 'TRAVEL_PACKAGE' : 'EVENT';
  return {
    id: interest.id,
    type,
    itemId: type === 'TRAVEL_PACKAGE' ? interest.travelPackageId : interest.eventId,
    itemName: item?.title || 'Unknown item',
    location: item?.location || null,
    image: item?.image || null,
    price: item?.price != null ? Number(item.price) : null,
    companyName: item?.company?.companyName || null,
    createdAt: interest.createdAt,
    traveler: interest.user
      ? { id: interest.user.id, name: interest.user.name, email: interest.user.email }
      : null,
  };
};

router.get('/', protect, requireRole('TRAVELER'), async (req, res) => {
  const interests = await prisma.travelerInterest.findMany({
    where: { userId: req.user.id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      ...includeInterestItem,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ status: 'success', interests: interests.map(toInterestDto) });
});

router.get('/planner', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), requireApprovedPlanner, async (req, res) => {
  let companyId = null;
  if (req.user.role?.name !== 'SUPER_ADMIN') {
    const company = await prisma.company.findFirst({ where: { ownerId: req.user.id } });
    companyId = company?.id || null;
  }

  const where = companyId
    ? {
        OR: [{ travelPackage: { companyId } }, { event: { companyId } }],
      }
    : {};

  const interests = await prisma.travelerInterest.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, email: true } },
      ...includeInterestItem,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ status: 'success', interests: interests.map(toInterestDto) });
});

router.post('/', protect, requireRole('TRAVELER'), async (req, res) => {
  const { type, itemId } = req.body;
  const normalizedType = type === 'EVENT' ? 'EVENT' : 'TRAVEL_PACKAGE';
  const parsedItemId = parseInt(itemId, 10);

  if (!parsedItemId || !Number.isInteger(parsedItemId)) {
    return res.status(400).json({ status: 'error', message: 'A valid item id is required.' });
  }

  const where = normalizedType === 'TRAVEL_PACKAGE'
    ? { userId: req.user.id, travelPackageId: parsedItemId }
    : { userId: req.user.id, eventId: parsedItemId };

  const existing = await prisma.travelerInterest.findFirst({ where });
  if (existing) {
    const interest = await prisma.travelerInterest.findUnique({
      where: { id: existing.id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        ...includeInterestItem,
      },
    });
    return res.json({ status: 'success', interest: toInterestDto(interest) });
  }

  const interest = await prisma.travelerInterest.create({
    data: {
      userId: req.user.id,
      travelPackageId: normalizedType === 'TRAVEL_PACKAGE' ? parsedItemId : null,
      eventId: normalizedType === 'EVENT' ? parsedItemId : null,
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
      ...includeInterestItem,
    },
  });

  res.status(201).json({ status: 'success', interest: toInterestDto(interest) });
});

router.delete('/:id', protect, requireRole('TRAVELER'), async (req, res) => {
  const interestId = parseInt(req.params.id, 10);
  const existing = await prisma.travelerInterest.findUnique({ where: { id: interestId } });

  if (!existing) {
    return res.status(404).json({ status: 'error', message: 'Interest not found.' });
  }

  if (existing.userId !== req.user.id) {
    return res.status(403).json({ status: 'error', message: 'You can only remove your own wishlist items.' });
  }

  await prisma.travelerInterest.delete({ where: { id: interestId } });
  res.json({ status: 'success', message: 'Interest removed.' });
});

module.exports = router;
