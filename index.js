process.on('unhandleRejection', console.error);

const botconfig = require("../panda/settings.json");
const Discord = require("discord.js");
const {Client, Util} = require('discord.js');
const bot = new Client({disableEveryone:true});
const Sequelize = require('sequelize');
const fs = require('fs');
const DBL = require('dblapi.js');
const dbl = new DBL(botconfig.dbl_token, bot);

const translate = require('translate-google');

const ms = require("ms");


const iheart = require('iheart');

const superagent = require('superagent');

var Stopwatch = require('stopwatch-emitter').Stopwatch;

format = require('date-format-lite');

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const {Updates, Lang, Users} = require('./dbObject');

let langFile = "C:/Users/korea/source/repos/ConsoleApplication1/discord/pandabot/json_files/language.json";
let lang = JSON.parse(fs.readFileSync(langFile, "utf8"));
bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('disconnect', () => console.log('I just disconnected'));

bot.on('reconnecting', () => console.log('I am reconnecting now!'));
bot.commands = new Discord.Collection();
const commandFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFile){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on("ready", async() =>{

    var now = new Date();

    let prefix = botconfig.prefix;
    let status = "updated";
    let updateDate = "";
    let command = "";
    let functions = "";
    let issue = "";
    let desc = "Updated the command handler.";
    let date = now.date("YYYY-MM-DD");
    console.log(date);
    var time = now.format('hh:mm');
    console.log(time);
    let logs = "";
    if(logs === "yes"){
        await Updates.addUpdate(date, desc, updateDate);
    }
    if(status === "update date"){
        console.log(`|-------------------------------------------|`);
        if(updateDate === ""){
            console.log("|");
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Planning on a update date, Stay tune to when it happens.`, {type: "WATCHING"});
            bot.user.setStatus("online");

        }
        else{
            console.log(`|update date: ${updateDate}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`on ${updateDate}, I will be getting a update.`, {type: "WATCHING"});
            bot.user.setStatus('dnd');
        }
    }
    else if(status === "issue"){
        console.log(`|-------------------------------------------|`);
        if( issue === ""){
            console.log("|");
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Theres an issue that occured. Being Fixed, please wait.`, {type: "WATCHING"});
            bot.user.setStatus("dnd");
        }
        else{
            console.log(`|Issue: ${issue}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`${issue}.Please wait`, {type: "WATCHING"});
            bot.user.setStatus('dnd');
        }
    }
    else if(status === "update"){
        console.log(`|-------------------------------------------|`);
        if(command === ""){
            console.log(`|Function: ${functions}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a update. The update is ${functions}.`, {type: "WATCHING"});
            bot.user.setStatus('online');
        }
        else if(functions === ""){
            console.log(`|Command: ${command}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a update. The update is ${prefix}${commands}`, {type: "WATCHING"});
            bot.user.setStatus("online");
        }
        else if(functions === "" && command === ""){
            console.log("|");
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a update.`, {type: "WATCHING"});
            bot.user.setStatus("online");
        }
        else{
            console.log(`|Command: ${command}`);
            console.log(`|Function: ${functions}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a update. The update is ${prefix}${command}, and ${functions}`, {type: "WATCHING"});
            bot.user.setStatus("online");
        }
    }
    else if(status === "updating"){
        console.log(`|-------------------------------------------|`);
        console.log(`|Being worked on: True`);
        console.log(`|-------------------------------------------|`);
        bot.user.setActivity(`Panda Bot is being worked on. please wait till you don't see this message.`, {type: "WATCHING"});
        bot.user.setStatus("dnd");
    }
    else if(status === "Fixing"){
        console.log(`|-------------------------------------------|`);
        console.log(`|Being worked on: True`);
        console.log(`|-------------------------------------------|`);
        bot.user.setActivity(`Panda Bot is being worked on. please wait till you don't see this message.`, {type: "WATCHING"});
        bot.user.setStatus("dnd");
    }
    else if(status === "new"){
        console.log(`|-------------------------------------------|`);
        if(command === ""){
            console.log(`|Function: ${functions}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a new Function. Which is ${functions}.`, {type: "WATCHING"});
            bot.user.setStatus('online');
            
        }
        else if(functions === ""){
            console.log(`|Command: ${command}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a new command. The new command is ${prefix}${command}`, {type: "WATCHING"});
            bot.user.setStatus("online");
        }
        else{
            console.log(`|Command: ${command}`);
            console.log(`|Function: ${functions}`);
            console.log(`|-------------------------------------------|`);
            bot.user.setActivity(`Panda Bot has gotten a new command. The new command is ${prefix}${command}, and a new function which is ${functions}`, {type: "WATCHING"});
            bot.user.setStatus("online");
    }

    }
    else{
        console.log(`|-------------------------------------------|`);
        console.log(`|default`);
        console.log(`|-------------------------------------------|`);
        bot.user.setActivity(`panda!help`);
        bot.user.setStatus("online");
    }
    console.log(`Panda bot is in ${bot.guilds.size} servers, ${bot.channels.size} channels, and ${bot.users.size} users.`);
    const guildMemberCount = bot.guilds.map(g => g.memberCount).join('\n');
    const guildNames = bot.guilds.map(g => g.name).join("\n");
    console.log("Guilds:");
    console.log(`${guildNames}`);
    //console.log(`${guildMemberCount}`);
});

bot.on('message', async message =>{
    const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(botconfig.prefix)})`);
    if(!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const user = message.author;
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let prefix = botconfig.prefix;
    const _user = await Users.findOne({where: {user_id: user.id}});
    const lang = await Lang.findOne({where:{user_id: user.id}});
/*
    if(_user.lang){
        if(!message.content.startsWith("panda!")){
            let msg = message.content.split(" ");
        translate(`${msg}`, {from: `${lang.lang}`, to: `en`}).then(res => {
            console.log(res);
            let transEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription(res);
            message.channel.send(transEmbed);
        }).catch(err => {
            console.error(err);
        });
    }
    }
    */
    if(message.content.toLowerCase().includes(prefix)){
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = bot.commands.get(commandName) 
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) return;

        if(command.hasArgs && !args.length){
            return message.channel.send(command.args);
        }
        try{
            command.execute(bot, message, args);
        } catch(error) {
            console.error(error);
            message.channel.send('There was an error trying to execute that command');
        }
    }

});

bot.login(botconfig.discord_token);