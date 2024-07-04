"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");
const Chat = require("./chat");

const messageInit = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            //Relaciones
            Message.belongsTo(User, { as: "user", foreignKey: "user_id" });
            Message.belongsTo(Chat, { as: "chat", foreignKey: "chat_id" });
        }
    }

    Message.init(
        {
            id: {
                type: DataTypes.TEXT,
                autoIncrement: false,
                primaryKey: true,
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Message",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return Message;
}

module.exports = messageInit(connection, DataTypes)