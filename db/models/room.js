"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const roomInit = (sequelize, DataTypes) => {

    class Room extends Model { }

    Room.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
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
            image: {
                type: DataTypes.STRING(10000),
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
            modelName: "Room",
            freezeTableName: true,
            timestamps: false,
        }
    )
    return Room
}

module.exports = roomInit(connection, DataTypes)