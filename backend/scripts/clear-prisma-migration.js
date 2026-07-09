const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query('DELETE FROM "_prisma_migrations" WHERE "migration_name" = $1', ['20260709120000_remove_lodging_column']);
  await client.end();
  console.log('migration history cleared');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
