 const Discord = require("discord.js");
 const teams = require("../teams.json");

module.exports.run = async (client, message, args) => {
    var output = "The teams on this sever are:";
                for (var z = 0; z < teams.Teams.length + 0; z++) {
                    output = output + "\n" + teams.Teams[z].Name + " - Who are " + teams.Teams[z].Rank;
                }
                message.channel.send(output);
};

module.exports.help = {
    name: "Teams"
}