const Discord = require('discord.js');
const{prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () =>{
	cosole.log('Ready!')
})

client.on('message', message =>{
	if(message.member.hasPermisson(['']))
	{
		if(message.content.startsWith('!wave')) {
			let member = message.mentions.members.first();
			message.channel.send(":wave:" + member.displayName)
		}
	}

	
})

client.login(token);
