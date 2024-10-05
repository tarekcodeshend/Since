<template>
    <div class="container-actions">
        <div class="actions-controls">
            <div class="controls-input">
                <div class="input-title">PLACE YOUR BET</div>
                <div class="input-content">
                    <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                    <input v-model="towersAmount" v-on:input="towersValidateInput" type="text" placeholder="BET AMOUNT"
                        v-bind:disabled="towersGame !== null && towersGame.state !== 'completed'">
                    <div class="content-buttons">
                        <button v-on:click="towersSetAmount('1/2x')"
                            v-bind:disabled="towersGame !== null && towersGame.state !== 'completed'">1/2</button>
                        <button v-on:click="towersSetAmount('2x')"
                            v-bind:disabled="towersGame !== null && towersGame.state !== 'completed'">x2</button>
                        <button v-on:click="towersSetAmount('max')"
                            v-bind:disabled="towersGame !== null && towersGame.state !== 'completed'">MAX</button>
                    </div>
                </div>
            </div>
            <div class="controls-risk">
                <button v-on:click="towersSetRisk('easy')" v-bind:class="{ 'button-active': towersRisk === 'easy' }"
                    v-bind:disabled="towersGame !== null && towersGame.state !== 'completed'">EASY</button>
                <button v-on:click="towersSetRisk('medium')" v-bind:class="{ 'button-active': towersRisk === 'medium' }"
                    v-bind:disabled="towersGame !== null && towersGame.state !== 'completed'">MEDIUM</button>
                <button v-on:click="towersSetRisk('hard')" v-bind:class="{ 'button-active': towersRisk === 'hard' }"
                    v-bind:disabled="towersGame !== null && towersGame.state !== 'completed'">HARD</button>
            </div>
            <div class="controls-bet">
                <button v-if="towersGame === null || towersGame.state === 'completed'" v-on:click="towersBetButton()"
                    class="button-create"
                    v-bind:class="{ 'button-lose': towersGame !== null && towersGame.state === 'completed' && towersGame.payout <= 0 }"
                    v-bind:disabled="socketSendLoading !== null">
                    <div class="button-inner">
                        <transition name="fade" mode="out-in">
                            <ButtonLoading v-if="socketSendLoading === 'TowersBet'" />
                            <div v-else class="inner-content">
                                <span>PLACE BET</span>
                            </div>
                        </transition>
                    </div>
                </button>
                <button v-else v-on:click="towersCashoutButton()" class="button-cashout"
                    v-bind:disabled="socketSendLoading !== null">
                    <div class="button-inner">
                        <transition name="fade" mode="out-in">
                            <ButtonLoading v-if="socketSendLoading === 'TowersCashout'" />
                            <div v-else class="inner-content-cashout">
                                <span>CASHOUT</span>
                                <div class="content-amount-cashout">
                                    <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                                    <div class="amount-value">
                                        <span>{{ towersFormatValue(towersGetCashoutAmount).split('.')[0] }}</span>.{{
                                            towersFormatValue(towersGetCashoutAmount).split('.')[1] }}
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </button>
            </div>
        </div>
        <div class="actions-info">
            <router-link to="/fair/towers" class="link-fair">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                    <path
                        d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288H584.4L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320H199.3L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z">
                    </path>
                </svg>
                FAIRNESS
            </router-link>
            <button v-on:click="towersMuteButton()" class="button-sound">
                <svg v-if="soundTowers === 1" xmlns="http://www.w3.org/2000/svg" height="16" width="18"
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
                {{ soundTowers === 1 ? 'MUTE' : 'UNMUTE' }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';
import IconSkull from '@/components/icons/IconSkull';

export default {
    name: 'TowersControls',
    components: {
        ButtonLoading,
        IconSkull
    },
    data() {
        return {
            towersAmount: null
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'soundSetTowers',
            'modalsSetShow',
            'towersSetRisk',
            'towersSendBetSocket',
            'towersSendCashoutSocket',
            'towersSetBetAmount'
        ]),
        towersFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        towersValidateInput() {
            this.towersAmount = this.towersAmount.replace(',', '.').replace(/[^\d.]/g, '');
            this.towersAmount = this.towersAmount.indexOf('.') >= 0 ? this.towersAmount.substr(0, this.towersAmount.indexOf('.')) + '.' + this.towersAmount.substr((this.towersAmount.indexOf('.') + 1), 2).replace('.', '') : this.towersAmount;

            this.validateAndSetBetAmount();
        },
        validateAndSetBetAmount() {
            const amount = Math.floor(this.towersAmount * 1000);
            if (isNaN(amount) === true || amount <= 0)
                this.towersSetBetAmount(0);
            else
                this.towersSetBetAmount(amount);
        },
        towersSetAmount(action) {
            let amount = Math.floor(this.towersAmount * 1000);

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
            this.towersAmount = parseFloat(Math.floor(amount / 10) / 100).toFixed(2);

            this.validateAndSetBetAmount();
        },
        towersBetButton() {
            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            const amount = Math.floor(this.towersAmount * 1000);

            if (isNaN(amount) === true || amount <= 0) {
                this.notificationShow({ type: 'error', message: 'Your entered bet amount is invalid.' });
                return;
            }

            const data = { amount: amount, risk: this.towersRisk };
            this.towersSendBetSocket(data);
        },
        towersCashoutButton() {
            const data = {};
            this.towersSendCashoutSocket(data);
        },
        towersFairButton() {
            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            this.modalsSetShow('FairSeed')
        },
        towersMuteButton() {
            if (this.soundTowers === 1) {
                this.soundSetTowers(0);
            } else {
                this.soundSetTowers(1);
            }
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'soundTowers',
            'authUser',
            'towersRisk',
            'towersGame'
        ]),
        towersGetCashoutAmount() {
            const multiplierPerRow = this.towersGame.risk === 'easy' ? 1.425 : this.towersGame.risk === 'medium' ? 1.90 : 2.85;
            return Math.floor(this.towersGame.amount * Math.pow(multiplierPerRow, this.towersGame.revealed.length));
        }
    }
}
</script>

