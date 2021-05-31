"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.addUser = exports.getUserById = exports.getUsers = void 0;
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
const getUserById = (userId) => {
    const query = `
	SELECT *
	FROM users
	WHERE id = $1;`;
    const values = [userId];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at users queries 'getUserById'`, err));
};
exports.getUserById = getUserById;
const getUserByEmail = (userEmail) => {
    const query = `
	SELECT *
	FROM users
	WHERE email = $1;`;
    const values = [userEmail];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at users queries 'getUserByEmail'`, err));
};
exports.getUserByEmail = getUserByEmail;
const addUser = (userEmail) => {
    const query = `
	INSERT INTO users (email)
	VALUES ($1)
	RETURNING *;`;
    const values = [userEmail];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at users queries 'addUser'`, err));
};
exports.addUser = addUser;
