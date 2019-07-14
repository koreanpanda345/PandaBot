const Discord = require('discord.js');

module.exports = {
    name: "info",
    aliases: ["botinfo", "bot"],
    hasArgs: false,
    args: "",
    description: "Displays info about me",
    execute(bot, message, args){
        let botEmbed = new Discord.RichEmbed()
    .addField("Panda Bot", "This is Panda Bot, Design to make people love pandas (^-^). And Panda Bot knows all, nothing can outmatch him.", true)
    .addField("Creator", "Koreanpanda345#2878", true)
    .setColor(0x42f47a)
    .setFooter("GIVE ME BAMBOO")
    .addField("Created On", message.client.user.createdAt);
    return message.channel.send(botEmbed);
    },
};