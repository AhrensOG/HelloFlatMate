"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const userInit = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      // CUSTOMIZED ID
      // id: {
      //   type: DataTypes.TEXT,
      //   autoIncrement: false,
      //   primaryKey: true,
      // },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};

module.exports = userInit(connection, DataTypes);
