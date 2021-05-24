import express from 'express';
const router = express.Router({ mergeParams: true });
import { getClicks, getClick, addClick } from '../db/queries/click-queries';

interface Click {
	id: number;
	url_id: number;
	click_timestamp: Date;
}

router.get('/', (req, res) => {
	const urlId = Number(req.params.urlId);

	getClicks(urlId)
		.then((data: Click[]) => res.json(data))
		.catch((err: Error) => console.log('Error at clicks GET route "/"', err));
});

router.get('/:clickId', (req, res) => {
	const urlId = Number(req.params.urlId);
	const clickId = Number(req.params.clickId);

	getClick(urlId, clickId)
		.then((data: Click) => res.json(data))
		.catch((err: Error) => console.log('Error at clicks GET route "/:clicksId"', err));
});

router.post('/', (req, res) => {
	const urlId = Number(req.params.userId);
	const clickTimestamp: Date = req.body;

	addClick(urlId, clickTimestamp)
		.then((data: Click) => res.json(data))
		.catch((err: Error) => console.log('Error at clicks POST route "/"', err));
});

// router.patch('/:urlId', (req, res) => {
// 	const urlId = Number(req.params.urlId);
// 	const urlObj: Url = req.body;

// 	updateUrl(urlObj, urlId)
// 		.then((data: Url) => res.json(data))
// 		.catch((err: Error) => console.log('Error at urls PATCH route "/:urlId"', err));
// });

// router.delete('/:urlId', (req, res) => {
// 	const urlId = Number(req.params.urlId);

// 	deleteUrl(urlId)
// 		.then((data: Url) => res.json(data))
// 		.catch((err: Error) => console.log('Error at urls DELETE route "/:urlId"', err));
// });

module.exports = router;
