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

      category: {
        type: DataTypes.ENUM(
          "HELLO_LANDLORD",
          "HELLO_ROOM",
          "HELLO_COLIVING",
          "HELLO_STUDIO"
        ),
        allowNull: false,
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

      durationMonths: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      iban: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      rooms: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      // Si es HELLO_ROOM
      fixedMonthlyRentPerRoom: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      fixedMonthlyRentTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      // Servicios Premium contratados
      includesPremiumServices: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      // Datos administrativos
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      signedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      notifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      createdBy: {
        type: DataTypes.INTEGER,
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
