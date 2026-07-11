// ==========================================
// GOLD GUARDIAN
// Market Engine
// Version 1.1.0
// GG-034.5 Recovery
// ==========================================

function analyzeMarket(candles, asiaHighValue, asiaLowValue){

    // Reset Guardian State

    guardian.liquidity = "Watching";
    guardian.bias = MarketBias.NEUTRAL;
    guardian.verdict = GuardianState.NO_TRADE;
    guardian.confidence = 0;

    guardian.scores.liquidity = false;
    guardian.scores.rejection = false;
    guardian.scores.structure = false;
    guardian.scores.displacement = false;
    guardian.scores.riskReward = false;

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

        guardian.scores.liquidity = true;

        updateConfidence();

    }

    // --------------------------
    // Asia Low Liquidity Sweep
    // --------------------------

    else if(latestLow < asiaLowValue){

        guardian.liquidity = "Asia Low Swept";

        guardian.bias = MarketBias.BULLISH;

        guardian.scores.liquidity = true;

        updateConfidence();

    }

    updateGuardianDashboard();

}