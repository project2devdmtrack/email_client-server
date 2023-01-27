import * as sequelize from 'sequelize-typescript';
import { Message } from './messages';

@sequelize.Table({
    timestamps: false,
    tableName: 'users',
})
export class User extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    username!: string;
}
