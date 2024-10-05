<template>
    <div
        v-bind:class="{ 'mines-tile': true, 'tile-revealed': (minesGame !== null && isTileRevealed), 'tile-completed': (minesGame !== null && minesGame.state === 'completed') }">
        <transition name="fade" mode="out-in">
            <div class="tile-inner">
                <div class="inner-front">
                    <div v-if="minesGame !== null && minesGetRevealedTile === 'coin'" class="front-coin">
                        <img src="@/assets/img/coin_big.d7ac8d43.webp" alt="coin-icon">
                        <div v-if="isTileRevealed" class="coin-multiplier">
                            <div class="multiplier-amount"><span>x{{parseFloat(minesGetWinMultiplier).toFixed(2).split('.')[0]}}</span>.{{parseFloat(minesGetWinMultiplier).toFixed(2).split('.')[1]}}</div>
                        </div>
                    </div>
                    <div v-else-if="minesGame !== null && minesGetRevealedTile === 'mine'" class="front-mine">
                        <img src="@/assets/img/bomb.ebef82db.webp" alt="bomb">
                        <div v-if="isTileRevealed" class="mine-text">BOOM</div>
                    </div>
                </div>
                <div class="inner-back">
                    <button v-on:click="minesRevealTile()"
                        v-bind:class="{ 'button-reveal': true, 'button-active': minesGame !== null }"
                        v-bind:disabled="socketSendLoading !== null || minesGame === null || minesGame.state === 'completed'">
                        <!-- <img src="@/assets/img/mini-logo.png" alt="tiles-logo"> -->
                    </button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'MinesTile',
    props: ['tile'],
    methods: {
        ...mapActions([
            'notificationShow',
            'minesSendRevealSocket'
        ]),
        minesFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        minesRevealTile() {
            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            if (this.minesGame === null) {
                this.notificationShow({ type: 'error', message: 'You have no running mines game at the moment.' });
                return;
            }

            const data = { tile: this.tile };
            this.minesSendRevealSocket(data);
        },
        minesFactorialNumber(number) {
            let value = number;
            for (let i = number; i > 1; i--) {
                value = value * (i - 1);
            }
            return value;
        },
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'authUser',
            'minesGame'
        ]),
        minesGetRevealedTile() {
            let revealed = null;

            // if (this.minesGame.state === 'completed' && this.minesGame.deck[this.tile] === 'mine') {
            if (this.minesGame.state === 'completed') {
                revealed = this.minesGame.deck[this.tile];
            } else {
                const index = this.minesGame.revealed.findIndex((element) => element.tile === this.tile);
                if (index !== -1) { revealed = this.minesGame.revealed[index].value }
            }

            return revealed;
        },
        minesGetTilePayout() {
            const index = this.minesGame.revealed.findIndex((element) => element.tile === this.tile);

            const first = 25 === (index + 1) ? 1 : this.minesFactorialNumber(25) / (this.minesFactorialNumber(index + 1) * this.minesFactorialNumber(25 - (index + 1)));
            const second = (25 - this.minesGame.minesCount) === (index + 1) ? 1 : this.minesFactorialNumber(25 - this.minesGame.minesCount) / (this.minesFactorialNumber(index + 1) * this.minesFactorialNumber((25 - this.minesGame.minesCount) - (index + 1)));

            let multiplier = 0.95 * (first / second);
            multiplier = multiplier < 1 ? 1 : multiplier;

            return Math.floor(this.minesGame.amount * multiplier);
        },
        minesGetWinMultiplier() {
            let multiplier = 0;
            const index = this.minesGame.revealed.findIndex((element) => element.tile === this.tile);
            const first = 25 === (index + 1) ? 1 : this.minesFactorialNumber(25) / (this.minesFactorialNumber(index + 1) * this.minesFactorialNumber(25 - (index + 1)));
            const second = (25 - this.minesGame.minesCount) === (index + 1) ? 1 : this.minesFactorialNumber(25 - this.minesGame.minesCount) / (this.minesFactorialNumber(index + 1) * this.minesFactorialNumber((25 - this.minesGame.minesCount) - (index + 1)));


            multiplier = 0.95 * (first / second);
            multiplier = multiplier < 1 ? 1.01 : multiplier;
            multiplier = Math.round(multiplier * 100) / 100;

            return multiplier;
        },
        isTileRevealed() {
            const index = this.minesGame.revealed.findIndex((element) => element.tile === this.tile);
            return (index !== -1);
        }
    },
}
</script>

<style scoped>
.mines-tile {
    width: 100px;
    height: 100px;
    perspective: 1000px
}

.mines-tile .tile-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(-180deg)
}

