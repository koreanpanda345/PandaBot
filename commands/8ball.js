const Discord = require('discord.js');

module.exports = {
    name: '8ball',
    aliases: ['eightball'],
    hasArgs: true,
    args: "Please ask a question",
    description: "Ask the magic 8ball.",
    execute(bot, message, args){
        let replies = ["Yes.", "No.", "I don't know", "Ask again later"];
        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(0).join(" ");
        let embed = new Discord.RichEmbed();
        embed.setAuthor(message.author.tag);
        embed.setColor(0x43f47a);
        embed.addField('Question', question);
        embed.addField('Answer', replies[result]);
        message.channel.send(embed);
    },
}