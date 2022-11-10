const { EmbedBuilder } = require('discord.js')
const { modosEn } = require('../constants')
const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/aoe3-companion.appspot.com/o/resources%2Fimages%2Ficons%2Ftechs%2Fnative%2Finformants.png?alt=media'

const generateResultsListEmbed = (searchTerm, players, modo) => {
    const embed = new EmbedBuilder()
        .setColor(0xe67e22)
        .setTitle(`Results for _"${searchTerm}"_`)
        .setAuthor({ name: `⚔️ ${modosEn[modo] || ''} ⚔️` })
        .setThumbnail(defaultAvatar)

    embed
        .setDescription(players.map((player, idx) => {
            const clan = player.clan ? `[${player.clan}] ` : ''
            return `${idx+1}) ${clan}${player.name}`
        }).join('\n'))

    return embed
}

module.exports = {
    generateResultsListEmbed,
}