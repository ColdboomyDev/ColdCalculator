const Discord = require('discord.js');
const{prefix, token} = require('./config.json');
const client_discord = new Discord.Client();
const {google} = require('googleapis');
const creds = require('./client_secret.json');

const client_google = new google.auth.JWT(
	creds.client_email,
	null,
	creds.private_key,
	['https://www.googleapis.com/auth/spreadsheets']
);
client_google.authorize(function(err,tokens){
	if(err){
		console.log(err);
		return;
	}else{ 
		console.log('Connected_to_Google.');
		client_discord.once('ready', () =>{
			console.log('Conected_to_Discord!')
		})

		client_discord.on('message', message =>{
			if(message.member.hasPermission(['ADMINISTRATOR'])){
				if(message.content.startsWith('!savings')) {
						
					savings(client_google).then(x=>{
						message.channel.send(x);
					})

				}
				if(message.content.startsWith('!left')){
					left(client_google).then(x=>{
						message.channel.send(x);
					})
				}
				if(message.content.startsWith('!thisMonth')){
					thisMonth(client_google).then(x=>{
						message.channel.send(x);
					})
				}
				if(message.content.startsWith('!spend')){
					insert(client_google, message.content).then(x=>{
						message.channel.send(x);
					})
				}
				if(message.content.startsWith('!income')){
					insert(client_google, message.content).then(x=>{
						message.channel.send(x);
					})
				}

			}	
		})
		
		client_discord.login(token);
	}

});
async function left(cl){
	const gsapi = google.sheets({version:'v4', auth: cl});
	const opt = {
		spreadsheetId: 'spreadsheetId', // SpreadsheetId from URL
		range :'2020!B5:D6'
	};
	let data = await gsapi.spreadsheets.values.get(opt);
	return data.data.values[0][0] + ', '+ "Should have more!!!"; 
}

async function thisMonth(cl){
	const gsapi = google.sheets({version:'v4', auth: cl});
	const opt = {
		spreadsheetId: 'spreadsheetId', // SpreadsheetId from URL
		range :'2020!B5:D6'
	};
	let data = await gsapi.spreadsheets.values.get(opt);
	return data.data.values[0][1] + ', '+ "You've spend too much!!!"; 
}

async function savings(cl){
	const gsapi = google.sheets({version:'v4', auth: cl});
	const opt = {
		spreadsheetId: ''spreadsheetId', // SpreadsheetId from URL
		range :'2020!B5:D6'

	};
	let data = await gsapi.spreadsheets.values.get(opt);
	return data.data.values[0][2] +', '+ 'Not Much!!! Work harder!!!';
}

async function insert(cl, s){
	const gsapi = google.sheets({version:'v4', auth: cl});
	const opt = {
		spreadsheetId: 'spreadsheetId', // SpreadsheetId from URL
		range :'2020!B8:B1000'
	};
	const range = {
		spreadsheetId: '1eFVrESxB-CnMNaFSeXqkvF3b7zFsHt5F-uLffzqUewc',
		range :'2020!B280:C290'
	}
	let str = s.split(" ");
	if(str.length < 3){
		return 'Incomplete data!';
	}
	
	if(str[0]=='!spend'){
		let spendEnd = [];
		if(str.length >3){
			for(let i=3; i< str.length; i++){
				spendEnd.push(str[i]);
			}
		}
	var date = CreateDate();
	var myString = str.map(x => Array(date,'','',str[1],str[2],spendEnd.join(' ')));
	}
	else if(str[0]=='!income'){
		let incomeEnd = [];
		for(let i=2; i< str.length; i++){
			incomeEnd.push(str[i]);
		}
		var date = CreateDate();
		var myString = str.map(x => Array(date,str[1],incomeEnd.join(' '),'','',''));
	}
	let newData= [myString[0],['','']];	
	let data = await gsapi.spreadsheets.values.get(opt);
	let lastIndex = data.data.values.length-1 + 9;
	let rangeString= '2020!B'+lastIndex.toString();
	const updateoptions = {
		spreadsheetId: 'spreadsheetId', // SpreadsheetId from URL
		range: rangeString,
		valueInputOption: 'USER_ENTERED',
		resource: {values: newData}
	};

	let newSpend = await gsapi.spreadsheets.values.update(updateoptions);
	if(str[0]=='!spend'){
		const res = await gsapi.spreadsheets.batchUpdate({
			spreadsheetId: 'spreadsheetId', // SpreadsheetId from URL
			requestBody: {
				"requests": [
					{
					  "repeatCell": {
						"range": {
						  "sheetId": 84523856,
						  "startRowIndex": lastIndex-1,
						  "endRowIndex": lastIndex,
						  "startColumnIndex": 4,
							"endColumnIndex": 7
	
						},
						"cell": {
						  "userEnteredFormat": {
							"backgroundColor": {
							  "red":0.533,
							  "green": 0.749,
							  "blue": 0.533
							},
							"horizontalAlignment" : "CENTER",
							"textFormat": {
							  "foregroundColor": {
								"red": 0.0,
								"green": 0.0,
								"blue": 0.0
							  },
							  "fontSize": 10,
							  "bold": false
							}
						  }
						},
						"fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)"
					  }
					},
					{
					  "updateSheetProperties": {
						"properties": {
						  "sheetId": 84523856,
						  "gridProperties": {
							"frozenRowCount": 0
						  }
						},
						"fields": "gridProperties.frozenRowCount"
					  }
					}
				  ]
			}
		});
		
		}
	
	return 'Done!';

}

 function CreateDate() {
	var todayTime = new Date();
	var month = todayTime .getMonth() + 1;
	var day = todayTime .getDate();
	if(day<10)
	{
		day= '0'+ day;
	}
	if( month <10)
	{
		month = '0' + month; 
	}
	var year = todayTime .getFullYear();
	return date = day.toString() + "." + month.toString() + "." + year.toString();
}
