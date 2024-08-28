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
            creationDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            type: {
                type: DataTypes.ENUM("CLEAN", "REPAIR"),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED"),
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
            modelName: "ToDos",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return ToDo
}

module.exports = toDoInit(connection, DataTypes)