"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const Owner = require("./owner.js");
const LeaseOrder = require("./leaserOrder.js");
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
            street_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            postal_code: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            bedrooms: {
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
            puntuation: {
                type: DataTypes.ARRAY(DataTypes.FLOAT),
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isBussy: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            category: {
                type: DataTypes.ENUM('HELLOROOM', 'HELLOSTUDIO', 'HELLOCOLIVING', 'HELLOLANDLORD'),
                allowNull: false,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },
            facilities: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },

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