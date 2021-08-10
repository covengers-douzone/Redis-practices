import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {ProtoGrpcType} from './proto/chat';
import {ChatHandlers} from './proto/chatPackage/Chat';

const PORT = 8082;
const PROTO_FILE = './proto/chat.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname,PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const chatPackage = grpcObj.chatPackage;

function main(){
    const server = getServer();

    server.bindAsync(`0.0.0.0:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Your Server as started on port ${port}`);
            server.start();
        });
}

function getServer(){
    const server = new grpc.Server();
    server.addService(chatPackage.Chat.service, {
        "ChatInitiate": (call, callback) => {
            const sessionName = call.request.name || "";
            const avartar = call.request.avartarUrl || "";

            if( !sessionName || !avartar) callback(new Error("Name and avatar are required"));

            callback(null, {id: Math.floor(Math.random() * 10000)})
        }
    } as ChatHandlers )
    return server;
}

main();