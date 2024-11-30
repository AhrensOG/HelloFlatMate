"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const propertyInit = (sequelize, DataTypes) => {
    class Property extends Model {}

    Property.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            serial: {
                type: DataTypes.STRING(100),
                defaultValue: "...",
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            street: {
                type: DataTypes.STRING(700),
                allowNull: true,
            },
            streetNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            postalCode: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            floor: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            door: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            roomsCount: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            bathrooms: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            bed: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            maximunOccupants: {
                type: DataTypes.STRING(50),
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
            amountOwner: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            amountHelloflatmate: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            offer: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            IVA: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            puntuation: {
                type: DataTypes.ARRAY(DataTypes.FLOAT),
                allowNull: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("FREE", "RESERVED", "OCCUPIED", "DELETED"),
                defaultValue: "FREE",
                allowNull: false,
            },
            calendar: {
                type: DataTypes.ENUM("SIMPLE", "FULL"),
                defaultValue: "SIMPLE",
                allowNull: true,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: true,
            },
            linkVideo: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            amenities: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: true,
            },
            description: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: true,
            },
            incomeConditionDescription: {
                type: DataTypes.STRING(5500),
                allowNull: true,
            },
            roomDescription: {
                type: DataTypes.STRING(5500),
                allowNull: true,
            },
            feeDescription: {
                type: DataTypes.STRING(5500),
                allowNull: true,
            },
            maintenanceDescription: {
                type: DataTypes.STRING(5500),
                allowNull: true,
            },
            aboutUs: {
                type: DataTypes.STRING(5500),
                allowNull: true,
            },
            houseRules: {
                type: DataTypes.STRING(5500),
                allowNull: true,
            },
            checkIn: {
                type: DataTypes.STRING(5500),
                allowNull: true,
            },
            checkOut: {
                type: DataTypes.STRING(5500),
                allowNull: true,
            },
            tags: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Property",
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Property;
};

module.exports = propertyInit(connection, DataTypes);
