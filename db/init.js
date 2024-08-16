const connection = require(".");
const Comment = require("./models/comment");
const Contract = require("./models/contract");
const Owner = require("./models/owner");
const Document = require("./models/userDocument");
const Message = require("./models/message");
const Property = require("./models/property");
const LeaseOrderProperty = require("./models/leaseOrderProperty");
const LeaseOrderRoom = require("./models/leaseOrderRoom");
const Chat = require("./models/chat");
const ToDo = require("./models/toDo");
const Client = require("./models/client");
const Admin = require("./models/admin");
const Room = require("./models/room");
const PropertyWithPrice = require("./models/propertyWithPrice");
const RoomWithPrice = require("./models/roomWithPrice");
const { propertyWithPriceData, testAdminData, testClientData, testOwnerData, testRoom, roomWithPriceData, propertyData } = require("./textData");

(async () => {
    try {
        // RELATIONSHIPS

        // OWNER
        Owner.hasMany(LeaseOrderRoom, { as: "leaseOrdersRoom", foreignKey: "ownerId" });
        Owner.hasMany(LeaseOrderProperty, { as: "leaseOrdersProperty", foreignKey: "ownerId" });
        Owner.hasMany(Chat, { as: "chats", foreignKey: "ownerId" });
        Owner.hasMany(Property, { as: "properties", foreignKey: "ownerId" });
        Owner.hasMany(PropertyWithPrice, { as: "propertyWithPrices", foreignKey: "ownerId" }); // Cambiado el alias para evitar conflicto

        // PROPERTY
        Property.hasMany(Comment, { as: "comments", foreignKey: "propertyId" });
        Property.hasMany(RoomWithPrice, { as: "roomsWithPrice", foreignKey: "propertyId" });
        Property.belongsTo(Owner, { as: "propertyOwner", foreignKey: "ownerId" }); // Cambiado el alias a "propertyOwner" para evitar conflicto
        Property.hasMany(LeaseOrderRoom, { as: "leaseOrdersRoom", foreignKey: "propertyId" });

        // PROPERTY WITH PRICE
        PropertyWithPrice.hasMany(LeaseOrderProperty, { as: "leaseOrdersPropertyWithPrice", foreignKey: "propertyWithPriceId" });
        PropertyWithPrice.hasMany(Comment, { as: "propertyWithPriceComments", foreignKey: "propertyWithPriceId" });
        PropertyWithPrice.hasMany(Room, { as: "rooms", foreignKey: "propertyWithPriceId" });
        PropertyWithPrice.belongsTo(Owner, { as: "propertyWithPriceOwner", foreignKey: "ownerId" }); // Cambiado el alias a "propertyWithPriceOwner" para evitar conflicto

        // ROOM
        Room.belongsTo(PropertyWithPrice, { as: "propertyWithPrice", foreignKey: "propertyWithPriceId" });

        // ROOM WITH PRICE
        RoomWithPrice.belongsTo(Property, { as: "property", foreignKey: "propertyId" });
        RoomWithPrice.hasMany(LeaseOrderRoom, { as: "leaseOrdersRoomWithPrice", foreignKey: "roomWithPriceId" });

        // ToDo
        ToDo.belongsTo(Client, { as: "client", foreignKey: "clientId" });
        ToDo.belongsTo(Property, { as: "property", foreignKey: "propertyId" });
        ToDo.belongsTo(Admin, { as: "admin", foreignKey: "adminId" });

        // MESSAGE
        Message.belongsTo(Chat, { as: "chat", foreignKey: "chatId" });

        // LeaseOrderProperty
        LeaseOrderProperty.belongsTo(Owner, { foreignKey: "ownerId", as: "leaseOrderPropertyOwner" });
        LeaseOrderProperty.belongsTo(PropertyWithPrice, { foreignKey: "propertyWithPriceId", as: "leaseOrderProperty" }); // Usar el correcto foreignKey
        LeaseOrderProperty.belongsTo(Client, { foreignKey: "clientId", as: "leaseOrderPropertyClient" });

        // LeaseOrderRoom
        LeaseOrderRoom.belongsTo(RoomWithPrice, { foreignKey: "roomWithPriceId", as: "leaseOrderRoomRoom" });
        LeaseOrderRoom.belongsTo(Owner, { foreignKey: "ownerId", as: "leaseOrderRoomOwner" });
        LeaseOrderRoom.belongsTo(Property, { foreignKey: "propertyId", as: "leaseOrderRoomProperty" });
        LeaseOrderRoom.belongsTo(Client, { foreignKey: "clientId", as: "leaseOrderRoomClient" });

        // COMMENT
        Comment.belongsTo(Property, { as: "property", foreignKey: "propertyId" });
        Comment.belongsTo(Client, { as: "client", foreignKey: "clientId" });

        // CLIENT
        Client.hasMany(LeaseOrderProperty, { as: "leaseOrdersProperty", foreignKey: "clientId" });
        Client.hasMany(LeaseOrderRoom, { as: "leaseOrdersRoom", foreignKey: "clientId" });
        Client.hasMany(ToDo, { as: "toDos", foreignKey: "clientId" });
        Client.hasMany(Chat, { as: "chats", foreignKey: "chatParticipant" });

        // CHAT
        Chat.hasMany(Message, { as: "messages", foreignKey: "chatId" });
        Chat.hasMany(Client, { as: "participants", foreignKey: "chatId" });
        Chat.belongsTo(Owner, { as: "chatOwner", foreignKey: "ownerId" }); // Cambiado el alias a "chatOwner"

        // ADMIN
        Admin.hasMany(ToDo, { as: "toDos", foreignKey: "adminId" });

        await connection.sync({ alter: true });
        console.log("Initializing DB");

        // DATA DE PRUEBA
        // await Property.bulkCreate(propertyData);
        // await PropertyWithPrice.bulkCreate(propertyWithPriceData);
        // await Client.bulkCreate(testClientData);
        // await Admin.bulkCreate(testAdminData);
        // await Owner.bulkCreate(testOwnerData);
        // await Room.bulkCreate(testRoom);
        // await RoomWithPrice.bulkCreate(roomWithPriceData);

        // console.log("Data inserted");
    } catch (error) {
        console.log(error);
    }
})();

module.exports = {
    Comment,
    Contract,
    Owner,
    Document,
    Message,
    Property,
    LeaseOrderRoom,
    LeaseOrderProperty,
    Chat,
    Client,
    Admin,
    ToDo,
    Room,
    PropertyWithPrice,
    RoomWithPrice
};
