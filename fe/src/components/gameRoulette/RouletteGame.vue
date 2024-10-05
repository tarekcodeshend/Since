<template>
    <div class="roulette-game">
        <transition name="fade" mode="out-in">
            <div v-if="rouletteData.game !== null && ['created', 'pending', 'fairness'].includes(rouletteData.game.state) === true"
                class="game-info" key="info">
                <div v-if="rouletteData.game.state === 'fairness'" class="info-fairness">
                    Waiting for eos block
                    <span>#{{ rouletteData.game.fair.blockNum }}</span>
                </div>
                <div v-else class="info-countdown">
                    Rolling
                    <div class="countdown-text">
                        <span>{{ rouletteCountdownText.split('')[0] }}</span>
                        <span>{{ rouletteCountdownText.split('')[1] }}</span>
                        <span>.</span>
                        <span>{{ rouletteCountdownText.split('')[2] }}</span>
                        <span>{{ rouletteCountdownText.split('')[3] }}</span>
                    </div>
                </div>
            </div>
            <div v-else class="game-selector" key="selector"></div>
        </transition>

        <div class="game-reel" v-bind:style="rouletteReelStyle">
            <div v-for="i in 8" v-bind:key="i" class="reel-row">
                <img src="@/assets/img/roulette/red.png" />
                <img src="@/assets/img/roulette/black.png" />
                <img src="@/assets/img/roulette/red.png" />
                <img src="@/assets/img/roulette/black.png" />
                <img src="@/assets/img/roulette/red.png" />
                <img src="@/assets/img/roulette/black.png" />
                <img src="@/assets/img/roulette/bait_red.png" />
                <img src="@/assets/img/roulette/green.png" />
                <img src="@/assets/img/roulette/bait_black.png" />
                <img src="@/assets/img/roulette/red.png" />
                <img src="@/assets/img/roulette/black.png" />
                <img src="@/assets/img/roulette/red.png" />
                <img src="@/assets/img/roulette/black.png" />
                <img src="@/assets/img/roulette/red.png" />
                <img src="@/assets/img/roulette/black.png" />
            </div>
        </div>
    </div>
</template>

<script>
// import mixins from '@/mixins';
import { mapGetters } from 'vuex';

export default {
    name: 'RouletteGame',
    // mixins: [
    //     mixins
    // ],
    data() {
        return {
            rouletteEndTimeout: null,
            rouletteCountdownRepeater: null,
            rouletteCountdownText: '0000',
            rouletteOrder: [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8],
            rouletteReelStyle: { transform: 'translate(0px, -50%)', transition: 'none' }
        }
    },
    methods: {
        rouletteStartCountdown() {
            const timeEnding = new Date(this.rouletteData.game.createdAt).getTime() + (1000 * 13);
            const timeLeft = Math.floor((timeEnding - (new Date().getTime() + this.generalTimeDiff)) / 10);

            this.rouletteCountdownText = String(timeLeft < 100 ? '00' + timeLeft : timeLeft < 1000 ? '0' + timeLeft : timeLeft);

            if (timeLeft <= 0) {
                this.rouletteCountdownText = '0000';
            } else {
                this.rouletteCountdownRepeater = requestAnimationFrame(this.rouletteStartCountdown);
            }
        }
    },
    computed: {
        ...mapGetters([
            'soundVolume',
            'soundRouletteStart',
            'soundRouletteEnd',
            'generalTimeDiff',
            'rouletteData',
            'testData'
        ])
    },
    watch: {
        'rouletteData.game': {
            handler(data, oldData) {
                if (data.state === 'created') {
                    const index = this.rouletteOrder.indexOf(this.rouletteData.history[0].outcome);

                    let itemWidth = window.innerWidth > 640 ? 125 : 65;
                    let transIniDiff = window.innerWidth > 640 ? 5575 : 2827;
                    this.rouletteReelStyle = { transform: 'translate(' + (transIniDiff - itemWidth * index) + 'px, -50%)', transition: 'none' };

                    this.rouletteStartCountdown();
                } else if (data.state === 'rolling') {
                    const index = this.rouletteOrder.indexOf(this.rouletteData.game.outcome);

                    let offset = Math.abs(parseInt(this.rouletteData.game._id.substr(0, 8), 16)) % 9;
                    offset = offset === 4 ? 3 : offset;

                    const timeEnding = new Date(this.rouletteData.game.updatedAt).getTime() + 5000;
                    let timeLeft = timeEnding - (new Date().getTime() + this.generalTimeDiff);
                    timeLeft = timeLeft > 0 ? timeLeft : 0;

                    let transDiff = window.innerWidth > 640 ? 3750 : 1950;
                    let itemWidth = window.innerWidth > 640 ? 125 : 65;
                    let itemDiffWidth = window.innerWidth > 640 ? 12.5 : 7.5;
                    this.rouletteReelStyle = { transform: 'translate(' + (-transDiff - itemWidth * index - (itemDiffWidth * offset)) + 'px, -50%)', transition: 'transform ' + timeLeft / 1000 + 's cubic-bezier(0.05, 0.85, 0.25, 1)' };
                    // this.soundPlay(this.soundVolume, this.soundRouletteStart);
                    
                    let transDiff1 = window.innerWidth > 640 ? 3800 : 1975;
                    this.rouletteEndTimeout = setTimeout(() => {
                        this.rouletteReelStyle = { transform: 'translate(' + (-transDiff1 - itemWidth * index) + 'px, -50%)', transition: 'transform 0.2s linear' };
                        // this.soundPlay(this.soundVolume, this.soundRouletteEnd); 
                    }, timeLeft + 500)
                }
            },
            deep: true
        }
    },
    beforeDestroy() {
        clearTimeout(this.rouletteEndTimeout);
        cancelAnimationFrame(this.rouletteCountdownRepeater);
    }
}
</script>

