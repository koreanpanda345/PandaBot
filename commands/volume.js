const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');

module.exports = {
    name: "volume",
    aliases: ['vol'],
    description: "Displays the current volume or changes it",
    execute(bot, message, args){
        let prefix = "panda!";
        const serverQueue = queue.get(message.guild.id);
        if(!message.member.voiceChannel) return message.channel.send('You are not in a voice channel');
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        let volEmbed = new Discord.RichEmbed()
        .setTitle(`Volume`)
        .setAuthor(message.author.username)
        .addField('Current Volume', ` **${serverQueue.volume}**`)
        .addField('To Change The Volume', `*${prefix}vol [1-5]* or *${prefix}volume [1-5]*`)
        .addField('Example:', `*${prefix}vol 3* or *${prefix}volume 3*`);
      
        if(!args[0])return message.channel.send(volEmbed);
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
        return message.channel.send(`I set the volume to: **${args[0]}**`);
    }
}