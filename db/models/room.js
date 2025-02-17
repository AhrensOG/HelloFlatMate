"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const roomInit = (sequelize, DataTypes) => {
    class Room extends Model {}

    Room.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            floor: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            door: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            zone: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            typology: {
                type: DataTypes.ENUM("MIXED", "ONLY_WOMEN", "ONLY_MEN"),
                allowNull: true,
            },
            description: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
                allowNull: true,
            },
            amountOwner: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            amountHelloflatmate: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            IVA: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
            serial: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            numberBeds: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            linkVideo: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("FREE", "RESERVED", "OCCUPIED", "DELETED"),
                defaultValue: "FREE",
                allowNull: true,
            },
            calendar: {
                type: DataTypes.ENUM("SIMPLE", "FULL"),
                defaultValue: "SIMPLE",
                allowNull: true,
            },
            bathroom: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            couple: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            tags: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Room",
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Room;
};

module.exports = roomInit(connection, DataTypes);
