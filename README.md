# ColdCalcualtor
This is a simple Discord bot (Financial helper in my case) that connects to Google Sheets API, reads and writes some data. 

## How to run the bot
1. Make a Folder and download Node.js
2. Download Discord.js and go through a discord bot using guide https://discordjs.guide/#before-you-begin
3. Download Google API and go through a Google Sheets API setup for Node.js using https://developers.google.com/sheets/api/quickstart/nodejs
4. When you've got files token.json, credentials.json, client_secret.json, config.json in your folder, download file index.js from repository.
5. Change SpreadsheetId and other unique information.
6. Change the range, cells or command to your personal requirements.

## Commands
- spend 
  command writes data  in spend cells, so the amount of money will decrease
- income
  command writes data in income cells, so the amount of money will increase
- savings
  command reads data from savings cell
- left to spend
  command reads data from "left for this month" cell
  
 ## How to use bot
 1. Type a command with prefix "!".
 2. Add an amount of money after a whitespace.
 3. Add a purpose of money spendeture or the source of income in case of "income" command.
 4. Add an organisation which you've transfered money or spend on.
 5. Every other symbol reguarding whitespace will be automaticly added to the "organisation" field.
 
 ## Dependencies
 - Node.js
 - Discord.js
 - Google sheets API
