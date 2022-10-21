const { SlashCommandBuilder } = require('discord.js')
const leaderboarSvc = require('../services/hellpunch.service')
const { GAME_MODES, modosEn, modosEs } = require('../constants')
const { generateClanListEmbed } = require('../embed-templates/clanList.embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clan-members')
        .setDescription('Search for clan members in AOE III DE')
        .setDescriptionLocalizations({
            'es-ES': 'Busca los miembros de un clan en AOE III DE'
        })
        .addStringOption(opt => opt
            .setName('clan')
            .setDescription('Clan name to search in AOE III DE')
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
            .addChoices(...GAME_MODES)
        ),
    async execute(interaction) {
        const player = interaction.options.get('clan')
        const modo = interaction.options.get('modo')
        const players = await leaderboarSvc(player.value, { field: 'clan', modo: modo.value });

        if (!players.length) {
            await interaction
                .reply(
                    interaction.locale === 'es-ES' ?
                        `😥 Sin resultados para **${player.value}** en **${modosEs[modo.value]}**, intenta de nuevo.` :
                        `😥 No results for **${player.value}** in **${modosEn[modo.value]}**, try again.`
                )
                .catch(error => { console.log(error) });

        } else {
            await interaction
                .reply({ embeds: [generateClanListEmbed(players, modo.value)] })
                .catch(error => { console.log(error) });
        }
    }
}