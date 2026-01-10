import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

async function runMigration() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();
    console.log('Connected to database');
    
    console.log('Adding "live" to project_status enum...');
    await client.query("ALTER TYPE project_status ADD VALUE IF NOT EXISTS 'live'");
    console.log('✓ Successfully added "live" status to enum!');
    
    console.log('\nMigration completed successfully!');
  } catch (error) {
    console.error('Migration error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
