$(function () {
    // Get username and room from URL
    const {username, room} = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const chatForm = $('#chat-form');
    const roomName = $('#room-name');
    const userList = $('#users');
    const chatMessages = $('.chat-messages');

    // 방에 처음 들어왔을 때
    // update status : true
    $.ajax({
        url: "/api/status",
        data: {
            userName: username,         // 나중에 변경해야할듯?
            roomName: room,
            status: true
        },
        dataType: "json", // 받을 때 format
        type: "get", // 요청 method
        success: function (response) {
            console.log('success');
        }
    });

    const socket = io();

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
        chatMessages.scrollTop(chatMessages.prop('scrollHeight'));
    });

    // Message submit
    chatForm.submit((event) => {
        event.preventDefault();

        // Get message text
        const msg = event.target.elements.msg.value;
        sendMessage(msg);

        // Clear input
        event.target.elements.msg.value = '';
        event.target.elements.msg.focus();
    });

    //Prompt the user before leave chat room
    $('#leave-btn').click(() => {
        const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
        if (leaveRoom) {
            // update status : false
            $.ajax({
                url: "/api/status",
                data: {
                    userName: username,         // 나중에 변경해야할듯?
                    roomName: room,
                    status: false
                },
                dataType: "json", // 받을 때 format
                type: "get", // 요청 method
                success: function (response) {
                    console.log('success');
                }
            });
            window.location = '../index.html';
        } else {
        }
    });

    /* FUNCTIONs */

    // call sendMessage api
    const sendMessage = function (msg) {
        $.ajax({
            url: "/api/chat",
            data: {
                sender: username,         // 나중에 변경해야할듯?
                message: msg,
                roomName: room
            },
            dataType: "json", // 받을 때 format
            type: "get", // 요청 method
            success: function (response) {
                console.log('success');
            }
        });
    }

    // output message to DOM
    const outputMessage = (message) => {
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
    const outputRoomName = (room) => {
        roomName.text(room);
    }

    // Add users to DOM
    const outputUsers = (users) => {
        userList.append(`${users.map(user => `<li>${user.username}</li>`).join('')}`);
    }
})
