const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io =
    global.io ||
    new Server(httpServer, {
      transports: ["websocket", "polling"], // Incluye ambos transportes
    });
  global.io = io;

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Evento para unirse a una sala
    socket.on("joinChat", (roomId, callback) => {
      handleJoinRoom(socket, roomId, callback);
    });

    // Evento para enviar mensajes
    socket.on("sendMessage", (message) => {
      handleSendMessage(io, message);
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

// Función para gestionar la unión a una sala
function handleJoinRoom(socket, roomId, callback) {
  const roomIdStr = roomId.toString();
  socket.join(roomIdStr);
  console.log(`User ${socket.id} joined room: ${roomIdStr}`);
  socket.emit("joinedRoom", `Te has unido a la sala ${roomIdStr}`);

  if (callback) {
    callback();
  }
}

// Función para gestionar el envío de mensajes
function handleSendMessage(io, message) {
  const { roomId, text, senderId } = message;
  const roomIdStr = roomId.toString();

  if (!roomIdStr || !text || !senderId) {
    console.error("Invalid message or room ID");
    return io.emit("error", "Invalid message or room ID");
  }

  console.log(`Message sent to room ${roomIdStr}: ${text} from ${senderId}`);
  io.to(roomIdStr).emit("newMessage", message); // Emitimos el mensaje con el senderId
}
