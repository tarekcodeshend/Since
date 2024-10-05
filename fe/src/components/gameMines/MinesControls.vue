<template>
    <div class="container-actions">
        <div class="actions-controls">
            <div class="controls-input">
                <div class="input-title">PLACE YOUR BET</div>
                <div class="input-content">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                    <input v-model="minesAmount" v-on:input="minesValidateInput" type="text" placeholder="BET AMOUNT"
                        v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">
                    <div class="content-buttons">
                        <button v-on:click="minesSetAmount('1/2x')"
                            v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">1/2</button>
                        <button v-on:click="minesSetAmount('2x')"
                            v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">x2</button>
                        <button v-on:click="minesSetAmount('max')"
                            v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">MAX</button>
                    </div>
                </div>
            </div>
            <div class="controls-mines">
                <div class="mines-title">NUMBER OF MINES</div>
                <div class="mines-content">
                    <div class="content-input">
                        <img src="@/assets/img/mines/bomb.ebef82db.webp" alt="bomb">
                        <input v-model="minesCount" type="text" min="0"
                            v-bind:max="authUser.user !== null ? (authUser.user.balance / 1000) : 0" step="0.01"
                            v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">
                        <span>/25</span>
                    </div>
                    <div class="content-actions">
                        <button v-on:click="minesSetCount(1)"
                            v-bind:class="{ 'button-active': minesIsCount(1) === true }"
                            v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">
                            <img src="@/assets/img/mines/bomb.ebef82db.webp" alt="bomb">
                            1
                        </button>
                        <button v-on:click="minesSetCount(3)"
                            v-bind:class="{ 'button-active': minesIsCount(3) === true }"
                            v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">
                            <img src="@/assets/img/mines/bomb.ebef82db.webp" alt="bomb">
                            3
                        </button>
                        <button v-on:click="minesSetCount(5)"
                            v-bind:class="{ 'button-active': minesIsCount(5) === true }"
                            v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">
                            <img src="@/assets/img/mines/bomb.ebef82db.webp" alt="bomb">
                            5
                        </button>
                        <button v-on:click="minesSetCount(10)"
                            v-bind:class="{ 'button-active': minesIsCount(10) === true }"
                            v-bind:disabled="minesGame !== null && minesGame.state !== 'completed'">
                            <img src="@/assets/img/mines/bomb.ebef82db.webp" alt="bomb">
                            10
                        </button>
                    </div>
                </div>
            </div>
            <div class="controls-bet">
                <button v-if="minesGame === null || minesGame.state === 'completed'" v-on:click="minesBetButton()"
                    v-bind:disabled="socketSendLoading !== null" class="button-create">
                    <transition name="fade" mode="out-in">
                        <ButtonLoading v-if="socketSendLoading === 'MinesBet'" />
                        <div v-else class="inner-content">PLACE BET</div>
                    </transition>
                </button>
                <button v-else v-on:click="minesCashoutButton()" class="button-cashout"
                    v-bind:disabled="socketSendLoading !== null">
                    <div class="button-inner">
                        <transition name="fade" mode="out-in">
                            <ButtonLoading v-if="socketSendLoading === 'MinesCashout'" />
                            <div v-else class="inner-content">
                                CASHOUT
                                <div class="content-amount">
                                    <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                                    <div class="amount-value">
                                        <span>{{ minesFormatValue(minesGetCashoutAmount).split('.')[0] }}</span>.{{
                                            minesFormatValue(minesGetCashoutAmount).split('.')[1] }}
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </button>
            </div>
            <!-- <div class="controls-risk risk-low">
                <div class="risk-info">
                    <div class="info-text">RISK LEVEL</div>
                    <div class="info-value">LOW</div>
                </div>
                <div class="risk-bar">
                    <div class="bar-progress" style="width: 0%;"></div>
                </div>
            </div> -->
        </div>
        <div class="actions-info">
            <router-link to="/fair/mines" class="link-fair">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                    <path
                        d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288H584.4L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320H199.3L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z">
                    </path>
                </svg>
                FAIRNESS
            </router-link>
            <button v-on:click="minesMuteButton()" class="button-sound">
                <svg v-if="soundMines === 1" xmlns="http://www.w3.org/2000/svg" height="16" width="18"
                    viewBox="0 0 576 512">
                    <path
                        d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z">
                    </path>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                    <path
                        d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z">
                    </path>
                </svg>
                {{ soundMines === 1 ? 'MUTE' : 'UNMUTE' }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';

export default {
    name: 'MinesControls',
    components: {
        ButtonLoading
    },
    data() {
        return {
            minesAmount: null,
            minesCount: 1
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'soundSetMines',
            'modalsSetShow',
            'minesSendBetSocket',
            'minesSendRevealSocket',
            'minesSendCashoutSocket'
        ]),
        minesFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        minesValidateInput() {
            this.minesAmount = this.minesAmount.replace(',', '.').replace(/[^\d.]/g, '');
            this.minesAmount = this.minesAmount.indexOf('.') >= 0 ? this.minesAmount.substr(0, this.minesAmount.indexOf('.')) + '.' + this.minesAmount.substr((this.minesAmount.indexOf('.') + 1), 2).replace('.', '') : this.minesAmount;
        },
        minesIsCount(count) {
            return Number(this.minesCount) === count;
        },
        minesSetAmount(action) {
            let amount = Math.floor(this.minesAmount * 1000);
            if (action === '1/2x') {
                amount = Math.floor(amount / 2);
            }
            if (action === '2x') {
                amount = Math.floor(amount * 2);
            } else if (action === 'max') {
                amount = this.authUser.user.balance <= 500000 ? this.authUser.user.balance : 500000;
            }
            if (amount >= Math.floor(this.authUser.user.balance)) {
                amount = Math.floor(this.authUser.user.balance);
            }
            this.minesAmount = parseFloat(Math.floor(amount / 10) / 100).toFixed(2);
        },
        minesSetCount(value) {
            this.minesCount = value;
        },
        minesBetButton() {
            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            const amount = Math.floor(this.minesAmount * 1000);
            const minesCount = Math.floor(this.minesCount);

            if (isNaN(amount) === true || amount <= 0) {
                this.notificationShow({ type: 'error', message: 'Your entered bet amount is invalid.' });
                return;
            }

            if (isNaN(minesCount) === true || minesCount < 1 || minesCount > 24) {
                this.notificationShow({ type: 'error', message: 'Your entered mines count is invalid.' });
                return;
            }

            const data = { amount: amount, minesCount: minesCount };
            this.minesSendBetSocket(data);
        },
        minesRevealButton() {
            let tile = Math.floor(Math.random() * (24 - this.minesGame.revealed.length));

            while (true) {
                if (this.minesGame.revealed.some((element) => element.tile === tile) === true) { tile = tile + 1; }
                else { break; }
            }

            const data = { tile: tile };
            this.minesSendRevealSocket(data);
        },
        minesCashoutButton() {
            const data = {};
            this.minesSendCashoutSocket(data);
        },
        minesFairButton() {
            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            this.modalsSetShow('FairSeed')
        },
        minesMuteButton() {
            if (this.soundMines === 1) {
                this.soundSetMines(0);
            } else {
                this.soundSetMines(1);
            }
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
            'socketSendLoading',
            'soundMines',
            'authUser',
            'minesGame'
        ]),
        minesGetCashoutAmount() {
            let multiplier = 0;

            if (this.minesGame !== null && this.minesGame.revealed.length >= 1) {
                const first = 25 === this.minesGame.revealed.length ? 1 : this.minesFactorialNumber(25) / (this.minesFactorialNumber(this.minesGame.revealed.length) * this.minesFactorialNumber(25 - this.minesGame.revealed.length));
                const second = (25 - this.minesGame.minesCount) === this.minesGame.revealed.length ? 1 : this.minesFactorialNumber(25 - this.minesGame.minesCount) / (this.minesFactorialNumber(this.minesGame.revealed.length) * this.minesFactorialNumber((25 - this.minesGame.minesCount) - this.minesGame.revealed.length));

                multiplier = 0.95 * (first / second);
                multiplier = multiplier < 1 ? 1.01 : multiplier;
                multiplier = Math.round(multiplier * 100) / 100;
            }

            return Math.floor(this.minesGame.amount * multiplier);
        }
    }
}
</script>

