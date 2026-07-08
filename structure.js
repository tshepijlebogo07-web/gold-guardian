// ==========================================
// GOLD GUARDIAN
// Structure Engine
// GG-024
// ==========================================

function detectStructureShift(candles){

    if(!candles || candles.length < 2){

        return;

    }

    const latest = candles[0];

    const previous = candles[1];

    const latestClose = Number(latest.close);

    const previousHigh = Number(previous.high);

    const previousLow = Number(previous.low);

    // --------------------------
    // BUY Structure Shift
    // --------------------------

    if(

        guardian.verdict === GuardianState.WATCHING &&

        guardian.bias === MarketBias.BULLISH &&

        latestClose > previousHigh

    ){

        guardian.confidence = GUARDIAN.structureScore;

        guardian.verdict = GuardianState.BUY_READY;

    }

    // --------------------------
    // SELL Structure Shift
    // --------------------------

    if(

        guardian.verdict === GuardianState.WATCHING &&

        guardian.bias === MarketBias.BEARISH &&

        latestClose < previousLow

    ){

        guardian.confidence = GUARDIAN.structureScore;

        guardian.verdict = GuardianState.SELL_READY;

    }

    updateGuardianDashboard();

}