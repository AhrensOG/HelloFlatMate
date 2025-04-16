"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const toDoInit = (sequelize, DataTypes) => {
    class ToDo extends Model { }

    ToDo.init(
        {
            // CUSTOMIZED ID
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            creationDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            type: {
                type: DataTypes.ENUM("CLEAN", "REPAIR"),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"),
                allowNull: false,
            },
            comment: {
                type: DataTypes.STRING(1000),
                allowNull: true,
            },
            clientMessage: {
                type: DataTypes.STRING(1000),
                allowNull: true,
            },
            isPresent: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            userId: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            typeUser: {
                type: DataTypes.ENUM("CLIENT", "OWNER"),
                allowNull: false,
            },
            leaseOrderId: {
              type: DataTypes.INTEGER,
              allowNull: true
            },
            cancellationReason: {
              type: DataTypes.STRING(1000),
              allowNull: true,
            },
            imageUrl: {
              type: DataTypes.STRING(),
              allowNull: true,
            },
            preferredTimeSlot: {
              type: DataTypes.ENUM("MORNING", "AFTERNOON", "EVENING"),
              allowNull: true,
            },
            incidentSite: {
              type: DataTypes.ENUM("MY_ROOM", "KITCHEN", "LIVING_ROOM", "WC1", "WC2", "HALLWAY_COMMON_AREAS", "OTHERS"),
              allowNull: true,
            },
            incidentType: {
              type: DataTypes.ENUM("ELECTRICITY", "CARPENTRY", "LOCKSMITHING", "PLUMBING", "GLAZING", "WIFI", "APPLIANCES", "FURNITURE", "OTHERS"),
              allowNull: true,
            },
            emergency: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
            },
            reprogrammed: {
              type: DataTypes.BOOLEAN,
              allowNull: true,
            },
            reprogrammedStartDate: {
              type: DataTypes.DATE,
              allowNull: true,
            },
            reprogrammedEndDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            reprogramingComment: {
              type: DataTypes.STRING(1000),
              allowNull: true,
            },
            closingComments: {
              type: DataTypes.STRING(1000),
              allowNull: true,
            },
            responsibility: {
              type: DataTypes.ENUM("CLIENT", "OWNER"),
              allowNull: true,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "ToDos",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return ToDo
}

module.exports = toDoInit(connection, DataTypes)