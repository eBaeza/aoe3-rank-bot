const { EmbedBuilder } = require('discord.js')
const { modosEn } = require('../constants')


const defaultAvatar = 'https://storage.googleapis.com/aoe3-de-resources/resources/art/units/artillery/humbaraci/humbaraci_portrait.png'

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