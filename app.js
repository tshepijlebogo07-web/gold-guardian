// ==========================================
// GOLD GUARDIAN
// Version 0.5.0
// ==========================================

// ---------------------------
// API CONFIGURATION
// ---------------------------

const API_KEY = CONFIG.apiKey;
const SYMBOL = CONFIG.symbol;

// ---------------------------
// SESSION HOURS
// ---------------------------

const ASIA_START = 0;
const ASIA_END = 8;

const LONDON_START = 8;
const LONDON_END = 13;

const NEWYORK_START = 13;
const NEWYORK_END = 22;

// ---------------------------
// HTML ELEMENTS
// ---------------------------

const liveTime = document.getElementById("liveTime");

const currentSession = document.getElementById("currentSession");

const goldPrice = document.getElementById("goldPrice");

const asiaHigh = document.getElementById("asiaHigh");

const asiaLow = document.getElementById("asiaLow");

const confidence = document.getElementById("confidence");

const guardianVerdict = document.getElementById("guardianVerdict");

const londonCountdown = document.getElementById("londonCountdown");

const newYorkCountdown = document.getElementById("newYorkCountdown");

// ---------------------------
// LIVE CLOCK
// ---------------------------

function updateClock(){

    const now = new Date();

    liveTime.textContent =
    now.toLocaleTimeString();

}

updateClock();

setInterval(updateClock,1000);

// ---------------------------
// SESSION DETECTION
// ---------------------------

let previousSession = "";

function updateSession(){

    const hour = new Date().getHours();

    let session = "Closed";

    if(hour >= ASIA_START && hour < ASIA_END){

        session = "Asia";

    }

    else if(hour >= LONDON_START && hour < LONDON_END){

        session = "London";

    }

    else if(hour >= NEWYORK_START && hour < NEWYORK_END){

        session = "New York";

    }

    currentSession.textContent = session;

    if(session !== previousSession){

        previousSession = session;

        clearNotificationMemory();

        sendGuardianNotification(

        "🕒 Session Started",

        session + " Session",

        session

        );

    }

}

updateSession();

setInterval(updateSession,60000);

// ---------------------------
// COUNTDOWN FORMATTER
// ---------------------------

function formatCountdown(seconds){

    if(seconds < 0){

        seconds = 0;

    }

    const hrs =
    Math.floor(seconds/3600);

    const mins =
    Math.floor((seconds%3600)/60);

    const secs =
    seconds%60;

    return String(hrs).padStart(2,"0")
    + ":"
    + String(mins).padStart(2,"0")
    + ":"
    + String(secs).padStart(2,"0");

}
// ---------------------------
// SESSION COUNTDOWNS
// ---------------------------

function updateCountdowns(){

    const now = new Date();

    const london = new Date(now);

    london.setHours(8,0,0,0);

    if(now >= london){

        london.setDate(
        london.getDate()+1);

    }

    const newYork =
    new Date(now);

    newYork.setHours(13,0,0,0);

    if(now >= newYork){

        newYork.setDate(
        newYork.getDate()+1);

    }

    const londonSeconds =
    Math.floor((london-now)/1000);

    const newYorkSeconds =
    Math.floor((newYork-now)/1000);

    londonCountdown.textContent =
    formatCountdown(londonSeconds);

    newYorkCountdown.textContent =
    formatCountdown(newYorkSeconds);

}

updateCountdowns();

setInterval(updateCountdowns,1000);

// ---------------------------
// MARKET DATA ENGINE
// ---------------------------

async function updateMarketData(){

    try{
    
    // ---------------------------
// NEWS FILTER
// ---------------------------

checkEconomicNews();

if(!tradingAllowed()){

    goldPrice.textContent = "Paused";

    return;

}

        const response = await fetch(
`https://api.twelvedata.com/time_series?symbol=${CONFIG.symbol}&interval=${CONFIG.interval}&outputsize=${CONFIG.outputSize}&apikey=${CONFIG.apiKey}`
);

if (!response.ok) {
    throw new Error("HTTP " + response.status);
}

const data = await response.json();

console.log("TWELVE DATA RESPONSE:", data);

if (data.status === "error") {

    goldPrice.textContent = data.message;

    console.error(data);

    return;

}

if (!data.values || data.values.length === 0) {

    goldPrice.textContent = "No Data";

    console.error(data);

    return;

}

        const candles = data.values;

        const latest = candles[0];

        goldPrice.textContent =
        "$ " + Number(latest.close).toFixed(2);

        calculateAsiaRange(candles);

analyzeMarket(

candles,

Number(asiaHigh.textContent),

Number(asiaLow.textContent)

);

evaluateSetup(

candles,

Number(asiaHigh.textContent),

Number(asiaLow.textContent)

);

detectStructureShift(candles);

generateTradePlan(

Number(latest.close),

candles

);

    }

    catch(error){

        goldPrice.textContent = "Offline";

        console.error(error);

    }

}

// ---------------------------
// ASIA RANGE ENGINE
// ---------------------------

function calculateAsiaRange(candles){

    let high = -Infinity;

    let low = Infinity;

    candles.forEach(candle=>{

        const candleTime =
        new Date(candle.datetime);

        const hour =
        candleTime.getHours();

        if(hour >= ASIA_START && hour < ASIA_END){

            const candleHigh =
            Number(candle.high);

            const candleLow =
            Number(candle.low);

            if(candleHigh > high){

                high = candleHigh;

            }

            if(candleLow < low){

                low = candleLow;

            }

        }

    });

    if(high !== -Infinity){

        asiaHigh.textContent =
        high.toFixed(2);

    }

    if(low !== Infinity){

        asiaLow.textContent =
        low.toFixed(2);

    }

}

// ---------------------------
// GUARDIAN DEFAULT STATE
// ---------------------------

function initializeGuardian(){

    confidence.textContent = "0%";

    guardianVerdict.textContent = "NO TRADE";

}

// ---------------------------
// START ENGINES
// ---------------------------

initializeGuardian();

updateMarketData();

setInterval(updateMarketData,CONFIG.refreshRate);

initializeNotifications();