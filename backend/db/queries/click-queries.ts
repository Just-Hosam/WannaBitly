const db = require('../../lib/db.js');

interface Click {
	id: number;
	url_id: number;
	click_timestamp: Date;
	city: string;
	country: string;
}

interface NewClick {
	clickTimestamp: Date;
	clickCity: string;
	clickCountry: string;
}

const getClicks = (urlId: number): Promise<Click[]> => {
	const query = `
	SELECT *
	FROM clicks
	WHERE url_id = $1
	ORDER BY id DESC;`;
	const values = [urlId];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Click[] }) => rows)
		.catch((err: Error) => console.log(`Error at clicks queries 'getClicks'`, err));
};

const getClick = (urlId: number, clickId: number): Promise<Click> => {
	const query = `
	SELECT *
	FROM clicks
	WHERE url_id = $1
	AND id = $2;`;
	const values = [urlId, clickId];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Click[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at clicks queries 'getClick'`, err));
};

const addClick = (urlId: number, clickObj: NewClick): Promise<Click> => {
	const query = `
	INSERT INTO clicks (url_id, click_timestamp, city, country)
	VALUES ($1, $2, $3, $4)
	RETURNING *;`;
	const values = [urlId, clickObj.clickTimestamp, clickObj.clickCity, clickObj.clickCountry];

	return db
		.query(query, values)
		.then(({ rows }: { rows: Click[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at clicks queries 'addClick'`, err));
};

export { getClicks, getClick, addClick };
