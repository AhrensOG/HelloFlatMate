"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

class User extends Model {
}
const userAttributes = {

  // CUSTOMIZED ID
  id: {
    type: DataTypes.STRING(300),
    primaryKey: true,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,

  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  profilePicture: {
    type: DataTypes.STRING(10000),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("CLIENT", "OWNER", "ADMIN", "SUPPORT", "WORKER"),
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  emergencyName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  emergencyPhone: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  emergencyEmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  howMetUs: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
}


module.exports = { User, userAttributes };
