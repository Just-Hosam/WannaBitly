"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_queries_1 = require("../db/queries/user-queries");
router.get('/', (req, res) => {
    user_queries_1.getUsers()
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at users GET route "/"', err));
});
router.get('/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    user_queries_1.getUser(userId)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at users GET route "/:userId"', err));
});
router.post('/', (req, res) => {
    const userObj = req.body.userObj;
    user_queries_1.addUser(userObj)
        .then((data) => res.json(data))
        .catch((err) => console.log('Error at users POST route "/"', err));
});
// router.patch('/:userId', (req, res) => {
// 	const inputUser = req.body.inputUser;
// 	updateUser(inputUser)
// 		.then((data) => res.json(data))
// 		.catch((err: Error) => console.log('Error at users PATCH route "/:userId"', err));
// });
module.exports = router;
