"use strict"
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const rentalPeriodInit = (sequelize, DataTypes) => {
    class RentalPeriod extends Model { }

    RentalPeriod.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
        {
            sequelize,
            modelName: "RentalPeriod",
            timestamps: false
        })

    return RentalPeriod
}

module.exports = rentalPeriodInit(connection, DataTypes)