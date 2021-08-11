
(function (exports) {


    function loadScript(url, callback)
    {
        // Adding the script tag to the head as suggested before
        const head = document.head;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    }

    const redis = loadScript("../../redis.js");
    const CallBackCode = function() {

    };





    const chatForm = document.getElementById('chat-form');
    const chatMessage = document.querySelector('.chat-messages');
    const roomName = document.getElementById('room-name');
    const userList = document.getElementById('users');
// Get username and room from URL
    const {username, room} = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const socket = io();

// Join chatroom
    socket.emit("joinRoom", {username, room});


// Get room and users
    socket.on('roomUsers', ({room, users}) => {


        outputRoomName(room);
        outputRoomUsers(users);
    })

// Message from server
    socket.on('message', message => {
        outputMessage(message);

        // Scroll down
        chatMessage.scrollTop = chatMessage.scrollHeight;
    });

// Message submit
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get message text
        const msg = e.target.elements.msg.value;

        // Emit message to server
        socket.emit('chatMessage', msg);

        // Clear input
        e.target.elements.msg.value = "",
            e.target.elements.msg.focus();
    });

// Output message to DOM
// message -> object so,  need to change from 'string' to 'object'
    function outputMessage(message) {


        const div = document.createElement('div');
        div.classList.add('message');
        div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
     ${message.text}
    </p>`;

        document.querySelector('.chat-messages').appendChild(div);
    };

// ADD room name to DOM
    function outputRoomName(room) {
        roomName.innerText = room;
    }

// ADD users name to DOM
    function outputRoomUsers(users) {
        // join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듦.
        userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')} `;
    }
})(this)
