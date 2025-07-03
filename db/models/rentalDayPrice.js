"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const rentalDayPriceInit = (sequelize, DataTypes) => {
  class RentalDayPrice extends Model {}

  RentalDayPrice.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RentalDayPrice",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return RentalDayPrice;
};

module.exports = rentalDayPriceInit(connection, DataTypes);
