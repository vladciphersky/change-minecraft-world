const config = require("./config.json");
const socket = require("socket.io-client")(config.socket);
const rcon = new (require("modern-rcon"))(
    config.rcon.host,
    config.rcon.port,
    config.rcon.password
);

console.log("* Preparing to start...");

socket.emit("add-user", config.connection);
socket.on("donation", (event) => {
    const { username, message, amount_main } = JSON.parse(event);

    const actions = config.actions.filter(({ amount }) => amount === amount_main);

    if (!actions.length) {
        return;
    }

    rcon.connect()
        .then(async () => {
            for (const action of actions) {
                console.log(`* Initialization action "${action.name}" by "${username}"`);

                for (let command of action.commands) {
                    command = command.replace("{{username}}", username)
                        .replace("{{message}}", message)
                        .replace("{{amount}}", amount_main);

                    await rcon.send(command)
                        .catch((error) =>
                            console.log(`[!] An error occurred while sending a command to the server: ${error}`)
                        );
                }
            }

            await rcon.disconnect();
        })
        .catch((error) =>
            console.log(`[!] An error occurred while connecting to the server: ${error}`)
        );
});
