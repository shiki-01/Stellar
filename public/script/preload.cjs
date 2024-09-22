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
});