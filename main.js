const { Client, GatewayIntentBits } = require('discord.js')
const { token } = require('./config.json')
const bot = new Client({ intents: GatewayIntentBits.Guilds })
const leaderboardSvc = require('./leaderboard.service')

bot.once('ready', () => {
    console.log('Bot en línea y listo para iniciar')
})

bot.login(token)

bot.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand) return

    try {
        const { commandName, options } = interaction
        
        if (commandName === 'elo') {
            const player = options.get('player')
            const stats = await leaderboardSvc(player.value);

            if (!stats) {
                await interaction.reply(`😥 Sin Resultados, intenta de nuevo.`);
                return
            }

            const prefixStreak = stats.winStreak > 0 ? "+" : "";
            
            await interaction.reply(`🙅🏽 ${
                stats.userName
            }\r🎖️ Rank #${
                stats.rank
            }\r🎮 ELO ${
                stats.elo
            }\r📈 Racha de ${prefixStreak}${stats.winStreak}`);
        }
    } catch (error) {
        console.log('Error ' + error)
    }
})