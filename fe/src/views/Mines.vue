<template>
    <div class="mines">
        <div class="mines-container">
            <MinesControls />
            <MinesGame />
        </div>

        <Bets />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Bets from '@/components/bets/Bets';
import MinesControls from '@/components/gameMines/MinesControls';
import MinesGame from '@/components/gameMines/MinesGame';

export default {
    name: 'Mines',
    metaInfo: {
        title: 'Mines - gooncasino.live'
    },
    components: {
        Bets,
        MinesControls,
        MinesGame
    },
    methods: {
        ...mapActions([
            'socketConnectMines',
            'socketDisconnectMines'
        ])
    },
    created() {
        this.socketConnectMines();
    },
    beforeRouteLeave(to, from, next) {
        this.socketDisconnectMines();
        next();
    }
}
</script>

<style scoped>
.mines {
    width: 1300px;
    min-height: calc(100vh - 112px);
    padding: 70px 0
}

.mines .mines-container {
    width: 100%;
    display: flex
}

@media only screen and (max-width: 1330px) {
    .mines {
        width:100%;
        padding: 20px 10px
    }
}

@media only screen and (max-width: 1100px) {
    .mines .mines-container {
        flex-direction:column-reverse
    }
}
</style>