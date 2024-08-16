"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const roomWithPriceInit = (sequelize, DataTypes) => {

    class RoomWithPrice extends Model { }

    RoomWithPrice.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            amountOwner: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            amountHelloflatmate: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            serial: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            numberBeds: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("FREE", "RESERVED", "OCCUPIED"),
                defaultValue: "FREE",
                allowNull: false
            },
            bathroom: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            couple: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        },
        {
            sequelize,
            modelName: "RoomWithPrice",
            freezeTableName: true,
            timestamps: false,
        }
    )
    return RoomWithPrice
}

module.exports = roomWithPriceInit(connection, DataTypes)