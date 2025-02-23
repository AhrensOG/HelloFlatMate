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
            type: {
                type: DataTypes.ENUM("SUPPLY", "OTHERS"),
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
