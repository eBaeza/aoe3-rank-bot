const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js')
const leaderboarSvc = require('../services/hellpunch.service')
const { GAME_MODES, modosEn, modosEs } = require('../constants')
const { generateResultsListEmbed } = require('../embed-templates/resultsList.embed')
const { avatarURL } = require('../services/steamSummary')
const { generateProfileEmbed } = require('../embed-templates/profileUser.embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-player')
        .setDescription('Search a player in AOE III DE')
        .setDescriptionLocalizations({
            'es-ES': 'Busca un jugador en AOE III DE'
        })
        .addStringOption(opt => opt
            .setName('player')
            .setDescription('Player name in AOE III DE')
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
            .addChoices(...GAME_MODES)
        ),
    async execute(interaction) {
        const player = interaction.options.get('player')
        const modo = interaction.options.get('modo')
        const players = await leaderboarSvc(player.value, { searchPlayer: true, modo: modo.value });

        if (!players.length) {
            await interaction
                .reply(
                    interaction.locale === 'es-ES' ?
                        `😥 Sin resultados para **${player.value}** en **${modosEs[modo.value]}**, intenta de nuevo.` :
                        `😥 No results for **${player.value}** in **${modosEn[modo.value]}**, try again.`
                )
                .catch(error => { console.log(error) });
        } else {
            const row = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('selectedPlayer')
                        .setPlaceholder('Select a player')
                        .addOptions(
                            ...players.map((p, i) => ({
                                label: `${i + 1}) ${p.name}`,
                                value: `${i}`,
                            })),
                        ),
                );

            await interaction
                .reply({
                    embeds: [generateResultsListEmbed(player.value, players, modo.value)],
                    components: [row]
                })
                .catch(error => { console.log(error) });

            const filterCollector = i => i.user.id === interaction.user.id && i.customId === 'selectedPlayer'
            const collector = interaction.channel.createMessageComponentCollector({
                filter: filterCollector,
                componentType: ComponentType.SelectMenu,
                time: 15000
            });

            collector.on('collect', async i => {
                const [index] = i.values
                const stats = players[+index]
                const avatar = await avatarURL(stats.steamId)
                stats.avatar = avatar

                await i.update({
                    content: `Player found by "_**${player.value}**_" search term`,
                    embeds: [generateProfileEmbed(stats, modo.value)],
                    components: []
                });
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });
        }
    }
}