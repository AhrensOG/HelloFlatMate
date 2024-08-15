"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const Owner = require("./owner.js");
const LeaseOrder = require("./leaseOrder.js");
const Comment = require("./comment.js");
const ToDo = require("./toDo.js");

const propertyInit = (sequelize, DataTypes) => {
    class Property extends Model { }

    Property.init(
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
            city: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            street: {
                type: DataTypes.STRING(700),
                allowNull: false,
            },
            streetNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            postalCode: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            roomsCount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bathrooms: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bed: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            maximunOccupants: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            amountOwner: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            amountHelloflatmate: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            offer: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            puntuation: {
                type: DataTypes.ARRAY(DataTypes.FLOAT),
                allowNull: false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("FREE", "RESERVED", "OCCUPIED"),
                defaultValue: "FREE",
                allowNull: false
            },
            category: {
                type: DataTypes.ENUM('HELLO_ROOM', 'HELLO_STUDIO', 'HELLO_COLIVING', 'HELLO_LANDLORD'),
                allowNull: false,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },
            amenities: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },
            description: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },
            incomeConditionDescription: {
                type: DataTypes.STRING(5500),
                allowNull: true
            },
            roomDescription: {
                type: DataTypes.STRING(5500),
                allowNull: true
            },
            feeDescription: {
                type: DataTypes.STRING(5500),
                allowNull: true
            },
            maintenanceDescription: {
                type: DataTypes.STRING(5500),
                allowNull: true
            },
            aboutUs: {
                type: DataTypes.STRING(5500),
                allowNull: true
            },
            houseRules: {
                type: DataTypes.STRING(5500),
                allowNull: true
            },
            checkIn: {
                type: DataTypes.STRING(5500),
                allowNull: true
            },
            checkOut: {
                type: DataTypes.STRING(5500),
                allowNull: true
            }

        },
        {
            sequelize,
            modelName: "Property",
            freezeTableName: true,
            timestamps: false,
        }
    )
    return Property
}

module.exports = propertyInit(connection, DataTypes)