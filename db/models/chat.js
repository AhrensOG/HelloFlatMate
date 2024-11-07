"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const chatInit = (sequelize, DataTypes) => {
    class Chat extends Model {}

    Chat.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.ENUM("PRIVATE", "GROUP", "SUPPORT"),
                allowNull: false,
            },
            ownerId: {
                type: DataTypes.STRING(300),
                allowNull: true, // en caso que sea grupal
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            relatedType: {
                type: DataTypes.ENUM("ROOM", "PROPERTY"),
                allowNull: false,
            },
            relatedId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Chat",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Chat;
};

module.exports = chatInit(connection, DataTypes);
