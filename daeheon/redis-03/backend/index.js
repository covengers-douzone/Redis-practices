(function () {
        const express = require('express');
        const session = require('express-session');
        const http = require('http');
        const path = require('path');
        const dotenv = require('dotenv');
        const socketio = require('socket.io');
        const redis = require('./redis')

        // 1. Startup Arguments
        const argv = require('minimist')(process.argv.slice(2));

        // 2. Environment Variables
        dotenv.config({path: path.join(__dirname, 'app.config.env')})

        // 3. Process Title(Name)
        process.title = argv.name;

        // 4. Application Routers
        const {applicationRouter} = require('./routes');

        // 5. Logger
        const logger = require('./logging');

        // 6. Application Setup
        const application = express()
            // 6-1. Session Environment
            .use(session({
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false
            }))
            // 6-2. Body Parsers
            .use(express.json())
            .use(express.urlencoded({extended: true}))
            // 6-3. Static
            .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
            // 6-4. View Engine Setup
            .set('views', path.join(__dirname, 'views'))
            .set('view engine', 'ejs');

        // 7. Application Router Setup
        applicationRouter.setup(application);


        // 8. Server Startup
        const server = http.createServer(application)
            .on('listening', function () {
                logger.info('Listening on port ' + process.env.PORT);
            })
            .on('error', function (error) {
                if (error.syscall !== 'listen') {
                    throw error;
                }
                switch (error.code) {
                    case 'EACCES':
                        logger.error('Port ' + process.env.PORT + ' requires elevated privileges');
                        process.exit(1);
                        break;
                    case 'EADDRINUSE':
                        logger.error('Port ' + process.env.PORT + ' is already in use');
                        process.exit(1);
                        break;
                    default:
                        throw error;
                }

            })
            .listen(process.env.PORT);

        const io = socketio(server);
        let subList = []
        let info = {}
        io.on('connection', socket => {
            console.log("connection:연결@@@@@@@@@")
            socket.on('join',  ({name, room, message}) => {
                console.log("join:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
                info = {
                    name: name,
                    room: room,
                    message: message,
                }

                console.log("INFO 정보!! " + info.message)
               //  socket.emit("messageUpdate", (info))

                subList.push(new redis())
                subList.slice(-1)[0].subscribe(`${room}`)

                subList.slice(-1)[0].on("message",  (channel, message) => {
                    console.log("sub" + message + ":" + channel)
                    socket.emit("comment", ({name : info.name , room : info.room , message : message}))

                })

            })
        //     socket.on('getMessage', ({name, room, message}) => {
        //
        //         info = {
        //             name: name,
        //             room: room,
        //             message: message,
        //         }
        //         console.log("현재 접속자 수: " +  subList.length)
        //
        //
        //           let index = 0;
        //
        //
        // })
    })}
)();


