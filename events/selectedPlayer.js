const { Events } = require('discord.js');
const leaderboarSvc = require('../services/hellpunch.service')
const { avatarURL } = require('../services/steamSummary')
const { generateProfileEmbed } = require('../embed-templates/profileUser.embed')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        if (!interaction.isSelectMenu()) return;

        if (interaction.customId === 'selectedPlayer') {
            const [value] = interaction.values
            const [selectedPlayer, modo] = value.split('_')

            const [stats] = await leaderboarSvc(selectedPlayer, { modo: modo });
            const avatar = await avatarURL(stats.steamId)
            stats.avatar = avatar

            await interaction.update({ 
                embeds: [generateProfileEmbed(stats, modo)],
                components: []
            });
        }
	},
};