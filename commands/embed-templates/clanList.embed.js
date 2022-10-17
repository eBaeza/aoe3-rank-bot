const { EmbedBuilder } = require('discord.js')
const { modosEn } = require('../../constants')


const defaultAvatar = 'https://storage.googleapis.com/aoe3-de-resources/resources/images/icons/home_city/hc_bakufu.png'

const generateClanListEmbed = (players, modo) => {
    const clanName = players[0].clan

    const embed = new EmbedBuilder()
        .setColor(0x67e6dc)
        .setTitle(`CLAN ${clanName}`)
        .setAuthor({ name: `⚔️ ${modosEn[modo] || ''} ⚔️` })
        .setThumbnail(defaultAvatar)

    const fields = []

    players.forEach(player => {
        fields.push({
            name: `🙅🏽 ${player?.name}`,
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