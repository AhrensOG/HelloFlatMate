"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const messageInit = (sequelize, DataTypes) => {
    class Message extends Model {}

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
            isRead: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            type: {
                type: DataTypes.ENUM("TEXT", "FILE", "IMAGE", "VIDEO"),
                allowNull: false,
                defaultValue: "TEXT",
            },
            userName: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING(700),
                allowNull: false,
            },
            userType: {
                type: DataTypes.ENUM("CLIENT", "OWNER", "ADMIN", "SUPPORT"),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Message",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Message;
};

module.exports = messageInit(connection, DataTypes);
