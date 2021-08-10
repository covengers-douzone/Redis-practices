const Redis = require('redis')



const Pub01 = new Redis();
const Pub02 = new Redis();


const Sub01 = new Redis();
const Sub02 = new Redis();
const Sub03 = new Redis();

socket.emit("room:4", () => {
    Pub01.set("room:1" , "message")
})


Pub01.publish("hello", "park")
Pub02.publish("hello", "park")

/*
Sub01.subscribe("hello")
Sub02.subscribe("hello")
Sub03.subscribe("hello")

 */
