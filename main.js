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
    bot.guilds.cache.forEach(async (val, idx) => {
        await loadCommands(idx)
    })
})

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand) return

    try {
        const { commandName, options } = interaction

        if (commandName === 'elo') {
            const player = options.get('player')
            const stats = await leaderboardSvc(player.value);

            if (!stats) {
                await interaction.reply(`😥 **Sin Resultados, intenta de nuevo**`);
                return
            }

            const prefixStreak = stats.winStreak > 0 ? "+" : "";

            await interaction
                .reply(`🙅🏽 **${stats.userName
                    }**\r🎖️ **Rank**: #${stats.rank
                    }\r🕹️ **ELO**: ${stats.elo
                    }\r📈 **Racha**: ${prefixStreak}${stats.winStreak
                    }\r📊 **Ratio**: ${stats.winPercent}%`
                )
                .catch(error => { console.log(error) });
        }
    } catch (error) {
        console.log('Error ' + error)
    }
})

bot.login(token)
