type Icons = {
    [key: string]: {
        icon: string,
        action: () => void,
    }
}

export const icons: Icons = {
    'minimize': {
        'icon': 'ic:round-minimize',
        'action': () => window.electron.window.minimize(),
    },
    'maximize': {
        'icon': 'ic:round-crop-square',
        'action':() => window.electron.window.maximize(),
    },
    'close': {
        'icon': 'ic:round-close',
        'action': () => window.electron.window.close(),
    },
}

export interface Project {
    name: string,
    settings: any,
    created: Date,
    modified: Date,
}