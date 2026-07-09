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

    confidence: 0,

scores:{

    liquidity:false,

    rejection:false,

    structure:false,

    displacement:false,

    riskReward:false,

    news:true

}

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

    updateVerdictStyle();

}

updateGuardianDashboard();

function updateVerdictStyle(){

// ---------------------------
// Notifications
// ---------------------------

switch(guardian.verdict){

case GuardianState.BUY_READY:

sendGuardianNotification(

"🟢 BUY READY",

"Confidence: " + guardian.confidence + "%",

"buyReady"

);

break;

case GuardianState.SELL_READY:

sendGuardianNotification(

"🔴 SELL READY",

"Confidence: " + guardian.confidence + "%",

"sellReady"

);

break;

}

function updateConfidence(){

    let score = 0;

    if(guardian.scores.liquidity){

        score += 20;

    }

    if(guardian.scores.rejection){

        score += 20;

    }

    if(guardian.scores.structure){

        score += 20;

    }

    if(guardian.scores.displacement){

        score += 20;

    }

    if(guardian.scores.riskReward){

        score += 15;

    }

    if(guardian.scores.news){

        score += 5;

    }

    guardian.confidence = score;

}

const verdict=document.getElementById("guardianVerdict");

verdict.className="";

switch(guardian.verdict){

case GuardianState.BUY_READY:

verdict.classList.add("verdict-buy");

break;

case GuardianState.SELL_READY:

verdict.classList.add("verdict-sell");

break;

case GuardianState.WATCHING:

verdict.classList.add("verdict-watch");

break;

default:

verdict.classList.add("verdict-none");

}

}