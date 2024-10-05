<template>
    <div class="roll-controls">
        <div class="controls-bet-amount-title">Bet Amount</div>
        <div class="controls-amount">
            <input v-model="rollAmount" v-on:input="rollValidateInput" type="text" placeholder="Enter Amount" />
            <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
            <div class="amount-buttons">
                <button v-on:click="rollSetAmount('clear')">
                    <div class="button-inner">CLEAR</div>
                </button>
                <button v-on:click="rollSetAmount('+10')" class="button-add">
                    <div class="button-inner">+10</div>
                </button>
                <button v-on:click="rollSetAmount('1/2')">
                    <div class="button-inner">1/2</div>
                </button>
                <button v-on:click="rollSetAmount('2x')">
                    <div class="button-inner">2x</div>
                </button>
                <button v-on:click="rollSetAmount('max')" class="button-max">
                    <div class="button-inner">MAX</div>
                </button>
            </div>
        </div>
        <div class="controls-multiplier">Multiplier</div>
        <div class="controls-bet">
            <div class="bet-multiplier">
                <input v-model="rollMultiplier" v-on:input="rollValidateMulti" type="text"
                    placeholder="Enter Multiplier" />
                <div class="multiplier-buttons">
                    <button v-on:click="rollSetMultiplier('increase')">
                        <img src="@/assets/img/iconup.png" alt="up" />
                    </button>
                    <button v-on:click="rollSetMultiplier('decrease')">
                        <img src="@/assets/img/icondown.png" alt="up" />
                    </button>
                </div>
            </div>
            <button v-on:click="rollBetButton" class="button-bet">
                <div class="button-inner">PLACE BET</div>
            </button>
        </div>
        <div class="controls-multiplier">Previous</div>
        <!-- <div class="controls-recent">
            <div class="recent-title">RECENT BETS</div>
            <div class="recent-list">

                <RollRecentElement v-for="bet of rollGetRecentBets" v-bind:key="bet._id"
                    v-on:click.native="rollSetBet(bet)" v-bind:bet="bet" />

            </div>
        </div> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RollRecentElement from '@/components/roll/RollRecentElement';

export default {
    name: 'RollControls',
    components: {
        RollRecentElement
    },
    data() {
        return {
            rollAmount: null,
            rollMultiplier: null,
            rollRepeat: false
        }
    },
    methods: {
        ...mapActions(['notificationShow', 'rollSendBetSocket']),
        rollValidateInput() {
            this.rollAmount = this.rollAmount.replace(',', '.').replace(/[^\d.]/g, '');
            this.rollAmount = this.rollAmount.indexOf('.') >= 0 ? this.rollAmount.substr(0, this.rollAmount.indexOf('.')) + '.' + this.rollAmount.substr((this.rollAmount.indexOf('.') + 1), 2).replace('.', '') : this.rollAmount;
        },
        rollSetAmount(action) {
            let amount = Math.floor(this.rollAmount * 1000);

            if (action === 'clear') {
                amount = 0;
            } else if (action === '+10') {
                amount = Math.floor(amount + 10000);
            } else if (action === '1/2') {
                amount = Math.floor(amount / 2);
            } else if (action === '2x') {
                amount = Math.floor(amount * 2);
            } else if (action === 'max') {
                amount = this.authUser.user.balance <= 500000 ? this.authUser.user.balance : 500000;
            }

            this.rollAmount = parseFloat(Math.floor(amount / 10) / 100).toFixed(2);
        },
        rollValidateMulti() {
            this.rollMultiplier = this.rollMultiplier.replace(',', '.').replace(/[^\d.]/g, '');
            this.rollMultiplier = this.rollMultiplier.indexOf('.') >= 0 ? this.rollMultiplier.substr(0, this.rollMultiplier.indexOf('.')) + '.' + this.rollMultiplier.substr((this.rollMultiplier.indexOf('.') + 1), 2).replace('.', '') : this.rollMultiplier;
        },
        rollSetMultiplier(action) {
            let multi = Math.floor(this.rollMultiplier);

            if (action === 'increase') {
                multi = Math.floor(multi + 1);
            } else if (action === 'decrease') {
                multi = Math.floor(multi - 1);
            }

            this.rollMultiplier = multi < 2 ? 2 : multi;
        },
        rollSetBet(bet) {
            this.rollAmount = parseFloat(bet.amount / 1000).toFixed(2);
            this.rollMultiplier = parseFloat(bet.multiplier / 100).toFixed(2);
        },
        rollToggleRepeat() {
            this.rollRepeat = !this.rollRepeat;
        },
        rollBetButton() {
            if (this.socketSendLoading !== null) { return; }

            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            const amount = Math.floor(this.rollAmount * 1000);
            const multiplier = Math.floor(this.rollMultiplier * 100);

            if (amount === null || isNaN(amount) === true || amount <= 0) {
                this.notificationShow({ type: 'error', message: 'Your entered bet amount is invalid.' });
                return;
            }

            if (multiplier === null || isNaN(multiplier) === true || multiplier <= 100) {
                this.notificationShow({ type: 'error', message: 'Your entered bet multiplier is invalid.' });
                return;
            }

            const data = { amount: amount, multiplier: multiplier };
            this.rollSendBetSocket(data);
        }
    },
    computed: {
        ...mapGetters(['socketSendLoading', 'rollRecent', 'authUser']),
        rollGetRecentBets() {
            let bets = [];

            for (let bet of this.rollRecent) {
                const index = bets.findIndex((element) => element.baseAmount === bet.amount && element.multiplier === bet.multiplier);

                if (index !== -1) {
                    bets[index].amount = bets[index].amount + bet.amount;
                } else {
                    bet = { ...bet, baseAmount: bet.amount }
                    bets.push(bet);
                }
            }

            bets.sort(function (a, b) { return +b.amount - +a.amount; });

            return bets;
        }
    }
}
</script>

