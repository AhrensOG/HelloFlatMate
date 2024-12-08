"use strict";

const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const categoryInit = (sequelize, DataTypes) => {
    class Category extends Model {}

    Category.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Category",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Category;
};

module.exports = categoryInit(connection, DataTypes);
