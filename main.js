if (process.env.NODE_ENV === 'development') {
    require('dotenv-flow').config()
}

const { Client, GatewayIntentBits } = require('discord.js')
const { loadCommands } = require('./deploy-commands')
const leaderboardSvc = require('./leaderboard.service')
const token = process.env.TOKEN

const bot = new Client({ intents: GatewayIntentBits.Guilds })

bot.once('ready', async () => {
    console.log(`Inició sesión como ${bot.user.tag}`)
    await loadCommands()
})

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

const replyEn = (stats, modo) => {
    const prefixStreak = stats.winStreak > 0 ? "+" : "";
    
    return `⚔️⚔️ **${ modosEn[modo] || ''
    }** ⚔️⚔️\r\r🙅🏽 **${stats.userName
    }**\r🎖️ **Rank**: #${stats.rank
    }\r🕹️ **ELO**: ${stats.elo
    }\r📈 **Win Streak**: ${prefixStreak}${stats.winStreak
    }\r📊 **Win Percentage**: ${stats.winPercent}%`
}

const replyEs = (stats, modo) => {
    const prefixStreak = stats.winStreak > 0 ? "+" : "";
    
    return `⚔️⚔️ **${ modosEs[modo] || ''
    }** ⚔️⚔️\r\r🙅🏽 **${stats.userName
    }**\r🎖️ **Rank**: #${stats.rank
    }\r🕹️ **ELO**: ${stats.elo
    }\r📈 **Racha**: ${prefixStreak}${stats.winStreak
    }\r📊 **Ratio**: ${stats.winPercent}%`
}

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand) return

    try {
        const { commandName, options } = interaction

        if (commandName === 'elo') {
            const player = options.get('player')
            const modo = options.get('modo')
            const stats = await leaderboardSvc(player.value, modo.value);

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
                        interaction.locale === 'es-ES' ? replyEs(stats, modo.value) : replyEn(stats, modo.value)
                    )
                    .catch(error => { console.log(error) });
            }

            if (player.value.toLowerCase().trim() === 'kaiserklein') {
                await interaction
                    .followUp(`***I need more baguettes!*** 🥖🥖🥖`)
                .catch(error => { console.log(error) });

                return
            }

        }
    } catch (error) {
        console.log('Error ' + error)
    }
})

bot.login(token)
