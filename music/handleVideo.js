const botconfig = require("C:/Users/korea/source/repos/ConsoleApplication1/discord/panda/settings.json");
const ytdl = require("ytdl-core");
const Youtube = require("simple-youtube-api");
const youtube = new Youtube(botconfig.yt_api_key);
const { Client, Util} = require('discord.js');
const Discord = require('discord.js');
var Stopwatch = require('stopwatch-emitter').Stopwatch;
const queue = new Map();
     async function handleVideo(video, message, voiceChannel, playlist = false){
        const serverQueue = queue.get(message.guild.id);
 	console.log(video);
 	const song = {
 		id: video.id,
 		title: Util.escapeMarkdown(video.title),
         url: `https://www.youtube.com/watch?v=${video.id}`,
         channel: video.channel.title,
         durationm: video.duration.minutes,
         durations: video.duration.seconds,
         durationh: video.duration.hours
 	};
 	if (!serverQueue) {
 		const queueConstruct = {
 			textChannel: message.channel,
 			voiceChannel: voiceChannel,
 			connection: null,
 			songs: [],
 			volume: 5,
 			playing: true
 		};
 		queue.set(message.guild.id, queueConstruct);

 		queueConstruct.songs.push(song);

 		try {
 			var connection = await voiceChannel.join();
 			queueConstruct.connection = connection;
 			play(message.guild, queueConstruct.songs[0]);
 		} catch (error) {
 			console.error(`I could not join the voice channel: ${error}`);
 			queue.delete(message.guild.id);
 			return message.channel.send(`I could not join the voice channel: ${error}`);
 		}
 	} else {
 		serverQueue.songs.push(song);
         console.log(serverQueue.songs);
         let songAddedEmbed = new Discord.RichEmbed()
         .setTitle(`${song.title} has been added to the queue`)
         .setColor(`0xff3262`)
         .addField(`Publisher: `, `${song.channel}`, true)
         .addField('Video ID: ', song.id, true)
         .addField(`Duration: `, `**${song.durationh}** hours: **${song.durationm}** minutes: **${song.durations}** seconds`)
         .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
         .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id}})`)
         if (playlist) return undefined;
  
 		else return message.channel.send(songAddedEmbed);
 	}
 	return undefined;
 }
    playTrack = function( guild, track){
        const trackQueue = trackPush.get(guild.id);
        console.log(trackQueue.tracks);
        if(!track){
           trackQueue.voiceChannel.leave();
           queue.delete(guild.id);
           return;
       }
       console.log(trackQueue.tracks);
       const dispatcher = trackQueue.connection.playFile(track)
       .on('end', reason =>{
           console.log(reason);
           console.log(trackQueue.tracks[0])
           trackQueue.tracks.shift();
           playTrack(guild, trackQueue.tracks[0]);
           console.log(trackQueue.tracks[0]);
       })
       .on('error', error => console.error(error));
       setTimeout(function(){
       dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
       trackQueue.textChannel.send('successful');
   }, 500);
    }
    play = function( guild, song){
        const serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        console.log(serverQueue.songs);
   
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('end', reason => {
                if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                else console.log(reason);
          serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));
        setTimeout(function(){
            let durationTime = (((song.durationh / 60) + (song.durationm)) / 60) + song.durations
            var stopwatch = new Stopwatch(durationTime);
            stopwatch.getRemainingTime();
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        let songEmbed = new Discord.RichEmbed()
        .setColor(`0xff3262`)
        .addField(`Publisher: `, `${song.channel}`, true)
        .addField('Video ID: ', song.id, true)
        .addField(`Duration: `, `**${song.durationh}** hours: **${song.durationm}** minutes: **${song.durations}** seconds`)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/sddefault.jpg`)
        .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id}})`)
       
        serverQueue.textChannel.send(songEmbed);
    }, 500);
    }

    module.exports = {handleVideo, queue, youtube};
