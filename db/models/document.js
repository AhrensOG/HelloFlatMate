"use strict";
const { DataTypes, Model } = require("sequelize");
const connection = require("../index");

const documentInit = (sequelize, DataTypes) => {
    class Document extends Model { }

    Document.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type: {
                type: DataTypes.ENUM("CONTRACT", "SIGNATURE", "DNI", "ROSTER", "PASSPORT"),
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            documentableId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            documentableType: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Document",
        }
    );
    return Document
}

module.exports = documentInit(connection, DataTypes)