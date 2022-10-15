const { SlashCommandBuilder } = require('discord.js')
const leaderboarSvc = require('../hellpunch.service')
const { generateProfileEmbed, modosEn, modosEs } = require('./embed-templates/profileUser.embed')
const { avatarURL } = require('../services/steamSummary')

module.exports = {
    data: new SlashCommandBuilder()
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
            },
            { 
                name: 'Treaty',
                name_localizations: {
                    'es-ES': 'Tratado'
                },
                value: '3' 
            }
        )
    ),
    async execute(interaction) {
        const { commandName, options } = interaction

        if (commandName === 'search') {
            const player = options.get('player')
            const modo = options.get('modo')
            const stats = await leaderboarSvc(player.value.split(' ')[0], modo.value, commandName);

            if (![stats]) {
                await interaction
                    .reply(
                        interaction.locale === 'es-ES' ?
                            `😥 Sin resultados para **${player.value}** en **${modosEs[modo.value]}**, intenta de nuevo.` :
                            `😥 No results for **${player.value}** in **${modosEn[modo.value]}**, try again.`
                    )
                    .catch(error => { console.log(error) });

            } else {
               
                await interaction
                    .reply(
                        { embeds: [generateProfileEmbed(stats, modo.value, commandName)] }
                    )
                    .catch(error => { console.log(error) });
            }


        }
    }
}