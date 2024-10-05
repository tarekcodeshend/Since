<template>
    <div class="towers-game">
        <div class="game-inner">
            <div class="inner-steps">
                <TowersRow v-for="row in 8" v-bind:key="row" v-bind:row="row - 1" />
            </div>
        </div>
    </div>
</template>

<script>
import TowersRow from '@/components/gameTowers/TowersRow';

export default {
    name: 'TowersGame',
    metaInfo: {
        title: 'Towers - gooncasino.live'
    },
    components: {
        TowersRow,
    },
}
</script>

<style scoped>
.towers-game {
    width: calc(100% - 380px);
    padding-left: 16px
}

.towers-game .game-inner {
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    background: #181420
}

.towers-game .inner-steps {
    width: 500px;
    height: 600px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between
}

@media only screen and (max-width: 1100px) {
    .towers-game {
        width: 100%;
        padding-left: 0
    }

    .towers-game .game-inner {
        height: 450px
    }

    .towers-game .inner-steps {
        height: 400px
    }
}

@media only screen and (max-width: 640px) {
    .towers-game .game-inner {
        height: 330px
    }

    .towers-game .inner-steps {
        width: 330px;
        height: 300px
    }
}
</style>