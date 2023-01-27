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
const messages_1 = require("../models/messages");
const { Op } = require('sequelize');
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
        const { author, recepient } = req.body;
        console.log(author, recepient);
        const messages = yield messages_1.Message.findAll({
            where: {
                [Op.or]: [
                    { recepient: recepient, author: author },
                    { recepient: author, author: recepient },
                ],
            },
            order: [['timestamp', 'DESC']],
        });
        console.log(messages);
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
};
