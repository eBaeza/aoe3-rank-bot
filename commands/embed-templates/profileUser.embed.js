const { EmbedBuilder } = require('discord.js')
const TimeAgo = require('javascript-time-ago')
const en = require('javascript-time-ago/locale/en')
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

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
const defaultAvatar = 'https://aoe3de-deck-builder.herokuapp.com/assets/revolution_guns.png'
const defaultClanAvatar = 'https://storage.googleapis.com/aoe3-de-resources/resources/images/icons/home_city/hc_bakufu.png'
const defaultSearchAvatar = 'https://storage.googleapis.com/aoe3-de-resources/resources/images/icons/techs/hc_hire_highland_merc_army/hire_highland_merc_army_infinite.png'

const generateProfileEmbed = (stats, modo, commandName) => {
    const embed = new EmbedBuilder();
    if (commandName === 'find')
    {
        const clan = stats.clan ? `[${stats.clan}] ` : ''

        embed
            .setColor(0xebc837)
            .setTitle(`${clan}${stats.name}`)
            .setAuthor({ name: `⚔️ ${modosEn[modo] || ''} ⚔️` })
            .setThumbnail(stats.avatar || defaultAvatar)

        embed
            .addFields(
                { name: 'Rank', value: `🎖️ #${stats.rank}`, inline: true },
                { name: 'ELO', value: `🛡️ ${stats.elo}`, inline: true },
                { name: 'Streak', value: `${stats.streak > 0 ? "📈" : "📉"} ${stats.streak > 0 ? "+" : ""}${stats.streak}`, inline: true },
                { name: 'Wins', value: `🟢 ${stats.wins}`, inline: true },
                { name: 'Losses', value: `🔴 ${stats.losses}`, inline: true },
                { name: 'Games', value: `🕹️ ${stats.wins + stats.losses}`, inline: true },
                { name: 'Win Rate', value: `📊 ${winRate(stats.wins, stats.losses)}%`, inline: true },
            )
            .setFooter({ 'text': `Last online ${timeAgo.format(new Date(stats.lastOnline * 1000))}` })
    }
    else
    {
        const totDoc = stats.length;

        embed
        .setColor(0xebc837)
        .setTitle(`${totDoc} results:`)
        .setAuthor({ name: `⚔️ ${modosEn[modo] || ''} ⚔️` })

        for(let i = 0; i < totDoc; i++) 
        {
            embed
            .addFields(
                {
                    value: `🙅🏽 ` + stats[i].name + `**ELO: **` + stats[i].elo
                },
            )
        }

        if (paramMode === 'search') 
        {
            embed
            .setThumbnail(defaultSearchAvatar)
        }
        else
        {
            embed
            .setThumbnail(defaultClanAvatar)
        }

        embed
        .setFooter({
            'text' : `Use the Find command for more details on the players`
        })

    }

    return embed
}

module.exports = {
    modosEs,
    modosEn,
    generateProfileEmbed,
}