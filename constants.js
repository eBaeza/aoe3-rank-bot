const GAME_MODES = [
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
    },
    {
        name: 'Treaty',
        name_localizations: {
            'es-ES': 'Tratado'
        },
        value: '3'
    }
]

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

module.exports = {
    GAME_MODES,
    modosEn,
    modosEs
}