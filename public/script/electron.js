import path from 'path';
import {app, BrowserWindow, globalShortcut} from 'electron';
import isDev from 'electron-is-dev';
import {menu} from "./menu.js";
import {ipcMain} from 'electron';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'public/script/preload.js'),
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:4321'
            : `file://${path.join(__dirname, '../index.html')}`
    ).then(r => console.log(r));
}

app.whenReady().then(() => {
    createWindow()
    globalShortcut.register('F12', () => {
        BrowserWindow.getFocusedWindow().webContents.openDevTools()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle(`show-context-menu`, () => {
    menu.popup()
})