<style scoped>
.roll-controls {
    width: 100%;
    padding: 15px 20px;
    border-radius: 15px;
    background: #292137;
}

.roll-controls .controls-bet-amount-title {
    color: #CABFDD;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.45px;
    margin-bottom: 5px;
}

.roll-controls .controls-multiplier {
    color: #CABFDD;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.45px;
    margin-bottom: 5px;
    margin-top: 20px;
}

.roll-controls .controls-amount {
    width: 100%;
    height: 45px;
    position: relative;
    padding: 1px;
    border-radius: 10px;
    overflow: hidden;
    background: #181420;
    border: 1px solid #383146;
}

.roll-controls .controls-amount input {
    width: 100%;
    height: 100%;
    padding: 0 280px 0 35px;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
}

.roll-controls .controls-amount input::placeholder {
    color: #767C8B;
}

.roll-controls .controls-amount img {
    width: 17px;
    height: 17px;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
}

.roll-controls .amount-buttons {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
}

.roll-controls .multiplier-buttons {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
}

.roll-controls .amount-buttons button {
    min-width: 45px;
    height: 35px;
    margin-right: 5px;
    background: #1e1927;
    border-radius: 7px;
    transition: all .2s;
}

.roll-controls .multiplier-buttons button {
    min-width: 37px;
    height: 37px;
    margin-right: 5px;
    background: #1e1927;
    border-radius: 7px;
    transition: all .2s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.roll-controls .multiplier-buttons button img {
    width: 15px;
}

.amount-buttons button:hover {
    transition-duration: .1s;
    opacity: 0.8;
}

.multiplier-buttons button:hover {
    transition-duration: .1s;
    opacity: 0.8;
}

.roll-controls .amount-buttons button.button-max {
    transition: all .2s;
}

.button-max:hover {
    transition-duration: .1s;
    opacity: 0.8;
}


.roll-controls .amount-buttons button:last-of-type {
    margin-right: 0;
}

.roll-controls .amount-buttons button .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 9px;
    font-size: 12px;
    font-weight: 700;
    color: #827992;
    background-color: #1e1927;
    box-shadow: 0 2px 0 0 #2d263a;
    border-radius: 7px;
}

.roll-controls .amount-buttons button.button-max .button-inner {
    font-weight: 800;
    color: #827992;
}

.roll-controls .controls-bet {
    width: 100%;
    display: flex;
    align-items: center;
}

.roll-controls .bet-multiplier {
    width: 200px;
    height: 48px;
    position: relative;
    margin-right: 25px;
    padding: 1px;
    border-radius: 10px;
    overflow: hidden;
    background: #181420;
    border: 1px solid #383146;
}

.roll-controls .bet-multiplier input {
    width: 100%;
    height: 100%;
    padding: 0 80px 0 10px;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
}

.roll-controls .bet-multiplier input::placeholder {
    color: #767C8B;
}

.roll-controls button.button-bet {
    width: 120px;
    height: 45px;
    position: relative;
    margin-right: 12px;
    border-radius: 5px;
    background: #00c74d;
    border-bottom: 2px solid #00732c;
    transition: all 0.3s ease;
}

.roll-controls button.button-bet:hover {
    background: #00de56;
}

.roll-controls button.button-bet .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
}

.roll-controls .controls-recent {
    width: 100%;
    display: flex;
    margin-top: 20px;
}

.roll-controls .recent-title {
    height: 48px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-size: 12px;
    font-weight: 700;
    color: #5e768e;
}

.roll-controls .recent-list {
    width: calc(100% - 98px);
    display: flex;
    flex-wrap: wrap;
}

@media only screen and (max-width: 1750px) {

    .roll-controls .controls-amount {
        width: 100%;
    }

}

@media only screen and (max-width: 750px) {

    .roll-controls {
        padding: 20px;
    }

    .roll-controls .amount-buttons button.button-add {
        display: none;
    }

    .roll-controls .controls-bet {
        flex-wrap: wrap;
        margin-top: 15px;
    }

    .roll-controls .bet-multiplier {
        width: 100%;
        margin-bottom: 15px;
        margin-right: 0;
    }

    .roll-controls button.button-bet {
        width: 100%;
        margin-right: 0px;
    }

    .roll-controls .controls-recent {
        flex-direction: column;
    }

    .roll-controls .recent-list {
        width: 100%;
    }

}

@media only screen and (max-width: 750px) {
    .roll-controls {
        padding: 13px 10px;
        border-radius: 12px;
    }

    .roll-controls .controls-bet-amount-title {
        font-size: 13px;
    }

    .roll-controls .controls-multiplier {
        font-size: 13px;
        margin-top: 10px;
    }

    .roll-controls .controls-amount {
        height: 40px;
    }

    .roll-controls .controls-amount input {
        padding: 0 250px 0 30px;
    }

    .roll-controls .amount-buttons button {
        min-width: 45px;
        height: 30px;
        margin-right: 5px;
    }

    .roll-controls .multiplier-buttons button {
        min-width: 37px;
        height: 32px;
    }

    .roll-controls .bet-multiplier {
        height: 40px;
    }

    .roll-controls .controls-bet {
        margin-top: 5px;
    }
}
</style>
