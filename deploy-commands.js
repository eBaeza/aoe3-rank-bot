const { SlashCommandBuilder, Routes, REST } = require('discord.js')
const idBot = process.env.ID_BOT
const token = process.env.TOKEN

const commands = [
    new SlashCommandBuilder()
        .setName('find')
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
                }
            )
        ),
        new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search for a player in AOE III DE player in the different game modes.')
        .setDescriptionLocalizations({
            'es-ES': 'Busca un jugador en AOE III DE en los diferentes modos de juego.'
        })
        .addStringOption(opt => opt
            .setName('player')
            .setDescription('Player name to search in AOE III DE')
            .setNameLocalizations({
                'es-ES': 'jugador'
            })
            .setDescriptionLocalizations({
                'es-ES': 'Nombre del jugador para buscar en AOE III DE'
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
                }
            )
        ),
        new SlashCommandBuilder()
        .setName('clanFind')
        .setDescription('Search for clan players in AOE III DE player in the different game modes.')
        .setDescriptionLocalizations({
            'es-ES': 'Buscar jugadores del clan en AOE III DE en los diferentes modos de juego.'
        })
        .addStringOption(opt => opt
            .setName('clan')
            .setDescription('Clan name to search in AOE III DE')
            .setNameLocalizations({
                'es-ES': 'jugador'
            })
            .setDescriptionLocalizations({
                'es-ES': 'Nombre del Clan para buscar en AOE III DE'
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