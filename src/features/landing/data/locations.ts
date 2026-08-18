export const LOCATIONS: Record<string, Record<string, string[]>> = {
    Colombia: {
        'Barranquilla': ['Centro Comercial Parque Alegra', 'Centro Comercial BuenaVista', 'Centro Comercial Viva'],
        'Medellín': ['Pueblito Paisa', 'Parque Lleras'],
        'Cali': ['Centro Comercial Chipichape', 'Centro Comercial Cosmocentro'],
    },
    'United States': {
        'New York': ['Times Square Cinema', 'Brooklyn Venue'],
        'Los Angeles': ['Downtown LA Theater', 'Hollywood Plaza'],
        'Chicago': ['Riverfront Cinema', 'North Loop Hall'],
    },
}

export const COUNTRIES = Object.keys(LOCATIONS)
