const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const prisma = require('../config/prisma');

// GET /api/companies/pending — admin views pending
router.get('/pending', protect, requireRole('SUPER_ADMIN'), async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      where: { status: 'PENDING' },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ status: 'success', companies });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /api/companies/my-company — planner views their company
router.get('/my-company', protect, requireRole('EVENT_PLANNER'), async (req, res) => {
  try {
    const company = await prisma.company.findFirst({
      where: { ownerId: req.user.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json({ status: 'success', company });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/companies — register a new company
router.post('/', protect, requireRole('EVENT_PLANNER', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { companyName, businessEmail, phone, address, description, logo = '', licenseDocument = '' } = req.body;
    
    if (!companyName || !businessEmail || !phone || !address || !description) {
      return res.status(400).json({ status: 'error', message: 'All fields (companyName, businessEmail, phone, address, description) are required.' });
    }

    const existing = await prisma.company.findUnique({ where: { businessEmail } });
    if (existing) {
      return res.status(409).json({ status: 'error', message: 'A company with this business email already exists.' });
    }

    // Determine owner ID (if Super Admin registers for another user, or Planner registers for themselves)
    const ownerId = req.body.ownerId ? parseInt(req.body.ownerId) : req.user.id;

    const newCompany = await prisma.company.create({
      data: {
        companyName,
        businessEmail,
        phone,
        address,
        description,
        logo,
        licenseDocument,
        ownerId,
        status: 'PENDING',
      },
    });

    // Link user to the company
    await prisma.user.update({
      where: { id: ownerId },
      data: { companyId: newCompany.id },
    });

    res.status(201).json({ status: 'success', company: newCompany });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /api/companies/:id
router.get('/:id', async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    
    if (!company) {
      return res.status(404).json({ status: 'error', message: 'Company not found.' });
    }
    
    res.json({ status: 'success', company });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// PUT /api/companies/:id/approve — admin approves/rejects
router.put('/:id/approve', protect, requireRole('SUPER_ADMIN'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status. Must be APPROVED or REJECTED.' });
    }

    const companyId = parseInt(req.params.id);
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      return res.status(404).json({ status: 'error', message: 'Company not found.' });
    }

    const updated = await prisma.company.update({
      where: { id: companyId },
      data: { status },
    });

    res.json({ status: 'success', message: `Company ${status.toLowerCase()} successfully.`, company: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
