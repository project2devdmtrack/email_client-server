import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/users';
import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [User],
    dialectOptions: {
        ssl: true,
        native: true,
    },
});

export default connection;
