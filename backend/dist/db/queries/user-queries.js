"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.updateUser = exports.addUser = exports.getUserById = exports.getUsers = void 0;
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
const addUser = (userObj) => {
    const query = `
	INSERT INTO users (first_name, last_name, email)
	VALUES ($1, $2, $3)
	RETURNING *;`;
    const values = [userObj.first_name, userObj.last_name, userObj.email];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at users queries 'addUser'`, err));
};
exports.addUser = addUser;
const updateUser = (userObj, userId) => {
    const query = `
	UPDATE users
	SET first_name = $1, last_name = $2, password = $3
	WHERE id = $4
	RETURNING *`;
    const values = [userObj.first_name, userObj.last_name, userId];
    return db
        .query(query, values)
        .then(({ rows }) => rows[0])
        .catch((err) => console.log(`Error at users queries 'updateUser'`, err));
};
exports.updateUser = updateUser;
