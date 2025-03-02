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
                type: DataTypes.ENUM("CHAT"),
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
