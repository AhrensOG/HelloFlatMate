"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const { userAttributes, User } = require("./user");

const ownerInit = (sequelize, DataTypes) => {
    class Owner extends User {}

    Owner.init(
        {
            ...userAttributes,
            idNum: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            IBAN: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Owner",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Owner;
};

module.exports = ownerInit(connection, DataTypes);
