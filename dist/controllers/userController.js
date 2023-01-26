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
exports.getUserStatus = exports.getAllUsers = exports.signIn = void 0;
const users_1 = require("../models/users");
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nickname } = req.body;
        let user = yield users_1.User.create(Object.assign({}, req.body));
        if (user) {
            return res.status(200).json({
                message: `user with nickname:${nickname} has entered`,
                data: user,
            });
        }
        else
            throw Error;
    }
    catch (err) {
        return res.status(404).json({
            error: 404,
            message: `err.message`,
        });
    }
});
exports.signIn = signIn;
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
