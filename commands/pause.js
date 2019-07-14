const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');

module.exports = {
    name: "pause",
    aliases: ['pa'],
    description: "Pauses the queue for you",
    execute(bot, message, args){
        const serverQueue = queue.get(message.guild.id);
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send('⏸ Paused the music for you!');
        }
        return message.channel.send('There is nothing playing.');
    }
}