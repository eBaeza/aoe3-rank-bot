if (process.env.NODE_ENV === 'development') {
    require('dotenv-flow').config()
}

const fs = require('node:fs')
const path = require('node:path')
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const token = process.env.TOKEN

const bot = new Client({ intents: GatewayIntentBits.Guilds })

bot.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	bot.commands.set(command.data.name, command);
}

bot.once('ready', async () => {
    console.log(`Inició sesión como ${bot.user.tag}`)
})

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand) return

	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

bot.login(token)
