const db = require('../../lib/db.js');

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
}

interface NewUser {
	first_name: string;
	last_name: string;
	email: string;
}

interface UpdatedUser {
	first_name: string;
	last_name: string;
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

const addUser = (userObj: NewUser) => {
	const query = `
	INSERT INTO users (first_name, last_name, email)
	VALUES ($1, $2, $3)
	RETURNING *;`;
	const values = [userObj.first_name, userObj.last_name, userObj.email];

	return db
		.query(query, values)
		.then(({ rows }: { rows: User[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at users queries 'addUser'`, err));
};

const updateUser = (userObj: UpdatedUser, userId: number) => {
	const query = `
	UPDATE users
	SET first_name = $1, last_name = $2, password = $3
	WHERE id = $4
	RETURNING *`;
	const values = [userObj.first_name, userObj.last_name, userId];

	return db
		.query(query, values)
		.then(({ rows }: { rows: User[] }) => rows[0])
		.catch((err: Error) => console.log(`Error at users queries 'updateUser'`, err));
};

export { getUsers, getUserById, addUser, updateUser, getUserByEmail };
