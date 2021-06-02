const { Pool, Client } = require('pg');
let dbParams = {};

// if (process.env.NODE_ENV === 'production')
// dbParams =
// const client = new Client({
//   connectionString: process.env.DATABASE_URL || "",
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

if (process.env.NODE_ENV === 'production') {
	dbParams = {
		connectionString: process.env.DATABASE_URL || '',
		ssl: {
			rejectUnauthorized: false,
		},
	};
} else {
	dbParams = {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	};
}

const pool = new Pool(dbParams);
module.exports = pool;
