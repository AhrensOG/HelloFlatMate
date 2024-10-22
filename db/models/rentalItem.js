'use strict';
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const rentalItemInit = (sequelize, DataTypes) => {
    class RentalItem extends Model { }

    RentalItem.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        relatedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        relatedType: {
            type: DataTypes.ENUM('ROOM', 'PROPERTY'), // 'Room' o 'Property'
            allowNull: false,
        },
        isFree: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'RentalItem',
        freezeTableName: true,
        timestamps: false
    })

    return RentalItem
}

module.exports = rentalItemInit(connection, DataTypes)