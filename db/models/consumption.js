"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const consumptionInit = (sequelize, DataTypes) => {
    class Consumption extends Model {}

    Consumption.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER,
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
                type: DataTypes.ENUM("GENERAL_SUPPLIES", "INTERNET", "WATER", "GAS", "ELECTRICITY", "OTHER"),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Consumption",
            freezeTableName: true,
        }
    );

    return Consumption;
};

module.exports = consumptionInit(connection, DataTypes);
