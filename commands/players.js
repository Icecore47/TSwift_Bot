const Discord = require("discord.js");
const players = require("../players.json");
const OW = require('overwatch-api');
const platform = 'pc';
const region = 'global';

module.exports.run = async function (bot, message, args) {
    try {
        message.channel.send("The Current Players on the Server:");
        for (var x = 0; x < players.Players.length; x++) {
            output = getStats(players.Players[x].Battle_Net);
        };
    } catch (e) {
        console.log(e)
        
    }
}

function getStats(tag) {
    t = tag.replace("#", "-")
    OW.getProfile(platform, region, t, (err, json) => {
        if (err) {} 
        else {
            output = "Battletag: `" + tag + "` is rank: " + json.competitive.rank;
            console.log(output);
            return output;
        }
    });
}

module.exports.help = {
    name: "Players"
}