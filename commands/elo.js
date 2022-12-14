const { SlashCommandBuilder } = require('discord.js')
const leaderboarSvc = require('../services/hellpunch.service')
const { generateProfileEmbed } = require('../embed-templates/profileUser.embed')
const { modosEn, modosEs, GAME_MODES } = require('../constants')
const { steamSummary } = require('../services/steamSummary')

module.exports = {
    data: new SlashCommandBuilder()
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
            .addChoices(...GAME_MODES)
        ),
    async execute(interaction) {
        const player = interaction.options.get('player')
        const modo = interaction.options.get('modo')
        const [stats] = await leaderboarSvc(player.value, { modo: modo.value });

        if (!stats) {
            await interaction
                .reply(
                    interaction.locale === 'es-ES' ?
                        `😥 Sin resultados para **${player.value}** en **${modosEs[modo.value]}**, intenta de nuevo.` :
                        `😥 No results for **${player.value}** in **${modosEn[modo.value]}**, try again.`
                )
                .catch(error => { console.log(error) });

        } else {
            const { avatarfull, profileurl } = await steamSummary(stats.steamId)
            stats.avatar = avatarfull
            stats.profileurl = profileurl
            await interaction
                .reply(
                    { embeds: [generateProfileEmbed(stats, modo.value)] }
                )
                .catch(error => { console.log(error) });
        }
    }
}