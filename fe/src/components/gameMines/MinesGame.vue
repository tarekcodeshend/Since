<template>
    <div class="mines-game">
        <transition name="slide-fade">
            <div v-if="minesGame !== null && minesGame.state === 'completed' && minesGame.payout > 0"
                class="game-result">
                <div class="result-inner">
                    <div class="inner-multiplier">
                        x{{ parseFloat(minesGetWinMultiplier).toFixed(2) }}
                    </div>
                    <div class="inner-won">
                        YOU WON
                        <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                        <div class="won-value">
                            <span>{{ minesFormatValue(minesGetPayoutAmount).split('.')[0] }}</span>.{{
                                minesFormatValue(minesGetPayoutAmount).split('.')[1] }}
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="game-inner">
            <div class="inner-tiles">
                <MinesTile v-for="tile in 25" v-bind:key="tile" v-bind:tile="tile - 1" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MinesTile from '@/components/gameMines/MinesTile';

export default {
    name: 'MinesGame',
    components: {
        MinesTile
    },
    methods: {
        minesFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        minesFactorialNumber(number) {
            let value = number;
            for (let i = number; i > 1; i--) {
                value = value * (i - 1);
            }
            return value;
        }
    },
    computed: {
        ...mapGetters([
            'minesGame'
        ]),
        minesGetWinMultiplier() {
            let multiplier = 0;

            const first = 25 === this.minesGame.revealed.length ? 1 : this.minesFactorialNumber(25) / (this.minesFactorialNumber(this.minesGame.revealed.length) * this.minesFactorialNumber(25 - this.minesGame.revealed.length));
            const second = (25 - this.minesGame.minesCount) === this.minesGame.revealed.length ? 1 : this.minesFactorialNumber(25 - this.minesGame.minesCount) / (this.minesFactorialNumber(this.minesGame.revealed.length) * this.minesFactorialNumber((25 - this.minesGame.minesCount) - this.minesGame.revealed.length));

            multiplier = 0.95 * (first / second);
            multiplier = multiplier < 1 ? 1.01 : multiplier;
            multiplier = Math.round(multiplier * 100) / 100;

            return multiplier;
        },
        minesGetPayoutAmount() {
            return Math.floor(this.minesGame.amount * this.minesGetWinMultiplier);
        }
    }
}
</script>

<style scoped>
.mines-game {
    width: calc(100% - 380px);
    position: relative;
    padding-left: 16px
}

.mines-game .game-result {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1
}

.mines-game .game-result .slide-fade-enter-active {
    transition: all .3s
}

.mines-game .game-result .slide-fade-enter {
    transform: translateY(20px);
    opacity: 0
}

.mines-game .result-inner {
    width: 230px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #503f0c;
    border: 2px solid #D4AF3C
}

.mines-game .inner-multiplier {
    font-size: 28px;
    font-weight: 700;
    color: #00c74d
}

.mines-game .inner-won {
    display: flex;
    align-items: center;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #fff
}

.mines-game .inner-won img {
    width: 20px;
    height: 20px;
    margin-left: 10px
}

.mines-game .won-value {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #00c74d
}

.mines-game .won-value span {
    font-size: 15px;
    font-weight: 700;
    color: #00c74d
}

.mines-game .game-inner {
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 18px;
    background: #181420
}

.mines-game .inner-tiles {
    width: 580px;
    height: 580px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center
}

@media only screen and (max-width: 1100px) {
    .mines-game {
        width: 100%;
        padding-left: 0
    }

    .mines-game .game-inner {
        height: 480px
    }

    .mines-game .inner-tiles {
        width: 440px;
        height: 440px;
        display: flex;
        flex-wrap: wrap
    }
}

@media only screen and (max-width: 550px) {
    .mines-game .result-inner {
        width: 200px;
        height: 120px
    }

    .mines-game .inner-multiplier {
        font-size: 34px;
        font-weight: 700;
        color: #00c74d
    }

    .mines-game .game-inner {
        height: 405px
    }

    .mines-game .inner-tiles {
        width: 365px;
        height: 365px;
        display: flex;
        flex-wrap: wrap
    }
}

@media only screen and (max-width: 425px) {
    .mines-game .result-inner {
        width: 180px;
        height: 110px
    }

    .mines-game .inner-multiplier {
        font-size: 30px;
        font-weight: 700;
        color: #00c74d
    }

    .mines-game .game-inner {
        height: 330px
    }

    .mines-game .inner-tiles {
        width: 300px;
        height: 300px;
        display: flex;
        flex-wrap: wrap
    }
}

@media only screen and (max-width: 375px) {
    .mines-game .game-inner {
        height: 300px
    }

    .mines-game .inner-tiles {
        width: 270px;
        height: 270px;
        display: flex;
        flex-wrap: wrap
    }
}

.mines-game .game-result {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1
}

.mines-game .game-result .slide-fade-enter-active {
    transition: all .3s
}

.mines-game .game-result .slide-fade-enter {
    transform: translateY(20px);
    opacity: 0
}

.mines-game .result-inner {
    width: 230px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #503f0c;
    border: 2px solid #D4AF3C
}

.mines-game .inner-multiplier {
    font-size: 38px;
    font-weight: 700;
    color: #ebc042
}

.mines-game .inner-won {
    display: flex;
    align-items: center;
    margin-top: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #fff
}


.mines-game .won-value {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #ebc042
}

.mines-game .won-value span {
    font-size: 15px;
    font-weight: 700;
    color: #ebc042
}
</style>