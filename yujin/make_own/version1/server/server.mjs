import http from 'http';        // export default
import express from 'express';
import * as path from 'path';
const port = 8080;

// router
import indexRouter from './routes/index.mjs';

// Application Setup
const application = express();
application
    .use(express.static(path.join(path.resolve('.'), 'build')))    // 웹서버 구동할려면 public
    // .all('*',function(req,res,next){
    //             res.locals.req = req;
    //             res.locals.res = res;
    //             next();
    // })
    //.use("/chat",indexRouter);

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