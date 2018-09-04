const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    var validRoles = ["dps", "support", "tank"]
   
    while (args[0] == ' ') {
        args = args.slice(1);
    }

    var roleName = args[0];
    roleName = roleName.toLowerCase();
    for (var i = 0; i < validRoles.length; i++) {
        if (roleName == validRoles[i]) {
            let role = message.guild.roles.find("name", roleName);
            let member = message.member;
            if (message.member.roles.has(role.id)) {
                member.removeRole(role).catch(console.error);
                client.channels.get("484061060760993822").send(roleName + " Role Removed");
                return;
            } else {
                member.addRole(role).catch(console.error);
                client.channels.get("484061060760993822").send("You have been added to the " + roleName + " Role");
                return;
            }
        }
    }
};

module.exports.help = {
    name: "Role"
}