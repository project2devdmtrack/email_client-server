import { RequestHandler } from 'express';
import { User } from '../models/users';
import { IMessage } from '../interfaces/messages';
import { Message } from '../models/messages';
const { Op } = require('sequelize');

const createSocketMessage = (msg: any) => {
    return new Promise((resolve) => {
        try {
            let message = Message.create({
                ...msg,
            });
            resolve(message);
        } catch (err: any) {
            return err.message;
        }
    });
};

const getSocketMessages = (username: string) => {
    console.log('messages are received for:', username);

    return new Promise((resolve) => {
        try {
            const messages = Message.findAll({
                where: {
                    [Op.or]: [{ author: username }, { recepient: username }],
                },
                order: [['timestamp', 'DESC']],
                limit: 100,
            });
            resolve(messages);
        } catch (err: any) {
            return err.message;
        }
    });
};

const signIn: RequestHandler = async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({
            where: { username: username.toLowerCase() },
        });

        if (user) {
            return res.status(200).json({
                message: `user with nickname:${username} has entered`,
                data: user,
            });
        } else {
            let newuser = await User.create({
                username: username.toLowerCase(),
            });
            return res.status(200).json({
                message: `user with nickname:${username} was created`,
                data: newuser,
            });
        }
    } catch (err: any) {
        return res.status(404).json({
            error: 404,
            message: `err.message`,
        });
    }
};

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
        const username = req.query.username;
        const messages: IMessage[] = await Message.findAll({
            where: {
                [Op.or]: [{ recepient: username }, { author: username }],
            },
            order: [['timestamp', 'DESC']],
        });
        return res.status(200).json({
            message: `messages fetched successfully`,
            data: messages,
        });
    } catch (err: any) {
        return err.message;
    }
};

export const getusers: RequestHandler = async (req, res, next) => {
    try {
        const users: User[] = await User.findAll();
        return res
            .status(200)
            .json({ message: `users fetched successfully`, data: users });
    } catch (err: any) {
        return err.message;
    }
};

module.exports = {
    createMessage,
    getMessagesForUser,
    getSocketMessages,
    createSocketMessage,
    signIn,
    getusers,
};
