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

    logDebug("File: " + source, false);

    logDebug("Line: " + line + ":" + column, false);

    if(error){

        console.error(error);

    }

};

window.addEventListener("load",()=>{

    logDebug("Application Loaded");

});