"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const { User, userAttributes } = require("./user");


const workerInit = (sequelize, DataTypes) => {

    class Worker extends User { }

    Worker.init(
        {
            ...userAttributes
        },
        {
            sequelize,
            modelName: "Worker",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Worker
}

module.exports = workerInit(connection, DataTypes)