"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");
const Chat = require("./chat");

const messageInit = (sequelize, DataTypes) => {
    class Message extends Model { }

    Message.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            nameUser: {
                type: DataTypes.STRING(100),
                allowNull: false,
            }
            ,
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Message",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Message;
}

module.exports = messageInit(connection, DataTypes)