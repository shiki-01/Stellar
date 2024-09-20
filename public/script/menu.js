import { Menu, MenuItem } from 'electron';

export const menu = new Menu()

menu.append(new MenuItem([
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
                accelerator: 'CmdOrCtrl+Shift+IOrF12',
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
]));