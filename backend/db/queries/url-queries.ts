const db = require('../../lib/db.js');

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
}

const getUrls = () => {
	const query = `
	SELECT *
	FROM urls;`;

	return db
		.query(query)
		.then(({ rows }: { rows: Url[] }) => rows)
		.catch((err: Error) => console.log(`Error at users queries 'getUsers'`, err));
};

export { getUrls };