<style scoped>
.mines .container-actions {
    width: 380px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 24px;
    border-radius: 18px;
    background: #292137
}

.mines .actions-controls,
.mines .controls-input {
    width: 100%
}

.mines .input-title {
    width: 100%;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    color: #CABFDD
}

.mines .input-content {
    width: 100%;
    position: relative;
    margin-top: 12px;
    border-radius: 8px;
    background: #181420;
    border: 1px solid #383146
}

.mines .input-content img {
    width: 20px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%)
}

.mines .input-content input {
    width: 100%;
    height: 58px;
    padding: 0 160px 0 49px;
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.mines .content-buttons {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 0
}

.mines .content-buttons button {
    margin: 0 15px;
    font-size: 14px;
    font-weight: 700;
    color: #CABFDD
}

.mines .content-buttons button:not([disabled]):hover {
    color: #fff
}

.mines .controls-mines {
    width: 100%;
    margin-top: 24px
}

.mines .mines-title {
    width: 100%;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    color: #CABFDD
}

.mines .mines-content {
    width: 100%;
    margin-top: 12px
}

.mines .content-input {
    width: 100%;
    position: relative
}

.mines .content-input img {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%)
}

.mines .content-input span {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.mines .content-input input {
    width: 100%;
    height: 58px;
    padding: 0 54px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    background: #181420;
    border: 1px solid #383146;
    -moz-appearance: textfield
}

.mines .content-input input::-webkit-inner-spin-button,
.mines .content-input input::-webkit-outer-spin-button {
    -webkit-appearance: none
}

.mines .content-actions {
    width: 100%;
    display: flex;
    margin-top: 18px
}

.mines .content-actions button {
    width: calc(25% - 12px);
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #1e1927;
    box-shadow: 0 2px 0 0 #1d222a
}

.mines .content-actions button:last-of-type {
    margin-right: 0
}

.mines .content-actions button.button-active {
    color: #D4AF3C;
    background: #252129;
    box-shadow: 0 0 0 1px #977920
}

.mines .content-actions button img {
    width: 24px;
    margin-right: 15px
}

.mines .controls-bet {
    width: 100%;
    margin-top: 32px
}

.mines .controls-bet button.button-cashout,
.mines .controls-bet button.button-create {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff
}

.mines .controls-bet button.button-create {
    background: #00c74d;
    border-bottom: 2px solid #00732c
}

.mines .controls-bet button.button-cashout {
    background: #D4AF3C;
    border-bottom: 2px solid #a1811e
}

.mines .controls-bet button.button-create:not([disabled]):hover {
    background: #00de56
}

.mines .controls-bet button.button-cashout:not([disabled]):hover {
    background: #D4AF3C
}

.mines .controls-bet button.button-cashout img {
    width: 21px;
    margin-left: 12px
}

.mines .controls-bet button.button-cashout .button-amount {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #fff
}

.mines .controls-bet button.button-cashout .button-amount span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.mines .controls-risk {
    width: 100%;
    margin-top: 18px
}

.mines .risk-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.mines .info-text {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.mines .info-value {
    font-size: 13px;
    font-weight: 700;
    transition: all .3s ease
}

.mines .controls-risk.risk-low .info-value {
    color: #00c74d
}

.mines .controls-risk.risk-medium .info-value {
    color: #f4d03f
}

.mines .controls-risk.risk-high .info-value {
    color: #fd3b31
}

.mines .risk-bar {
    width: 100%;
    height: 8px;
    display: flex;
    margin-top: 12px;
    border-radius: 4px;
    background: #212732
}

.mines .bar-progress {
    height: 8px;
    border-radius: 4px;
    transition: all .3s ease
}

.mines .controls-risk.risk-low .bar-progress {
    background: #00c74d
}

.mines .controls-risk.risk-medium .bar-progress {
    background: #f4d03f
}

.mines .controls-risk.risk-high .bar-progress {
    background: #fd3b31
}

.mines .actions-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 24px
}

.mines .actions-info a.link-fair,
.mines .actions-info button.button-sound {
    width: calc(50% - 8px);
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #b9abd1;
    background: #211b2b;
    border-bottom: 2px solid #191422
}

.mines .actions-info a.link-fair:hover,
.mines .actions-info button.button-sound:hover {
    color: #fff
}

.mines .actions-info a.link-fair svg,
.mines .actions-info button.button-sound svg {
    width: 16px;
    margin-right: 8px;
    fill: #767c8b;
    transition: fill .3s ease
}

.mines .actions-info a.link-fair:hover svg,
.mines .actions-info button.button-sound:hover svg {
    fill: #fff
}

button.button-cashout,
button.button-auto {
    width: 100%;
    height: 44px;
    position: relative;
    z-index: 1;
}

button.button-cashout .button-inner,
button.button-auto .button-inner {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(6px 0, calc(100% - 6px) 0, 100% 25%, 100% 75%, calc(100% - 6px) 100%, 6px 100%, 0 75%, 0 25%);
}

button.button-cashout .inner-content {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 800;
    color: #ffffff;
}

button.button-cashout .content-amount {
    display: flex;
    align-items: center;
    margin-left: 11px;
}

button.button-cashout .content-amount img {
    width: 20px !important;
    height: 20px;
    margin-right: 6px;
}

@media only screen and (max-width: 640px) {
    .mines .container-actions {
        width: 100%;
        height: auto;
        margin-top: 15px;
        padding: 15px 14px;
        border-radius: 10px;
    }

    .mines .input-title {
        font-size: 11px;
    }

    .mines .input-content {
        margin-top: 2px;
    }

    .mines .input-content img {
        width: 16px;
    }

    .mines .input-content input {
        height: 47px;
        padding: 0 160px 0 40px;
        font-size: 12px;
    }

    .mines .content-buttons button {
        margin: 0 12px;
        font-size: 12px;
    }

    .mines .controls-mines {
        margin-top: 10px
    }

    .mines .mines-title {
        font-size: 11px;
    }

    .mines .mines-content {
        margin-top: 2px
    }

    .mines .content-input img {
        width: 20px;
        height: 20px;
        left: 16px;
    }

    .mines .content-input span {
        right: 16px;
        font-size: 12px;
    }

    .mines .content-input input {
        height: 47px;
        padding: 0 45px;
        border-radius: 8px;
        font-size: 12px;
    }

    .mines .content-actions {
        margin-top: 8px
    }

    .mines .content-actions button {
        width: calc(25% - 5px);
        height: 30px;
        margin-right: 6px;
        font-size: 12px;
    }

    .mines .controls-bet {
        margin-top: 15px
    }

    .mines .controls-bet button.button-cashout,
    .mines .controls-bet button.button-create {
        height: 45px;
        font-size: 12px;
    }

    .mines .controls-bet button.button-cashout img {
        width: 18px;
        margin-left: 10px
    }

    .mines .controls-bet button.button-cashout .button-amount {
        margin-left: 10px;
        font-size: 11px;
    }

    .mines .controls-bet button.button-cashout .button-amount span {
        font-size: 13px;
    }

    .mines .actions-info {
        margin-top: 17px
    }

    .mines .actions-info a.link-fair,
    .mines .actions-info button.button-sound {
        width: calc(50% - 8px);
        height: 37px;
        font-size: 12px;
    }
}
</style>