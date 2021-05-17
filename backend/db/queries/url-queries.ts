const db = require('../../lib/db.js');

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
}

const getUrls = (userId: number) => {
	const query = `
	SELECT *
	FROM urls
	WHERE user_id = $1;`;
	const values = [userId];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Url[] }) => rows)
		.catch((err: Error) => console.log(`Error at users queries 'getUsers'`, err));
};

export { getUrls };
