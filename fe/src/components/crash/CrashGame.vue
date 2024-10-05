<template>
    <div class="crash-game">
        <div class="game-graph" ref="crashGraph">
            <canvas id="canvas-graph"></canvas>
        </div>
        <div class="game-info">
            <div class="info-network">
                <div class="network-point"></div>
                <span>NETWORK STATUS</span>
            </div>
            <div class="info-profit">
                <transition name="fade">
                    <div v-if="crashProfitInfo === true" class="profit-amount">
                        <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                        250,000
                    </div>
                </transition>
                <button v-on:click="crashSetProfitInfo(!crashProfitInfo)">
                    <IconInfo />
                    MAX PROFIT
                </button>
            </div>
        </div>
        <div v-if="crashGame !== null" class="game-inner">
            <div v-if="crashGame.state === 'completed'" class="inner-completed">
                <div class="completed-multiplier">
                    {{ parseFloat(crashGame.outcome / 100).toFixed(2) }}
                </div>
                <div class="completed-over">Round Over</div>
            </div>
            <div v-else-if="crashGame.state === 'rolling'" class="inner-rolling">
                <div class="rolling-multiplier">
                    <span class="gradient-green">{{ parseFloat(Math.floor(crashMultiplier / 1000) /
                        100).toFixed(2) }}</span>
                </div>
                <div class="rolling-payout">Current Payout</div>
                <transition name="fade">
                    <div v-if="
                        authUser.user !== null &&
                        crashBets.some((element) => element.user._id === authUser.user._id && element.multiplier === undefined) === true
                    " class="rolling-amount">
                        <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                        <div class="amount-value">
                            <span>+{{ crashFormatValue(crashGetPayoutAmount).split(".")[0] }}</span>.{{
                                crashFormatValue(crashGetPayoutAmount).split(".")[1]
                            }}
                        </div>
                    </div>
                </transition>
            </div>
            <div v-else class="inner-waiting">
                <div class="waiting-status">Preparing Round</div>
                <div class="waiting-timer">{{ crashText }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CrashGraph from '@/components/crash/CrashGraph';
import IconInfo from '@/components/icons/IconInfo';

export default {
    name: 'CrashGame',
    components: {
        IconInfo
    },
    data() {
        return {
            crashTimerRepeater: null,
            crashRunRepeater: null,
            crashGraphInstance: null,
            crashWidth: 0,
            crashProfitInfo: false,
            crashText: 'STARTING IN 20.00s',
            crashMultiplier: 1.0001
        }
    },
    methods: {
        crashFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString();
        },
        crashSetProfitInfo(value) {
            this.crashProfitInfo = value;
        },
        crashStartTimer() {
            const timeEnding = new Date(this.crashGame.createdAt).getTime() + (1000 * 6);
            const timeLeft = (timeEnding - (new Date().getTime() + this.generalTimeDiff)) / 1000;

            this.crashText = 'STARTING IN ' + (timeLeft).toFixed(2) + 's';

            if (timeLeft <= 0) {
                this.crashText = 'PENDING...';
            } else {
                this.crashTimerRepeater = requestAnimationFrame(this.crashStartTimer);
            }
        },
        crashStartMutiplier() {
            const elapsed = (new Date().getTime() + this.generalTimeDiff) - new Date(this.crashGame.updatedAt).getTime();
            const multiplier = Math.floor(100000 * Math.pow(Math.E, 0.00006 * elapsed));

            this.crashMultiplier = multiplier === 100000 ? 100001 : multiplier;

            CrashGraph.Engine.multi = this.crashMultiplier / 100000;

            this.crashRunRepeater = requestAnimationFrame(this.crashStartMutiplier);
        }
    },
    computed: {
        ...mapGetters([
            'authUser',
            'generalTimeDiff',
            'crashGame',
            'crashBets'
        ]),
        crashGetPayoutAmount() {
            return Math.floor(this.crashBets[this.crashBets.findIndex((element) => element.user._id === this.authUser.user._id)].amount * (this.crashMultiplier / 100000));
        }
    },
    watch: {
        crashGame: {
            handler(data, oldData) {
                if (data.state === 'created') {
                    CrashGraph.Engine.multi = 1.0001;
                    CrashGraph.Engine.gameState = 'STARTING';

                    this.crashStartTimer();
                } else if (data.state === 'rolling') {
                    CrashGraph.Engine.multi = 1.0001;
                    CrashGraph.Engine.gameState = 'IN_PROGRESS';

                    this.crashMultiplier = 1.0001;
                    this.crashStartMutiplier();
                } else if (data.state === 'completed') {
                    CrashGraph.Engine.multi = 1.0001;
                    CrashGraph.Engine.gameState = 'ENDED';

                    cancelAnimationFrame(this.crashRunRepeater);
                }
            },
            deep: true
        }
    },
    mounted() {
        let canvas = document.querySelector("#canvas-graph");

        this.crashWidth = this.$refs.crashGraph.clientWidth - 10;

        this.crashGraphInstance = new CrashGraph.Graph();
        this.crashGraphInstance.startRendering(canvas, {
            width: this.crashWidth,
            height: window.innerWidth > 640 ? 435 : 240
        });

        CrashGraph.Engine.multi = 1;

        if (this.crashGame.state === 'created') {
            CrashGraph.Engine.gameState = 'STARTING';
            this.crashStartTimer();
        } else if (this.crashGame.state === 'rolling') {
            CrashGraph.Engine.gameState = 'IN_PROGRESS';
            this.crashStartMutiplier();
        } else {
            this.crashText = 'PENDING...';
        }
    },
    destroyed() {
        cancelAnimationFrame(this.crashTimerRepeater);
        cancelAnimationFrame(this.crashRunRepeater);
        this.crashGraphInstance.stopRendering();
    }
}
</script>

