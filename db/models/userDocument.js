"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");

const userDocumentInit = (sequelize, DataTypes) => {
    class UserDocument extends Model { }

    UserDocument.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        documents: {
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
            modelName: "UserDocument",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return UserDocument
}

module.exports = userDocumentInit(connection, DataTypes)