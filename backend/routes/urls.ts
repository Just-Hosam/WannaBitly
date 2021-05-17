import express from 'express';
const router = express.Router({ mergeParams: true });
import { getUrls } from '../db/queries/url-queries';

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
}

router.get('/', (req, res) => {
	const userId: number = Number(req.params.userId);

	getUrls(userId)
		.then((data: Url[]) => res.json(data))
		.catch((err: Error) => console.log('Error at urls GET route "/"', err));
});

module.exports = router;
