"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const leaserOrderInit = (sequelize, DataTypes) => {
    class LeaseOrder extends Model { }

    LeaseOrder.init({
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
        modelName: "LeaseOrder",
        freezeTableName: true,
        timestamps: false,
    });

    return LeaseOrder;
}

module.exports = leaserOrderInit(connection, DataTypes)