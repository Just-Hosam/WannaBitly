"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const url_queries_1 = require("./db/queries/url-queries");
const user_queries_1 = require("./db/queries/user-queries");
const click_queries_1 = require("./db/queries/click-queries");
const clickDataFormatter_1 = __importDefault(require("./helpers/clickDataFormatter"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
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
app.use('/', http_proxy_middleware_1.createProxyMiddleware({ target: 'https://gifted-kilby-b1db3b.netlify.app', changeOrigin: true }));
app.use(cors_1.default());
app.use(morgan('dev'));
// app.enable('trust proxy');
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// var allowedOrigins = ['https://wannabitly.herokuapp.com/'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));
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
        .then((urlData) => {
        if (!urlData) {
            res.status(404).send('This link is not connected to anything');
            return;
        }
        res.redirect(urlData.long_url);
        axios_1.default
            .get(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.GEOAPIFY_API_KEY}`)
            .then((response) => {
            const urlId = urlData.id;
            const clickObj = clickDataFormatter_1.default(response.data);
            click_queries_1.addClick(urlId, clickObj).catch((err) => console.log('Error at server GET route "/s/:shortUrl", addClick query', err));
        });
    })
        .catch((err) => console.log('Error at server GET route "/s/:shortUrl"', err));
});
app.post('/login', (req, res) => {
    const userEmail = req.body.userEmail;
    user_queries_1.getUserByEmail(userEmail)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at server GET route "/login"', err));
});
app.post('/register', (req, res) => {
    const userEmail = req.body.userEmail;
    user_queries_1.addUser(userEmail)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at server GET route "/login"', err));
});
app.get('/', (req, res) => {
    res.status(200).send("HELLO IT'S ME DIO");
});
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
