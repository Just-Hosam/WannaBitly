"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
const url_queries_1 = require("../db/queries/url-queries");
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
module.exports = router;
