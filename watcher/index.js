const config = require("./config.json");
const socket = require("socket.io-client")(config.socket);
const rcon = new (require("modern-rcon"))(
    config.rcon.host,
    config.rcon.port,
    config.rcon.password
);

console.log("* Preparing to start...");
socket.emit("add-user", config.connection);
socket.on("donation", (message) => {
    message = JSON.parse(message);
    const action = config.actions.find(action => action.amount == message.amount_main);
    if(!action) return;

    if(action.command.includes("{{username}}")) action.command = action.command.replace("{{username}}", message.username);
    if(action.command.includes("{{message}}")) action.command = action.command.replace("{{message}}", message.message);

    rcon.connect()
        .then(() => rcon.send(action.command))
        .then(() => console.log(`* Initialized action "${action.action}" by "${message.username}"`))
        .then(() => rcon.disconnect());
});
