"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const LeaseOrder = require("./leaserOrder");
const Property = require("./property");
const Chat = require("./chat");

const ownerInit = (sequelize, DataTypes) => {
    class Owner extends User {
        static associate(models) {
            // Relaciones
            Owner.hasMany(LeaseOrder, { as: "leaseOrders", foreignKey: "owner_id" });
            Owner.hasMany(Chat, { as: "chats", foreignKey: "owner_id" });
            Owner.hasMany(Property, { as: "properties", foreignKey: "owner_id" });
        }
    }

    Owner.init(
        {
            sequelize,
            modelName: "Owner",
            freezeTableName: true,
            timestamps: true,
        }
    );


    return Owner
}

module.exports = ownerInit(connection, DataTypes)