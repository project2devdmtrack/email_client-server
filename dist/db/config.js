"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("../models/users");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    logging: false,
    models: [users_1.User],
});
exports.default = connection;
