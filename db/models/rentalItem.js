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
            type: DataTypes.STRING, // 'Room' o 'Property'
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
            defaultValue: 'PENDING',
            allowNull: false
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