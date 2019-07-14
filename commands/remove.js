const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');

module.exports = {
    name: "remove",
    aliases: ['r'],
    hasArgs: true,
    args: "Please enter the queue number of the song.",
    description: "removes a song from the queue.",
    execute(bot, message, args){
        const serverQueue = queue.get(message.guild.id);
        let removeInfo = new Discord.RichEmbed()
        .setTitle(`~INVALID USAGE~`)
        .addField(`Correct Formatting`, `*${prefix}remove <Song Queuing number>* or *${prefix}r <Song Queuing number>*`)
        .addField(`Example`, `*${prefix}remove 3* or *${prefix}r 3*`);
        if(!args[0])return message.channel.send(removeInfo);
            let index = 0;
            let toSkip = args[0];
            toSkip = Math.min(toSkip, serverQueue.songs.length);

            // Skip.
            serverQueue.songs.splice(serverQueue.songs.indexOf(toSkip - 1), 1);
            message.channel.send(`Successfully removed song number ${toSkip} from the queueing list.`);
            let removeEmbed = new Discord.RichEmbed()
            .setTitle(`Playing ${serverQueue.songs[0].title}`)
            .addField(`**Queuing**:`, serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n'));
            message.channel.send(removeEmbed);
    }
}