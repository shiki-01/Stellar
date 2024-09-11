import { Menu } from 'electron';

export const menu = Menu.buildFromTemplate([
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
                accelerator: 'CmdOrCtrl+Shift+I',
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
]);