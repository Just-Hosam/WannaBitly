import express from 'express';
const router = express.Router({ mergeParams: true });
import { getClicks, getClick, addClick } from '../db/queries/click-queries';

interface Click {
	id: number;
	url_id: number;
	click_timestamp: Date;
	city: string;
	country: string;
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
	const clickTimestamp: Date = req.body.clickTimestamp;
	const clickCity: string = req.body.clickCity;
	const clickCountry: string = req.body.clickCoutry;

	const clickObj = {
		clickTimestamp,
		clickCity,
		clickCountry,
	};

	addClick(urlId, clickObj)
		.then((data: Click) => res.json(data))
		.catch((err: Error) => console.log('Error at clicks POST route "/"', err));
});

module.exports = router;
