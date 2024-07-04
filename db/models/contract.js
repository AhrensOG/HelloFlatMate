"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");

const contractInit = (sequelize, DataTypes) => {
    class Contract extends Model {
        static associate(models) {
            // Relaciones
            Contract.belongsTo(User, { as: "user", foreignKey: "userId" });

        }
    }

    Contract.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.TEXT,
                autoIncrement: false,
                primaryKey: true,
            },
            contract: {
                type: DataTypes.Array(DataTypes.TEXT),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Contract",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return Contract
}

module.exports = contractInit(connection, DataTypes)