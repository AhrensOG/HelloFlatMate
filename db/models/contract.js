"use strict"
const { Model, DataTypes } = require("sequelize")
const connection = require("../index")

const contractInit = (sequelize, DataTypes) => {
    class Contract extends Model { }

    Contract.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
            defaultValue: 'PENDING',
            allowNull: false
        },
        contractableId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contractableType: {
            type: DataTypes.ENUM('PROPERTY', 'ROOM'),
            allowNull: false
        },
        leaseOrderId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        leaseOrderType: {
            type: DataTypes.ENUM('PROPERTY', 'ROOM'),
            allowNull: true
        },
    },
        {
            sequelize,
            modelName: "Contract",
            freezeTableName: true,
            timestamps: false
        })

    return Contract
}

module.exports = contractInit(connection, DataTypes)