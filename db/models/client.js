"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const { User, userAttributes } = require("./user");


const clientInit = (sequelize, DataTypes) => {
    class Client extends User { }

    Client.init(
        {
            ...userAttributes,
            idNum: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            birthDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            street: {
                type: DataTypes.STRING(700),
                allowNull: true,
            },
            streetNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            postalCode: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            signature: {
                type: DataTypes.STRING(500),
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: "Client",
            freezeTableName: true,
            timestamps: false,
        }
    );


    return Client
}

module.exports = clientInit(connection, DataTypes)