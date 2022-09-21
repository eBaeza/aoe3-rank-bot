const { SlashCommandBuilder, Routes, REST } = require('discord.js')
const idBot = process.env.ID_BOT
const token = process.env.TOKEN

const commands = [
    new SlashCommandBuilder()
        .setName('elo')
        .setDescription('Consulta las estadísticas de un jugador en 1 vs 1 de AOE III DE')
        .addStringOption(opt => opt
            .setName('player')
            .setDescription('Nombre de usuario')
            .setRequired(true)
        )
        .addStringOption(opt => opt
            .setName('modo')
            .setDescription('Modo de juego')
            .setRequired(true)
            .addChoices(
                { name: '1v1 Supremacy', value: '1' },
				{ name: 'Team Supremacy', value: '2' },
				{ name: 'Treaty', value: '3' }
            )
        )
].map(c => c.toJSON())

const rest = new REST({ version: '10' }).setToken(token)

async function loadCommands(idServer) {
    try {
        await rest.put(Routes.applicationCommands(idBot, idServer), {
            body: commands
        })
    } catch (error) {
        console.error('Error' + error)
    }
}

module.exports = {
    loadCommands
}