"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./comment");

const rentPaymentInit = (sequelize, DataTypes) => {
    class RentPayment extends Model {}

    RentPayment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
                defaultValue: "PENDING",
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM("RESERVATION", "MONTHLY"),
                allowNull: false,
            },
            quotaNumber: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            paymentableId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            paymentableType: {
                type: DataTypes.ENUM("PROPERTY", "ROOM"),
                allowNull: false,
            },
            leaseOrderId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            leaseOrderType: {
                type: DataTypes.ENUM("PROPERTY", "ROOM"),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "RentPayment",
            timestamps: false,
        }
    );

    return RentPayment;
};

module.exports = rentPaymentInit(sequelize, DataTypes);
