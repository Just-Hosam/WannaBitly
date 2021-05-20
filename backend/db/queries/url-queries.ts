const db = require('../../lib/db.js');

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

interface NewUrl {
	short_url: string;
	long_url: string;
	description: string;
}

const getUrls = (userId: number): Promise<Url[]> => {
	const query = `
	SELECT *
	FROM urls
	WHERE user_id = $1
	ORDER BY id DESC;`;
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

const getLongUrlByShortUrl = (shortUrl: string) => {
	const query = `
	SELECT long_url
	FROM urls
	WHERE short_url = $1;`;
	const values = [shortUrl];

	return db
		.query(query, values)
		.then(({ rows }: { rows: string[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at urls queries 'getUrl'`, err));
};

const addUrl = (urlObj: NewUrl, userId: number): Promise<Url> => {
	const query = `
	INSERT INTO urls (user_id, short_url, long_url, description)
	VALUES ($1, $2, $3, $4)
	RETURNING *;`;
	const values = [userId, urlObj.short_url, urlObj.long_url, urlObj.description];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Url[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at urls queries 'addUrl'`, err));
};

const updateUrl = (urlObj: Url, urlId: number): Promise<Url> => {
	if (!urlObj.description) urlObj.description = null;

	const query = `
	UPDATE urls
	SET short_url = $1, long_url = $2, description = $3
	WHERE id = $4
	RETURNING *`;
	const values = [urlObj.short_url, urlObj.long_url, urlObj.description, urlId];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Url[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at urls queries 'updateUrl'`, err));
};

const deleteUrl = (urlId: number) => {
	const query = `
	DELETE FROM urls
	WHERE id = $1;`;
	const values = [urlId];

	return db.query(query, values).catch((err: Error) => console.log(`Error at urls queries 'deleteUrl'`, err));
};

export { getUrls, getUrl, addUrl, updateUrl, deleteUrl, getLongUrlByShortUrl };
