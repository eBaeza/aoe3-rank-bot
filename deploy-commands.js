if (process.env.NODE_ENV === 'development') {
    require('dotenv-flow').config()
}

const fs = require('node:fs');
const path = require('node:path');
const { Routes, REST } = require('discord.js')
const idBot = process.env.ID_BOT
const token = process.env.TOKEN_BOT

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token)

rest.put(
    Routes.applicationCommands(idBot),
    { body: commands }
)