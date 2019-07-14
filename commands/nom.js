const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: "nom",
    hasArgs: true,
    args: "Who are you trying to eat?",
    description: "want to eat someone, I can help",
    async execute(bot, message, args){
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/feed`);
        let feedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!feedUser) return message.channel.send("Please enter a vaild user.");
      
        let feedEmbed = new Discord.RichEmbed()
        .setDescription(`${message.author} noms ${feedUser}`)
        .setColor("ff9900")
        .setImage(body.url);
      
        message.channel.send(feedEmbed);
    }
}