.mines-tile.tile-completed .tile-inner,
.mines-tile.tile-revealed .tile-inner {
    transform: rotateY(0deg);
    animation: tile-reveal-cffb6eec .4s linear forwards
}

@keyframes tile-reveal-cffb6eec {
    0% {
        transform: rotateY(-180deg)
    }

    50% {
        transform: rotateY(-180deg)
    }

    to {
        transform: rotateY(0deg)
    }
}

.mines-tile .inner-back,
.mines-tile .inner-front {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden
}

.mines-tile .inner-front {
    width: 100%;
    height: 100%;
    opacity: .2;
    transition: all .3s ease
}

.mines-tile.tile-revealed .inner-front {
    opacity: 1
}

.mines-tile .front-coin {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #503f0c;
    border: 1px solid #D4AF3C
}

.mines-tile .front-coin img {
    width: 80px
}

.mines-tile .coin-multiplier {
    width: 62px;
    height: 29px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: #2B2339
}

.mines-tile .multiplier-amount {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.mines-tile .multiplier-amount span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.mines-tile .front-mine {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #4a1d24
}

.mines-tile .front-mine img {
    width: 90px
}

.mines-tile .mine-text {
    width: 72px;
    height: 29px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-15deg);
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    color: #ff879a;
    background: #7d464f
}

.mines-tile .inner-back {
    width: 100%;
    height: 100%;
    transform: rotateY(-180deg)
}

.mines-tile .inner-back button.button-reveal {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #292137;
    border-bottom: 3px solid #221b2e;
    opacity: .5;
    cursor: not-allowed
}

.mines-tile .inner-back button.button-reveal.button-active {
    opacity: 1;
    cursor: pointer
}

.mines-tile .inner-back button.button-reveal img {
    width: 64px;
    height: 64px;
    /* mix-blend-mode: luminosity; */
    transition: all .3s ease;
    opacity: .4
}

.mines-tile .inner-back button.button-reveal.button-active:hover img {
    opacity: .3
}

@media only screen and (max-width: 1100px) {
    .mines-tile {
        width: 80px;
        height: 80px;
        margin-right: 10px
    }

    .mines-tile:nth-child(5n) {
        margin-right: 0
    }

    .mines-tile .inner-back button.button-reveal img {
        width: 50px;
        height: 50px
    }

    .mines-tile .front-coin img {
        width: 70px
    }

    .mines-tile .front-mine img {
        width: 75px
    }
}

@media only screen and (max-width: 550px) {
    .mines-tile {
        width: 65px;
        height: 65px;
        margin-right: 10px
    }

    .mines-tile:nth-child(5n) {
        margin-right: 0
    }

    .mines-tile .inner-back button.button-reveal img {
        width: 40px;
        height: 40px
    }

    .mines-tile .front-coin img {
        width: 60px
    }

    .mines-tile .front-mine img {
        width: 65px
    }

    .mines-tile .coin-multiplier {
        width: 52px;
        height: 26px
    }

    .mines-tile .multiplier-amount {
        font-size: 10px
    }

    .mines-tile .multiplier-amount span {
        font-size: 13px
    }

    .mines-tile .mine-text {
        width: 52px;
        height: 26px;
        font-size: 13px
    }
}

@media only screen and (max-width: 425px) {
    .mines-tile {
        width: 55px;
        height: 55px;
        margin-right: 5px
    }

    .mines-tile:nth-child(5n) {
        margin-right: 0
    }

    .mines-tile .inner-back button.button-reveal img {
        width: 35px;
        height: 35px
    }

    .mines-tile .front-coin img {
        width: 50px
    }

    .mines-tile .front-mine img {
        width: 55px
    }

    .mines-tile .coin-multiplier {
        width: 45px;
        height: 22px
    }

    .mines-tile .multiplier-amount {
        font-size: 9px
    }

    .mines-tile .multiplier-amount span {
        font-size: 12px
    }

    .mines-tile .mine-text {
        width: 45px;
        height: 22px;
        font-size: 12px
    }
}

@media only screen and (max-width: 375px) {
    .mines-tile {
        width: 50px;
        height: 50px;
        margin-right: 5px
    }

    .mines-tile:nth-child(5n) {
        margin-right: 0
    }

    .mines-tile .inner-back button.button-reveal img {
        width: 30px;
        height: 30px
    }

    .mines-tile .front-coin img {
        width: 45px
    }

    .mines-tile .front-mine img {
        width: 50px
    }

    .mines-tile .coin-multiplier {
        width: 40px;
        height: 20px
    }

    .mines-tile .multiplier-amount {
        font-size: 8px
    }

    .mines-tile .multiplier-amount span {
        font-size: 10px
    }

    .mines-tile .mine-text {
        width: 40px;
        height: 20px;
        font-size: 10px
    }
}
</style>