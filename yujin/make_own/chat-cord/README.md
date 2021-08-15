# Real Chat APP with Rooms

## Project

* create
    ```bash
    npm init
    ```
* dependency
    ```bash
    ## general
    npm i express
    npm i socket.io
    npm i redis
    npm i moment
    npm i mysql2
    npm i sequelize
    npm i dotenv
  
    ## dev
    npm i -D nodemon
    npm i -D mocha
    ```
    * Web Application
      * express
      * nodemon: (for dev)live server
    * Chat
      * socket.io : between server and client
      * redis : use pub/sub
    * db
      * sequelize(ORM)
      * mysql2
    * config
      * dotenv : for use env file
    * test
      * mocha
* scripts (package.json)
    ```json
    "scripts": {
        "start": "node server",
        "dev": "nodemon server",
        "test": "npx mocha"         
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
        |       |--- /js/main.js        [chat client]
        |       |--- chat.html          [채팅 화면]
        |       |--- index.html         [첫 화면]
        |--- /utils
        |       |--- /message.js        [메세지 format]
        |       |--- /user.js           [chat-room 전체 users 관리]
        |--- server.mjs                  [chat server]
    ```
  * usage
      * 개발 중
        ```shell
        npm run dev
        ```
      * 테스트
        ```shell
        npm run test
        ```
