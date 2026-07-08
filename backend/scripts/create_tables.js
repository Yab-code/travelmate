const { Client } = require('pg');
require('dotenv').config();

const sql = `
CREATE TABLE IF NOT EXISTS "Role" (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  "roleId" INTEGER NOT NULL,
  "createdAt" TIMESTAMPTZ DEFAULT now(),
  "updatedAt" TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT fk_role FOREIGN KEY("roleId") REFERENCES "Role"(id)
);
`;

async function main() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    await client.query(sql);
    // ensure some default roles
    await client.query(`INSERT INTO "Role" (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`, ['user']);
    await client.query(`INSERT INTO "Role" (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`, ['admin']);

    const res = await client.query(`SELECT id, name FROM "Role" ORDER BY id`);
    console.log('Roles:', res.rows);
  } finally {
    await client.end();
  }
}

main().catch(err => { console.error(err); process.exit(1); });