<style scoped>
.towers .container-actions {
    width: 380px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 24px;
    border-radius: 18px;
    background: #292137
}

.towers .actions-controls,
.towers .controls-input {
    width: 100%
}

.towers .input-title {
    width: 100%;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    color: #CABFDD
}

.towers .input-content {
    width: 100%;
    position: relative;
    margin-top: 12px;
    border-radius: 8px;
    background: #181420;
    border: 1px solid #383146
}

.towers .input-content img {
    width: 20px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%)
}

.towers .input-content input {
    width: 100%;
    height: 58px;
    padding: 0 160px 0 49px;
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.towers .content-buttons {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 0
}

.towers .content-buttons button {
    margin: 0 15px;
    font-size: 14px;
    font-weight: 700;
    color: #CABFDD
}

.towers .content-buttons button:not([disabled]):hover {
    color: #fff
}

.towers .controls-risk {
    width: 100%;
    display: flex;
    margin-top: 18px
}

.towers .controls-risk button {
    width: calc(33.33% - 10px);
    height: 39px;
    margin-right: 15px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #1e1927;
    box-shadow: 0 2px 0 0 #1d222a
}

.towers .controls-risk button:last-of-type {
    margin-right: 0
}

.towers .controls-risk button.button-active {
    color: #D4AF3C;
    background: #252129;
    box-shadow: 0 0 0 1px #977920
}

.towers .controls-bet {
    width: 100%;
    margin-top: 32px
}

.towers .controls-bet button.button-cashout,
.towers .controls-bet button.button-create {
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

.towers .controls-bet button.button-create {
    background: #00c74d;
    border-bottom: 2px solid #00732c
}

.towers .controls-bet button.button-cashout {
    background: #D4AF3C;
    border-bottom: 2px solid #755c0e
}

.towers .controls-bet button.button-create:not([disabled]):hover {
    background: #00de56
}

.towers .controls-bet button.button-cashout:not([disabled]):hover {
    background: #dbba56
}

.towers .controls-bet button.button-cashout img {
    width: 23px !important;
    height: 23px !important;
    margin-left: 12px
}

.towers .controls-bet button.button-cashout .button-amount {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #fff
}

.towers .controls-bet button.button-cashout .button-amount span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.towers .actions-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 24px
}

.towers .actions-info a.link-fair,
.towers .actions-info button.button-sound {
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

.towers .actions-info a.link-fair:hover,
.towers .actions-info button.button-sound:hover {
    color: #fff
}

.towers .actions-info a.link-fair svg,
.towers .actions-info button.button-sound svg {
    width: 16px;
    margin-right: 8px;
    fill: #767c8b;
    transition: fill .3s ease
}

.towers .actions-info a.link-fair:hover svg,
.towers .actions-info button.button-sound:hover svg {
    fill: #fff
}

@media only screen and (max-width: 1330px) {
    .towers {
        width: 100%;
        padding: 20px 10px
    }
}

@media only screen and (max-width: 1100px) {
    .towers .towers-container {
        flex-direction: column-reverse
    }

    .towers .container-actions {
        width: 100%;
        height: auto;
        margin-top: 15px
    }
}

button.button-cashout .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

button.button-cashout .inner-content {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 800;
    color: #ffffff;
}

.inner-content-cashout {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 800;
    color: #ffffff;
}

.content-amount-cashout {
    display: flex;
    align-items: center;
    margin-left: 9px;
}

.content-amount-cashout img {
    width: 13px;
    height: 13px;
    margin-right: 5px;
}

.content-amount-cashout .amount-value {
    font-size: 12px;
    font-weight: 600;
    color: #eee;
}

.content-amount-cashout .amount-value span {
    font-size: 14px;
    font-weight: 800;
    color: #ffffff;
}

@media only screen and (max-width: 640px) {
    .towers .container-actions {
        width: 100%;
        height: auto;
        padding: 15px 15px;
        border-radius: 12px;
    }

    .towers .input-title {
        font-size: 12px;
    }

    .towers .input-content img {
        width: 17px;
        left: 16px;

    }

    .towers .input-content {
        margin-top: 5px;
    }

    .towers .input-content input {
        height: 47px;
        padding: 0 160px 0 40px;
        font-size: 12px;
    }

    .towers .content-buttons button {
        margin: 0 10px;
        font-size: 12px;
    }

    .towers .controls-risk {
        margin-top: 8px
    }

    .towers .controls-risk button {
        width: calc(33.33% - 8px);
        height: 30px;
        margin-right: 12px;
        font-size: 12px;
    }

    .towers .controls-bet {
        margin-top: 15px
    }

    .towers .controls-bet button.button-cashout,
    .towers .controls-bet button.button-create {
        height: 45px;
        font-size: 12px;
    }

    .towers .controls-bet button.button-cashout .button-amount {
        margin-left: 10px;
        font-size: 11px;
        font-weight: 700;
        color: #fff
    }

    .towers .controls-bet button.button-cashout img {
        width: 18px !important;
        height: 18px !important;
        margin-left: 12px
    }

    .towers .controls-bet button.button-cashout .button-amount span {
        font-size: 12px;
        font-weight: 700;
        color: #fff
    }

    .towers .actions-info {
        margin-top: 17px
    }

    .towers .actions-info a.link-fair,
    .towers .actions-info button.button-sound {
        width: calc(50% - 8px);
        height: 36px;
        font-size: 12px;
    }
}
</style>