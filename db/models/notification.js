"use strict";
const { DataTypes, Model } = require("sequelize");
const connection = require("../index");

const notificationInit = (sequelize, DataTypes) => {
    class Notification extends Model {}

    Notification.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isRead: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            type: {
                type: DataTypes.ENUM("CHAT", "OTHER"),
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            typeUser: {
                type: DataTypes.ENUM("CLIENT", "OWNER", "ADMIN", "SUPPORT", "WORKER"),
                allowNull: false,
            },
            chatId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Notification",
        }
    );
    return Notification;
};

module.exports = notificationInit(connection, DataTypes);
