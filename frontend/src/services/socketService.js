import { io } from "socket.io-client";

let socket = null;

export function connectSocket() {
    if (!socket) {
        socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3000", {
            autoConnect: true,
            reconnectionAttempts: 2,
            transports: ["websocket", "polling"],
        });
    }

    return socket;
}

export function getSocket() {
    return socket;
}

export function emitNewMessage(message) {
    if (socket?.connected) {
        socket.emit("new-message", message);
    }
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}
