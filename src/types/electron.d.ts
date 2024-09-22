declare global {
    interface Window {
        electron: {
            send: (channel: string, ...args: any[]) => void;
            receive: (channel: string, listener: (event: any, ...args: any[]) => void) => void;
            removeAllListeners: (channel: string) => void;
            window: {
                close: () => void;
                minimize: () => void;
                maximize: () => void;
            }
        }
    }
}

export {};