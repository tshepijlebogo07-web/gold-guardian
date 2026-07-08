// ==========================================
// GOLD GUARDIAN
// JOURNAL ENGINE
// GG-029
// ==========================================

const STORAGE_KEY="goldGuardianJournal";

// ----------------------------

function getJournal(){

    return JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    ) || [];

}

// ----------------------------

function saveJournal(data){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}

// ----------------------------

function addTrade(record){

    const journal=getJournal();

    journal.unshift(record);

    saveJournal(journal);

    renderJournal();

    updateStatistics();

}

// ----------------------------

function renderJournal(){

    const container=

    document.getElementById("journalContainer");

    if(!container){

        return;

    }

    const journal=getJournal();

    if(journal.length===0){

        container.innerHTML=

        "<p>No trades recorded yet.</p>";

        return;

    }

    let html="";

    journal.forEach(trade=>{

        html+=`

<div class="journalTrade">

<strong>${trade.type}</strong><br>

${trade.date}<br>

Entry:
${trade.entry}<br>

SL:
${trade.stopLoss}<br>

TP1:
${trade.tp1}<br>

RR:
${trade.rr}<br>

Confidence:
${trade.confidence}%

</div>

<hr>

`;

    });

    container.innerHTML=html;

}

// ----------------------------

function updateStatistics(){

    const journal=getJournal();

    const total=journal.length;

    let buys=0;

    let sells=0;

    let confidence=0;

    let rr=0;

    journal.forEach(trade=>{

        if(trade.type==="BUY READY"){

            buys++;

        }

        if(trade.type==="SELL READY"){

            sells++;

        }

        confidence+=Number(trade.confidence);

        rr+=Number(trade.rr);

    });

    document.getElementById(

        "totalSignals"

    ).textContent=total;

    document.getElementById(

        "buySignals"

    ).textContent=buys;

    document.getElementById(

        "sellSignals"

    ).textContent=sells;

    document.getElementById(

        "averageConfidence"

    ).textContent=

    total?

    (confidence/total).toFixed(1)+"%"

    :

    "0%";

    document.getElementById(

        "averageRR"

    ).textContent=

    total?

    (rr/total).toFixed(2)

    :

    "0";

}

// ----------------------------

renderJournal();

updateStatistics();