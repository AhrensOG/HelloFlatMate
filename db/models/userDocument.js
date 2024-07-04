"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");

const userDocumentInit = (sequelize, DataTypes) => {
    class UserDocument extends Model {
        static associate(models) {

            // Relaciones
            UserDocument.hasOne(User, { as: "user", foreignKey: "user_id" });
        }
    }

    UserDocument.init({
        id: {
            type: DataTypes.TEXT,
            autoIncrement: false,
            primaryKey: true,
        },
        documents: {
            type: DataTypes.Array(DataTypes.TEXT),
            allowNull: false,
        }
    },
        {
            sequelize,
            modelName: "UserDocument",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return UserDocument
}

module.exports = userDocumentInit(connection, DataTypes)