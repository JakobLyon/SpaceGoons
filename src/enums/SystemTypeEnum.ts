export enum SystemType {
    FLEET_COMMAND,
    TRADE_SECTOR,
    PIRATE_LAIR,
    ANOMALY,
}

export const SYSTEM_TYPE_CONFIG = {
    [SystemType.FLEET_COMMAND]: {
        name: "Fleet Command",
        riskModifier: 0.2,
    },
    [SystemType.TRADE_SECTOR]: {
        name: "Trade Sector",
        riskModifier: 0.4,
    },
    [SystemType.PIRATE_LAIR]: {
        name: "Pirate Lair",
        riskModifier: 0.8
    },
    [SystemType.ANOMALY]: {
        name: "Anomaly",
        riskModifier: 1.0
    },
}