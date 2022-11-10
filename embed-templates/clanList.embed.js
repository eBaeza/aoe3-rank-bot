const { EmbedBuilder } = require('discord.js')
const { modosEn } = require('../constants')
const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/aoe3-companion.appspot.com/o/resources%2Fimages%2Ficons%2Ftechs%2Fnative%2Fold_ways.png?alt=media'

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