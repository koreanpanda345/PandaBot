
module.exports ={
    name: 'latency',
    aliases: ['ping'],
    description: "Displays the bot's latency",
    execute(bot, message, args){
        message.channel.send(`${bot.ping} ms`);
    },
}