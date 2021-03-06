

module.exports = function (){
    const http = require("http");
    const socketIo = require("socket.io");
    const port = process.env.PORT || 4001;
    const index = require("./routes/index");

    const server = http.createServer(application);

    let interval;
    io.on("connection", (socket) => {
        console.log("New client connected");
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
    });

    const getApiAndEmit = socket => {
        const response = new Date();
        // Emitting a new message. Will be consumed by the client
        socket.emit("FromAPI", response);
    };
}
