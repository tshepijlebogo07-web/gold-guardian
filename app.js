// ==========================================
// GOLD GUARDIAN v0.3.0
// Live Price + Session Engine
// ==========================================

// -------- API --------

const API_KEY = "ecb8590ef5f04b2784c8ad9eb4e5064f";

const SYMBOL = "XAU/USD";

// -------- SESSION HOURS --------

const ASIA_START = 0;
const ASIA_END = 8;

const LONDON_START = 8;
const LONDON_END = 13;

const NEWYORK_START = 13;
const NEWYORK_END = 22;

// -------- ELEMENTS --------

const liveTime = document.getElementById("liveTime");

const currentSession = document.getElementById("currentSession");

const goldPrice = document.getElementById("goldPrice");

const asiaHigh = document.getElementById("asiaHigh");

const asiaLow = document.getElementById("asiaLow");

const confidence = document.getElementById("confidence");

const guardianVerdict = document.getElementById("guardianVerdict");

const londonCountdown = document.getElementById("londonCountdown");

const newYorkCountdown = document.getElementById("newYorkCountdown");

// -------- CLOCK --------

function updateClock() {

    liveTime.textContent = new Date().toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

// -------- SESSION --------

function updateSession(){

    const hour=new Date().getHours();

    let session="Closed";

    if(hour>=ASIA_START&&hour<ASIA_END){

        session="Asia";

    }

    else if(hour>=LONDON_START&&hour<LONDON_END){

        session="London";

    }

    else if(hour>=NEWYORK_START&&hour<NEWYORK_END){

        session="New York";

    }

    currentSession.textContent=session;

}

updateSession();

setInterval(updateSession,60000);

// -------- LIVE GOLD PRICE --------

async function updateGoldPrice(){

    try{

        const response = await fetch(

`https://api.twelvedata.com/price?symbol=${SYMBOL}&apikey=${API_KEY}`

        );

        const data = await response.json();

        if(data.price){

            goldPrice.textContent="$ "+Number(data.price).toFixed(2);

        }

        else{

            goldPrice.textContent="API Error";

            console.log(data);

        }

    }

    catch(error){

        goldPrice.textContent="Offline";

        console.error(error);

    }

}

updateGoldPrice();

setInterval(updateGoldPrice,30000);

// -------- PLACEHOLDERS --------

asiaHigh.textContent="Waiting...";

asiaLow.textContent="Waiting...";

confidence.textContent="0%";

guardianVerdict.textContent="NO TRADE";

londonCountdown.textContent="--:--:--";

newYorkCountdown.textContent="--:--:--";