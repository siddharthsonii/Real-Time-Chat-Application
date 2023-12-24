const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const {
  newUser,
  formatMessage,
  getIndividualRoomUsers,
  getActiveUser,
  exitRoom
} = require("./helper/helper");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {

  // Listens for a specific event (joinRoom) from the client.
  socket.on("joinRoom", ({ username, room }) => {
    // New user is creater in Helper File
    const user = newUser(socket.id, username, room);
    // console.log(`created new user with Socket ID - ${socket.id}`);

    // Adds the client to a specific room
    socket.join(user.room);

    // Sends a message to the client. (Will be Shown to New User Only in Starting)
    socket.emit(
      "message",
      formatMessage("Aitribe", "Messages are limited to this room")
    );

    // Sends a message to all clients except the sender.
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("Aitribe", `${user.username} has joined the room`)
      );

    // Sends a Live Updated Data List to all clients in a specific room.
    io.to(user.room).emit("roomUsers", {
      room: user.room, // Current Room Name
      users: getIndividualRoomUsers(user.room) // All Online User In That Room
    });
  });

  // Listens for a specific event (chatMessage) from the client.
  socket.on("chatMessage", (msg) => {
    const user = getActiveUser(socket.id);
    // console.log(`Active User on Message - ${socket.id}`);

    // Sends a message to all clients in a specific room.
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Listens for a specific event (chatMessage) from the client.
  socket.on("disconnect", () => {
    const user = exitRoom(socket.id);

    // Sends a message to all clients in a specific room.
    io.to(user.room).emit(
      "message",
      formatMessage("Aitribe", `${user.username} has left the room`)
    );

    // Update Room Users to all clients in a specific room.
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getIndividualRoomUsers(user.room)
    });
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log("Server is running");
});
