"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = void 0;
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
const getUser = (userId) => {
    const query = `
	SELECT *
	FROM users
	WHERE id = $1;`;
    const values = [userId];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at users queries 'getUser'`, err));
};
exports.getUser = getUser;
