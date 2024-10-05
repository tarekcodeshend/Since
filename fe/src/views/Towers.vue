<template>
    <div class="towers">
        <div class="towers-container">
            <TowersControls />
            <TowersGame />
        </div>
        <Bets />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Bets from '@/components/bets/Bets';
import TowersControls from '@/components/gameTowers/TowersControls';
import TowersGame from '@/components/gameTowers/TowersGame';

export default {
    name: 'Towers',
    metaInfo: {
        title: 'Towers - gooncasino.live'
    },
    components: {
        Bets,
        TowersControls,
        TowersGame
    },
    methods: {
        ...mapActions([
            'socketConnectTowers',
            'socketDisconnectTowers'
        ])
    },
    computed: {
        ...mapGetters([
            'towersRisk'
        ]),
    },
    created() {
        this.socketConnectTowers();
    },
    beforeRouteLeave(to, from, next) {
        this.socketDisconnectTowers();
        next();
    }
}
</script>

<style scoped>
.towers {
    width: 1300px;
    min-height: calc(100vh - 112px);
    padding: 70px 0 0 0
}

.towers .towers-container {
    width: 100%;
    display: flex
}

@media only screen and (max-width: 1330px) {
    .towers {
        width: 100%;
        padding: 20px 10px
    }
}

@media only screen and (max-width: 1100px) {
    .towers .towers-container {
        flex-direction: column-reverse
    }

    .towers .container-actions {
        width: 100%;
        height: auto;
        margin-top: 15px
    }
}
</style>