import express from 'express';
const router = express.Router();
const { getUsers } = require('../db/queries/user-queries');

interface User {
	id: number;
	first_name: 'string';
	last_name: 'string';
	email: 'string';
	password: 'string';
}

router.get('/', (req, res) => {
	getUsers()
		.then((data: User[]) => res.json(data))
		.catch((err: Error) => console.log('Error at users GET route "/"', err));
});

// router.get('/:userId', (req, res) => {
// 	const userId = req.params.userId;

// 	getUser(userId)
// 		.then((data) => res.json(data))
// 		.catch((err: Error) => console.log('Error at users GET route "/:userId"', err));
// });

// router.post('/', (req, res) => {
// 	const inputUser = req.body.inputUser;

// 	addUser(inputUser)
// 		.then((data) => res.json(data))
// 		.catch((err: Error) => console.log('Error at users POST route "/"', err));
// });

// router.patch('/:userId', (req, res) => {
// 	const inputUser = req.body.inputUser;

// 	updateUser(inputUser)
// 		.then((data) => res.json(data))
// 		.catch((err: Error) => console.log('Error at users PATCH route "/:userId"', err));
// });

module.exports = router;
