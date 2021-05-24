"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const url_queries_1 = require("./db/queries/url-queries");
const click_queries_1 = require("./db/queries/click-queries");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express_1.default();
const PORT = process.env.PORT || 8080;
// PG database client/connection setup
const db = require('./lib/db.js');
db.connect();
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.enable('trust proxy');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// override for put, patch and delete methods
app.use(methodOverride('_method'));
// Separated Routes for each Resource
const usersRouter = require('./routes/users.js');
const urlsRouter = require('./routes/urls.js');
const clicksRouter = require('./routes/clicks.js');
// Mount all resource routes
app.use('/users', usersRouter);
app.use('/users/:userId/urls', urlsRouter);
app.use('/users/:userId/urls/:urlId/clicks', clicksRouter);
app.get('/s/:shortUrl', (req, res) => {
    const short_url = `localhost:8080/s/${req.params.shortUrl}`;
    url_queries_1.getLongUrlByShortUrl(short_url)
        .then((data) => {
        if (!data) {
            res.status(404).send('This link is not connected to anything');
            return;
        }
        res.redirect(data.long_url);
        const urlId = data.id;
        const currentTimestamp = new Date();
        click_queries_1.addClick(urlId, currentTimestamp).catch((err) => console.log('Error at server GET route "/s/:shortUrl", addClick query', err));
    })
        .catch((err) => console.log('Error at server GET route "/s/:shortUrl"', err));
});
app.get('/', (req, res) => {
    res.status(200).send("HELLO IT'S ME DIO");
});
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
