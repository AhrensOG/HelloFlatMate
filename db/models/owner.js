"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const { userAttributes, User } = require("./user");

const ownerInit = (sequelize, DataTypes) => {
    class Owner extends User { }

    Owner.init(
        {
            ...userAttributes
        }, {
        sequelize,
        modelName: "Owner",
        freezeTableName: true,
        timestamps: false,
    }
    );


    return Owner
}

module.exports = ownerInit(connection, DataTypes)