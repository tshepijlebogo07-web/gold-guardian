// ==========================================
// GOLD GUARDIAN
// Smart Notification Engine
// GG-033
// Part 1/2
// ==========================================

// Prevent duplicate notifications

let notificationMemory = {};

// ----------------------------
// Request Permission
// ----------------------------

async function initializeNotifications(){

    if(!("Notification" in window)){

        console.log("Notifications unsupported.");

        return;

    }

    if(Notification.permission==="default"){

        await Notification.requestPermission();

    }

}

// ----------------------------
// Send Notification
// ----------------------------

function sendGuardianNotification(title,body,key){

    if(Notification.permission!=="granted"){

        return;

    }

    if(notificationMemory[key]){

        return;

    }

    notificationMemory[key]=true;

    new Notification(title,{

        body:body,

        icon:"icon-192.png",

        badge:"icon-192.png"

    });

}

// ----------------------------
// Reset Notification Memory
// ----------------------------

function clearNotificationMemory(){

    notificationMemory={};

}