"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const { User, userAttributes } = require("./user");


const clientInit = (sequelize, DataTypes) => {
    class Client extends User { }

    Client.init(
        {
            ...userAttributes
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