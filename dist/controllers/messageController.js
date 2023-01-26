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
exports.getMessagesForUser = exports.createMessage = void 0;
const messages_1 = require("../models/messages");
const { Op } = require('sequelize');
const createMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let message = yield messages_1.Message.create(Object.assign({}, req.body));
        return res
            .status(200)
            .json({ message: 'message is created succesfully', data: message });
    }
    catch (err) {
        return err.message;
    }
});
exports.createMessage = createMessage;
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
        // const messagesSent: IMessage[] = await Message.findAll({
        //     where: { recepient: author, author: recepient },
        //     order: [['timestamp', 'DESC']],
        // });
        return res.status(200).json({
            message: `messages fetched successfully`,
            data: messages,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.getMessagesForUser = getMessagesForUser;
// export const signUp: RequestHandler = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         const user: User | null = await User.findOne({
//             where: { email: email },
//         });
//         const hash = new SHA3(256);
//         const hashpass = hash.update(password).digest('hex');
//         const obj = { ...req.body, blocked: false };
//         obj.password = hashpass;
//         if (Number(user) === 0) {
//             let user = await User.create({
//                 ...obj,
//             });
//             return res.status(200).json({
//                 message: `user with id:${user.id} was succesfully signed up`,
//                 data: user,
//             });
//         } else throw Error();
//     } catch (err: any) {
//         return res.status(409).json({
//             error: 409,
//             message: `user with email:${req.body.email} is already exist`,
//         });
//     }
// };
// export const signIn: RequestHandler = async (req, res, next) => {
//     try {
//         const { password, email, login } = req.body;
//         const hash = new SHA3(256);
//         const hashpass = hash.update(password).digest('hex');
//         const user: User | null = await User.findOne({
//             where: { password: hashpass, email: email },
//         });
//         console.log('found user:', user);
//         if (user) {
//             if (user.blocked === false) {
//                 await User.update({ login: login }, { where: { email } });
//                 return res.status(200).json({
//                     message: `user with id:${user.id} was succesfully signed up`,
//                     data: user,
//                 });
//             } else throw Error;
//         } else throw Error;
//     } catch (err: any) {
//         return res.status(401).json({
//             error: 401,
//             message: `access is not allowed`,
//         });
//     }
// };
// export const getAllUsers: RequestHandler = async (req, res, next) => {
//     try {
//         const allUsers: User[] = await User.findAll();
//         return res
//             .status(200)
//             .json({ message: `users fetched successfully`, data: allUsers });
//     } catch (err: any) {
//         return err.message;
//     }
// };
