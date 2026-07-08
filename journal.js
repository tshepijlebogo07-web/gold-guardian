// ==========================================
// GOLD GUARDIAN
// Trade Journal
// GG-028
// ==========================================

function getJournal(){

    return JSON.parse(

        localStorage.getItem("goldGuardianJournal")

    ) || [];

}

function saveJournal(journal){

    localStorage.setItem(

        "goldGuardianJournal",

        JSON.stringify(journal)

    );

}

function addTrade(record){

    const journal = getJournal();

    journal.unshift(record);

    saveJournal(journal);

    renderJournal();

}

function renderJournal(){

    const container =

    document.getElementById("journalContainer");

    if(!container){

        return;

    }

    const journal = getJournal();

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

Entry: ${trade.entry}<br>

SL: ${trade.stopLoss}<br>

TP1: ${trade.tp1}<br>

RR: ${trade.rr}

</div>

<hr>

`;

    });

    container.innerHTML=html;

}

renderJournal();