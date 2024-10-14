"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const notificationInit = (sequelize, DataTypes) => {
  class Notification extends Model {}

  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      notifiableId: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      notifiableType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("CONTRACT_APPROVED", "PAYMENT_PENDING"),
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Notification",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Notification;
};

module.exports = notificationInit(connection, DataTypes);
