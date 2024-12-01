const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
    },
    removeAllListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
    window: {
        close: () => ipcRenderer.invoke('close'),
        minimize: () => ipcRenderer.invoke('minimize'),
        maximize: () => ipcRenderer.invoke('maximize'),
    },
    settings: {
        get: () => ipcRenderer.invoke('getSettings'),
        set: (data) => ipcRenderer.invoke('setSettings', data),
    },
    projects: {
        gets: () => ipcRenderer.invoke('getProjects'),
        get: (name) => ipcRenderer.invoke('getProject', name),
        create: (name) => ipcRenderer.invoke('createProject', name),
        delete: (name) => ipcRenderer.invoke('deleteProject', name),
        save: (name, settings) => ipcRenderer.invoke('saveProject', name, settings),
    }
});