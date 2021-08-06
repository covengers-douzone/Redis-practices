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
        * routing 관련
          * react-router-dom : react - routing 위함
          * react-redux
          * redux
* scripts(package.json)
    ```json
    "scripts": {
        "debug": "react-scripts build && nodemon server/server.mjs",
        "start": "npm-run-all --parallel start:**",
        "start:client": "react-scripts start",
        "start:server": "node server/server.mjs",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      },
    ```
* 실행
    * build해서 nodemon으로 실행
        * ```npm run debug```
    * node,react 포트 각각해서 실행
        * ```npm start```