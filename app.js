// ==========================================
// GOLD GUARDIAN v0.4.0
// Live Price + Session Countdown Engine
// ==========================================

// ---------- API ----------

const API_KEY = "ecb8590ef5f04b2784c8ad9eb4e5064f";
const SYMBOL = "XAU/USD";

// ---------- SESSION HOURS ----------

const ASIA_START = 0;
const ASIA_END = 8;

const LONDON_START = 8;
const LONDON_END = 13;

const NEWYORK_START = 13;
const NEWYORK_END = 22;

// ---------- ELEMENTS ----------

const liveTime = document.getElementById("liveTime");
const currentSession = document.getElementById("currentSession");
const goldPrice = document.getElementById("goldPrice");
const asiaHigh = document.getElementById("asiaHigh");
const asiaLow = document.getElementById("asiaLow");
const confidence = document.getElementById("confidence");
const guardianVerdict = document.getElementById("guardianVerdict");
const londonCountdown = document.getElementById("londonCountdown");
const newYorkCountdown = document.getElementById("newYorkCountdown");

// ---------- CLOCK ----------

function updateClock() {

    liveTime.textContent = new Date().toLocaleTimeString();

}

setInterval(updateClock,1000);
updateClock();

// ---------- SESSION ----------

function updateSession(){

    const hour = new Date().getHours();

    let session = "Closed";

    if(hour >= ASIA_START && hour < ASIA_END){

        session = "Asia";

    }else if(hour >= LONDON_START && hour < NEWYORK_START){

        session = "London";

    }else if(hour >= NEWYORK_START && hour < NEWYORK_END){

        session = "New York";

    }

    currentSession.textContent = session;

}

updateSession();
setInterval(updateSession,60000);

// ---------- COUNTDOWNS ----------

function formatCountdown(seconds){

    if(seconds < 0) seconds = 0;

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return String(hrs).padStart(2,"0") + ":" +
           String(mins).padStart(2,"0") + ":" +
           String(secs).padStart(2,"0");

}

function updateCountdowns(){

    const now = new Date();

    const london = new Date(now);
    london.setHours(8,0,0,0);

    if(now >= london){

        london.setDate(london.getDate()+1);

    }

    const newYork = new Date(now);
    newYork.setHours(13,0,0,0);

    if(now >= newYork){

        newYork.setDate(newYork.getDate()+1);

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

setInterval(updateCountdowns,1000);
updateCountdowns();

// ---------- LIVE PRICE ----------

async function updateGoldPrice(){

    try{

        const response = await fetch(

`https://api.twelvedata.com/price?symbol=${SYMBOL}&apikey=${API_KEY}`

        );

        const data = await response.json();

        if(data.price){

            goldPrice.textContent =
            "$ " + Number(data.price).toFixed(2);

        }else{

            goldPrice.textContent = "API Error";

        }

    }catch{

        goldPrice.textContent = "Offline";

    }

}

updateGoldPrice();
setInterval(updateGoldPrice,30000);

// ---------- PLACEHOLDERS ----------

asiaHigh.textContent = "Waiting...";
asiaLow.textContent = "Waiting...";
confidence.textContent = "0%";
guardianVerdict.textContent = "NO TRADE";