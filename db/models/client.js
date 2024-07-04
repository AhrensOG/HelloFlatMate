"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const User = require("./user");


const clientInit = (sequelize, DataTypes) => {
    class Client extends User {
        static associate(models) {
            // Relaciones
            Client.hasMany(LeaseOrder, { as: "leaseOrders", foreignKey: "client_id" });
            Client.hasMany(ToDo, { as: "toDos", foreignKey: "client_id" });
            Client.hasMany(Chat, { as: "chats", foreignKey: "chat_participant" });
        }
    }

    Client.init(
        {
            sequelize,
            modelName: "Client",
            freezeTableName: true,
            timestamps: true,
        }
    );


    return Client
}

module.exports = ownerInit(connection, DataTypes)