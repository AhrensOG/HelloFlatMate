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
            type: DataTypes.ENUM("PENDING", "READY_TO_SIGN", "APPROVED", "REJECTED", "IN_PROGRESS", "CANCELED", "FINISHED"),
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isSigned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        inReview: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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