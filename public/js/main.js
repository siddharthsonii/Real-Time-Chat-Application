const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

socket.emit("joinRoom", { username, room });

// Recevied Message From The Server
socket.on("message", (message) => {
  outputMessage(message);
});

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Whatever Room Name is Provided In URL Should Be Updated Here
function outputRoomName(room) {
  roomName.innerText = room;
}

// Append New Online Users To The List
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    var allUsers = capitalizeFirstLetter(user.username);
    li.innerText = allUsers;
    userList.appendChild(li);
  });
}

function capitalizeFirstLetter(mainMsg) {
  return mainMsg.charAt(0).toUpperCase() + mainMsg.slice(1);
}

// Show Message Received From The Server
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("msg-bubble");

  const div0 = document.createElement("div");
  div0.classList.add("meta", "msg-info");

  const div1 = document.createElement("div");
  div1.classList.add("meta", "msg-info-name");
  var msgUsername = capitalizeFirstLetter(message.username);
  div1.innerText = msgUsername;
  div0.appendChild(div1);

  const div2 = document.createElement("div");
  div2.classList.add("meta", "msg-info-time");
  div2.innerText = message.time;
  div0.appendChild(div2);

  div.appendChild(div0);

  const div3 = document.createElement("div");
  div3.classList.add("meta", "chat-messages", "msg-text");

  const para = document.createElement("p");
  para.classList.add("text");
  var mainMsg = capitalizeFirstLetter(message.text);
  para.innerText = mainMsg;
  div3.appendChild(para);
  div.appendChild(div3);

  document.querySelector(".msg").appendChild(div);
}

// Adds Event Listener on Send Message Button Then Reterieve Message Value
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;

  // Sends a message to the server.
  socket.emit("chatMessage", msg);

  var name_element = document.getElementById("msg");
  name_element.value = "";
});

// Leave Room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");

  if (leaveRoom) {
    window.location = "../index.html";
  }
});
