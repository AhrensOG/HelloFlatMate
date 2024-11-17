"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const supplyInit = (sequelize, DataTypes) => {
    class Supply extends Model { }

    Supply.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            paymentId: {
                type: DataTypes.STRING(200),
                allowNull: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM("WATER", "GAS", "ELECTRICITY", "EXPENSES", "INTERNET", "OTHERS"),
                allowNull: false
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            expirationDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("PENDING", "PAID", "NOT_PAID", "CANCELED"),
                allowNull: false
            },
            paymentDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            reference: {
                type: DataTypes.STRING,
                allowNull: true
            },
            discount: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
        },
        {
            sequelize,
            modelName: "Supply",
            freezeTableName: true,
            timestamps: false,
        }
    )
    return Supply
}

module.exports = supplyInit(connection, DataTypes)