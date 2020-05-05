const Discord = require('discord.js');
const{prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () =>{
	cosole.log('Ready!')
})

client.on('message', message =>{

	if(message.content.startsWith('!yo')) {
		message.channel.send("Yo")
	}
})

client.login(token);
