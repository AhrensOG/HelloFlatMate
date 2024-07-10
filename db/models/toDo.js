"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const Client = require("./client");
const Property = require("./property");

const toDoInit = (sequelize, DataTypes) => {
    class ToDo extends Model { }

    ToDo.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
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
            modelName: "ToDo",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return ToDo
}

module.exports = toDoInit(connection, DataTypes)