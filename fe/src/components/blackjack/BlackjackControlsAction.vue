<template>
    <div class="blackjack-controls-action">
        MAKE A DECISION
        <div class="action-timer">
            TIME REMAINING <span>{{ parseFloat(blackjackTimer).toFixed(2) }}s</span>
        </div>
        <div class="action-container">
            <div v-if="table.playersPos === 'all'" class="container-insurance">
                <button v-on:click="$parent.blackjackInsuranceButton(true)">
                    <div class="button-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                            <path
                                d="M9.00689 0.719257L9.00221 0.710938L0.264648 5.75598L0.284408 5.7903V11.7425H0.288048C0.362408 16.7113 4.15139 20.7788 9.00299 21.2892C13.8546 20.779 17.6438 16.7116 17.7179 11.7425V5.7877L17.7351 5.75806L9.00689 0.719257ZM9.00299 18.6845V11.4359H2.87297V7.26918L9.00299 3.73032V11.4359H15.1294V11.7425H15.1338C15.0615 15.2767 12.4196 18.19 9.00299 18.6845Z"
                                fill="#00C74D" />
                        </svg>
                        INSURANCE
                    </div>
                </button>
                <button v-on:click="$parent.blackjackInsuranceButton(false)">
                    <div class="button-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <path
                                d="M13.0069 2.71926L13.0022 2.71094L4.26465 7.75598L4.28441 7.7903V13.7425H4.28805C4.36241 18.7113 8.15139 22.7788 13.003 23.2892C17.8546 22.779 21.6438 18.7116 21.7179 13.7425V7.7877L21.7351 7.75806L13.0069 2.71926ZM13.003 20.6845V13.4359H6.87297V9.26918L13.003 5.73032V13.4359H19.1294V13.7425H19.1338C19.0615 17.2767 16.4196 20.19 13.003 20.6845Z"
                                fill="#FD3B31" />
                        </svg>
                        NO INSURANCE
                    </div>
                </button>
            </div>
            <div v-else class="container-normal">
                <button v-on:click="$parent.blackjackHitButton()">
                    <div class="button-inner">
                        <img src="@/assets/img/blackjack/hit.png" alt="blackjack" />
                        HIT
                    </div>
                </button>
                <button v-on:click="$parent.blackjackStandButton()">
                    <div class="button-inner">
                        <img src="@/assets/img/blackjack/stand.png" alt="blackjack" />
                        STAND
                    </div>
                </button>
                <button v-on:click="$parent.blackjackSplitButton()" v-bind:disabled="blackjackGetPlayer(table.playersPos).bet.actions.includes('split') === true ||
                    blackjackGetPlayer(table.playersPos).bet.cards.length !== 2 ||
                    blackjackGetPlayer(table.playersPos).bet.cards[0].rank !== blackjackGetPlayer(table.playersPos).bet.cards[1].rank
                    ">
                    <div class="button-inner">
                        <img src="@/assets/img/blackjack/split.png" alt="blackjack" />
                        SPLIT
                    </div>
                </button>
                <button v-on:click="$parent.blackjackDoubleButton()" v-bind:disabled="blackjackGetPlayer(table.playersPos).bet.actions.includes('split') === true ||
                    blackjackGetPlayer(table.playersPos).bet.cards.length !== 2 ||
                    blackjackGetCardValue(blackjackGetPlayer(table.playersPos).bet.cards) < 9 ||
                    blackjackGetCardValue(blackjackGetPlayer(table.playersPos).bet.cards) > 11
                    ">
                    <div class="button-inner">
                        <img src="@/assets/img/blackjack/double.png" alt="blackjack" />
                        DOUBLE
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'BlackjackControlsAction',
    props: ['table'],
    data() {
        return {
            blackjackTimerRepeater: null,
            blackjackTimer: 10
        }
    },
    methods: {
        blackjackGetPlayer(seat) {
            return this.table.players[this.table.players.findIndex((element) => element.seat === seat)];
        },
        blackjackGetCardValue(cards) {
            let value = 0;
            let aces = false;

            for (const card of cards) {
                if (card.rank === 'A') {
                    value = value + 1;
                    aces = true;
                } else if (card.rank == 'K' || card.rank == 'Q' || card.rank == 'J') {
                    value = value + 10;
                } else if (card.rank != 'hidden') {
                    value = value + Math.floor(card.rank);
                }
            }

            if (aces == true && value <= 11) {
                value = value + 10;
            }

            return value;
        },
        blackjackStartTimer() {
            const timeEnding = new Date(this.table.game.updatedAt).getTime() + (1000 * 10);
            this.blackjackTimer = (timeEnding - (new Date().getTime() + this.generalTimeDiff)) / 1000;

            if (this.blackjackTimer <= 0) {
                this.blackjackTimer = 0;
            } else {
                this.blackjackTimerRepeater = requestAnimationFrame(this.blackjackStartTimer);
            }
        }
    },
    computed: {
        ...mapGetters([
            'generalTimeDiff'
        ])
    },
    watch: {
        'table': {
            handler(data, oldData) {
                if (this.table.game.state === 'countdown' || (this.table.game.state === 'running' && this.table.playerPos !== null)) {
                    this.blackjackStartTimer();
                }
            },
            deep: true
        }
    },
    beforeUnmount() {
        cancelAnimationFrame(this.blackjackTimerRepeater);
    },
    created() {
        if (this.table.game.state === 'countdown' || (this.table.game.state === 'running' && this.table.playerPos !== null)) {
            this.blackjackStartTimer();
        }
    }
}
</script>

<style scoped>
.blackjack-controls-action {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 210px;
    /* font-family: 'Rubik'; */
    text-align: center;
    font-size: 24px;
    font-weight: 900;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index: 1;
}

.blackjack-controls-action .action-timer {
    display: flex;
    margin-top: 3px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.blackjack-controls-action .action-timer span {
    width: 38px;
    display: flex;
    margin-left: 5px;
    color: #FD3B31;
}

.blackjack-controls-action .action-container {
    width: fit-content;
    height: 60px;
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 0 5px;
    border-radius: 10px;
    background: #16121E;
    z-index: -1;
    display: flex;
    justify-content: center;
}

.blackjack-controls-action .container-insurance {
    width: 390px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.blackjack-controls-action .container-normal {
    width: 420px;
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.blackjack-controls-action .container-insurance button {
    height: 50px;
    position: relative;
    padding: 1px;
    z-index: 1;
}

.blackjack-controls-action .container-normal button {
    height: 45px;
    position: relative;
    padding: 1px;
    z-index: 1;
}

.blackjack-controls-action .container-insurance button {
    width: calc(50% - 2px);
}

.blackjack-controls-action .container-normal button {
    width: calc(25% - 3px);
}

.blackjack-controls-action .container-insurance button .button-inner,
.blackjack-controls-action .container-normal button .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    color: #FFF;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.45px;
    border-radius: 10px;
    background: #100D14;
    transition: background 0.3s ease;
}

.blackjack-controls-action .container-normal button:disabled .button-inner {
    color: #353f47;
}

.blackjack-controls-action .container-insurance button .button-inner svg {
    margin-right: 10px;
    width: 23px;
    height: 23px;
}

.blackjack-controls-action .container-normal button .button-inner img {
    margin-right: 10px;
    width: 15px;
    height: 15px;
}

.blackjack-controls-action .container-normal button:disabled .button-inner svg {
    fill: #353f47;
}
</style>
