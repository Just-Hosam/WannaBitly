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
		.catch((err: Error) => console.log(`Error at urls queries 'getUrls'`, err));
};

const getUrl = (userId: number, urlId: number) => {
	const query = `
	SELECT *
	FROM urls
	WHERE user_id = $1
	AND id = $2;`;
	const values = [userId, urlId];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Url[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at urls queries 'getUrl'`, err));
};

export { getUrls, getUrl };
