"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");

const contractInit = (sequelize, DataTypes) => {
    class Contract extends Model { }

    Contract.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            contract: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Contract",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Contract
}

module.exports = contractInit(connection, DataTypes)