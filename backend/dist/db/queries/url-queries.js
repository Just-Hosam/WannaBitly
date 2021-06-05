"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLongUrlByShortUrl = exports.deleteUrl = exports.updateUrl = exports.addUrl = exports.getUrl = exports.getUrls = void 0;
const db = require('../../lib/db.js');
const getUrls = (userId) => {
    const query = `
	SELECT *
	FROM urls
	WHERE user_id = $1
	ORDER BY id DESC;`;
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
const getLongUrlByShortUrl = (shortUrl) => {
    const query = `
	SELECT *
	FROM urls
	WHERE short_url = $1;`;
    const values = [shortUrl];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at urls queries 'getUrl'`, err));
};
exports.getLongUrlByShortUrl = getLongUrlByShortUrl;
const addUrl = (urlObj, userId) => {
    const query = `
	INSERT INTO urls (user_id, short_url, long_url, description)
	VALUES ($1, $2, $3, $4)
	RETURNING *;`;
    const values = [userId, urlObj.short_url, urlObj.long_url, urlObj.description];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at urls queries 'addUrl'`, err));
};
exports.addUrl = addUrl;
const updateUrl = (urlObj, urlId) => {
    if (!urlObj.description)
        urlObj.description = '';
    const query = `
	UPDATE urls
	SET short_url = $1, long_url = $2, description = $3
	WHERE id = $4
	RETURNING *`;
    const values = [urlObj.short_url, urlObj.long_url, urlObj.description, urlId];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at urls queries 'updateUrl'`, err));
};
exports.updateUrl = updateUrl;
const deleteUrl = (urlId) => {
    const query = `
	DELETE FROM urls
	WHERE id = $1;`;
    const values = [urlId];
    return db.query(query, values).catch((err) => console.log(`Error at urls queries 'deleteUrl'`, err));
};
exports.deleteUrl = deleteUrl;
