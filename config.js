// ==========================================
// GOLD GUARDIAN
// Configuration
// Version 1.2.0
// ==========================================

// ---------- API ----------

const CONFIG = {

    apiKey: "ecb8590ef5f04b2784c8ad9eb4e5064f",

    symbol: "XAU/USD",

    interval: "15min",

    outputSize: 100,

    refreshRate: 30000

};

// ---------- SESSIONS ----------

const SESSIONS = {

    asia:{

        start:0,

        end:8

    },

    london:{

        start:8,

        end:13

    },

    newYork:{

        start:13,

        end:22

    }

};

// ---------- GUARDIAN ----------

const GUARDIAN = {

    maxConfidence:100,

    liquidityScore:30,

    rejectionScore:55,

    structureScore:75,

    readyScore:95

};