const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connect() {
	try {
		await prisma.$connect();
		console.log('Connected to the database');
	} catch (err) {
		console.error('Database connection error:', err);
		process.exit(1);
	}
}

connect();

module.exports = prisma;
