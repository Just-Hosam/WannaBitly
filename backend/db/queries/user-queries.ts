const db = require('../../lib/db.js');

interface User {
	id: number;
	email: string;
}

const getUsers = () => {
	const query = `
	SELECT *
	FROM users;`;

	return db
		.query(query)
		.then(({ rows }: { rows: User[] }) => rows)
		.catch((err: Error) => console.log(`Error at users queries 'getUsers'`, err));
};

const getUserById = (userId: number) => {
	const query = `
	SELECT *
	FROM users
	WHERE id = $1;`;
	const values = [userId];

	return db
		.query(query, values)
		.then(({ rows }: { rows: User[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at users queries 'getUserById'`, err));
};

const getUserByEmail = (userEmail: string): Promise<User> => {
	const query = `
	SELECT *
	FROM users
	WHERE email = $1;`;
	const values = [userEmail];

	return db
		.query(query, values)
		.then(({ rows }: { rows: User[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at users queries 'getUserByEmail'`, err));
};

const addUser = (userEmail: string) => {
	const query = `
	INSERT INTO users (email)
	VALUES ($1)
	RETURNING *;`;
	const values = [userEmail];

	return db
		.query(query, values)
		.then(({ rows }: { rows: User[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at users queries 'addUser'`, err));
};

export { getUsers, getUserById, addUser, getUserByEmail };
