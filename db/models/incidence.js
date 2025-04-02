"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const incidenceInit = (sequelize, DataTypes) => {
    class Incidence extends Model {}

    Incidence.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            type: {
                type: DataTypes.ENUM("OTHER"),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Incidence",
            freezeTableName: true,
        }
    );

    return Incidence;
};

module.exports = incidenceInit(connection, DataTypes);
