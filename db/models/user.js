"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const Comment = require("./comment");
const Contract = require("./Contract");
const Document = require("./UserDocument");
const Message = require("./Message");
const Role = require("./Role");

const userInit = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Relaciones
      //Uno a Muchos
      this.hasMany(Comment, { foreignKey: "user_id", as: "comments" });
      this.hasMany(Contract, { foreignKey: "user_id", as: "contracts" });
      this.hasOne(Document, { foreignKey: "user_id", as: "documents" });
      this.hasMany(Message, { foreignKey: "user_id", as: "messages" });

      //Muchos a Uno
      User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
    }
  }
  User.init(
    {
      // CUSTOMIZED ID
      id: {
        type: DataTypes.TEXT,
        autoIncrement: false,
        primaryKey: true,
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
      },
      password: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
          model: Role,
          key: "id",
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      timestamps: true,
    }
  );
  return User;
};

module.exports = userInit(connection, DataTypes);
