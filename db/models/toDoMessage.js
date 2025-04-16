"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const toDoMessageInit = (sequelize, DataTypes) => {
    class ToDoMessage extends Model { }

    ToDoMessage.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            senderType: {
                type: DataTypes.ENUM("CLIENT", "WORKER"),
                allowNull: false
            },
            senderId: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            senderName: {
              type: DataTypes.TEXT,
              allowNull: true,
            },
            senderLastName: {
              type: DataTypes.TEXT,
              allowNull: true,
            },
            body: {
              type: DataTypes.TEXT,
              allowNull: true,
            },
            imageUrl: {
              type: DataTypes.STRING,
              allowNull: true,
            }
        },
        {
            sequelize,
            modelName: "ToDoMessage",
            freezeTableName: true,
        }
    );

    return ToDoMessage
}

module.exports = toDoMessageInit(connection, DataTypes)