"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");
const Owner = require("./owner.js");
const LeaseOrder = require("./leaserOrder.js");
const Comment = require("./comment.js");
const ToDo = require("./toDo.js");

const propertyInit = (sequelize, DataTypes) => {
    class Property extends Model {
        static associate(models) {
            // Relaciones
            //Uno a Muchos
            Property.hasMany(LeaseOrder, { as: "leaseOrders", foreignKey: "propert_id" });
            Property.hasMany(Comment, { as: "comments", foreignKey: "property_id" });
            Property.hasMany(ToDo, { as: "toDos", foreignKey: "propertyId" });
            Property.hasMany(ToDo, { as: "toDos", foreignKey: "propertyId" });

            //Muchos a Uno
            Property.belongsTo(Owner, { as: "owner", foreignKey: "owner_id" });
        }
    }

    Property.init(
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
            location: {
                type: DataTypes.STRING(700),
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            bedrooms: {
                type: DataTypes.INTERGER,
                allowNull: false,
            },
            bathrooms: {
                type: DataTypes.INTERGER,
                allowNull: false,
            },
            bed: {
                type: DataTypes.INTERGER,
                allowNull: false,
            },
            maximunOccupants: {
                type: DataTypes.INTERGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            puntuation: {
                type: DataTypes.ARRAY(DataTypes.FLOAT),
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isBussy: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            category: {
                type: DataTypes.ENU('helloroom', 'hellocoliving', 'hellostudio', 'hellolandlord'),
                allowNull: false,
            },
            images: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },
            facilities: {
                type: DataTypes.ARRAY(DataTypes.TEXT),
                allowNull: false,
            },

        }
    )
    return Property
}

module.exports = propertyInit(connection, DataTypes)