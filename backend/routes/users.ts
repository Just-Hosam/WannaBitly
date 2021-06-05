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

module.exports = router;
