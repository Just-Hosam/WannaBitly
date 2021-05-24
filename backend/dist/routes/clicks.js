"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
const click_queries_1 = require("../db/queries/click-queries");
router.get('/', (req, res) => {
    const urlId = Number(req.params.urlId);
    click_queries_1.getClicks(urlId)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at clicks GET route "/"', err));
});
router.get('/:clickId', (req, res) => {
    const urlId = Number(req.params.urlId);
    const clickId = Number(req.params.clickId);
    click_queries_1.getClick(urlId, clickId)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at clicks GET route "/:clicksId"', err));
});
router.post('/', (req, res) => {
    const urlId = Number(req.params.userId);
    const clickTimestamp = req.body;
    click_queries_1.addClick(urlId, clickTimestamp)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at clicks POST route "/"', err));
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
