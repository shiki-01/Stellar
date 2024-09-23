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
            },
            settings: {
                get: (key: string) => any;
                set: (key: string, value: any) => void;
            },
            projects: {
                get: () => any;
                create: (name: string) => void;
                delete: (name: string) => void;
                save: (name: string, settings: any) => void;
            }
        }
    }
}

export {};