import { RequestHandler } from 'express';
import { IMessage } from '../interfaces/messages';
import { Message } from '../models/messages';
const { Op } = require('sequelize');

const createMessage: RequestHandler = async (req, res, next) => {
    try {
        let message = await Message.create({ ...req.body });
        return res
            .status(200)
            .json({ message: 'message is created succesfully', data: message });
    } catch (err: any) {
        return err.message;
    }
};

const getMessagesForUser: RequestHandler = async (req, res, next) => {
    try {
        const { author, recepient } = req.body;
        console.log(author, recepient);

        const messages: IMessage[] = await Message.findAll({
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
    } catch (err: any) {
        return err.message;
    }
};

module.exports = {
    createMessage,
    getMessagesForUser,
};
