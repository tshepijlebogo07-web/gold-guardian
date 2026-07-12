// ==========================================
// GOLD GUARDIAN
// Smart Confirmation Engine
// GG-035 Part 4
// ==========================================

function confirmTradeSetup(){

    // Reset

    guardian.verdict = GuardianState.NO_TRADE;

    // News filter

    if(!guardian.scores.news){

        updateGuardianDashboard();

        return;

    }

    // Required confirmations

    const confirmed =

        guardian.scores.liquidity &&

        guardian.scores.rejection &&

        guardian.scores.structure &&

        guardian.scores.displacement &&

        guardian.scores.fvg &&

        guardian.scores.orderBlock &&

        guardian.scores.premiumDiscount &&

        guardian.scores.riskReward;

    if(!confirmed){

        guardian.verdict = GuardianState.WATCHING;

        updateGuardianDashboard();

        return;

    }

    // Final Direction

    if(guardian.bias===MarketBias.BULLISH){

        guardian.verdict = GuardianState.BUY_READY;

    }

    if(guardian.bias===MarketBias.BEARISH){

        guardian.verdict = GuardianState.SELL_READY;

    }

    updateGuardianDashboard();

}