const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    var output = "The current list of commands are:" +
        "\n\t`!rank <YOUR BATTLE TAG>` - This shows your competitive rank" +
        "\n\t`!levels <YOUR BATTLE TAG>` - This shows your level" +
        "\n\t`!endorse <YOUR BATTLE TAG>` - This shows your endorsement level" +
        // "\n\t`!Role <Tank><Support><DPS> - Give you the Role you select"
        "\n\t`!teams` - Lists Teams on Server"
    message.channel.send(output);
};

module.exports.help = {
    name: "Teams"
}