<style scoped>
.roulette-game {
    width: 100%;
    height: 150px;
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    border-radius: 18px;
    background: #100D14;
    overflow: hidden;
}

.roulette-game::before {
    content: '';
    width: 200px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 18px 0 0 18px;
    background: linear-gradient(90deg, #100D14 0%, #100D1411 100%);
    z-index: 1;
}

.roulette-game::after {
    content: '';
    width: 200px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0 18px 18px 0;
    background: linear-gradient(270deg, #100D14 0%, #100D1411 100%);
    z-index: 1;
}

.roulette-game .game-info {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    border-radius: 18px;
    background: rgba(16, 13, 20, 0.7);
    z-index: 5;
}

.roulette-game .game-info.fade-enter-active,
.roulette-game .game-info.fade-leave-active {
    transition: opacity 0.3s;
}

.roulette-game .game-info.fade-enter-from,
.roulette-game .game-info.fade-leave-to {
    opacity: 0;
}

.roulette-game .info-text {
    font-size: 13px;
    font-weight: 500;
    color: #767c8b;
}

.roulette-game .info-fairness {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    color: #ffffff;
}

.roulette-game .info-countdown {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    color: #ffffff;
}

.roulette-game .info-fairness span {
    margin-top: 3px;
    font-size: 22px;
    color: #D4AF3C;
}

.roulette-game .countdown-text {
    display: flex;
    align-items: center;
    margin-top: 3px;
}

.roulette-game .countdown-text span {
    width: 13px;
    text-align: center;
    font-size: 22px;
    color: #D4AF3C;
}

.roulette-game .countdown-text span:nth-child(3) {
    width: auto;
}

.roulette-game .game-selector {
    width: 2px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 5;
}

.roulette-game .game-selector:before {
    content: '';
    width: 3px;
    height: 100%;
    position: absolute;
    left: 0;
    background: #D4AF3C;
}

.roulette-game .game-selector:before {
    top: 0;
}

.roulette-game .game-selector:after {
    bottom: 0;
}

.roulette-game .game-selector svg {
    width: 13px;
    position: absolute;
    fill: #D4AF3C;
}

.roulette-game .game-selector svg:nth-child(1) {
    top: -39px;
    left: 6px;
    transform: rotate(-45deg);
}

.roulette-game .game-selector svg:nth-child(2) {
    top: -39px;
    right: 6px;
    transform: rotate(45deg);
}

.roulette-game .game-selector svg:nth-child(3) {
    bottom: -39px;
    left: 6px;
    transform: rotate(-135deg);
}

.roulette-game .game-selector svg:nth-child(4) {
    bottom: -39px;
    right: 6px;
    transform: rotate(135deg);
}

.roulette-game .game-reel {
    position: absolute;
    top: 50%;
    display: flex;
    align-items: center;
    transform: translate();
}

.roulette-game .reel-row {
    display: flex;
    align-items: center;
}

.roulette-game .reel-row img {
    width: 100px;
    height: 100px;
    margin-right: 25px;
}

@media only screen and (max-width: 640px) {
    .roulette-game {
        height: 70px;
        margin-top: 5px;
    }

    .roulette-game::before {
        width: 100px;
    }

    .roulette-game::after {
        width: 100px;
    }

    .roulette-game .reel-row img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
    }
}
</style>