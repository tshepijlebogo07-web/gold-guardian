// ==========================================
// GOLD GUARDIAN
// Guardian Decision Engine
// Version 1.0.0
// ==========================================

// ---------------------------
// Guardian States
// ---------------------------

const GuardianState = {

    NO_TRADE: "NO TRADE",

    WATCHING: "WATCHING",

    BUY_READY: "BUY READY",

    SELL_READY: "SELL READY"

};

// ---------------------------
// Market Bias
// ---------------------------

const MarketBias = {

    BULLISH: "Bullish",

    BEARISH: "Bearish",

    NEUTRAL: "Neutral"

};

// ---------------------------
// Guardian Object
// ---------------------------

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

// ---------------------------
// Confidence Engine
// ---------------------------

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

    guardian.confidence = Math.min(score,100);

}

// ---------------------------
// Verdict Style
// ---------------------------

function updateVerdictStyle(){

    const verdict = document.getElementById("guardianVerdict");

    if(!verdict){

        return;

    }

    verdict.className = "";

    switch(guardian.verdict){

        case GuardianState.BUY_READY:

            verdict.classList.add("verdict-buy");

            if(typeof sendGuardianNotification==="function"){

                sendGuardianNotification(

                    "🟢 BUY READY",

                    "Confidence: " + guardian.confidence + "%",

                    "buyReady"

                );

            }

            break;

        case GuardianState.SELL_READY:

            verdict.classList.add("verdict-sell");

            if(typeof sendGuardianNotification==="function"){

                sendGuardianNotification(

                    "🔴 SELL READY",

                    "Confidence: " + guardian.confidence + "%",

                    "sellReady"

                );

            }

            break;

        case GuardianState.WATCHING:

            verdict.classList.add("verdict-watch");

            break;

        default:

            verdict.classList.add("verdict-none");

    }

}

// ---------------------------
// Dashboard
// ---------------------------

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

// ---------------------------
// Reset Guardian
// ---------------------------

function resetGuardian(){

    guardian.liquidity = "Watching";

    guardian.bias = MarketBias.NEUTRAL;

    guardian.verdict = GuardianState.NO_TRADE;

    guardian.scores = {

        liquidity:false,

        rejection:false,

        structure:false,

        displacement:false,

        riskReward:false,

        news:true

    };

    updateConfidence();

    updateGuardianDashboard();

}

// ---------------------------
// Initialize
// ---------------------------

updateGuardianDashboard();