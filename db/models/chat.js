"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const chatInit = (sequelize, DataTypes) => {
    class Chat extends Model { }

    Chat.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.ENUM("private", "group"),
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Chat",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Chat;
}

module.exports = chatInit(connection, DataTypes)