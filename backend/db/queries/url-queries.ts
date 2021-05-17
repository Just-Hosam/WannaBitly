const db = require('../../lib/db.js');

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
}

interface NewUrl {
	short_url: string;
	long_url: string;
}

const getUrls = (userId: number): Promise<Url[]> => {
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

const getUrl = (userId: number, urlId: number): Promise<Url> => {
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

const addUrl = (urlObj: NewUrl, userId: number): Promise<Url> => {
	const query = `
	INSERT INTO urls (user_id, short_url, long_url)
	VALUES ($1, $2, $3)
	RETURNING *;`;
	const values = [userId, urlObj.short_url, urlObj.long_url];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Url[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at urls queries 'addUrl'`, err));
};

const updateUrl = (urlObj: NewUrl, userId: number): Promise<Url> => {
	const query = `
	UPDATE urls
	SET short_url = $1, long_url = $2
	WHERE id = $3
	RETURNING *`;
	const values = [urlObj.short_url, urlObj.long_url, userId];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Url[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at urls queries 'updateUrl'`, err));
};

export { getUrls, getUrl, addUrl, updateUrl };
