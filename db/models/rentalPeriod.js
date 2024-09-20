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
        status: {
            type: DataTypes.ENUM("FREE", "RESERVED", "OCCUPIED"),
            defaultValue: "FREE",
            allowNull: false
        },
        rentalPeriodableId: {
            type: DataTypes.INTEGER,
            defaultValue: "1",
            allowNull: false
        },
        rentalPeriodableType: {
            type: DataTypes.ENUM("PROPERTY", "ROOM"),
            defaultValue: "PROPERTY",
            allowNull: false
        }
    },
        {
            sequelize,
            modelName: "RentalPeriod",
            timestamps: false
        })

    return RentalPeriod
}

module.exports = rentalPeriodInit(connection, DataTypes)