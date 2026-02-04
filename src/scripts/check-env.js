import pg from 'pg';

const { Client } = pg;

async function checkDatabase() {
  console.log('Starting Health Check...');

  const connectionString = process.env.DATABASE_URI;
  if (!connectionString) {
    console.error('Error: DATABASE_URI is not defined.');
    process.exit(1);
  }

  // Mask password for logging
  const maskedUri = connectionString.replace(/:([^:@]+)@/, ':****@');
  console.log(`Connecting to: ${maskedUri}`);

  const client = new Client({
    connectionString,
    connectionTimeoutMillis: 15000, // 15 seconds timeout
  });

  try {
    await client.connect();
    console.log('✅ Database connection successful!');
    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed.');
    console.error(`Error Code: ${err.code}`);
    console.error(`Error Message: ${err.message}`);

    if (err.code === 'ECONNREFUSED') {
      console.error('Suggestion: Check if the database host IP and port are correct and reachable from inside the container.');
    } else if (err.code === '28P01') { // invalid_password
      console.error('Suggestion: Check your database username and password.');
    } else if (err.code === '3D000') { // invalid_catalog_name
      console.error('Suggestion: Check if the database name exists.');
    }

    console.error('Full Error:', err);
    process.exit(1);
  }
}

checkDatabase();
