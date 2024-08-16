"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");
const Property = require("./propertyWithPrice");

const commentInit = (sequelize, DataTypes) => {

    class Comment extends Model { }

    Comment.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
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
            timestamps: false,
        }
    );

    return Comment
}

module.exports = commentInit(connection, DataTypes)