"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUser = exports.getUsers = void 0;
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
const addUser = (userObj) => {
    const query = `
	INSERT INTO users (first_name, last_name, email, password)
	VALUES ($1, $2, $3, $4)
	RETURNING *;`;
    const values = [userObj.first_name, userObj.last_name, userObj.email, userObj.password];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at users queries 'addUser'`, err));
};
exports.addUser = addUser;
