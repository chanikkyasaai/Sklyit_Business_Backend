import pkg from 'pg';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config({ path: './../.env' }); // Load environment variables

const { Client } = pkg;

(async () => {
    console.log('DB Config:', {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        database: process.env.DB_DATABASE,
    });

    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {
            rejectUnauthorized: false, // Disable SSL validation (only for testing)
        },
    });

    try {
        await client.connect();
        console.log('Connected successfully to Azure PostgreSQL!');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await client.end();
    }
})();

