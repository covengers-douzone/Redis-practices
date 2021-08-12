const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

const sendMessage = function (msg) {
    $.ajax({
        url: "/api/chat",
        data: {
            sender: username,         // 나중에 변경해야할듯?
            message: msg,
            roomName: roomName.innerText
        },
        dataType: "json", // 받을 때 format
        type: "get", // 요청 method
        success: function (response) {

        }
    });
}

// Join chatroom
socket.emit('joinRoom', {username, room});

// Get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
});


// Message from server
socket.on('message', (message) => {
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get message text
    const msg = event.target.elements.msg.value;
    sendMessage(msg);

    // Clear input
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

// output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
  <p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>
  `;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM 
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../index.html';
    } else {
    }
});