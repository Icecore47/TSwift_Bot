const Discord = require("discord.js");
const OW = require('overwatch-api');
const platform = 'pc';
const region = 'global';

module.exports.run = async (client, message, args) => {
    if (args.length == 0){
        message.channel.send("A player needs a name. `!endorse <YOUR BATTLE TAG>`")
        return;
    }
    while (args[0] == '') {
        args = args.slice(1);
    }
    var user = args[0].replace("#", "-");
    OW.getProfile(platform, region, user, (err, json) => {
        user = args[0].replace("-", "#");
        if (err instanceof TypeError) {
            message.channel.send(user + `'s profile either is private or it does not exists :frowning:`)
        } else if (err) {
            console.error(err);
            message.channel.send(`I couldn't find ` + user + ` because of a [` + err.name + `] - ` + err.message + " :frowning:")
        } else {
            message.channel.send(user + "'s endorsement level is " + json.endorsement.level + ":\n" +
                json.endorsement.sportsmanship.rate + " sportsmanships, " + json.endorsement.teammate.rate +
                " teammates, and " + json.endorsement.shotcaller.rate + " shotcallers");
        }
    });

};

module.exports.help = {
    name: "Endorsement"
}