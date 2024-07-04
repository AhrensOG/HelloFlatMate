"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const Owner = require("./owner.js");
const Property = require("./property");
const Client = require("./client");

const leaserOrderInit = (sequelize, DataTypes) => {
    class LeaseOrder extends Model {
        static associate(models) {
            //Relaciones
            //Muchos a Uno
            LeaseOrder.belongsTo(Owner, { foreignKey: "owner_id", as: "owner" });
            LeaseOrder.belongsTo(Property, { foreignKey: "propert_id", as: "property" });
            LeaseOrder.belongsTo(Client, { foreignKey: "client_id", as: "client" });
        }
    }

    LeaseOrder.init({
        // CUSTOMIZED ID
        id: {
            type: DataTypes.TEXT,
            autoIncrement: false,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT(10, 2),
        }
    }, {
        sequelize,
        modelName: "LeaseOrder",
        freezeTableName: true,
        timestamps: true,
    });

    return LeaseOrder;
}

module.exports = leaserOrderInit(connection, DataTypes)