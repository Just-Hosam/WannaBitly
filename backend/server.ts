require('dotenv').config();

import { getLongUrlByShortUrl } from './db/queries/url-queries';
import express from 'express';
import bodyParser from 'body-parser';
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 8080;

// PG database client/connection setup
const db = require('./lib/db.js');
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// override for put, patch and delete methods
app.use(methodOverride('_method'));

// Separated Routes for each Resource
const usersRouter = require('./routes/users.js');
const urlsRouter = require('./routes/urls.js');

// Mount all resource routes
app.use('/users', usersRouter);
app.use('/users/:userId/urls', urlsRouter);

app.get('/:shortUrl', (req, res) => {
	const short_url = `http://localhost:8080/${req.params.shortUrl}`;
	getLongUrlByShortUrl(short_url).then((data: { long_url: string }) => {
		res.redirect(data.long_url);
		return;
	});
	return;
});

app.get('/', (req, res) => {
	res.status(200).send("HELLO IT'S ME DIO");
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
