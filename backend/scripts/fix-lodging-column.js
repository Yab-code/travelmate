const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query('ALTER TABLE "TravelPackage" ADD COLUMN IF NOT EXISTS "lodging" TEXT');
  await client.query('ALTER TABLE "TravelPackage" ALTER COLUMN "lodging" DROP NOT NULL');
  await client.end();
  console.log('lodging column aligned');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
