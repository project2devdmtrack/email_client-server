import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/users';

const connection = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    logging: false,
    models: [User],
});

export default connection;
