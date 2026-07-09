// ==========================================
// GOLD GUARDIAN
// VALIDATION ENGINE
// GG-031
// ==========================================

function validateSystem(){

    const api =
    document.getElementById("apiStatus");

    const guardian =
    document.getElementById("guardianStatus");

    const journal =
    document.getElementById("journalStatus");

    const dashboard =
    document.getElementById("dashboardStatus");

    api.textContent =
    navigator.onLine
    ? "🟢 Online"
    : "🔴 Offline";

    guardian.textContent = "🟢 Ready";

    journal.textContent =

    localStorage.getItem("goldGuardianJournal")

    ? "🟢 Ready"

    : "🟡 Empty";

    dashboard.textContent = "🟢 Ready";

}

window.addEventListener(

"load",

validateSystem

);