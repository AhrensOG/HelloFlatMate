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
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            numberBeds: {
                type: DataTypes.INTEGER,
                allowNull: false,
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