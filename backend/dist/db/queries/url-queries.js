"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrls = void 0;
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
        .catch((err) => console.log(`Error at users queries 'getUsers'`, err));
};
exports.getUrls = getUrls;
