"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getAllUsers, signIn } from '../controllers/userController';
const db = require('./controllers/messageController');
const router = (0, express_1.Router)();
// router.post('/signin', signIn)
router.post('/createmessage', db.createMessage);
router.get('/getmessagesforuser', db.getMessagesForUser);
// router.post('/createuser', createUser);
// router.get('/getusers', getAllUsers);
exports.default = router;
