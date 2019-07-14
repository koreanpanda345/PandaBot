const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');

module.exports = {
    name: "skip",
    aliases: ['s'],
    description: "skips the current song.",
    execute(bot, message, args){
        const serverQueue = queue.get(message.guild.id);
        if(!message.member.voiceChannel) return message.channel.send("Your not in a voice channel!");
        if(!serverQueue) return message.channel.send("There is nothing playing that I could skip for you");
        serverQueue.connection.dispatcher.end('Skip cmd has been used!');
    }
}