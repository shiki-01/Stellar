interface ProjectSettings {
    name: string,
    created: Date,
    modified: Date,
    description?: string,
    version: string,
    tags?: string[],
}

export {ProjectSettings}