const { SlashCommandBuilder, Routes, REST } = require('discord.js')
const idBot = process.env.ID_BOT
const token = process.env.TOKEN

const commands = [
    new SlashCommandBuilder()
        .setName('elo')
        .setDescription('Check the statistics of an AOE III DE player in the different game modes.')
        .setDescriptionLocalizations({
            'es-ES': 'Consulta las estadísticas de un jugador de AOE III DE en los diferentes modos de juego.'
        })
        .addStringOption(opt => opt
            .setName('player')
            .setDescription('Player name in AOE III DE')
            .setNameLocalizations({
                'es-ES': 'jugador'
            })
            .setDescriptionLocalizations({
                'es-ES': 'Nombre del jugador en AOE III DE'
            })
            .setRequired(true)
        )
        .addStringOption(opt => opt
            .setName('modo')
            .setDescription('Game mode')
            .setDescriptionLocalizations({
                'es-ES': 'Modo de juego'
            })
            .setRequired(true)
            .addChoices(
                { 
                    name: '1v1 Supremacy',
                    name_localizations: {
                        'es-ES': 'Supremacía 1 vs 1'
                    },
                    value: '1' 
                },
				{ 
                    name: 'Team Supremacy',
                    name_localizations: {
                        'es-ES': 'Supremacía en Equipo'
                    },
                    value: '2' 
                },
				{ 
                    name: 'Treaty',
                    name_localizations: {
                        'es-ES': 'Tratado'
                    },
                    value: '3'
                 }
            )
        )
].map(c => c.toJSON())

const rest = new REST({ version: '10' }).setToken(token)

async function loadCommands() {
    try {
        await rest.put(
            Routes.applicationCommands(idBot), 
            { body: commands }
        )
    } catch (error) {
        console.error('Error' + error)
    }
}

module.exports = {
    loadCommands
}