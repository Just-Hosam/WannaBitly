"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = exports.getUrls = void 0;
const db = require('../../lib/db.js');
const getUrls = (userId) => {
    const query = `
	SELECT *
	FROM urls
	WHERE user_id = $1;`;
    const values = [userId];
    return db
        .query(query, values)
        .then(({ rows }) => rows)
        .catch((err) => console.log(`Error at urls queries 'getUrls'`, err));
};
exports.getUrls = getUrls;
const getUrl = (userId, urlId) => {
    const query = `
	SELECT *
	FROM urls
	WHERE user_id = $1
	AND id = $2;`;
    const values = [userId, urlId];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at urls queries 'getUrl'`, err));
};
exports.getUrl = getUrl;
