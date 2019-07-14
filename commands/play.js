const Discord = require('discord.js');
const {handleVideo, queue, youtube} = require('../music/handleVideo');
module.exports = {
    name: "play",
    aliases: ['p'],
    hasArgs: true,
    args: "what song do you want to listen to?",
    description: "Plays a song of your choosing from youtube in the voice channel",
    async execute(bot, message, args){
        var guild = {};
        const searchString = args.slice(0).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(message.guild.id);
  const voiceChannel = message.member.voiceChannel;
  if(!voiceChannel) return message.channel.send("I'm sorry, but you need to be in a voice channel to play music");
  const permissions = voiceChannel.permissionsFor(bot.user);
  if(!permissions.has('CONNECT')){
    return message.channel.send('I cannot connect in this voice channel, please make sure I have the right permission');
  }
  if(!permissions.has('SPEAK')){
    return message.channel.send('I cannot speak in this voice channel, please make sure I have the right permission.');
  }
  message.channel.send(`Searching for ${searchString} on Youtube.`);
  if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
    const playlist = await youtube.getPlaylist(url)
    .then(console.log(playlist))
    .catch(console.error);
    const videos = await playlist.getVideo();
    for(const video of Object.values(videos)){
      const video2 = await youtube.getVideoByID(video.id)
      await handleVideo(video2, message, voiceChannel, true);
    }
    return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
  } else {
    try {
      var videos = await youtube.searchVideos(searchString, 1);
    var video = await youtube.getVideoByID(videos[0].id);
    } catch(err){
      console.error(err);
      return message.channel.send('🆘 I could not obtain any search results.');
    }
  }
  return handleVideo(video, message, voiceChannel);
    }
}