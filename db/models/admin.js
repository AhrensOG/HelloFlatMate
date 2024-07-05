"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const { User, userAttributes } = require("./user");


const adminInit = (sequelize, DataTypes) => {

    class Admin extends User { }

    Admin.init(
        {
            ...userAttributes
        },
        {
            sequelize,
            modelName: "Admin",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Admin
}

module.exports = adminInit(connection, DataTypes)