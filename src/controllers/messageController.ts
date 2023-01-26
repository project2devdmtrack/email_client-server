import { RequestHandler } from 'express';
import { Message } from '../models/messages';

export const createMessage: RequestHandler = async (req, res, next) => {
    try {
        console.log(req.body);

        let message = await Message.create({ ...req.body });
        return res
            .status(200)
            .json({ message: 'message is created succesfully', data: message });
    } catch (err: any) {
        return err.message;
    }
};

export const getAllMessages: RequestHandler = async (req, res, next) => {
    try {
        console.log('request body:', req.body);

        const messages: Message[] = await Message.findAll();
        console.log('messages:', messages);

        return res
            .status(200)
            .json({ message: `messages fetched successfully`, data: messages });
    } catch (err: any) {
        return err.message;
    }
};

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
