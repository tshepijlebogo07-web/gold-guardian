// ==========================================
// GOLD GUARDIAN
// Debug Console
// GG-034.6
// ==========================================

function logDebug(message, success = true){

    const consoleBox =
    document.getElementById("debugConsole");

    if(!consoleBox){

        return;

    }

    const line =
    document.createElement("p");

    line.textContent =
    (success ? "✅ " : "❌ ") + message;

    consoleBox.appendChild(line);

}

window.onerror = function(message, source, line, column, error){

    logDebug("ERROR: " + message, false);

    logDebug("SOURCE: " + source, false);

    logDebug("LINE: " + line, false);

    logDebug("COLUMN: " + column, false);

    console.error(error);

    return false;

};

window.addEventListener("unhandledrejection", function(event){

    logDebug("PROMISE ERROR: " + event.reason, false);

    console.error(event.reason);

});