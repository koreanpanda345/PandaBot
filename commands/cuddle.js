const Discord = require('discord.js');
const superagent = require("superagent");

module.exports = {
    name: "cuddle",
    hasArgs: true,
    args: "Who are you trying to cuddle?",
    description: "AWWWW you too look prefect together",
    async execute(bot, message, args){
        let {body} = await superagent.get(`https://nekos.life/api/v2/img/cuddle`);
  let KissUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!KissUser) return message.channel.send("Please enter a vaild user.");

  let kissEmbed = new Discord.RichEmbed()
  .setDescription(`${message.author} cuddles ${KissUser}`)
  .setColor("ff9900")
  .setImage(body.url);

  message.channel.send(kissEmbed);
    }
}