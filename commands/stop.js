const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');

module.exports = {
    name: "stop",
    aliases: ['st'],
    description: "Stops your queue and leaves.",
    execute(bot, message, args){
        const serverQueue = queue.get(message.guild.id);
        if(!message.member.voiceChannel) return message.channel.send('Your not in a voice channel!');
        if(!serverQueue) return message.channel.send("There is nothing playing that i could stop for you");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop cmd has been used!');
        message.channel.send(`Successfully stop the queuing and left the voice channel.`)
        return undefined;

    }
}