"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

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
            },
            type: {
                type: DataTypes.ENUM("CLEAN", "REPAIR"),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("PENDING", "COMPLETED"),
                allowNull: false,
            },
            comment: {
                type: DataTypes.STRING(1000),
                allowNull: true,
            },
            userId: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            typeUser: {
                type: DataTypes.ENUM("CLIENT", "OWNER"),
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