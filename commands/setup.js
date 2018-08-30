const Discord = require("discord.js");
const teams = require("../teams.json");

let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
const roles = ["DPS", "Support", "Tank", "Flex"];
const reactions = ["💻", "🖌", "😃", "🆕"];
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";


function generateMessages() {
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
    return messages;
}

module.exports.run = async (client, message, args) => {
    var toSend = generateMessages();
    let mappedArray = [[toSend[0], false], ...toSend.slice(1).map((message, idx) => [message, reactions[idx]])];
    for (let mapObj of mappedArray) {
        client.channels.get("484061060760993822").send(mapObj[0]).then(sent => {
            if (mapObj[1]) {
                sent.react(mapObj[1]);
            }
        });
    }

};

module.exports.help = {
    name: "setup"
}