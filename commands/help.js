const Discord = require('discord.js');
const {prefix} = require('../settings.json');

module.exports = {
    name: 'help',
    description: "List all of my commands or info about a specific commnad.",
    aliases: ['commnads'],
    execute(bot, message, args){
        const data = [];
        const {commands} = message.client;
            if(!args.length){
                data.push('Here\'s a list of all my commands:');
                data.push(commands.map(command => command.name).join('\n'));
                data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
    
                return message.author.send(data, {split: true, code: true})
                .then(() =>{
                    if(message.channel.type == 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error =>{
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
                });
            }
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    
            if(!command){
                message.reply('That\'s not a valid command!');
            }
            data.push(`**Name:** ${command.name}`);
    
            if(command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
            if(command.description) data.push(`**Description:** ${command.description}`);
            if(command.usage) data.push(`**Usage:** ${command.usage}\n <> means it needs it, and {} means its optional`);
    
            message.channel.send(data, {split: true});
        },
}