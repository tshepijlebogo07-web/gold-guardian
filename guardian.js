// ==========================================
// GOLD GUARDIAN
// Guardian Decision Engine
// Version 0.6.0
// ==========================================

// Guardian States

const GuardianState = {

    NO_TRADE: "NO TRADE",

    WATCHING: "WATCHING",

    BUY_READY: "BUY READY",

    SELL_READY: "SELL READY"

};

// Market Bias

const MarketBias = {

    BULLISH: "Bullish",

    BEARISH: "Bearish",

    NEUTRAL: "Neutral"

};

// Current State

let guardian = {

    liquidity: "Watching",

    bias: MarketBias.NEUTRAL,

    verdict: GuardianState.NO_TRADE,

    confidence: 0

};

// Update Dashboard

function updateGuardianDashboard(){

    document.getElementById("liquidityStatus").textContent =
    guardian.liquidity;

    document.getElementById("marketBias").textContent =
    guardian.bias;

    document.getElementById("guardianVerdict").textContent =
    guardian.verdict;

    document.getElementById("confidence").textContent =
    guardian.confidence + "%";

}

updateGuardianDashboard();