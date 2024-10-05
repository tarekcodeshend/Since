<template>
    <div class="roulette-bets">
        <div v-bind:class="['bets-section', 'section-red',
            'section-' + (rouletteIsCompleted === true ? rouletteGetOutcomeColor(rouletteData.game) === 'red' ? 'won' : 'lose' : '')
        ]">
            <div class="section-info">
                <div class="info-left">
                    <img src="@/assets/img/roulette/red.png" />
                    {{rouletteGetStats.red.bets}} Bets Total
                </div>
                <div class="info-amount">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="icons-image" />
                    <AmountNumber v-bind:amount="rouletteGetStats.red.amount" />
                </div>
            </div>
            <transition-group name="bets" tag="div" class="section-content">

                <RouletteBetElement v-for="bet of rouletteGetBets.red" v-bind:key="bet._id" v-bind:bet="bet" />

            </transition-group>
        </div>
        <div v-bind:class="['bets-section', 'section-black',
            'section-' + (rouletteIsCompleted === true ? rouletteGetOutcomeColor(rouletteData.game) === 'black' ? 'won' : 'lose' : '')
        ]">
            <div class="section-info">
                <div class="info-left">
                    <img src="@/assets/img/roulette/black.png" />
                    {{rouletteGetStats.black.bets}} Bets Total
                </div>
                <div class="info-amount">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="icons-image" />
                    <AmountNumber v-bind:amount="rouletteGetStats.black.amount" />
                </div>
            </div>
            <transition-group name="bets" tag="div" class="section-content">

                <RouletteBetElement v-for="bet of rouletteGetBets.black" v-bind:key="bet._id" v-bind:bet="bet" />

            </transition-group>
        </div>
        <div v-bind:class="['bets-section', 'section-green',
            'section-' + (rouletteIsCompleted === true ? rouletteGetOutcomeColor(rouletteData.game) === 'green' ? 'won' : 'lose' : '')
        ]">
            <div class="section-info">
                <div class="info-left">
                    <img src="@/assets/img/roulette/green.png" />
                    {{rouletteGetStats.green.bets}} Bets Total
                </div>
                <div class="info-amount">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="icons-image" />
                    <AmountNumber v-bind:amount="rouletteGetStats.green.amount" />
                </div>
            </div>
            <transition-group name="bets" tag="div" class="section-content">

                <RouletteBetElement v-for="bet of rouletteGetBets.green" v-bind:key="bet._id" v-bind:bet="bet" />

            </transition-group>
        </div>
        <div v-bind:class="['bets-section', 'section-bait',
            'section-' + (rouletteIsCompleted === true ? rouletteGetOutcomeColor(rouletteData.game) === 'bait' ? 'won' : 'lose' : '')
        ]">
            <div class="section-info">
                <div class="info-left">
                    <img src="@/assets/img/roulette/bait.png" />
                    {{rouletteGetStats.bait.bets}} Bets Total
                </div>
                <div class="info-amount">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="icons-image" />
                    <AmountNumber v-bind:amount="rouletteGetStats.bait.amount" />
                </div>
            </div>
            <transition-group name="bets" tag="div" class="section-content">

                <RouletteBetElement v-for="bet of rouletteGetBets.bait" v-bind:key="bet._id" v-bind:bet="bet" />

            </transition-group>
        </div>
    </div>
</template>

