<template>
    <div class="plinko-game">
        <div class="game-inner">
            <div class="inner-triangle">
                <transition-group class="triangle-balls" name="triangle-balls" tag="div">

                    <PlinkoBall v-for="game of plinkoGames" v-bind:key="game._id" v-bind:game="game" />

                </transition-group>

                <div v-for="row in plinkoFilterRows" v-bind:key="row" class="triangle-row">
                    <div v-for="element in row + 2" v-bind:key="element" class="row-element"
                        v-bind:style="{ 'margin-right': element === row + 2 ? '0px' : (plinkoWith / (plinkoFilterRows + 1)) + 'px' }">
                    </div>
                </div>
            </div>
            <div class="inner-multipliers" v-bind:style="{ 'width': (9 * plinkoFilterRows + plinkoWith) + 'px' }">

                <div v-for="(multiplier, index) of plinkoMultipliers[plinkoFilterRows][risk]" v-bind:key="index"
                    v-bind:ref="'multiplier-' + index" class="multipliers-element"
                    v-bind:class="{ 'element-medium': multiplier >= 1 && multiplier < 4, 'element-high': multiplier >= 4 }"
                    v-bind:style="{ 'width': 'calc(' + 100 / (plinkoFilterRows + 1) + '% - ' + ((plinkoFilterRows * 5) / (plinkoFilterRows + 1)) + 'px)' }">
                    {{ multiplier }}x</div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PlinkoBall from '@/components/gamePlinko/PlinkoBall';

export default {
    name: 'PlinkoGame',
    props: ['risk'],
    components: {
        PlinkoBall
    },
    data() {
        return {
            plinkoWith: 580,
            plinkoActiveGames: [],
            plinkoMultipliers: {
                '8': { easy: [6, 2.1, 1.1, 0.93, 0.46, 0.93, 1.1, 2.1, 6], medium: [13, 3, 1.3, 0.63, 0.37, 0.63, 1.3, 3, 13], hard: [29, 4, 1.5, 0.23, 0.16, 0.23, 1.5, 4, 29] },
                '9': { easy: [7, 2, 1.6, 0.94, 0.65, 0.65, 0.94, 1.6, 2, 7], medium: [18, 4, 1.7, 0.83, 0.46, 0.46, 0.83, 1.7, 4, 18], hard: [44, 7, 2, 0.51, 0.17, 0.17, 0.51, 2, 7, 44] },
                '10': { easy: [9, 3, 1.4, 1.1, 0.92, 0.47, 0.92, 1.1, 1.4, 3, 9], medium: [23, 5, 2, 1.4, 0.53, 0.35, 0.53, 1.4, 2, 5, 23], hard: [77, 10, 3, 0.9, 0.22, 0.16, 0.22, 0.9, 3, 10, 77] },
                '11': { easy: [9, 3, 1.9, 1.3, 0.93, 0.66, 0.66, 0.93, 1.3, 1.9, 3, 9], medium: [25, 6, 3, 1.8, 0.63, 0.46, 0.46, 0.63, 1.8, 3, 6, 25], hard: [123, 14, 5.2, 1.4, 0.32, 0.16, 0.16, 0.32, 1.4, 5.2, 14, 123] },
                '12': { easy: [11, 3, 1.6, 1.4, 1.1, 0.92, 0.46, 0.92, 1.1, 1.4, 1.6, 3, 11], medium: [34, 11, 4, 2, 1.1, 0.52, 0.26, 0.52, 1.1, 2, 4, 11, 34], hard: [174, 24, 8.1, 2, 0.7, 0.13, 0.13, 0.13, 0.7, 2, 8.1, 24, 174] },
                '13': { easy: [22, 4, 3, 1.9, 1.2, 0.83, 0.65, 0.65, 0.83, 1.2, 1.9, 3, 4, 22], medium: [53, 13, 6, 3, 1.3, 0.62, 0.36, 0.36, 0.62, 1.3, 3, 6, 13, 53], hard: [274, 37, 11, 4, 1, 0.14, 0.14, 0.14, 0.14, 1, 4, 11, 37, 274] },
                '14': { easy: [22, 4, 1.9, 1.4, 1.3, 1.1, 0.91, 0.46, 0.91, 1.1, 1.3, 1.4, 1.9, 4, 22], medium: [73, 15, 7, 4, 1.9, 1, 0.41, 0.16, 0.41, 1, 1.9, 4, 7, 15, 73], hard: [429, 56, 18, 5, 1.9, 0.3, 0.13, 0.13, 0.13, 0.3, 1.9, 5, 18, 56, 429] },
                '15': { easy: [38, 8, 3, 2, 1.5, 1.1, 0.93, 0.65, 0.65, 0.93, 1.1, 1.5, 2, 3, 8, 38], medium: [96, 18, 11, 5, 3, 1.3, 0.42, 0.26, 0.26, 0.42, 1.3, 3, 5, 11, 18, 96], hard: [643, 83, 27, 8, 3, 0.5, 0.14, 0.14, 0.14, 0.14, 0.5, 3, 8, 27, 83, 643] },
                '16': { easy: [71, 9, 2, 1.4, 1.4, 1.2, 1.1, 0.91, 0.45, 0.91, 1.1, 1.2, 1.4, 1.4, 2, 9, 71], medium: [170, 41, 10, 5, 3, 1.5, 1, 0.41, 0.25, 0.41, 1, 1.5, 3, 5, 10, 41, 170], hard: [1030, 130, 26, 9, 4, 2, 0.2, 0.12, 0.14, 0.12, 0.2, 2, 4, 9, 26, 130, 1030] }
            }
        }
    },
    methods: {
        plinkoSetWith() {
            if (window.innerWidth <= 790) {
                this.plinkoWith = window.innerWidth - 210;
            } else {
                this.plinkoWith = 580;
            }
        },
        plinkoHandleMultiplier(game) {
            setTimeout(() => {
                const target = this.plinkoGetTarget(game);

                this.$refs['multiplier-' + target][0].classList.add('multipliers-win');

                setTimeout(() => {
                    this.$refs['multiplier-' + target][0].classList.remove('multipliers-win');

                    const index = this.plinkoActiveGames.findIndex((element) => element._id.toString() === game._id.toString());
                    if (index !== -1) { this.plinkoActiveGames.splice(index, 1); }
                }, 200)
            }, (game.rows * 400) + 200);
        },
        plinkoGetDeck(game) {
            let deck = [[1], [1, 1]];

            for (let r = 2; r < (game.rows + 1); r++) {
                let previousRow = deck[r - 1];
                let newRow = [1];

                for (let v = 0; v < previousRow.length - 1; v++) {
                    newRow.push(previousRow[v] + previousRow[v + 1]);
                }

                newRow.push(1);
                deck.push(newRow);
            }

            return deck[deck.length - 1];
        },
        plinkoGetTarget(game) {
            const deck = this.plinkoGetDeck(game);
            const rows = deck.length - 1;
            let totalValue = 0;
            let target = 0;

            for (let [index, value] of deck.entries()) {
                totalValue = totalValue + value;

                if (totalValue >= game.ticket) {
                    target = index;
                    break;
                }
            }

            return target;
        }
    },
    computed: {
        ...mapGetters(['plinkoFilterRows', 'plinkoGames'])
    },
    watch: {
        'plinkoGames': {
            handler(newData, oldData) {
                for (const game of newData) {
                    if (this.plinkoActiveGames.some((element) => element._id.toString() === game._id.toString()) !== true) {
                        this.plinkoActiveGames.push(game);
                        this.plinkoHandleMultiplier(game);
                    }
                }
            },
            deep: true
        }
    },
    mounted() {
        window.addEventListener('resize', this.plinkoSetWith);
        this.plinkoSetWith();
    }
}
</script>

