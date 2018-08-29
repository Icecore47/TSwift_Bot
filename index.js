// Import Discord API
const Discord = require("discord.js");


// Importing Config jsons
const config = require("./config.json");

// Instantiating Discord Client API and FileSystem
const client = new Discord.Client();
const fs = require("fs");



// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./Commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./Commands/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./Commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }


  // Chat Filter
      // if user entered owo
      if (message.content.match(/\b[oOuU]w[oOuU]([?|!])*(\b|$)/g)) {
        // select random sentence from uncomfortable array
        message.channel.send(config.uncomfortable[Math.floor((Math.random() * config.uncomfortable.length))])
        return;
    }
    // if user entered nani
    if (message.content.match(/\b[nN][aA][nN][iI]([?|!])*\b/g)) {
        // select random sentence from array
        message.channel.send(config.Sentence[Math.floor((Math.random() * config.Sentence.length))].replace("userID", message.author))
        return;
    }
});

client.login(config.token);