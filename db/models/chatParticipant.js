"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const chatParticipantInit = (sequelize, DataTypes) => {
    class ChatParticipant extends Model {}

    ChatParticipant.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            participantId: {
                type: DataTypes.STRING(700),
                allowNull: false,
            },
            participantType: {
                type: DataTypes.ENUM("CLIENT", "OWNER", "ADMIN", "SUPPORT", "WORKER"),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "ChatParticipant",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return ChatParticipant;
};

module.exports = chatParticipantInit(connection, DataTypes);
