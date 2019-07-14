const Discord = require('discord.js');

module.exports = {
    name: "kick",
    hasArgs: true,
    args: "who do you want to kick?",
    description: "Kicks a member form the server",
    execute(bot, message, args){
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
        return message.reply("I don't have the right permissions");
        }
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("0xf20e0e")
        .addField("Kicked User", `${kUser}`)
        .addField("Kicked By", `<@${message.author.id}>`)
        .addField("Kicked In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);
      
        kUser.kick(kReason);
        message.channel.send(kickEmbed);
          return;
    }
}