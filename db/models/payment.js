"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const paymentInit = (sequelize, DataTypes) => {
    class Payment extends Model { }

    Payment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED", "IN_PROGRESS"),
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("RESERVATION", "MONTHLY"),
            allowNull: false
        },
        paymentableId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        paymentableType: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        sequelize,
        modelName: "Payment",
        freezeTableName: true,
        timestamps: false
    })

    return Payment
}

module.exports = paymentInit(connection, DataTypes)