import { createServer } from "node:http"
import next from "next"
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        transports: ["polling", "websocket"]
    });

    io.on("connection", (socket) => {
        console.log("a user connected");

        socket.on("disconnect", () => {
            console.log("user disconnected");
        })

        socket.on("message", (message) => {
            console.log("message: " + message);
            socket.emit("message", message);
        })
    });


    httpServer.once("error", err => {
        console.log(err);
        process.exit(1);
    }).listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
})