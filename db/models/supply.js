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
            name: {
                type: DataTypes.STRING(100),
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
            status: {
                type: DataTypes.ENUM("PENDING", "PAID", "NOT_PAID"),
                allowNull: false
            },
            paymentDate: {
                type: DataTypes.DATE,
                allowNull: true
            }
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