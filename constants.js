const GAME_MODES = [
    {
        name: '1v1 Supremacy',
        name_localizations: {
            'es-ES': 'Supremacía 1 vs 1'
        },
        value: '1vs1'
    },
    {
        name: 'Team Supremacy',
        name_localizations: {
            'es-ES': 'Supremacía en Equipo'
        },
        value: 'teamSupremacy'
    },
    {
        name: 'Treaty',
        name_localizations: {
            'es-ES': 'Tratado'
        },
        value: 'treaty'
    }
]

const modosEn = {
    '1vs1': '1v1 Supremacy',
    'teamSupremacy': 'Team Supremacy',
    'treaty': 'Treaty',
}

const modosEs = {
    '1vs1': 'Supremacía 1 vs 1',
    'teamSupremacy': 'Supremacía en Equipo',
    'treaty': 'Tratado',
}

module.exports = {
    GAME_MODES,
    modosEn,
    modosEs
}