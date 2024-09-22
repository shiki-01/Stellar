import path from 'path';
import fs from 'fs';
import {app, BrowserWindow, ipcMain, Menu, MenuItem} from 'electron';
import isDev from 'electron-is-dev';
import {menu, menuItems} from "./menu.js";
import settingsT from './template/settings.json' with {type: 'json'};
import projectT from './template/project.json' with {type: 'json'};

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

let StellaDir = path.join(__dirname, 'StellaDir');
let projectDir = path.join(StellaDir, 'Projects');
let uploadDir = path.join(StellaDir, 'Uploads');
let settings = path.join(StellaDir, 'Settings.json');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs'),
        },
    });

    win.loadURL(
        isDev
            ? 'http://localhost:4321'
            : `file://${path.join(__dirname, '../index.html')}`
    ).then(r => console.log(r));

    if (!fs.existsSync(StellaDir)) {
        fs.mkdirSync(StellaDir);
    }

    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir);
    }

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    if (!fs.existsSync(settings)) {
        fs.writeFileSync(settings, JSON.stringify(settingsT, null, 2));
    }

    menuItems.forEach(item => menu.append(new MenuItem(item)))
    Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
    createWindow()
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

ipcMain.handle('close', () => {
    app.quit();
});

ipcMain.handle('minimize', () => {
    BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.handle('maximize', () => {
    const win = BrowserWindow.getFocusedWindow();
    win.isMaximized() ? win.unmaximize() : win.maximize();
});

ipcMain.handle('getSettings', () => {
    return JSON.parse(fs.readFileSync(settings).toString());
});

ipcMain.handle('setSettings', (event, data) => {
    fs.writeFileSync(settings, JSON.stringify(data, null, 2));
});

ipcMain.handle('getProjects', () => {
    const projects = fs.readdirSync(projectDir);
    if (projects.length === 0) return [];
    return projects.map(project => {
        try {
            const projectPath = path.join(projectDir, project);
            const projectSettings = JSON.parse(fs.readFileSync(path.join(projectPath, 'settings.json')).toString());
            return {name: project, settings: projectSettings, error: null};
        } catch (e) {
            return {name: project, settings: {}, error: e};
        }
    });
})

ipcMain.handle('createProject', (event, name) => {
    const projectPath = path.join(projectDir, name);
    if (fs.existsSync(projectPath)) return {error: 'Project already exists'};
    fs.mkdirSync(projectPath);
    fs.writeFileSync(path.join(projectPath, 'settings.json'), JSON.stringify(projectT, null, 2));
    return {name, settings: projectT, error: null};
});

ipcMain.handle('deleteProject', (event, name) => {
    const projectPath = path.join(projectDir, name);
    if (!fs.existsSync(projectPath)) return {error: 'Project does not exist'};
    fs.rmdirSync(projectPath, {recursive: true});
    return {name, error: null};
});

ipcMain.handle('saveProject', (event, name, settings) => {
    const projectPath = path.join(projectDir, name);
    if (!fs.existsSync(projectPath)) return {error: 'Project does not exist'};
    fs.writeFileSync(path.join(projectPath, 'settings.json'), JSON.stringify(settings, null, 2));
    return {name, settings, error: null};
});