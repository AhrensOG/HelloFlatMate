"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const leaserOrderPropertyInit = (sequelize, DataTypes) => {
    class LeaseOrderProperty extends Model { }

    LeaseOrderProperty.init({
        // CUSTOMIZED ID
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "LeaseOrderProperty",
        freezeTableName: true,
        timestamps: false,
    });

    return LeaseOrderProperty;
}

module.exports = leaserOrderPropertyInit(connection, DataTypes)