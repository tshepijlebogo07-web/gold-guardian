// ==========================================
// GOLD GUARDIAN
// Market Engine
// Version 0.7.0
// ==========================================

function analyzeMarket(latestPrice, asiaHighValue, asiaLowValue){

    guardian.liquidity = "Watching";
    guardian.bias = MarketBias.NEUTRAL;
    guardian.verdict = GuardianState.NO_TRADE;
    guardian.confidence = 0;

    if(latestPrice > asiaHighValue){

        guardian.liquidity = "Asia High Swept";
        guardian.bias = MarketBias.BEARISH;
        guardian.confidence = GUARDIAN.liquidityScore;

    }

    else if(latestPrice < asiaLowValue){

        guardian.liquidity = "Asia Low Swept";
        guardian.bias = MarketBias.BULLISH;
        guardian.confidence = GUARDIAN.liquidityScore;

    }

    updateGuardianDashboard();

}