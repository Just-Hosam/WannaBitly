"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrls = void 0;
const db = require('../../lib/db.js');
const getUrls = () => {
    const query = `
	SELECT *
	FROM urls;`;
    return db
        .query(query)
        .then(({ rows }) => rows)
        .catch((err) => console.log(`Error at users queries 'getUsers'`, err));
};
exports.getUrls = getUrls;
