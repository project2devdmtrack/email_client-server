import { RequestHandler } from 'express';
import { User } from '../models/users';

export const signIn: RequestHandler = async (req, res, next) => {
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

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const allUsers: User[] = await User.findAll();
        return res
            .status(200)
            .json({ message: `users fetched successfully`, data: allUsers });
    } catch (err: any) {
        return err.message;
    }
};

export const getUserStatus: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user: User | null = await User.findByPk(id);
        return res
            .status(200)
            .json({ message: `user with id: ${id} was fetched`, data: user });
    } catch (err: any) {
        return err.message;
    }
};
