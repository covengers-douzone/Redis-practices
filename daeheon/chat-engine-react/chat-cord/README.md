# Real Chat APP with Rooms

## project Desc.

* create
    ```bash
    npm init
    ```
* dependency
    ```bash
    ## general
    npm i express
    npm i socket.io
    npm i moment
    
    ## dev
    npm i -D nodemon
    ```
* scripts (package.json)
    ```json
    "scripts": {
        "start": "node server",
        "dev": "nodemon server"
    },
    ```
* directory
    ```text
    /chat-cord
        |--- [/node_modules]            [modules]
        |--- package.json               [project 정보]
        |--- package-lock.json          [modules 버전 정보]
        |--- /public
        |       |--- /css/style.css
        |       |--- /js/chat.js        [chat client]
        |       |--- chat.html          [채팅 화면]
        |       |--- index.html         [첫 화면]
        |--- /utils
        |       |--- /message.js        [메세지 format]
        |       |--- /user.js           [chat-room 전체 users 관리]
        |--- server.mjs                  [chat server]
    ```
* useage
    ```bash
    npm run dev
    ```