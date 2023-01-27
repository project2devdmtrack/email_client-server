"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const messages_1 = require("../models/messages");
const { Op } = require('sequelize');
const createSocketMessage = (msg) => {
    return new Promise((resolve) => {
        try {
            let message = messages_1.Message.create({
                author: msg.author,
                recepient: 'ivan',
                title: 'chat',
                text: msg.text,
                timestamp: 5,
            });
            resolve(message);
        }
        catch (err) {
            return err.message;
        }
    });
};
const getSocketMessages = (message) => {
    console.log('message inside methods:', message);
    return new Promise((resolve) => {
        try {
            const messages = messages_1.Message.findAll({
                where: {
                    [Op.or]: [
                        { author: message.username },
                        { recepient: message.username },
                    ],
                },
                order: [['timestamp', 'DESC']],
                limit: 100,
            });
            resolve(messages);
        }
        catch (err) {
            return err.message;
        }
    });
};
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield users_1.User.findOne({
            where: { username: username.toLowerCase() },
        });
        if (user) {
            return res.status(200).json({
                message: `user with nickname:${username} has entered`,
                data: user,
            });
        }
        else {
            let newuser = yield users_1.User.create({
                username: username.toLowerCase(),
            });
            return res.status(200).json({
                message: `user with nickname:${username} was created`,
                data: newuser,
            });
        }
    }
    catch (err) {
        return res.status(404).json({
            error: 404,
            message: `err.message`,
        });
    }
});
const createMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message = yield messages_1.Message.create(Object.assign({}, req.body));
        return res
            .status(200)
            .json({ message: 'message is created succesfully', data: message });
    }
    catch (err) {
        return err.message;
    }
});
const getMessagesForUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.query.username;
        const messages = yield messages_1.Message.findAll({
            where: {
                [Op.or]: [{ recepient: username }, { author: username }],
            },
            order: [['timestamp', 'DESC']],
        });
        return res.status(200).json({
            message: `messages fetched successfully`,
            data: messages,
        });
    }
    catch (err) {
        return err.message;
    }
});
module.exports = {
    createMessage,
    getMessagesForUser,
    getSocketMessages,
    createSocketMessage,
    signIn,
};
