const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");
const { log } = require("node:console");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        transports: ["websocket", "polling"], // Incluye ambos transportes
    });

    io.on("connection", (socket) => {
        console.log("a user connected");

        socket.on("joinChat", (chatId, callback) => {
            socket.join(chatId);
            console.log("User joined room: " + chatId);

            // Emitir una confirmación
            socket.emit("joinedRoom", "Te has unido a la sala " + chatId);
            //callback
            if (callback) {
                callback();
            }
        });

        socket.on("sendMessage", (message) => {
            const chatId = message.chatId;
            console.log("Message received in room " + chatId + ": " + message.body);

            // Emitir el mensaje a la sala especificada
            io.to(chatId).emit("prueba", "hola")
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });

    httpServer.once("error", (err) => {
        console.log(err);
        process.exit(1);
    }).listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