<script>
    // import mixins from '@/mixins';
    import { mapGetters } from 'vuex';
    import AmountNumber from '@/components/AmountNumber';
    import RouletteBetElement from '@/components/gameRoulette/RouletteBetElement';

    export default {
        name: 'RouletteBets',
        components: {
            AmountNumber,
            RouletteBetElement
        },
        // mixins: [
        //     mixins
        // ],
        methods: {
            rouletteGetOutcomeColor(game) {
                let color = 'green';

                if(game.outcome === 4 || game.outcome === 11) { color = 'bait'; }
                else if(game.outcome <= 7 && game.outcome >= 1) { color = 'red'; }
                else if(game.outcome >= 8) { color = 'black'; }

                return color;
            },
            rouletteGetOutcomeMultiplier(game) {
                let multiplier = 2;

                if(game.outcome === 4 || game.outcome === 11) { multiplier = 7; }
                else if(game.outcome === 0) { multiplier = 14; }

                return multiplier;
            }
        },
        computed: {
            ...mapGetters([
                'rouletteData'
            ]),
            rouletteIsCompleted() {
                return this.rouletteData.game !== null && this.rouletteData.game.state === 'completed';
            },
            rouletteGetStats() {
                let stats = { 
                    red: { bets: 0, amount: 0 }, 
                    black: { bets: 0, amount: 0 },
                    green: { bets: 0, amount: 0 },
                    bait: { bets: 0, amount: 0 }
                };

                for(const bet of [...this.rouletteGetBets.red, ...this.rouletteGetBets.black, ...this.rouletteGetBets.green, ...this.rouletteGetBets.bait]) {
                    stats[bet.color].bets = stats[bet.color].bets + 1;
                    stats[bet.color].amount = stats[bet.color].amount + bet.amount;
                }

                return stats;
            },
            rouletteGetBets() {
                let bets = { red: [], black: [], green: [], bait: [] };

                for(const bet of this.rouletteData.bets) {
                    if(this.rouletteData.game.state === 'completed') {
                        bets[bet.color].push({ 
                            ...bet,
                            amount: this.rouletteGetOutcomeColor(this.rouletteData.game) === bet.color ? Math.floor(this.rouletteGetOutcomeMultiplier(this.rouletteData.game) * bet.amount) : -bet.amount 
                        });
                    } else { bets[bet.color].push(bet); }
                }

                bets.red.sort(function(a, b) { return +b.amount - +a.amount; });
                bets.black.sort(function(a, b) { return +b.amount - +a.amount; });
                bets.green.sort(function(a, b) { return +b.amount - +a.amount; });
                bets.bait.sort(function(a, b) { return +b.amount - +a.amount; });
                return bets;
            }
        }
    }
</script>

<style scoped>
    .roulette-bets {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
    }

    .roulette-bets .bets-section {
        width: calc(25% - 15px);
        padding: 12px 8px 8px 8px;
        border-radius: 0 0 8px 8px;
        /* border-radius: 10px; */
        background: #292137;
        background-blend-mode: overlay, normal;
    }

    .roulette-bets .section-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
    }

    .roulette-bets .info-left {
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: 500;
        color: #ffffff;
    }

    .roulette-bets .info-left img {
        width: 20px;
        height: 20px;
        display: none;
        margin-right: 8px;
    }

    .roulette-bets .info-amount {
        display: flex;
        align-items: center;
    }

    .roulette-bets .info-amount img {
        width: 16px;
        margin-right: 5px;
        margin-bottom: 2px;
    }

    .roulette-bets .amount-number {
        font-size: 11px;
        font-weight: 700;
        color: #bbbbbb;
        transition: color 0.3s ease;
    }

    .roulette-bets .amount-number >>> span {
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
        transition: color 0.3s ease;
    }

    .roulette-bets .bets-section.section-lose .amount-number,
    .roulette-bets .bets-section.section-lose .amount-number >>> span {
        color: #fd3b31;
    }

    .roulette-bets .bets-section.section-won .amount-number,
    .roulette-bets .bets-section.section-won .amount-number >>> span {
        color: #00c74d;
    }

    .roulette-bets .section-content {
        width: 100%;
        margin-top: 5px;
    }

    .roulette-bets .bets-move,
    .roulette-bets .bets-enter-active {
        transition: all 0.3s ease;
    }

    .roulette-bets .bets-enter {
        opacity: 0;
        transform: translateY(-10px);
    }

    @media only screen and (max-width: 1320px) {

        .roulette-bets .bets-element {
            width: calc(25% - 15px);
        }

    }

    @media only screen and (max-width: 1020px) {

        .roulette-bets .bets-section {
            width: calc(50% - 7.5px);
            margin-top: 12px;
            padding: 8px;
            border-radius: 8px;
        }

        .roulette-bets .info-left img {
            display: block;
        }

        .roulette-bets .section-content {
            display: none;
        }

    }

    @media only screen and (max-width: 600px) {

        .roulette-bets .bets-section {
            width: 100%;
        }

    }
</style>