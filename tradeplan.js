// ==========================================
// GOLD GUARDIAN
// Dynamic Trade Plan Engine
// Version 1.1.0
// ==========================================

function generateTradePlan(price, candles){

    if(!candles || candles.length < 3){

        return;

    }

    if(
        guardian.verdict !== GuardianState.BUY_READY &&
        guardian.verdict !== GuardianState.SELL_READY
    ){

        clearTradePlan();

        return;

    }

    let entry = price;

    let stopLoss;

    let takeProfit1;

    let takeProfit2;

    let risk;

    let reward;

    if(guardian.verdict === GuardianState.BUY_READY){

        stopLoss = Number(candles[1].low);

        risk = entry - stopLoss;

        takeProfit1 = entry + (risk * 2);

        takeProfit2 = entry + (risk * 4);

    }

    else{

        stopLoss = Number(candles[1].high);

        risk = stopLoss - entry;

        takeProfit1 = entry - (risk * 2);

        takeProfit2 = entry - (risk * 4);

    }

    reward = Math.abs(takeProfit1 - entry);

    document.getElementById("entryPrice").textContent =
    entry.toFixed(2);

    document.getElementById("stopLoss").textContent =
    stopLoss.toFixed(2);

    document.getElementById("takeProfit1").textContent =
    takeProfit1.toFixed(2);

    document.getElementById("takeProfit2").textContent =
    takeProfit2.toFixed(2);

    document.getElementById("riskReward").textContent =
    "1 : " + (reward / risk).toFixed(1);

}

function clearTradePlan(){

    document.getElementById("entryPrice").textContent="--";

    document.getElementById("stopLoss").textContent="--";

    document.getElementById("takeProfit1").textContent="--";

    document.getElementById("takeProfit2").textContent="--";

    document.getElementById("riskReward").textContent="--";

}