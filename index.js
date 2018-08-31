// Import Discord API
const Discord = require("discord.js");
const auth = require("./auth.json");

// Importing constants jsons
const constants = require("./constants.json");

// Instantiating Discord Client API and FileSystem
const client = new Discord.Client();
const fs = require("fs");
let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;

// This loop reads the /events/ folder and attaches each event file to the appropriate event.

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./commands/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on("presenceUpdate", (oldState, newState) => {
    var dt = new Date();
    var utcDate = dt.toUTCString();
    switch (newState.user.presence.status) {
        case "online":
            if (newState.user.presence.game != null && newState.user.presence.game.streaming) {
                client.channels.get(constants.gtsGeneralID).send(newState.user.username + " is now streaming");
            } else if (oldState.user.presence.game != null && oldState.frozenPresence.game.streaming) {
                client.channels.get(constants.gtsGeneralID).send(oldState.user.username + " finished streaming");
            } else if (newState.user.presence.game != null) {
                client.channels.get(constants.gtsGeneralID).send(newState.user.username + " is playing " + newState.user.presence.game.name);
            } else if (oldState.frozenPresence.game != null) {
                client.channels.get(constants.gtsGeneralID).send(oldState.user.username + " finished playing " + oldState.frozenPresence.game.name);
            } else {
                client.channels.get(constants.gtsConsoleID).send("```diff\n+ " + utcDate + " - " + newState.user.username +
                    " is now " + newState.user.presence.status + "\n```");
                client.channels.get(constants.gtsGeneralID).send("你好 " + newState.user.username);
            }
            break;
        case "offline":
            client.channels.get(constants.gtsConsoleID).send("```diff\n- " + utcDate + " - " + newState.user.username +
                " went " + newState.user.presence.status + "\n```");
            client.channels.get(constants.gtsGeneralID).send("再见 " + newState.user.username);
            break;
    }
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.match(/\b[oOuU]w[oOuU]([?|!])*(\b|$)/g)) {
        // select random sentence from uncomfortable array
        message.channel.send(constants.uncomfortable[Math.floor((Math.random() * constants.uncomfortable.length))]);
        return;
    }
    // if user entered nani
    if (message.content.match(/\b[nN][aA][nN][iI]([?|!])*\b/g))
    {
        // select random sentence from array
        message.channel.send(constants.Sentence[Math.floor((Math.random() * constants.Sentence.length))].replace("userID", message.author));
        return;
    }
    if (message.content.indexOf(constants.prefix) !== 0) return;

    // This is the best way to define args. Trust me.
    const args = message.content.slice(constants.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // The list of if/else is replaced with those simple 2 lines:
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

client.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {

        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg => {
            let user = msg.guild.members.get(event.d.user_id);

            if (msg.author.id == client.user.id && msg.content != initialMessage) {

                var re = `\\*\\*"(.+)?(?="\\*\\*)`;
                var role = msg.content.match(re)[1];

                if (user.id != client.user.id) {
                    var roleObj = msg.guild.roles.find('name', role);
                    var memberObj = msg.guild.members.get(user.id);

                    if (event.t === "MESSAGE_REACTION_ADD") {
                        memberObj.addRole(roleObj);
                    } else {
                        memberObj.removeRole(roleObj);
                    }
                }
            }
        })
    }
});

client.login(auth.token);