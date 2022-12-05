const { EmbedBuilder } = require('discord.js')
const { modosEn } = require('../constants')
const defaultAvatar = 'https://aoe3-companion.web.app/assets/discord-rank-bot/resources_images_icons_techs_native_old_ways.png'

const generateClanListEmbed = (players, modo) => {
    const clanName = players[0].clan

    const embed = new EmbedBuilder()
        .setColor(0x67e6dc)
        .setTitle(`CLAN ${clanName}`)
        .setAuthor({ name: `⚔️ ${modosEn[modo] || ''} ⚔️` })
        .setThumbnail(defaultAvatar)

    const fields = []

    players.forEach((player, idx) => {
        fields.push(`**${idx + 1}. ${player?.name}**\n🎖️ #${player.rank} 🛡️ ELO: ${player?.elo}`)
    })

    embed
        .setDescription(fields.join('\n\n'))

    return embed
}

module.exports = {
    generateClanListEmbed,
}