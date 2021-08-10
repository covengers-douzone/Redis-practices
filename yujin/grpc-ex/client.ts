import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {ProtoGrpcType} from './proto/random';
import * as readline from 'readline';

const PORT = 8082;
const PROTO_FILE = './proto/chat.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname,PROTO_FILE));
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
const client = new grpcObj.randomPackage.Random(
    `0.0.0.0:${PORT}`, grpc.credentials.createInsecure()
);

const deadline = new Date();                        // 현재 시각
deadline.setSeconds(deadline.getSeconds() + 5); // 현재 시각보다 5초뒤에 응답 받음
client.waitForReady(deadline, (err) =>{
    if(err){
        console.error(err);
        return;
    }
    //onClientReadyPingPong();              // unary
    //onClientReadyRandomNumber();          // server streaming
    //onClientReadyTodoList();              // client streaming
    onClientReadyChat();                    // bi-directional streaming
})

function onClientReadyPingPong() {
    // PingPong : if client sends "Ping" message, then the client get response with a "Pong" message.
    client.PingPong({message: "Ping"}, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result);
    });
}
function onClientReadyRandomNumber() {
    // RandomNumber : if client sends some value, then it receives random number within the range of the value
    const stream = client.RandomNumbers({maxVal: 85});
    stream.on("data", (chunk) => {
        console.log(chunk);
    })
    stream.on("end", () => {
        console.log("communication ended");
    })
}
function onClientReadyTodoList(){
    // TodoList : if client sent a bunch of todos, server receives them and sends a list of the todos.
    const stream = client.TodoList((err,result) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(result);
    })
    stream.write({todo: "walk the wife",status:"Never"});
    stream.write({todo: "walk the dog",status:"Doing"});
    stream.write({todo: "get a real job",status:"Impossible"});
    stream.write({todo: "feed the dog",status:"Done"});
    stream.end();
}
function onClientReadyChat(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const username = process.argv[2];
    if(!username) {
        console.log("No username, can't join chat");
        process.exit();
    }

    const metadata = new grpc.Metadata();
    metadata.set("username",username);
    const call = client.Chat(metadata);

    call.write({
        message: "register"
    })

    call.on("data",chunk => {
        console.log(chunk.username, '--->' ,chunk.message);
    })

    rl.on("line", (line)=>{
        if(line === "quit"){
            call.end();
            process.exit();
        } else {
            call.write({
                message: line
            })
        }
    })
}