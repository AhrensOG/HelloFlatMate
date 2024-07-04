"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");
const ToDo = require("./toDo");

const adminInit = (sequelize, DataTypes) => {

    class Admin extends User {
        static associate(models) {

            // Relaciones
            Admin.hasMany(ToDo, { as: "toDos", foreignKey: "toDo_id" });
        }
    }

    Admin.init(
        {},
        {
            sequelize,
            modelName: "Admin",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return Admin
}

module.exports = adminInit(connection, DataTypes)