<style scoped>
.crash-game {
    width: 100%;
    height: 460px;
    position: relative;
    border-radius: 15px;
    background: #241D2E;
    border: 1px solid #271d35;
    box-shadow: inset 0px 0px 35px rgba(0, 0, 0, 0.65);
}

.crash-game .game-graph {
    position: absolute;
    top: 20px;
    bottom: 5px;
    left: 5px;
    right: 5px;
}

.graph-crash {
    height: 460px;
}

.crash-game .game-info {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 15px;
    left: 0;
    padding: 0 20px;
}

.crash-game .info-network {
    display: flex;
    align-items: center;
}

.crash-game .info-network span {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
}

.crash-game .network-point {
    width: 10px;
    height: 10px;
    margin-right: 10px;
    border-radius: 50%;
    background: linear-gradient(255deg, #00ffc2 0%, #00aa6d 100%), #d9d9d9;
    box-shadow: 0px 0px 8px #01dea0;
}

.crash-game .info-profit {
    display: flex;
    align-items: center;
}

.crash-game .info-profit button {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff99;
}

.crash-game .info-profit button svg {
    margin-right: 8px;
    width: 18px;
    height: 18px;
    fill: #ffffff99;
    margin-bottom: 2px;
}

.crash-game .profit-amount {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
}

.crash-game .profit-amount.fade-enter-active,
.crash-game .profit-amount.fade-leave-active {
    transition: opacity 0.5s;
}

.crash-game .profit-amount.fade-enter-from,
.crash-game .profit-amount.fade-leave-to {
    opacity: 0;
}

.crash-game .profit-amount img {
    width: 20px;
    height: 20px;
    margin-right: 6px;
}

.crash-game .game-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("~@/assets/img/crash-back.png");
    border-radius: 15px;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    z-index: -1;
}

.crash-game .inner-completed,
.crash-game .inner-rolling,
.crash-game .inner-waiting {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.crash-game .inner-rolling {
    position: relative;
}

.crash-game .completed-multiplier,
.crash-game .rolling-multiplier {
    color: #D4AF3C;
    text-shadow: 0px 7px 15px rgba(0, 0, 0, 0.15);
    font-size: 75px;
    font-style: normal;
    font-weight: 600;
}

.crash-game .completed-over,
.crash-game .rolling-payout {
    color: #ddd;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.crash-game .rolling-amount {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: -6px;
    left: 50%;
    transform: translate(-50%, 100%);
}

.crash-game .rolling-amount img {
    width: 26px;
    height: 26px;
    margin-right: 10px;
}

.crash-game .amount-value {
    font-size: 16px;
    font-weight: 600;
    color: #bbbfd0;
}

.crash-game .amount-value span {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
}

.crash-game .inner-waiting img {
    margin-top: 25px;
}

.crash-game .waiting-status {
    color: #D4AF3C;
    text-shadow: 0px 7px 15px rgba(0, 0, 0, 0.15);
    font-size: 53px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.crash-game .waiting-timer {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
}

@media only screen and (max-width: 950px) {
    .crash-game {
        height: 250px;
        border-radius: 10px;
    }

    .crash-game .game-graph {
        top: 13px;
        bottom: 3px;
        left: 3px;
        right: 3px;
    }

    .graph-crash {
        height: 250px;
    }

    .crash-game .game-info {
        top: 10px;
        padding: 0 20px;
    }

    .crash-game .network-point {
        width: 8px;
        height: 8px;
        margin-right: 10px;
    }

    .crash-game .info-profit button {
        font-size: 11px;
    }

    .crash-game .info-profit button svg {
        margin-right: 8px;
        width: 13px;
        height: 13px;
        margin-bottom: 2px;
    }

    .crash-game .profit-amount {
        margin-right: 10px;
        font-size: 12px;
    }

    .crash-game .profit-amount img {
        width: 14px;
        height: 14px;
        margin-right: 6px;
    }

    .crash-game .game-inner {
        border-radius: 10px;
    }

    .crash-game .completed-multiplier,
    .crash-game .rolling-multiplier {
        font-size: 50px;
    }

    .crash-game .completed-over,
    .crash-game .rolling-payout {
        font-size: 16px;
    }

    .crash-game .rolling-amount img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .crash-game .amount-value {
        font-size: 14px;
        font-weight: 600;
        color: #bbbfd0;
    }

    .crash-game .amount-value span {
        font-size: 18px;
        font-weight: 800;
        color: #ffffff;
    }

    .crash-game .inner-waiting img {
        margin-top: 25px;
    }

    .crash-game .waiting-status {
        font-size: 28px;
    }

    .crash-game .waiting-timer {
        font-size: 14px;
    }
}

@media only screen and (max-width: 550px) {

    .crash-game .info-network span {
        display: none;
    }

}
</style>
