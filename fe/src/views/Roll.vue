<template>
    <div class="roll">
        <div class="roll-container">
            <RollGame />
            <div class="roll-bet-inner">
                <div class="roll-bet-left">
                    <RollControls />
                    <RollHistory />
                </div>
                <RollBets />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import RollBets from '@/components/roll/RollBets';
import RollGame from '@/components/roll/RollGame';
import RollHistory from '@/components/roll/RollHistory';
import RollControls from '@/components/roll/RollControls';
import RollUserBets from '@/components/roll/RollUserBets';

export default {
    name: 'Roll',
    metaInfo: {
        title: 'Slide - gooncasino.live'
    },
    components: {
        RollBets,
        RollGame,
        RollHistory,
        RollControls,
        RollUserBets
    },
    methods: {
        ...mapActions(['socketConnectRoll', 'socketDisconnectRoll'])
    },
    created() {
        this.socketConnectRoll();
    },
    beforeRouteLeave(to, from, next) {
        this.socketDisconnectRoll();
        next();
    }
}
</script>

<style scoped>
.roll {
    width: 100%;
    min-height: calc(100vh - 112px);
    display: flex;
    justify-content: center;
    padding: 45px 0;
    overflow: hidden;
}

.roll .roll-container {
    width: calc(100% - 320px);
    padding: 0 25px;
}

.roll .roll-bet-inner {
    display: flex;
    flex-direction: row;
    width: 80%;
    gap: 10px;
    margin-left: auto;
    margin-right: auto;
}

.roll-bet-left {
    width: 60%;
    margin-top: 15px;
}

@media only screen and (max-width: 1250px) {

    .roll .roll-bets {
        display: none;
    }

    .roll .roll-container {
        width: 100%;
        margin-left: 0;
        padding: 0 10px;
    }

    .roll .roll-bet-inner {
        width: 100%;
        flex-direction: column;
        gap: 0px;
    }

    .roll-bet-left {
        width: 100%;
    }

}

@media only screen and (max-width: 950px) {
    .roll {
        width: 100%;
        min-height: calc(100vh - 112px);
        display: flex;
        justify-content: center;
        padding: 15px 0 25px;
    }
}
</style>
