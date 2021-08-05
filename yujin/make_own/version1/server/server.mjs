import http from 'http';        // export default
import express from 'express';
import * as path from 'path';
const port = 8080;

// Application Setup
const application = express()
    .use(express.static(path.join(path.resolve('.'), 'public')))    // 웹서버 구동할려면 public

// Server Setup
http.createServer(application)
    .on('listening', function(){
        console.info(`Http Server running on port ${port}`);
    })
    .on('error', function(error){
        if(error.syscall !== 'listen'){
            throw error;
        }
        switch(error.code){
            case 'EACCESS':
                console.error(`Port:${port} requires privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port:${port} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    })
    .listen(port);