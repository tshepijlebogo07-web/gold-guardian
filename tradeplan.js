// ==========================================
// GOLD GUARDIAN
// Trade Plan Engine
// Version 1.0.0
// ==========================================

function generateTradePlan(price){

    if(
        guardian.verdict !== GuardianState.BUY_READY &&
        guardian.verdict !== GuardianState.SELL_READY
    ){
        return;
    }

    let entry = price;

    let stop;

    let tp1;

    let tp2;

    if(guardian.verdict === GuardianState.BUY_READY){

        stop = entry - 5;

        tp1 = entry + 10;

        tp2 = entry + 20;

    }

    else{

        stop = entry + 5;

        tp1 = entry - 10;

        tp2 = entry - 20;

    }

    document.getElementById("entryPrice").textContent =
    entry.toFixed(2);

    document.getElementById("stopLoss").textContent =
    stop.toFixed(2);

    document.getElementById("takeProfit1").textContent =
    tp1.toFixed(2);

    document.getElementById("takeProfit2").textContent =
    tp2.toFixed(2);

    document.getElementById("riskReward").textContent =
    "1 : 2";

}