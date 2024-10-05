<template>
    <div class="roulette-controls">
        <div class="controls-fair">
            ROUND ID: {{ rouletteGetRoundId }} - ROUND HASH: {{ rouletteGetRoundHash }}
        </div>
        <div class="controls-amount">
            <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image" />
            <input v-model="rouletteAmount" v-on:input="rouletteValidateInput(rouletteAmount)" type="text" />
            <div class="amount-buttons">
                <button v-on:click="rouletteSetAmount('clear')" class="button-amount">Clear</button>
                <button v-on:click="rouletteSetAmount('+1')" class="button-amount">+1</button>
                <button v-on:click="rouletteSetAmount('+10')" class="button-amount">+10</button>
                <button v-on:click="rouletteSetAmount('+100')" class="button-amount">+100</button>
                <button v-on:click="rouletteSetAmount('1/2')" class="button-amount">1/2</button>
                <button v-on:click="rouletteSetAmount('x2')" class="button-amount">x2</button>
                <button v-on:click="rouletteSetAmount('max')" class="button-amount">MAX</button>
            </div>
        </div>
        <div class="controls-bet">
            <div class="bet-section section-red">
                <button v-on:click="rouletteBetButton('red')" class="button-bet"
                    v-bind:disabled="socketSendLoading !== null">
                    <div class="button-info">
                        <img src="@/assets/img/roulette/red.png" />
                        PLACE BET
                    </div>
                    <div class="button-multiplier">2x</div>
                </button>
            </div>
            <div class="bet-section section-black">
                <button v-on:click="rouletteBetButton('black')" class="button-bet"
                    v-bind:disabled="socketSendLoading !== null">
                    <div class="button-info">
                        <img src="@/assets/img/roulette/black.png" />
                        PLACE BET
                    </div>
                    <div class="button-multiplier">2x</div>
                </button>
            </div>
            <div class="bet-section section-green">
                <button v-on:click="rouletteBetButton('green')" class="button-bet"
                    v-bind:disabled="socketSendLoading !== null">
                    <div class="button-info">
                        <img src="@/assets/img/roulette/green.png" />
                        PLACE BET
                    </div>
                    <div class="button-multiplier">14x</div>
                </button>
            </div>
            <div class="bet-section section-bait">
                <button v-on:click="rouletteBetButton('bait')" class="button-bet"
                    v-bind:disabled="socketSendLoading !== null">
                    <div class="button-info">
                        <img src="@/assets/img/roulette/bait.png" />
                        PLACE BET
                    </div>
                    <div class="button-multiplier">7x</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'RouletteControls',
    // mixins: [
    //     mixins
    // ],
    data() {
        return {
            rouletteAmount: '0.00'
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'rouletteSendBetSocket'
        ]),
        rouletteValidateInput() {
            this.rouletteAmount = this.rouletteAmount.replace(',', '.').replace(/[^\d.]/g, '');
            this.rouletteAmount = this.rouletteAmount.indexOf('.') >= 0 ? this.rouletteAmount.substr(0, this.rouletteAmount.indexOf('.')) + '.' + this.rouletteAmount.substr((this.rouletteAmount.indexOf('.') + 1), 2).replace('.', '') : this.rouletteAmount;
        },
        rouletteSetAmount(action) {
            let amount = Math.floor(this.rouletteAmount * 1000);

            if (action === 'clear') {
                amount = 0;
            } else if (action === '1/2') {
                amount = Math.floor(amount / 2);
            } else if (action === 'x2') {
                amount = Math.floor(amount * 2);
            } else if (action === 'max') {
                amount = this.authUser.user.balance <= 500000 ? this.authUser.user.balance : 500000;
            } else {
                amount = Math.floor(amount + (Number(action.replace('+', '') * 1000)))
            }

            amount = amount >= this.authUser.user.balance ? this.authUser.user.balance : amount;
            this.rouletteAmount = (Math.floor(amount / 10) / 100).toFixed(2);
        },
        rouletteBetButton(color) {
            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            if (isNaN(this.rouletteAmount) === true || Number(this.rouletteAmount) <= 0) {
                this.notificationShow({ type: 'error', message: 'Your provided bet amount is invalid.' });
                return;
            }

            this.rouletteSendBetSocket({ amount: Math.floor(this.rouletteAmount * 1000), color: color });
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'authUser',
            'rouletteData'
        ]),
        rouletteGetRoundId() {
            let id = '';

            if (this.rouletteData.game !== null) { id = this.rouletteData.game._id; }

            return id;
        },
        rouletteGetRoundHash() {
            let hash = '';

            if (this.rouletteData.game !== null) { hash = this.rouletteData.game.fair.hash; }

            return hash;
        }
    }
}
</script>

