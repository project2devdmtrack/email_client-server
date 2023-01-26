import * as sequelize from 'sequelize-typescript';
import { User } from './users';

@sequelize.Table({
    timestamps: false,
    tableName: 'messages',
})
export class Message extends sequelize.Model {
    @sequelize.Column({
        type: sequelize.DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id!: number;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    @sequelize.ForeignKey(() => User)
    nickname!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    timestamp!: string;
    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @sequelize.Column({
        type: sequelize.DataType.STRING,
        allowNull: false,
    })
    text!: string;
}
