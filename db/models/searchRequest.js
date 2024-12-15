"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const searchRequestInit = (sequelize, DataTypes) => {
  class SearchRequest extends Model {}

  SearchRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "NOTIFIED"),
        defaultValue: "PENDING",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      preferences: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zone: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      rentalPeriod: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM("MIXED", "ONLY_WOMEN", "ONLY_MEN"),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      numberOccupants: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "SearchRequest",
      timestamps: false,
    }
  );

  return SearchRequest;
};

module.exports = searchRequestInit(connection, DataTypes);