<style scoped>
.roulette-controls {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
}

.roulette-controls .controls-fair {
    width: 1000px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 11px;
    font-weight: 500;
    color: #a897c7;
}

.roulette-controls .controls-amount {
    width: 1000px;
    position: relative;
    margin-top: 16px;
    border-radius: 8px;
    background: #1D1826;
    border: 1px solid #292137;
}

.roulette-controls .controls-amount img {
    width: 20px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translate(0, -50%);
}

.roulette-controls .controls-amount input {
    width: 100%;
    height: 58px;
    padding: 0 160px 0 49px;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
}

.roulette-controls .amount-buttons {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
}

.roulette-controls button.button-amount {
    margin: 0 15px;
    font-size: 14px;
    font-weight: 700;
    color: #CABFDD;
}

.roulette-controls button.button-amount:hover {
    color: #ffffff;
}

.roulette-controls .controls-bet {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 50px;
}

.roulette-controls .bet-section {
    width: calc(25% - 15px);
    padding: 8px 8px 3px 8px;
    border-radius: 7px 7px 0 0;
    background: #292137;
}

.roulette-controls button.button-bet {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
    border-radius: 5px;
    background: #1D1826;
    box-shadow: 0px 0px 5px 1px rgba(22, 26, 34, 0.1),
        0px 3px 0px 0px #1D1826;
}

.roulette-controls button.button-bet .button-info {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #ffffff;
}

.roulette-controls button.button-bet .button-info img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
}

.roulette-controls button.button-bet .button-multiplier {
    font-size: 18px;
    font-weight: 700;
    color: #767c8b;
}

@media only screen and (max-width: 1020px) {

    .roulette-controls .controls-fair,
    .roulette-controls .controls-amount {
        width: 100%;
        overflow: hidden;
    }

    .roulette-controls .controls-bet {
        margin-top: 25px;
    }

    .roulette-controls .bet-section {
        width: calc(50% - 7.5px);
        padding: 0;
    }

    .roulette-controls .bet-section:nth-child(3),
    .roulette-controls .bet-section:nth-child(4) {
        margin-top: 10px;
    }

}

@media only screen and (max-width: 640px) {
    .roulette-controls .controls-amount {
        margin-top: 10px;
    }

    .roulette-controls .controls-amount input {
        height: 45px;
        padding: 0 160px 0 40px;
        font-size: 14px;
    }

    .roulette-controls .controls-amount img {
        width: 17px;
        top: 50%;
        left: 16px;
    }

    .roulette-controls .controls-bet {
        margin-top: 2px;
    }

    .roulette-controls button.button-bet {
        height: 40px;
        padding: 0 10px;
    }

    .roulette-controls button.button-bet .button-info {
        font-size: 12px;
    }

    .roulette-controls button.button-bet .button-info img {
        width: 27px;
        height: 27px;
        margin-right: 12px;
    }

    .roulette-controls button.button-bet .button-multiplier {
        font-size: 14px;
    }
}

@media only screen and (max-width: 600px) {

    .roulette-controls button.button-amount:nth-child(2),
    .roulette-controls button.button-amount:nth-child(3),
    .roulette-controls button.button-amount:nth-child(4) {
        display: none;
    }

}

@media only screen and (max-width: 450px) {

    .roulette-controls button.button-amount:nth-child(5),
    .roulette-controls button.button-amount:nth-child(6) {
        display: none;
    }

}
</style>