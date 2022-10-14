const { EmbedBuilder } = require('discord.js')

const modosEn = {
    '1': '1v1 Supremacy',
    '2': 'Team Supremacy',
    '3': 'Treaty',
}

const modosEs = {
    '1': 'Supremacía 1 vs 1',
    '2': 'Supremacía en Equipo',
    '3': 'Tratado',
}

const winRate = (wins, losses) => ((wins / (wins + losses)) * 100).toFixed(2)


const generateProfileEmbed = (stats, modo) => {
    const embed = new EmbedBuilder()
        .setColor(0xebc837)
        .setTitle(`${stats.name}`)
        .setAuthor({ name: `⚔️ ${modosEn[modo] || ''} ⚔️` })
        .setThumbnail('https://storage.googleapis.com/aoe3-de-resources/resources/art/units/natives/europeans/royal_musketeer_portrait.png')

    if (stats.clan) {
        embed.addFields({ name: 'Clan', value: `🏯 ${stats.clan}` })
    }

    embed.addFields(
        { name: `Rank`, value: `🎖️ #${stats.rank}`, inline: true },
        { name: 'ELO', value: `🛡️ ${stats.elo}`, inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
    )
        .addFields(
            { name: `Win Rate`, value: `📊 ${winRate(stats.wins, stats.losses)}%`, inline: true },
            { name: `Streak`, value: `${stats.streak > 0 ? "📈" : "📉"} ${stats.streak > 0 ? "+" : ""}${stats.streak}`, inline: true },
            { name: '\u200B', value: '\u200B', inline: true },
        )
        .addFields(
            { name: `Games`, value: `🕹️ ${stats.wins + stats.losses}`, inline: true },
            { name: `Wins`, value: `🟢 ${stats.wins}`, inline: true },
            { name: `Losses`, value: `🔴 ${stats.losses}`, inline: true },
        )

    return embed
}

module.exports = {
    modosEs,
    modosEn,
    generateProfileEmbed,
}