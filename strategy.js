// ==========================================
// GOLD GUARDIAN
// Strategy Engine
// Version 0.8.0
// ==========================================

function evaluateSetup(candles){

    if(!candles || candles.length < 2){

        return;

    }

    const latest = candles[0];

    const previous = candles[1];

    const latestClose = Number(latest.close);
    const latestOpen = Number(latest.open);

    const previousHigh = Number(previous.high);
    const previousLow = Number(previous.low);

    // Bullish rejection

    if(

        guardian.liquidity === "Asia Low Swept" &&

        latestClose > latestOpen &&

        latestClose > previousLow

    ){

        guardian.confidence = GUARDIAN.rejectionScore;

        guardian.verdict = "WATCHING";

    }

    // Bearish rejection

    if(

        guardian.liquidity === "Asia High Swept" &&

        latestClose < latestOpen &&

        latestClose < previousHigh

    ){

        guardian.confidence = GUARDIAN.rejectionScore;

        guardian.verdict = "WATCHING";

    }

    updateGuardianDashboard();

}