<style scoped>
.plinko-game {
    width: calc(100% - 380px);
    padding-left: 16px;
}

.plinko-game .game-inner {
    width: 100%;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    background-color: #181420;
}

.plinko-game .inner-triangle {
    height: 520px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.plinko-game .triangle-balls {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.plinko-game .triangle-balls-enter {
    opacity: 0;
    transform: translate(-9px, -30px) !important;
}

.plinko-game .triangle-row {
    display: flex;
}

.plinko-game .row-element {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: #ffffff;
}

.plinko-game .row-element:last-of-type {
    margin-right: 0;
}

.plinko-game .inner-multipliers {
    width: 740px;
    display: flex;
    justify-content: space-between;
    margin-top: 22px;
}

.plinko-game .multipliers-element {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 600;
    color: #00c74d;
    background-color: rgba(0, 199, 77, 0.18);
    transition: transform 0.2s ease;
}

.plinko-game .multipliers-element:last-of-type {
    margin-right: 0 !important;
}

.plinko-game .multipliers-element.element-medium {
    color: #ffc93d;
    background-color: rgba(255, 201, 61, 0.18);
}

.plinko-game .multipliers-element.element-high {
    color: #fd3b31;
    background-color: rgba(253, 59, 49, 0.18);
}

.plinko-game .multipliers-element.multipliers-win {
    transform: translate(0, 15px);
}

@media only screen and (max-width: 1100px) {

    .plinko-game {
        width: 100%;
        padding-left: 0;
    }

}

@media only screen and (max-width: 650px) {

    /* .plinko-game .inner-multipliers {
        width: 100%;
        margin-top: 22px;
    }
    .plinko-game .inner-triangle{
        width: 100%;
    } */
}
</style>