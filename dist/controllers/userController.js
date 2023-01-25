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
exports.getUserStatus = exports.getAllUsers = exports.createUser = exports.deleteUser = exports.toggleUnblock = exports.toggleBlock = exports.signIn = exports.signUp = exports.updateUser = void 0;
const users_1 = require("../models/users");
const { SHA3 } = require('sha3');
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield users_1.User.update(Object.assign({}, req.body), { where: { id } });
        const updatedUser = yield users_1.User.findByPk(id);
        return res.status(200).json({
            message: `user with id: ${id} was updated`,
            data: updatedUser,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.updateUser = updateUser;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield users_1.User.findOne({
            where: { email: email },
        });
        const hash = new SHA3(256);
        const hashpass = hash.update(password).digest('hex');
        const obj = Object.assign(Object.assign({}, req.body), { blocked: false });
        obj.password = hashpass;
        if (Number(user) === 0) {
            let user = yield users_1.User.create(Object.assign({}, obj));
            return res.status(200).json({
                message: `user with id:${user.id} was succesfully signed up`,
                data: user,
            });
        }
        else
            throw Error();
    }
    catch (err) {
        return res.status(409).json({
            error: 409,
            message: `user with email:${req.body.email} is already exist`,
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email, login } = req.body;
        const hash = new SHA3(256);
        const hashpass = hash.update(password).digest('hex');
        const user = yield users_1.User.findOne({
            where: { password: hashpass, email: email },
        });
        console.log('found user:', user);
        if (user) {
            if (user.blocked === false) {
                yield users_1.User.update({ login: login }, { where: { email } });
                return res.status(200).json({
                    message: `user with id:${user.id} was succesfully signed up`,
                    data: user,
                });
            }
            else
                throw Error;
        }
        else
            throw Error;
    }
    catch (err) {
        return res.status(401).json({
            error: 401,
            message: `access is not allowed`,
        });
    }
});
exports.signIn = signIn;
const toggleBlock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req.body;
        params.forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield users_1.User.findByPk(id);
            if (user) {
                yield users_1.User.update({ blocked: true }, { where: { id } });
                const updatedUser = yield users_1.User.findByPk(id);
            }
        }));
        return res.status(200).json({
            message: `user's status with id are changed`,
            id: req.body,
        });
    }
    catch (err) {
        return res.status(404).json({
            error: 404,
            message: `${err.message}`,
        });
    }
});
exports.toggleBlock = toggleBlock;
const toggleUnblock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req.body;
        params.forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield users_1.User.findByPk(id);
            if (user) {
                yield users_1.User.update({ blocked: false }, { where: { id } });
                const updatedUser = yield users_1.User.findByPk(id);
            }
        }));
        return res.status(200).json({
            message: `user's status with id are changed`,
            id: req.body,
        });
    }
    catch (err) {
        return res.status(404).json({
            error: 404,
            message: `${err.message}`,
        });
    }
});
exports.toggleUnblock = toggleUnblock;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params } = req.body;
        console.log(params, 'test');
        params.forEach((id) => __awaiter(void 0, void 0, void 0, function* () {
            yield users_1.User.destroy({ where: { id } });
        }));
        return res.status(200).json({
            message: `users status with ids are deleted`,
            id: req.body,
        });
    }
    catch (err) {
        return err.message;
    }
});
exports.deleteUser = deleteUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield users_1.User.create(Object.assign({}, req.body));
        return res
            .status(200)
            .json({ message: 'user created succesfully', data: user });
    }
    catch (err) {
        return err.message;
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield users_1.User.findAll();
        return res
            .status(200)
            .json({ message: `users fetched successfully`, data: allUsers });
    }
    catch (err) {
        return err.message;
    }
});
exports.getAllUsers = getAllUsers;
const getUserStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield users_1.User.findByPk(id);
        return res
            .status(200)
            .json({ message: `user with id: ${id} was fetched`, data: user });
    }
    catch (err) {
        return err.message;
    }
});
exports.getUserStatus = getUserStatus;
