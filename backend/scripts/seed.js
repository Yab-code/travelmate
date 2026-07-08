/**
 * Seed script — creates the three roles and a default SUPER_ADMIN user.
 * Run: npm run seed
 */
require('dotenv').config();
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create roles (skip if already exists)
  const roles = ['SUPER_ADMIN', 'EVENT_PLANNER', 'TRAVELER'];
  for (const name of roles) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    console.log(`  ✓ Role: ${name}`);
  }

  // 2. Create default super-admin
  const adminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } });
  const adminEmail = 'admin@travelmate.com';

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Super Admin',
      email: adminEmail,
      password: await bcrypt.hash('Admin@1234', 10),
      roleId: adminRole.id,
    },
  });
  console.log(`  ✓ Super admin: ${adminEmail} / Admin@1234`);

  console.log('\n✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
