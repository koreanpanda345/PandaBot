const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: "hug",
    hasArgs: true,
    args: "who do you want to hug?",
    description: "Awwwww you want to hug someone?",
    async execute(bot, message,args){
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/hug`);
        let hUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!hUser) return message.channel.send("Please enter a vaild user");
      
        let hugEmbed = new Discord.RichEmbed()
        .setDescription(`${message.author} hugs ${hUser} ^\/\/\/\/\/\/\/^`)
        .setColor("ff9900")
        .setImage(body.url);
      
        message.channel.send(hugEmbed);
    }
}