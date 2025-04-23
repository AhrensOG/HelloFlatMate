"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const ownerContractInit = (sequelize, DataTypes) => {
  class OwnerContract extends Model {}

  OwnerContract.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      status: {
        type: DataTypes.ENUM(
          "PENDING",
          "IN_PROGRESS",
          "ACTIVE",
          "CANCELLED",
          "FINISHED"
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },

      isSigned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      originalPdfUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      signedPdfUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      ownerSignature: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      ownerFdoData: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      hfmFdoData: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      signedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "OwnerContract",
      freezeTableName: true,
      timestamps: true,
    }
  );

  return OwnerContract;
};

module.exports = ownerContractInit(connection, DataTypes);
