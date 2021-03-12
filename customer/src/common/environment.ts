export function getNodeEnvironment(): NodeEnvironment {
    switch (process.env.NODE_ENV) {
        case "production":
            return NodeEnvironment.Production;
        default:
            return NodeEnvironment.Development;
    }
}

export enum NodeEnvironment {
    Development = "development",
    Production = "production"
}
