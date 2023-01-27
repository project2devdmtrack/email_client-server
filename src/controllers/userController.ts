import { RequestHandler } from 'express';
import { User } from '../models/users';

const signIn: RequestHandler = async (req, res, next) => {
    try {
        const { nickname } = req.body;
        let user = await User.create({ ...req.body });
        if (user) {
            return res.status(200).json({
                message: `user with nickname:${nickname} has entered`,
                data: user,
            });
        } else throw Error;
    } catch (err: any) {
        return res.status(404).json({
            error: 404,
            message: `err.message`,
        });
    }
};

module.exports = {
    signIn,
};
