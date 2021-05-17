"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
const { getUrls } = require('../db/queries/url-queries');
router.get('/', (req, res) => {
    getUrls()
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at urls GET route "/"', err));
});
module.exports = router;