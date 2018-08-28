// Import Discord API
const Discord = require("discord.js");
const OW = require('overwatch-api');

// Importing Config jsons
const auth = require("./auth.json");
const teams = require("./teams.json");

// Instantiating Discord Client API
const client = new Discord.Client();

// Other Const Variables
const platform = 'pc';
const region = 'global';

// Log Connection Status
client.on('ready', function (evt) {
    console.log('Connected...');
    console.log('Logged in as ' + client.user.tag);
});

// Array of sentences the bot can say
var uncomfortable = [
    "That makes me uncomfortable :slight_frown:",
    "I don't feel so good :slight_frown:",
];
var Sentence = [
    "Hey there userID, that makes me uncomfortable. :slight_frown:",
    "Please stop being a weeb and just say what :slight_frown:",
];

// Bot Message Responses
client.on('message', (message) => {
    if (message.author.bot) return;

    // Commands are messages begin with `!`
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !teams
            case 'teams':
            case 'Teams':
            case 'TEAMS':
                var output = "The teams on this sever are:";
                for (var z = 0; z < teams.Teams.length + 0; z++) {
                    output = output + "\n" + teams.Teams[z].Name + " - Who are " + teams.Teams[z].Rank;
                }
                message.channel.send(output);
                break;
            // !rank
            case 'rank':
            case 'Rank':
            case 'RANK':
                if (args.length == 0) {
                    message.channel.send("A player needs a name. `!rank <YOUR BATTLE TAG>`")
                    break;
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
                        message.channel.send(user + "'s competitive rank is " + json.competitive.rank);
                    }
                });
                break;
            // !level
            case 'level':
            case 'Level':
            case 'LEVEL':
                if (args.length == 0) {
                    message.channel.send("A player needs a name. `!level <YOUR BATTLE TAG>`")
                    break;
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
                        message.channel.send(user + "'s level is " + json.level);
                    }
                });
                break;
            // !endorse
            case 'endorse':
            case 'Endorse':
            case 'ENDORSE':
            case 'endorsement':
            case 'Endorsement':
            case 'endorsements':
            case 'Endorsements':
                if (args.length == 0){
                    message.channel.send("A player needs a name. `!endorse <YOUR BATTLE TAG>`")
                    break;
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
                break;
            // !help
            case 'help':
            case 'Help':
            case 'HELP':
                var output = "The current list of commands are:" +
                    "\n\t`!rank <YOUR BATTLE TAG>` - This shows your competitive rank" +
                    "\n\t`!level <YOUR BATTLE TAG>` - This shows your level" +
                    "\n\t`!endorse <YOUR BATTLE TAG>` - This shows your endorsement level"
                message.channel.send(output);
                break;
            default:
                message.channel.send("I don't know what " + cmd + " is, but I could show you incredible things")
                break;
        }
        return;
    }

    // if user entered owo
    if (message.content.match(/\b[oOuU]w[oOuU]([?|!])*(\b|$)/g)) {
        // select random sentence from uncomfortable array
        message.channel.send(uncomfortable[Math.floor((Math.random() * uncomfortable.length))])
        return;
    }
    // if user entered nani
    if (message.content.match(/\b[nN][aA][nN][iI]([?|!])*\b/g)) {
        // select random sentence from array
        message.channel.send(Sentence[Math.floor((Math.random() * Sentence.length))].replace("userID", message.author))
        return;
    }
});


client.login("NDc0NjE2NjIzMTQ0MzcwMTg2.DkTJkw.4TNU39V6hokmn-Xz3TUWbzVsFpw");
