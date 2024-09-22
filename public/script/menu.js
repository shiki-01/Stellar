import { Menu } from 'electron';

export const menu = new Menu()

export const menuItems = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close',
            },
        ],
    },
    {
        label: 'dev',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                role: 'reload',
            },
            {
                label: 'Toggle DevTools',
                accelerator: 'F12',
                role: 'toggleDevTools',
            },
        ],
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Console Log',
                click: () => console.log('context-menu'),
            },
        ],
    },
]