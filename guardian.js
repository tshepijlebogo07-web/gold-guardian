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

    // Fair Value Gap
    fvg:{

        detected:false,

        type:"None",

        top:0,

        bottom:0

    },

    // Order Block
    orderBlock:{

        detected:false,

        type:"None",

        high:0,

        low:0

    },

    // Premium / Discount
    premiumDiscount:{

        zone:"Equilibrium",

        midpoint:0

    },

    scores:{

        liquidity:false,

        rejection:false,

        structure:false,

        displacement:false,

        riskReward:false,

        news:true,

        fvg:false,

        orderBlock:false,

        premiumDiscount:false

    }

};

// ---------------------------
// Confidence Engine
// ---------------------------

function updateConfidence(){

    let score = 0;

    if(guardian.scores.liquidity){

        score += 15;

    }

    if(guardian.scores.rejection){

        score += 10;

    }

    if(guardian.scores.structure){

        score += 15;

    }

    if(guardian.scores.displacement){

        score += 15;

    }

    if(guardian.scores.fvg){

        score += 10;

    }

    if(guardian.scores.orderBlock){

        score += 10;

    }

    if(guardian.scores.premiumDiscount){

        score += 10;

    }

    if(guardian.scores.riskReward){

        score += 10;

    }

    if(guardian.scores.news){

        score += 5;

    }

    guardian.confidence = score;

    updateGuardianDashboard();

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

"Confidence: " +

guardian.confidence +

"% | Entry Ready",

"buyReady"

);

            break;

        case GuardianState.SELL_READY:

            verdict.classList.add("verdict-sell");

            if(typeof sendGuardianNotification(

"🔴 SELL READY",

"Confidence: " +

guardian.confidence +

"% | Entry Ready",

"sellReady"

);

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

document.getElementById("premiumDiscount").textContent =
guardian.premiumDiscount.zone;

document.getElementById("fvgStatus").textContent =
guardian.fvg.detected
? guardian.fvg.type
: "None";

document.getElementById("orderBlockStatus").textContent =
guardian.orderBlock.detected
? guardian.orderBlock.type
: "None";

const completed = [

guardian.scores.liquidity,

guardian.scores.rejection,

guardian.scores.structure,

guardian.scores.displacement,

guardian.scores.fvg,

guardian.scores.orderBlock,

guardian.scores.premiumDiscount,

guardian.scores.riskReward

].filter(Boolean).length;

document.getElementById("confirmationProgress").textContent =
completed + " / 8";
    document.getElementById("guardianVerdict").textContent =
    guardian.verdict;

    document.getElementById("confidence").textContent =
    guardian.confidence + "%";

    updateVerdictStyle();
    
const checks = {

checkLiquidity: guardian.scores.liquidity,

checkRejection: guardian.scores.rejection,

checkStructure: guardian.scores.structure,

checkDisplacement: guardian.scores.displacement,

checkFVG: guardian.scores.fvg,

checkOrderBlock: guardian.scores.orderBlock,

checkPremium: guardian.scores.premiumDiscount,

checkRR: guardian.scores.riskReward

};

for(const id in checks){

const item = document.getElementById(id);

if(!item) continue;

item.textContent =
item.textContent.replace(/^✅|^⏳/, "");

item.textContent =
(checks[id] ? "✅ " : "⏳ ") +
item.textContent.trim();

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