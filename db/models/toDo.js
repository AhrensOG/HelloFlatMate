"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const Client = require("./client");
const Property = require("./property");

const toDoInit = (sequelize, DataTypes) => {
    class ToDo extends Model {
        static associate(models) {

            //Relaciones
            //Muchos a Uno
            ToDo.belongsTo(Client, { as: "client", foreignKey: "client_id" });
            ToDo.belongsTo(Property, { as: "property", foreignKey: "property_id" });
        }
    }

    ToDo.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.TEXT,
                autoIncrement: false,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "ToDo",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return ToDo
}

module.exports = toDoInit(connection, DataTypes)