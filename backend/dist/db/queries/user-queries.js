"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const db = require('../../lib/db.js');
const getUsers = () => {
    const query = `
	SELECT *
	FROM users;`;
    return db
        .query(query)
        .then(({ rows }) => rows)
        .catch((err) => console.log(`Error at users queries 'getUsers'`, err));
};
exports.getUsers = getUsers;
