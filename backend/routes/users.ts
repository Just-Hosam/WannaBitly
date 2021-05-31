import express from 'express';
const router = express.Router();
import { getUsers, getUserById, addUser, updateUser } from '../db/queries/user-queries';

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

router.post('/', (req, res) => {
	const userObj: NewUser = req.body.userObj;

	addUser(userObj)
		.then((data: User) => res.json(data))
		.catch((err: Error) => console.log('Error at users POST route "/"', err));
});

router.patch('/:userId', (req, res) => {
	const userId: number = Number(req.params.userId);
	const updatedUser: UpdatedUser = req.body.updatedUser;

	updateUser(updatedUser, userId)
		.then((data: User) => res.json(data))
		.catch((err: Error) => console.log('Error at users PATCH route "/:userId"', err));
});

module.exports = router;
