const moment = require("moment");

const roomUsers = [];

// When You Click on Start Chat
// Creates New User
function newUser(id, username, room) {
  const user = { id, username, room };
  roomUsers.push(user);
  return user;
}

// Format Message
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a")
  };
}

// Gets Users of Individual Room
function getIndividualRoomUsers(room) {
  return roomUsers.filter((user) => user.room === room);
}

// Get Active Users List In A Specific Room
function getActiveUser(id) {
  return roomUsers.find((user) => user.id === id);
}

// Exit From A Specific Room
function exitRoom(id) {
  const index = roomUsers.findIndex((user) => user.id === id);
  if (index !== -1) {
    return roomUsers.splice(index, 1)[0];
  }
}

module.exports = {
  newUser,
  formatMessage,
  getIndividualRoomUsers,
  getActiveUser,
  exitRoom
};
