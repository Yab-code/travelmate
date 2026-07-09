require('dotenv').config();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const role = await prisma.role.upsert({
    where: { name: 'EVENT_PLANNER' },
    update: {},
    create: { name: 'EVENT_PLANNER' },
  });

  const user = await prisma.user.upsert({
    where: { email: 'verifier@example.com' },
    update: {},
    create: {
      name: 'Verifier',
      email: 'verifier@example.com',
      password: await bcrypt.hash('Password123!', 10),
      roleId: role.id,
    },
  });

  let company = await prisma.company.findFirst({ where: { businessEmail: 'verify@example.com' } });
  if (!company) {
    company = await prisma.company.create({
      data: {
        companyName: 'Verifier Co',
        businessEmail: 'verify@example.com',
        phone: '123456',
        address: 'Addis',
        description: 'Verification',
        ownerId: user.id,
      },
    });
  }

  const result = await prisma.travelPackage.create({
    data: {
      title: 'Optional lodging package',
      description: 'Created to verify lodging is optional',
      location: 'Addis Ababa',
      type: 'Cultural Tour',
      price: 100,
      duration: 3,
      companyId: company.id,
      lodging: null,
    },
  });

  console.log(JSON.stringify({ id: result.id, lodging: result.lodging }));
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
