<template>
    <div class="roulette-header">
        <div class="header-top">
            <div class="top-stats">
                <span>Last 100 Rolls</span>
                <div class="stats-content">
                    <div class="stats-element">
                        <img src="@/assets/img/roulette/red.png" />
                        {{ rouletteGetStats.red }}
                    </div>
                    <div class="stats-element">
                        <img src="@/assets/img/roulette/black.png" />
                        {{ rouletteGetStats.black }}
                    </div>
                    <div class="stats-element">
                        <img src="@/assets/img/roulette/green.png" />
                        {{ rouletteGetStats.green }}
                    </div>
                    <div class="stats-element">
                        <img src="@/assets/img/roulette/bait.png" />
                        {{ rouletteGetStats.bait }}
                    </div>
                </div>
            </div>
            <div class="top-history">
                <span>Roll History</span>
                <transition-group name="history" tag="div" class="history-content">

                    <RouletteHistoryElement v-for="game of rouletteData.history.slice(0, 8)" v-bind:key="game._id" v-bind:game="game" />
                    
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import RouletteHistoryElement from '@/components/gameRoulette/RouletteHistoryElement';

    export default {
        name: 'RouletteHeader',
        components: {
            RouletteHistoryElement
        },
        data() {
            return {
                rouletteTimerRepeater: null,
                rouletteTimer: 0,
                rouletteText: 'LOADING...'
            }
        },
        methods: {
            rouletteStartTimer() {
                const timeEnding = new Date(this.rouletteData.game.createdAt).getTime() + (1000 * 13);
                this.rouletteTimer = (timeEnding - (new Date().getTime() + this.generalTimeDiff)) / 1000;

                this.rouletteText = 'Rolling in <span>' + (this.rouletteTimer).toFixed(2) + '</span>s';

                if(this.rouletteTimer <= 0) {
                    this.rouletteTimer = 0;
                    this.rouletteText = 'Rolling...';
                } else {
                    this.rouletteTimerRepeater = requestAnimationFrame(this.rouletteStartTimer);
                }
            },
            rouletteGetOutcomeColor(game) {
                let color = 'green';

                if(game.outcome === 4 || game.outcome === 11) { color = 'bait'; }
                else if(game.outcome <= 7 && game.outcome >= 1) { color = 'red'; }
                else if(game.outcome >= 8) { color = 'black'; }

                return color;
            }
        },
        computed: {
            ...mapGetters([
                'generalTimeDiff', 
                'rouletteData'
            ]),
            rouletteGetStats() {
                let stats = { red: 0, black: 0, green: 0, bait: 0 };

                for(let game of this.rouletteData.history) {
                    stats[this.rouletteGetOutcomeColor(game)] = stats[this.rouletteGetOutcomeColor(game)] + 1;
                }

                return stats;
            }
        },
        watch: {
            'rouletteData.game': {
                handler(data, oldData) {
                    if(data.state === 'created') { this.rouletteStartTimer(); } 
                    else { 
                        this.rouletteTimer = 0;
                        this.rouletteText = 'Rolling...';
                    }
                },
                deep: true
            }
        },
        beforeDestroy() {
            cancelAnimationFrame(this.rouletteTimerRepeater);
        }
    }
</script>

<style scoped>
    .roulette-header {
        width: 100%;
    }

    .roulette-header .header-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .roulette-header .top-stats,
    .roulette-header .top-history {
        display: flex;
        flex-direction: column;
    }

    .roulette-header .top-history {
        align-items: flex-start;
    }

    .roulette-header .top-stats span,
    .roulette-header .top-history span {
        font-size: 13px;
        font-weight: 700;
        color: #767C8B;
    }

    .roulette-header .stats-content,
    .roulette-header .history-content {
        display: flex;
        align-items: center;
        margin-top: 8px;
    }

    .roulette-header .history-content {
        width: 266px;
    }

    .roulette-header .stats-element {
        display: flex;
        align-items: center;
        margin-right: 10px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
    }

    .roulette-header .stats-element img {
        width: 28px;
        height: 28px;
        margin-right: 8px;
    }

    .roulette-header .history-move,
    .roulette-header .history-enter-active,
    .roulette-header .history-leave-active {
        transition: all 0.3s ease;
    }

    .roulette-header .history-leave-active {
        position: absolute;
    }

    .roulette-header .history-enter-from {
        opacity: 0;
        transform: translateX(20px);
    }

    .roulette-header .history-leave-to {
        opacity: 0;
        transform: translateX(272px);
    }

    @media only screen and (max-width: 750px) {

        .roulette-header .header-top {
            flex-direction: column;
        }

        .roulette-header .top-stats,
        .roulette-header .top-history {
            flex-direction: row;
            align-items: center;
        }

        .roulette-header .top-history {
            margin-top: 15px;
        }

        .roulette-header .top-stats span,
        .roulette-header .top-history span {
            margin-right: 8px;
        }

        .roulette-header .stats-content,
        .roulette-header .history-content {
            margin-top: 0;
        }

    }

    @media only screen and (max-width: 500px) {

        .roulette-header .top-stats,
        .roulette-header .top-history {
            flex-direction: column;
        }

        .roulette-header .top-stats span,
        .roulette-header .top-history span {
            margin-right: 0;
        }

        .roulette-header .stats-content,
        .roulette-header .history-content {
            margin-top: 8px;
        }

    }
</style>