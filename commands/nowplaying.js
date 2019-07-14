const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');

module.exports = {
    name: "nowplaying",
    aliases: ['np'],
    description: "Displays the current song",
    execute(bot, message, args){
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    }
}