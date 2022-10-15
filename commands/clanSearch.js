const { SlashCommandBuilder } = require('discord.js')
const leaderboarSvc = require('../hellpunch.service')
const { generateProfileEmbed, modosEn, modosEs } = require('./embed-templates/profileUser.embed')
const { avatarURL } = require('../services/steamSummary')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clanFind')
    .setDescription('Search for clan members in AOE III DE.')
    .setDescriptionLocalizations({
        'es-ES': 'Busca miembros del clan en AOE III DE.'
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

        if (commandName === 'clanFind') {
            const player = options.get('clan')
            const modo = options.get('modo')
            const stats = await leaderboarSvc(player.value, modo.value, commandName);

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