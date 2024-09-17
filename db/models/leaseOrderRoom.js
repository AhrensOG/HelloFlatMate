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
        modelName: "LeaseOrderRoom",
        freezeTableName: true,
        timestamps: false,
    });
    return LeaseOrderRoom;
}

module.exports = leaserOrderRoomInit(connection, DataTypes)