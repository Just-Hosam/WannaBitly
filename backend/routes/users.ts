import express from 'express';
const router = express.Router();
import { getUsers, getUserById } from '../db/queries/user-queries';

interface User {
	id: number;
	email: string;
}

router.get('/', (req, res) => {
	getUsers()
		.then((data: User[]) => res.json(data))
		.catch((err: Error) => console.log('Error at users GET route "/"', err));
});

router.get('/:userId', (req, res) => {
	const userId: number = Number(req.params.userId);

	getUserById(userId)
		.then((data: User) => res.json(data))
		.catch((err: Error) => console.log('Error at users GET route "/:userId"', err));
});

// User registration handled elsewhere
// router.post('/', (req, res) => {
// 	const userEmail: NewUser = req.body.userEmail;

// 	addUser(userEmail)
// 		.then((data: User) => res.json(data))
// 		.catch((err: Error) => console.log('Error at users POST route "/"', err));
// });

// Removed update user feature
// router.patch('/:userId', (req, res) => {
// 	const userId: number = Number(req.params.userId);
// 	const updatedUser: UpdatedUser = req.body.updatedUser;

// 	updateUser(updatedUser, userId)
// 		.then((data: User) => res.json(data))
// 		.catch((err: Error) => console.log('Error at users PATCH route "/:userId"', err));
// });

module.exports = router;
