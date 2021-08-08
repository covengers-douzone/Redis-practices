import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {ProtoGrpcType} from './proto/random';
import {RandomHandlers} from './proto/randomPackage/Random';
import {TodoResponse} from "./proto/randomPackage/TodoResponse";
import {TodoRequest} from "./proto/randomPackage/TodoRequest";
import {ServerDuplexStream} from "@grpc/grpc-js";
import {ChatRequest} from "./proto/randomPackage/ChatRequest";
import {ChatResponse} from "./proto/randomPackage/ChatResponse";

const PORT = 8082;
const PROTO_FILE = './proto/random.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname,PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const randomPackage = grpcObj.randomPackage;

function main(){
    const server = getServer();

    server.bindAsync(`0.0.0.0:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err,port) => {
            if(err){
                console.error(err);
                return;
            }
            console.log(`Your Server as started on port ${port}`);
            server.start();
        });
}

const todoList: TodoResponse = {todo: []};
const callObjByUsername = new Map<string, grpc.ServerDuplexStream<ChatRequest, ChatResponse>>();
function getServer(){
    const server = new grpc.Server();
    server.addService(randomPackage.Random.service, {
        "PingPong": (req,res)=>{
            console.log(req.request);
            res(null,{message : "Pong"}); //send message "Pong" with no error
        },
        "RandomNumbers": (call) =>{
            // receive max value from a client
            const {maxVal = 10} = call.request;
            console.log(maxVal);

            // sends 10 random value based on max value
            let runCount = 0;
            const id = setInterval(()=>{
                runCount = ++runCount;
                call.write({num: Math.floor(Math.random() * maxVal)})

                if(runCount >= 10){
                    clearInterval(id);
                    call.end();
                }
            },500); // 0.5초마다 10개의 number generate하고 종료
        },
        "TodoList": (call,callback) => {
            call.on("data",(chunk)=>{
                todoList.todo?.push(chunk);
                console.log(chunk);
            })
            call.on("end",() => {
                callback(null, { todo : todoList.todo});
            })
        },
        "Chat": (call) => {
            call.on("data",(req) => {
                const username = call.metadata.get('username')[0] as string;
                const message = req.message ;
                console.log(req);

                // @ts-ignore
                for(let [user, usersCall] of callObjByUsername) {
                    // 나빼고 모두에게 브로드캐스팅
                    if(username !== user ) {
                        usersCall.write({
                            username:username,
                            message:message
                        })
                    }
                }
                if(callObjByUsername.get(username) === undefined){
                    callObjByUsername.set(username,call);
                }
            });


            call.on("end", () => {
                const username = call.metadata.get('username')[0] as string;
                callObjByUsername.delete(username);
                console.log(`${username} is ending their chat session`);
                // @ts-ignore
                for(let [user, usersCall] of callObjByUsername) {
                    usersCall.write({
                        username:username,
                        message: "has left the Chat!!!!"
                    })
                }

                call.write({
                    username: username,
                    message: `See you later ${username}`
                });

                call.end();
            });
        }
    } as RandomHandlers )
    return server;
}

main();