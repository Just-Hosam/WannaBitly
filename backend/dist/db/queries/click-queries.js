"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addClick = exports.getClick = exports.getClicks = void 0;
const db = require('../../lib/db.js');
const getClicks = (urlId) => {
    const query = `
	SELECT *
	FROM clicks
	WHERE url_id = $1
	ORDER BY id DESC;`;
    const values = [urlId];
    return db
        .query(query, values)
        .then(({ rows }) => rows)
        .catch((err) => console.log(`Error at clicks queries 'getClicks'`, err));
};
exports.getClicks = getClicks;
const getClick = (urlId, clickId) => {
    const query = `
	SELECT *
	FROM clicks
	WHERE url_id = $1
	AND id = $2;`;
    const values = [urlId, clickId];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at clicks queries 'getClick'`, err));
};
exports.getClick = getClick;
const addClick = (urlId, clickObj) => {
    const query = `
	INSERT INTO clicks (url_id, time, date)
	VALUES ($1, $2, $3)
	RETURNING *;`;
    const values = [urlId, clickObj.clickTime, clickObj.clickDate];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at clicks queries 'addClick'`, err));
};
exports.addClick = addClick;
