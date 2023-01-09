const { EmbedBuilder } = require('discord.js')
const TimeAgo = require('javascript-time-ago')
const { modosEn } = require('../constants')
const en = require('javascript-time-ago/locale/en')
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const winRate = (wins, losses) => ((wins / (wins + losses)) * 100).toFixed(2)

const generateProfileEmbed = (stats, modo) => {
    const clan = stats.clan ? `[${stats.clan}] ` : ''

    const embed = new EmbedBuilder()
        .setColor(0xebc837)
        .setTitle(`${clan}${stats.name}`)
        .setAuthor({ name: `⚔️ ${modosEn[modo] || ''} ⚔️` })
        .setThumbnail(stats.avatar)

    if (stats.profileurl) {
        embed.setURL(stats.profileurl)
    }

    embed
        .addFields(
            { name: 'Rank', value: `🎖️ #${stats.rank}`, inline: true },
            { name: 'ELO', value: `🛡️ ${stats.elo}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
            { name: 'Wins', value: `🟢 ${stats.wins}`, inline: true },
            { name: 'Losses', value: `🔴 ${stats.losses}`, inline: true },
            { name: 'Games', value: `🕹️ ${stats.wins + stats.losses}`, inline: true },
            { name: 'Streak', value: `${stats.streak > 0 ? "📈" : "📉"} ${stats.streak > 0 ? "+" : ""}${stats.streak}`, inline: true },
            { name: 'Win Rate', value: `📊 ${winRate(stats.wins, stats.losses)}%`, inline: true },
            { name: 'Drops', value: `❌ ${stats.drops}`, inline: true },
        )
        .setFooter({ 'text': `Last game ${timeAgo.format(new Date(stats.lastOnline * 1000))}` })

    return embed
}

module.exports = {
    generateProfileEmbed,
}