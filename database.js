// Imports
import mysql from 'mysql2/promise';

// Database Configuration
const dbConfig = {
    database: "unibasedb",
    port: 3306,
    host: "localhost",
    user: "root",
    password: "",
    namedPlaceholders: true,
};

// Database Connection
let database = null;
try {
    database = await mysql.createConnection(dbConfig);
} catch(error) {
    console.log(`Error creating database connection: ${error.message}`);
    process.exit();
}
export default database;