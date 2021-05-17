"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUrl = exports.addUrl = exports.getUrl = exports.getUrls = void 0;
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
const addUrl = (urlObj, userId) => {
    const query = `
	INSERT INTO urls (user_id, short_url, long_url)
	VALUES ($1, $2, $3)
	RETURNING *;`;
    const values = [userId, urlObj.short_url, urlObj.long_url];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at urls queries 'addUrl'`, err));
};
exports.addUrl = addUrl;
const updateUrl = (urlObj, userId) => {
    const query = `
	UPDATE urls
	SET short_url = $1, long_url = $2
	WHERE id = $3
	RETURNING *`;
    const values = [urlObj.short_url, urlObj.long_url, userId];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at urls queries 'updateUrl'`, err));
};
exports.updateUrl = updateUrl;
