import path from 'path';
import fs from 'fs';
import {app, BrowserWindow, ipcMain, Menu, MenuItem} from 'electron';
import isDev from 'electron-is-dev';
import {randomUUID} from 'crypto';
import {menu, menuItems} from "./menu.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

let StellaDir = path.join(__dirname, 'StellaDir');
let projectDir = path.join(StellaDir, 'Projects');
let uploadDir = path.join(StellaDir, 'Uploads');
let settings = path.join(StellaDir, 'Settings.json');

const defaultProject = {
    name: "新規プロジェクト",
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
    version: "1.0.0"
};

const defaultSettings = {
    lang: 'ja',
    theme: 'light',
}

const genProjectID = () => randomUUID().replace(/-/g, '');

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
        fs.writeFileSync(settings, JSON.stringify(defaultSettings, null, 2));
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
    return projects.map(projectId => {
        try {
            const projectPath = path.join(projectDir, projectId);
            const projectSettings = JSON.parse(
                fs.readFileSync(path.join(projectPath, 'settings.json')).toString()
            );
            return {id: projectId, settings: projectSettings, error: null};
        } catch (e) {
            return {id: projectId, settings: {}, error: e};
        }
    });
});

ipcMain.handle('getProject', (event, projectId) => {
    const projectPath = path.join(projectDir, projectId);
    if (!fs.existsSync(projectPath)) {
        return {error: 'プロジェクトが存在しません'};
    }

    try {
        const projectSettings = JSON.parse(
            fs.readFileSync(path.join(projectPath, 'settings.json')).toString()
        );
        return {id: projectId, settings: projectSettings, error: null};
    } catch (e) {
        return {id: projectId, settings: {}, error: e};
    }
});

ipcMain.handle('createProject', (event, settings) => {
    const projectId = genProjectID();
    const projectPath = path.join(projectDir, projectId);

    if (fs.existsSync(projectPath)) {
        return {error: 'プロジェクトIDが重複しています'};
    }

    if (!settings) {
        return {error: '設定が不足しています'};
    }

    const newSettings = {
        ...settings,
        created: new Date().toISOString(),
        modified: new Date().toISOString()
    };

    fs.mkdirSync(projectPath);
    fs.writeFileSync(
        path.join(projectPath, 'settings.json'),
        JSON.stringify(newSettings, null, 2)
    );

    return {id: projectId, settings: newSettings, error: null};
});

ipcMain.handle('deleteProject', (event, projectId) => {
    const projectPath = path.join(projectDir, projectId);
    if (!fs.existsSync(projectPath)) {
        return {error: 'プロジェクトが存在しません'};
    }
    fs.rmdirSync(projectPath, {recursive: true});
    return {id: projectId, error: null};
});

ipcMain.handle('saveProject', (event, projectId, settings) => {
    const projectPath = path.join(projectDir, projectId);
    if (!fs.existsSync(projectPath)) {
        return {error: 'プロジェクトが存在しません'};
    }

    const updatedSettings = {
        ...settings,
        modified: new Date().toISOString()
    };

    fs.writeFileSync(
        path.join(projectPath, 'settings.json'),
        JSON.stringify(updatedSettings, null, 2)
    );

    return {id: projectId, settings: updatedSettings, error: null};
});