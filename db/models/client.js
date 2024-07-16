"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const { User, userAttributes } = require("./user");


const clientInit = (sequelize, DataTypes) => {
    class Client extends User { }

    Client.init(
        {
            ...userAttributes,
            id_num: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            phone: {
                type: DataTypes.INTEGER,
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
            street_number: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            postal_code: {
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