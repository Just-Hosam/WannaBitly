import express from 'express';
const router = express.Router({ mergeParams: true });
import { getUrls, getUrl, addUrl, updateUrl, deleteUrl } from '../db/queries/url-queries';
import shortLinkGenerator from '../helpers/shortLinkGenerator';

interface Url {
	id: number;
	user_id: number;
	short_url: string;
	long_url: string;
	description: string;
}

interface NewUrl {
	short_url: string;
	long_url: string;
	description: string;
}

router.get('/', (req, res) => {
	const userId = Number(req.params.userId);

	getUrls(userId)
		.then((data: Url[]) => res.json(data))
		.catch((err: Error) => console.log('Error at urls GET route "/"', err));
});

router.get('/:urlId', (req, res) => {
	const userId = Number(req.params.userId);
	const urlId = Number(req.params.urlId);

	getUrl(userId, urlId)
		.then((data: Url) => res.json(data))
		.catch((err: Error) => console.log('Error at urls GET route "/:urlId"', err));
});

router.post('/', (req, res) => {
	const userId = Number(req.params.userId);
	const urlObj: NewUrl = {
		...req.body,
		short_url: shortLinkGenerator(),
	};

	addUrl(urlObj, userId)
		.then((data: Url) => res.json(data))
		.catch((err: Error) => console.log('Error at urls POST route "/"', err));
});

router.patch('/:urlId', (req, res) => {
	const urlId = Number(req.params.urlId);
	const urlObj: Url = req.body;

	updateUrl(urlObj, urlId)
		.then((data: Url) => res.json(data))
		.catch((err: Error) => console.log('Error at urls PATCH route "/:urlId"', err));
});

router.delete('/:urlId', (req, res) => {
	const urlId = Number(req.params.urlId);

	deleteUrl(urlId)
		.then((data: Url) => res.json(data))
		.catch((err: Error) => console.log('Error at urls DELETE route "/:urlId"', err));
});

module.exports = router;
