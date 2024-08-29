
const connection = require(".");
const Comment = require("./models/comment");
const Document = require("./models/document")
const Owner = require("./models/owner");
const Message = require("./models/message");
const Property = require("./models/property");
const LeaseOrderProperty = require("./models/leaseOrderProperty");
const LeaseOrderRoom = require("./models/leaseOrderRoom");
const Chat = require("./models/chat");
const ToDo = require("./models/toDo");
const Client = require("./models/client");
const Admin = require("./models/admin");
const Room = require("./models/room");
const Supply = require("./models/supply");
const { propertyData, testAdminData, testClientData, testOwnerData, testRoom } = require("./textData");

(async () => {
    try {
        // RELATIONSHIPS

        //OWNER
        Owner.hasMany(LeaseOrderRoom, { as: "leaseOrdersRoom", foreignKey: "ownerId" });
        Owner.hasMany(LeaseOrderProperty, { as: "leaseOrdersProperty", foreignKey: "ownerId" });
        Owner.hasMany(Chat, { as: "chats", foreignKey: "ownerId" });
        Owner.hasMany(Property, { as: "properties", foreignKey: "ownerId" });

        //PROPERTY
        Property.hasMany(Comment, { as: "comments", foreignKey: "propertyId" });
        Property.hasMany(Room, { as: "rooms", foreignKey: "propertyId" });
        Property.hasMany(LeaseOrderRoom, { as: "leaseOrdersRoom", foreignKey: "propertyId" });
        Property.belongsTo(Owner, { as: "owner", foreignKey: "ownerId" });
        Property.hasMany(LeaseOrderProperty, { as: "leaseOrdersProperty", foreignKey: "propertyId" });
        Property.hasMany(Supply, { as: "supplies", foreignKey: "propertyId" });


        //Room
        Room.belongsTo(Property, { as: "property", foreignKey: "propertyId" });
        Room.hasMany(LeaseOrderRoom, { as: "leaseOrdersRoom", foreignKey: "roomId" });

        //ToDo
        ToDo.belongsTo(Admin, { as: "admin", foreignKey: "adminId" });
        ToDo.belongsTo(Property, { as: "property", foreignKey: "propertyId" });


        //MESSAGE
        Message.belongsTo(Chat, { as: "chat", foreignKey: "chatId" });

        // LeaseOrderProperty
        LeaseOrderProperty.belongsTo(Owner, { foreignKey: "ownerId", as: "leaseOrderPropertyOwner" });
        LeaseOrderProperty.belongsTo(Property, { foreignKey: "propertyId", as: "property" }); // Usar el correcto foreignKey
        LeaseOrderProperty.belongsTo(Client, { foreignKey: "clientId", as: "client" });

        // LeaseOrderRoom
        LeaseOrderRoom.belongsTo(Room, { foreignKey: "roomId", as: "leaseOrderRoomRoom" });
        LeaseOrderRoom.belongsTo(Owner, { foreignKey: "ownerId", as: "leaseOrderRoomOwner" });
        LeaseOrderRoom.belongsTo(Property, { foreignKey: "propertyId", as: "leaseOrderRoomProperty" });
        LeaseOrderRoom.belongsTo(Client, { foreignKey: "clientId", as: "client" });

        //COMMENT
        Comment.belongsTo(Property, { as: "property", foreignKey: "propertyId" });
        Comment.belongsTo(Client, { as: "client", foreignKey: "clientId" });

        //CLIENT
        Client.hasMany(LeaseOrderProperty, { as: "leaseOrdersProperty", foreignKey: "clientId" });
        Client.hasMany(LeaseOrderRoom, { as: "leaseOrdersRoom", foreignKey: "clientId" });
        Client.hasMany(Chat, { as: "chats", foreignKey: "chatParticipant" });
        Client.hasMany(Supply, { as: "supplies", foreignKey: "clientId" });

        //CHAT
        // Uno a Muchos
        Chat.hasMany(Message, { as: "messages", foreignKey: "chatId" });
        Chat.hasMany(Client, { as: "participants", foreignKey: "chatId" });

        // Muchos a Uno
        Chat.belongsTo(Owner, { as: "owner", foreignKey: "ownerId" });

        //ADMIN
        Admin.hasMany(ToDo, { as: "toDos", foreignKey: "adminId" });

        //SUPPlY
        Supply.belongsTo(Property, { as: "property", foreignKey: "propertyId" });
        Supply.belongsTo(Client, { as: "client", foreignKey: "clientId" });

        //Relaciones polimorficas
        //Client
        Client.hasMany(Document, {
            foreignKey: "documentableId",
            constraints: false,
            scope: {
                documentableType: "CLIENT"
            }
        })
        //Owner
        Owner.hasMany(Document, {
            foreignKey: "documentableId",
            constraints: false,
            scope: {
                documentableType: "OWNER"
            }
        })

        //Documents
        Document.belongsTo(Owner, {
            as: "owner",
            foreignKey: "documentableId",
            constraints: false,
            scope: {
                documentableType: "OWNER"
            }
        })

        Document.belongsTo(Client, {
            as: "client",
            foreignKey: "documentableId",
            constraints: false,
            scope: {
                documentableType: "CLIENT"
            }
        })

        //ToDo

        ToDo.belongsTo(Owner, {
            as: "owner",
            foreignKey: "userId",
            constraints: false,
            scope: {
                typeUser: "OWNER"
            }
        });

        ToDo.belongsTo(Client, {
            as: "client",
            foreignKey: "userId",
            constraints: false,
            scope: {
                typeUser: "CLIENT"
            }
        });

        Client.hasMany(ToDo, {
            as: "toDos",
            foreignKey: "userId",
            constraints: false,
            scope: {
                typeUser: "CLIENT"
            }
        });

        Owner.hasMany(ToDo, {
            as: "toDos",
            foreignKey: "userId",
            constraints: false,
            scope: {
                typeUser: "OWNER"
            }
        });


        // await connection.drop({ cascade: true })
        await connection.sync({ alter: true });
        console.log("Initializing DB");

        // DATA DE PRUEBA

        // await Property.bulkCreate(propertyData)
        // await Client.bulkCreate(testClientData)
        // await Admin.bulkCreate(testAdminData)
        // await Owner.bulkCreate(testOwnerData)
        // await Room.bulkCreate(testRoom)

        // console.log("Data inserted")
        // const result = await Client.findByPk("4ImLe5vacWah6ddc9D4djcY1UZA2", {
        //     include: [
        //         {
        //             model: ToDo,
        //             as: "toDos"
        //         }
        //     ]
        // })
        // console.log(result.toJSON());

    } catch (error) {
        console.log(error);
    }
})();

module.exports = {
    Comment,
    Owner,
    Document,
    Message,
    Property,
    LeaseOrderProperty,
    LeaseOrderRoom,
    Chat,
    Client,
    Admin,
    ToDo,
    Room,
    Supply
};
