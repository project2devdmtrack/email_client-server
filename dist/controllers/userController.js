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
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        let user = yield users_1.User.create(Object.assign({}, req.body));
        if (user) {
            return res.status(200).json({
                message: `user with nickname:${username} has entered`,
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
module.exports = {
    signIn,
};
