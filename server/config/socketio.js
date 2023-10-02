const { server } = require("../index");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

console.log("socket");
