# Chat App (Redis)

## Project

* modules
    * dev
        * nodemon : live server
        * webpack
        * webpack-cli
    * general
        * express : web
        * express-session
        * dotenv : 환경변수
        * http-proxy-middleware : node.js - react 동시 개발 위함

* scripts(package.json)
    ```json
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "debug": "nodemon server.mjs",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
     },
    ```