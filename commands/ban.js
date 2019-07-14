const Discord = require('discord.js');

module.exports ={
    name: "ban",
    hasArgs: true,
    args: "Who did you want to ban?",
    description: "Bans a member for the server.",
    execute(bot, message, args){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        let bReason = args.join(" ").slice(22);
        if(!bReason){
            let bReason = "Unknown";
        }
        if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")){
            return message.channel.send("you don't have permissions");
        }
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor(0xea0000)
        .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
        .addField("Banned By", `<@${message.author.username}> with ID: ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
        message.guild.member(bUser).ban(bReason);
      message.channel.send(banEmbed);
      console.log(`${message.author.username} with ID: ${message.author.id} has banned: ${bUser} with ID:${bUser.id} at ${message.createdAt}`);
          return;
    },
}