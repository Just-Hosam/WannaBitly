require('dotenv').config();

import { getLongUrlByShortUrl } from './db/queries/url-queries';
import { getUserByEmail, addUser } from './db/queries/user-queries';
import { addClick } from './db/queries/click-queries';
import clickDataFormatter from './helpers/clickDataFormatter';
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import bodyParser from 'body-parser';
import axios from 'axios';
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
app.use('/', createProxyMiddleware({ target: 'https://wannabitly.herokuapp.com', changeOrigin: true }));
app.use(morgan('dev'));
app.enable('trust proxy');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

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

interface User {
	id: number;
	email: string;
}

app.get('/s/:shortUrl', (req, res) => {
	const short_url = `localhost:8080/s/${req.params.shortUrl}`;

	getLongUrlByShortUrl(short_url)
		.then((urlData) => {
			if (!urlData) {
				res.status(404).send('This link is not connected to anything');
				return;
			}
			res.redirect(urlData.long_url);

			axios
				.get(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.GEOAPIFY_API_KEY}`)
				.then((response) => {
					const urlId = urlData.id;
					const clickObj = clickDataFormatter(response.data);

					addClick(urlId, clickObj).catch((err: Error) =>
						console.log('Error at server GET route "/s/:shortUrl", addClick query', err)
					);
				});
		})
		.catch((err: Error) => console.log('Error at server GET route "/s/:shortUrl"', err));
});

app.post('/login', (req, res) => {
	const userEmail: string = req.body.userEmail;

	getUserByEmail(userEmail)
		.then((data: User) => res.json(data))
		.catch((err: Error) => console.log('Error at server GET route "/login"', err));
});

app.post('/register', (req, res) => {
	const userEmail = req.body.userEmail;

	addUser(userEmail)
		.then((data: User) => res.json(data))
		.catch((err: Error) => console.log('Error at server GET route "/login"', err));
});

app.get('/', (req, res) => {
	res.status(200).send("HELLO IT'S ME DIO");
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
