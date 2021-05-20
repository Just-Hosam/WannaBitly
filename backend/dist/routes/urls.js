"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
const url_queries_1 = require("../db/queries/url-queries");
const shortLinkGenerator_1 = __importDefault(require("../helpers/shortLinkGenerator"));
router.get('/', (req, res) => {
    const userId = Number(req.params.userId);
    url_queries_1.getUrls(userId)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at urls GET route "/"', err));
});
router.get('/:urlId', (req, res) => {
    const userId = Number(req.params.userId);
    const urlId = Number(req.params.urlId);
    url_queries_1.getUrl(userId, urlId)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at urls GET route "/:urlId"', err));
});
router.post('/', (req, res) => {
    const userId = Number(req.params.userId);
    const urlObj = Object.assign(Object.assign({}, req.body), { short_url: shortLinkGenerator_1.default() });
    url_queries_1.addUrl(urlObj, userId)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at urls POST route "/"', err));
});
router.patch('/:urlId', (req, res) => {
    const urlId = Number(req.params.urlId);
    const urlObj = req.body;
    url_queries_1.updateUrl(urlObj, urlId)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at urls PATCH route "/:urlId"', err));
});
router.delete('/:urlId', (req, res) => {
    const urlId = Number(req.params.urlId);
    url_queries_1.deleteUrl(urlId)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at urls DELETE route "/:urlId"', err));
});
module.exports = router;
