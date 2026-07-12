// ==========================================
// GOLD GUARDIAN
// Fair Value Gap Engine
// GG-035 Part 1
// ==========================================

function detectFVG(candles){

    guardian.fvg.detected = false;

    guardian.fvg.type = "None";

    if(!candles || candles.length < 3){

        return;

    }

    const latest = candles[0];

    const previous = candles[1];

    const third = candles[2];

    // ------------------------
    // Bullish FVG
    // ------------------------

    if(

        Number(latest.low) >

        Number(third.high)

    ){

        guardian.fvg.detected = true;

        guardian.fvg.type = "Bullish";

        guardian.fvg.top =

        Number(latest.low);

        guardian.fvg.bottom =

        Number(third.high);

        guardian.scores.fvg = true;

        updateConfidence();

        return;

    }

    // ------------------------
    // Bearish FVG
    // ------------------------

    if(

        Number(latest.high) <

        Number(third.low)

    ){

        guardian.fvg.detected = true;

        guardian.fvg.type = "Bearish";

        guardian.fvg.top =

        Number(third.low);

        guardian.fvg.bottom =

        Number(latest.high);

        guardian.scores.fvg = true;

        updateConfidence();

        return;

    }

    guardian.scores.fvg = false;

}