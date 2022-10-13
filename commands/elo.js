const { SlashCommandBuilder } = require('discord.js')
const leaderboarSvc = require('../hellpunch.service')



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

const winRate = (wins, losses) => (( wins/(wins+losses) ) * 100).toFixed(2)

const replyEn = (stats, modo) => {
    const prefixStreak = stats.streak > 0 ? "📈" : "📉";
    
    return `⚔️ **${ modosEn[modo] || ''
    }** ⚔️\r\r🙅🏽 **${stats.name
    }**\r🎖️ **Rank**: #${stats.rank
    }\r🛡️ **ELO**: ${stats.elo
    }\r${prefixStreak} **Win Streak**: ${stats.streak
    }\r📊 **Win Rate**: ${winRate(stats.wins, stats.losses)
    }%\r🕹️ **Games**: ${stats.wins + stats.losses}`
}

const replyEs = (stats, modo) => {
    const prefixStreak = stats.streak > 0 ? "📈" : "📉";
    
    return `⚔️ **${ modosEs[modo] || ''
    }** ⚔️\r\r🙅🏽 **${stats.name
    }**\r🎖️ **Rank**: #${stats.rank
    }\r🛡️ **ELO**: ${stats.elo
    }\r${prefixStreak} **Racha**: ${stats.streak
    }\r📊 **Ratio**: ${winRate(stats.wins, stats.losses)
    }%\r🕹️ **Partidas**: ${stats.wins + stats.losses}`
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('elo')
    .setDescription('Check the statistics of an AOE III DE player in the different game modes.')
    .setDescriptionLocalizations({
        'es-ES': 'Consulta las estadísticas de un jugador de AOE III DE en los diferentes modos de juego.'
    })
    .addStringOption(opt => opt
        .setName('player')
        .setDescription('Player name in AOE III DE')
        .setNameLocalizations({
            'es-ES': 'jugador'
        })
        .setDescriptionLocalizations({
            'es-ES': 'Nombre del jugador en AOE III DE'
        })
        .setRequired(true)
    )
    .addStringOption(opt => opt
        .setName('modo')
        .setDescription('Game mode')
        .setDescriptionLocalizations({
            'es-ES': 'Modo de juego'
        })
        .setRequired(true)
        .addChoices(
            {
                name: '1v1 Supremacy',
                name_localizations: {
                    'es-ES': 'Supremacía 1 vs 1'
                },
                value: '1'
            },
            {
                name: 'Team Supremacy',
                name_localizations: {
                    'es-ES': 'Supremacía en Equipo'
                },
                value: '2'
            }
        )
    ),
    async execute(interaction) {
        const { commandName, options } = interaction

        if (commandName === 'elo') {
            const player = options.get('player')
            const modo = options.get('modo')
            const stats = await leaderboarSvc(player.value, modo.value);

            if (!stats) {
                await interaction
                    .reply(
                        interaction.locale === 'es-ES' ?
                        `😥 Sin resultados para **${player.value}** en **${modosEs[modo.value]}**, intenta de nuevo.` :
                        `😥 No results for **${player.value}** in **${modosEn[modo.value]}**, try again.`
                    )
                    .catch(error => { console.log(error) });
                
            } else {
                await interaction
                    .reply(
                        interaction.locale === 'es-ES' ? 
                            replyEs(stats, modo.value) : 
                            replyEn(stats, modo.value)
                    )
                    .catch(error => { console.log(error) });
            }

            if (player.value.toLowerCase().trim() === 'kaiserklein') {
                await interaction.followUp(`*I need more baguettes!* 🥖🥖🥖`).catch(error => { console.log(error) });
                return
            }

            if (player.value.toLowerCase().trim() === 'ezad') {
                await interaction.followUp(`*Balloon!* 🎈🎈🎈`).catch(error => { console.log(error) });
                return
            }

        }
    }
}