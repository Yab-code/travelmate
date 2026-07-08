require('dotenv').config();
const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

// Create a pg connection pool using DATABASE_URL from .env
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Prisma v7 requires a driver adapter for direct DB connections
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
