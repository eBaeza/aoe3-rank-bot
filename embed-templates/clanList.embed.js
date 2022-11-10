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
        fields.push({
            name: `${idx + 1}. ${player?.name}`,
            value: `🎖️ #${player.rank} 🛡️ ELO: ${player?.elo}`
        })
    })

    embed
        .addFields(...fields)

    return embed
}

module.exports = {
    generateClanListEmbed,
}