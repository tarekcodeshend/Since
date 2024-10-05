<template>
    <div class="roulette">
        <RouletteHeader />
        <RouletteGame />
        <RouletteControls />
        <RouletteBets />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import RouletteHeader from '@/components/gameRoulette/RouletteHeader';
import RouletteGame from '@/components/gameRoulette/RouletteGame';
import RouletteControls from '@/components/gameRoulette/RouletteControls';
import RouletteBets from '@/components/gameRoulette/RouletteBets';

export default {
    name: 'Roulette',
    metaInfo: {
        title: 'Roulette - gooncasino.live'
    },
    components: {
        RouletteHeader,
        RouletteGame,
        RouletteControls,
        RouletteBets
    },
    methods: {
        ...mapActions([
            'socketConnectRoulette',
            'socketDisconnectRoll',
            // 'rouletteGetDataSocket'
        ])
    },
    created() {
        this.socketConnectRoulette();
        // this.rouletteGetDataSocket({});
    },
    beforeRouteLeave(to, from, next) {
        this.socketDisconnectRoll();
        next();
    }
}
</script>

<style scoped>
.roulette {
    width: 1300px;
    min-height: calc(100vh - 112px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 0;
}

@media only screen and (max-width: 1330px) {

    .roulette {
        width: 100%;
        padding: 20px 10px;
    }

}
</style>