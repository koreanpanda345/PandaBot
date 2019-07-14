const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');

module.exports = {
    name: "resume",
    aliases: ['re'],
    description: "Resumes the queue if its pasued.",
    execute(bot, message, args){
        const serverQueue = queue.get(message.guild.id);
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send('▶ Resumed the music for you!');
          }
          return message.channel.send('There is nothing playing.');
    }
}