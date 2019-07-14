const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');

module.exports = {
    name: "queue",
    aliases: ['q'],
    description: "displays your queue.",
    execute(bot, message, args){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        let index = 0;
        let queueEmbed = new Discord.RichEmbed()
        .setTitle(`Playing ${serverQueue.songs[0].title}`)
        .addField(`**Queuing**:`, serverQueue.songs.map(song => `**${++index} -** ***${song.title}*** - **${song.durationh}** hours: **${song.durationm}** minutes: **${song.durations}** seconds`).join('\n'));
        message.channel.send(queueEmbed);
    }
}