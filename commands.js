const { SlashCommandBuilder, Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { idBot, idServer, token } = require('./config.json')

const commands = [
    new SlashCommandBuilder()
        .setName('elo')
        .setDescription('consult user elo and rank')
        .addStringOption(opt => opt.setName('player')
            .setDescription('nombre jugador')
            .setRequired(true))
].map(c => c.toJSON())

const rest = new REST({
    version: '10'
}).setToken(token)

async function showCommands() {
    try {
        await rest.put(Routes.applicationCommands(idBot, idServer), {
            body: commands
        })
    } catch (error) {
        console.error('Error' + error)
    }
}

showCommands()