const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: "pat",
    hasArgs: true,
    args: "Who are you trying to pet?",
    description: "look mom a cat, I want to pet it",
    async execute(bot, message, args){
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/pat`);
  let KissUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!KissUser) return message.channel.send("Please enter a vaild user.");

  let kissEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author} pets ${KissUser}`)
  .setColor("ff9900")
  .setImage(body.url);

  message.channel.send(kissEmbed);
    }
}