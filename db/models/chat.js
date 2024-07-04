"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const Client = require("./client");
const Message = require("./message");
const Owner = require("./owner");

const chatInit = (sequelize, DataTypes) => {
    class Chat extends Model {
        static associate(models) {

            //Relaciones
            // Uno a Muchos
            Chat.hasToMany(Message, { as: "messages", foreignKey: "chat_id" });
            Chat.hasToMany(Client, { as: "participants", foreignKey: "chat_id" });

            // Muchos a Uno
            Chat.belongsTo(Owner, { as: "owner", foreignKey: "owner_id" });
        }
    }

    Chat.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.TEXT,
                autoIncrement: false,
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
            timestamps: true,
        }
    );

    return Chat;
}

module.exports = chatInit(connection, DataTypes)