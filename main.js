if (process.env.NODE_ENV === 'development') {
    require('dotenv-flow').config()
}

const { Client, GatewayIntentBits } = require('discord.js')
// const { loadCommands } = require('./deploy-commands')
const leaderboarSvc = require('./hellpunch.service')
const token = process.env.TOKEN

const bot = new Client({ intents: GatewayIntentBits.Guilds })

bot.once('ready', async () => {
    console.log(`Inició sesión como ${bot.user.tag}`)
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

const winRate = (wins, losses) => (( wins/(wins+losses) ) * 100).toFixed(2)

const replyEn = (stats, modo, paramMode) => {
   

    if (paramMode === 'find'){
        const statsFirst = [stats];
        const prefixStreak = statsFirst.streak > 0 ? "📈" : "📉";
        return `⚔️ **${ modosEn[modo] || ''
        }** ⚔️\r\r🙅🏽 **${statsFirst.name
        }**\r🎖️ **Rank**: #${statsFirst.rank
        }\r🛡️ **ELO**: ${statsFirst.elo
        }\r🏯  **CLAN**: ${statsFirst.clan}\r${prefixStreak} **Win Streak**: ${statsFirst.streak
        }\r📊 **Win Rate**: ${winRate(statsFirst.wins, statsFirst.losses)
        }%\r🕹️ **Games**: ${statsFirst.wins + statsFirst.losses}`;

    }
    else {
        var allNames;
        const totDoc = stats.length;
        for(let i = 0; i < totDoc; i++) {
            allNames += `🙅🏽 ` + stats[i].name + `**ELO: **` + stats[i].elo;
            if (i < totDoc - 1) allNames += '\r';
          }
          if (paramMode === 'search') {
        return `⚔️ **${ modosEn[modo] || ''
    }** ⚔️\r\rThere are ${totDoc} players that start with the name you provided. Use their full name to make a FIND command search\r
        ${allNames}` }
        else{
            return `⚔️ **${ modosEn[modo] || ''
        }** ⚔️\r\rThere are ${totDoc} players in this clan. Use their full name to make a FIND command search\r
            ${allNames}`
        }
    }
}

const replyEs = (stats,  modo, paramMode) => {

    if (paramMode === 'find'){
    const statsFirst = [stats];
    const prefixStreak = statsFirst.streak > 0 ? "📈" : "📉";
    return `⚔️ **${ modosEs[modo] || ''
    }** ⚔️\r\r🙅🏽 **${statsFirst.name
    }**\r🎖️ **Rank**: #${statsFirst.rank
    }\r🛡️ **ELO**: ${statsFirst.elo
    }\r🏯 **CLAN**: ${statsFirst.clan}\r${prefixStreak} **Racha**: ${statsFirst.streak
    }\r📊 **Ratio**: ${winRate(statsFirst.wins, statsFirst.losses)
    }%\r🕹️ **Partidas**: ${statsFirst.wins + statsFirst.losses}`;}
    else{
        var allNames;
        const totDoc = stats.length;
        for(let i = 0; i < totDoc; i++) {
            allNames += `🙅🏽 ` + statsDocs[i].name + `**ELO: **` + statsDocs[i].elo;
            if (i < totDoc - 1) allNames += '\r';
          }
        if (paramMode === 'search') {
        return `⚔️ **${ modosEs[modo] || ''
    }** ⚔️\r\rHay ${totDoc} jugadores que comienzan con el nombre que proporcionó. Use su nombre completo para hacer una búsqueda de comando FIND\r
        ${allNames}` }
        else{
            return `⚔️ **${ modosEs[modo] || ''
        }** ⚔️\r\rHay ${totDoc} jugadores en el Clan que proporcionó. Use su nombre completo para hacer una búsqueda de comando FIND\r
            ${allNames}`
        }
    }
}

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand) return

    try {
        const { commandName, options } = interaction

   
            const player =  commandName === 'clanFind' ? options.get('clan') : options.get('player') ;
            const modo = options.get('modo')
            const stats = await leaderboarSvc(commandName === 'search' ? player.value.split(' ')[0] : player.value, modo.value, commandName);

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
                            replyEs(stats, modo.value, commandName ) : 
                            replyEn(stats, modo.value,  commandName )
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
            
    } catch (error) {
        console.log('Error ' + error)
    }
})

bot.login(token)
