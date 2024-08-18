const connection = require(".");
const Comment = require("./models/comment");
const Contract = require("./models/contract");
const Owner = require("./models/owner");
const Document = require("./models/userDocument");
const Message = require("./models/message");
const Property = require("./models/property");
const LeaseOrder = require("./models/leaseOrder");
const Chat = require("./models/chat");
const ToDo = require("./models/toDo");
const Client = require("./models/client");
const Admin = require("./models/admin");
const Room = require("./models/room");
const { propertyData, testAdminData, testClientData, testOwnerData, testRoom } = require("./textData");

(async () => {
  try {
    // RELATIONSHIPS

    //OWNER
    Owner.hasMany(LeaseOrder, { as: "leaseOrders", foreignKey: "ownerId" });
    Owner.hasMany(Chat, { as: "chats", foreignKey: "ownerId" });
    Owner.hasMany(Property, { as: "properties", foreignKey: "ownerId" });

    //PROPERTY
    Property.hasMany(LeaseOrder, { as: "leaseOrders", foreignKey: "propertyId" });
    Property.hasMany(Comment, { as: "comments", foreignKey: "propertyId" });
    Property.hasMany(Room, { as: "rooms", foreignKey: "propertyId" });

    Property.belongsTo(Owner, { as: "owner", foreignKey: "ownerId" });

    //Room
    Room.belongsTo(Property, { as: "property", foreignKey: "propertyId" });

    //ToDo
    ToDo.belongsTo(Client, { as: "client", foreignKey: "clientId" });
    ToDo.belongsTo(Property, { as: "property", foreignKey: "propertyId" });
    ToDo.belongsTo(Admin, { as: "admin", foreignKey: "adminId" });

    //MESSAGE
    Message.belongsTo(Chat, { as: "chat", foreignKey: "chatId" });

    //leaseOrder
    LeaseOrder.belongsTo(Owner, { foreignKey: "ownerId", as: "owner" });
    LeaseOrder.belongsTo(Property, { foreignKey: "propertyId", as: "property" });
    LeaseOrder.belongsTo(Client, { foreignKey: "clientId", as: "client" });

    //COMMENT
    Comment.belongsTo(Property, { as: "property", foreignKey: "propertyId" });
    Comment.belongsTo(Client, { as: "client", foreignKey: "clientId" });

    //CLIENT
    Client.hasMany(LeaseOrder, { as: "leaseOrders", foreignKey: "clientId" });
    Client.hasMany(ToDo, { as: "toDos", foreignKey: "clientId" });
    Client.hasMany(Chat, { as: "chats", foreignKey: "chatParticipant" });

    //CHAT
    // Uno a Muchos
    Chat.hasMany(Message, { as: "messages", foreignKey: "chatId" });
    Chat.hasMany(Client, { as: "participants", foreignKey: "chatId" });

    // Muchos a Uno
    Chat.belongsTo(Owner, { as: "owner", foreignKey: "ownerId" });

    //ADMIN
    Admin.hasMany(ToDo, { as: "toDos", foreignKey: "toDoId" });

    await connection.sync({ alter: true });
    console.log("Initializing DB");

    //     // DATA DE PRUEBA
    //     await Property.bulkCreate(propertyData)
    //     await Client.bulkCreate(testClientData)
    //     await Admin.bulkCreate(testAdminData)
    //     await Owner.bulkCreate(testOwnerData)
    //     await Room.bulkCreate(testRoom)


    //     console.log("Data inserted");
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
  LeaseOrder,
  Chat,
  Client,
  Admin,
  ToDo,
  Room
};