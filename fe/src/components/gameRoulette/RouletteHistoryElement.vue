<template>
    <button v-on:click="rouletteGameButton()" class="roulette-history-element">
        <img v-bind:src="require('@/assets/img/roulette/' + rouletteGetOutcomeColor(game) + '.png')" />
    </button>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'RouletteHistoryElement',
        props: [
            'game'
        ],
        methods: {
            ...mapActions([
                'modalsSetShow',
                'modalsSetData'
            ]),
            rouletteGetOutcomeColor(game) {
                let color = 'green';

                if(game.outcome === 4 || game.outcome === 11) { color = 'bait'; }
                else if(game.outcome <= 7 && game.outcome >= 1) { color = 'red'; }
                else if(game.outcome >= 8) { color = 'black'; }

                return color;
            },
            rouletteGameButton() {
                this.modalsSetData({ method: 'roulette', game: this.game });
                this.modalsSetShow('FairGame');
            }
        }
    }
</script>

<style scoped>
    button.roulette-history-element {
        width: 28px;
        height: 28px;
        margin-right: 6px;
    }

    button.roulette-history-element:last-child {
        margin-right: 0;
    }

    button.roulette-history-element img {
        width: 100%;
        height: 100%;
    }
</style>