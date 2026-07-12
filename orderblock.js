// ==========================================
// GOLD GUARDIAN
// Order Block Engine
// GG-035 Part 2
// ==========================================

function detectOrderBlock(candles){

    guardian.orderBlock.detected = false;

    guardian.orderBlock.type = "None";

    guardian.scores.orderBlock = false;

    if(!candles || candles.length < 4){

        return;

    }

    const latest = candles[0];
    const previous = candles[1];

    // ------------------------
    // Bullish Order Block
    // ------------------------

    if(

        guardian.bias === MarketBias.BULLISH &&

        Number(previous.close) < Number(previous.open) &&

        Number(latest.close) > Number(previous.high)

    ){

        guardian.orderBlock.detected = true;

        guardian.orderBlock.type = "Bullish";

        guardian.orderBlock.high = Number(previous.high);

        guardian.orderBlock.low = Number(previous.low);

        guardian.scores.orderBlock = true;

        updateConfidence();

        return;

    }

    // ------------------------
    // Bearish Order Block
    // ------------------------

    if(

        guardian.bias === MarketBias.BEARISH &&

        Number(previous.close) > Number(previous.open) &&

        Number(latest.close) < Number(previous.low)

    ){

        guardian.orderBlock.detected = true;

        guardian.orderBlock.type = "Bearish";

        guardian.orderBlock.high = Number(previous.high);

        guardian.orderBlock.low = Number(previous.low);

        guardian.scores.orderBlock = true;

        updateConfidence();

    }

}