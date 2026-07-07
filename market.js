// ==========================================
// GOLD GUARDIAN
// Market Engine
// Version 1.0
// GG-022
// ==========================================

function analyzeMarket(candles, asiaHighValue, asiaLowValue){

    guardian.liquidity = "Watching";
    guardian.bias = MarketBias.NEUTRAL;
    guardian.verdict = GuardianState.NO_TRADE;
    guardian.confidence = 0;

    if(!candles || candles.length < 2){

        updateGuardianDashboard();

        return;

    }

    const latest = candles[0];

    const latestHigh = Number(latest.high);
    const latestLow = Number(latest.low);

    // --------------------------
    // Asia High Liquidity Sweep
    // --------------------------

    if(latestHigh > asiaHighValue){

        guardian.liquidity = "Asia High Swept";

        guardian.bias = MarketBias.BEARISH;

        guardian.confidence = GUARDIAN.liquidityScore;

    }

    // --------------------------
    // Asia Low Liquidity Sweep
    // --------------------------

    if(latestLow < asiaLowValue){

        guardian.liquidity = "Asia Low Swept";

        guardian.bias = MarketBias.BULLISH;

        guardian.confidence = GUARDIAN.liquidityScore;

    }

    updateGuardianDashboard();

}