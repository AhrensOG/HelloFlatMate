"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");
const Property = require("./property");

const commentInit = (sequelize, DataTypes) => {

    class Comment extends Model {
        static associate(models) {
            // Relaciones
            //Muchos a Uno
            Comment.belongsTo(Property, { as: "property", foreignKey: "property_id" });
            Comment.belongsTo(User, { as: "user", foreignKey: "user_id" });
        }
    }

    Comment.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.TEXT,
                autoIncrement: false,
                primaryKey: true,
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
            modelName: "Comment",
            freezeTableName: true,
            timestamps: true,
        }
    );

    return Comment
}

module.exports = commentInit(connection, DataTypes)