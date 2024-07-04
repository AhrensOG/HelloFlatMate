"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");

const roleInit = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {

            // Relaciones
            Role.hasMany(User, { as: "users", foreignKey: "roleId" });

        }
    }
    Role.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.TEXT,
                autoIncrement: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Role",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return Role;
};

module.exports = roleInit(connection, DataTypes)