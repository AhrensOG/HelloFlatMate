"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const leaserOrderRoomInit = (sequelize, DataTypes) => {
    class LeaseOrderRoom extends Model { }

    LeaseOrderRoom.init({
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
            type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED", "IN_PROGRESS"),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "LeaseOrderRoom",
        freezeTableName: true,
        timestamps: false,
    });
    return LeaseOrderRoom;
}

module.exports = leaserOrderRoomInit(connection, DataTypes)