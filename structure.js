// ==========================================
// GOLD GUARDIAN
// Structure Engine
// Version 0.9.0
// ==========================================

function detectStructureShift(candles){

    if(!candles || candles.length < 4){

        return;

    }

    const c0 = candles[0];
    const c1 = candles[1];
    const c2 = candles[2];

    const latestClose = Number(c0.close);
    const previousHigh = Number(c1.high);
    const previousLow = Number(c1.low);

    // -------------------------
    // Bullish MSS
    // -------------------------

    if(

        guardian.liquidity === "Asia Low Swept" &&

        latestClose > previousHigh

    ){

        guardian.bias = MarketBias.BULLISH;

        guardian.confidence = 75;

        guardian.verdict = GuardianState.BUY_READY;

    }

    // -------------------------
    // Bearish MSS
    // -------------------------

    if(

        guardian.liquidity === "Asia High Swept" &&

        latestClose < previousLow

    ){

        guardian.bias = MarketBias.BEARISH;

        guardian.confidence = 75;

        guardian.verdict = GuardianState.SELL_READY;

    }

    updateGuardianDashboard();

}