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
                gets: () => any;
                get: (name: string) => any;
                create: (name: { name: string; description: string; tags: string[] }) => void;
                delete: (name: string) => void;
                save: (name: string, settings: any) => void;
            }
        }
    }
}

export {};