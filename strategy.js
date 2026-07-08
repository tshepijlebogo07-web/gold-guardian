// ==========================================
// GOLD GUARDIAN
// Strategy Engine
// GG-023
// ==========================================

function evaluateSetup(candles, asiaHighValue, asiaLowValue){

    if(!candles || candles.length < 2){

        return;

    }

    const latest = candles[0];

    const latestOpen = Number(latest.open);

    const latestClose = Number(latest.close);

    // --------------------------
    // BUY REJECTION
    // --------------------------

    if(

        guardian.liquidity === "Asia Low Swept" &&

        latestClose > latestOpen &&

        latestClose > asiaLowValue

    ){

        guardian.confidence = GUARDIAN.rejectionScore;

        guardian.verdict = GuardianState.WATCHING;

    }

    // --------------------------
    // SELL REJECTION
    // --------------------------

    if(

        guardian.liquidity === "Asia High Swept" &&

        latestClose < latestOpen &&

        latestClose < asiaHighValue

    ){

        guardian.confidence = GUARDIAN.rejectionScore;

        guardian.verdict = GuardianState.WATCHING;

    }

    updateGuardianDashboard();

}