import { io } from 'socket.io-client'

const isBrowser = typeof window !== "undefined";

export const socket = isBrowser ? io({
    transports: ["polling", "websocket"], // Permite ambos transportes
}) : {};