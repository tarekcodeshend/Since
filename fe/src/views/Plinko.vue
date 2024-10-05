<template>
    <div class="plinko">
        <div class="plinko-container">
            <div class="container-actions">
                <div class="actions-controls">
                    <div class="controls-mode">
                        <button v-on:click="plinkoSetMode('manual')" class="button-mode"
                            v-bind:class="{ 'button-selected': plinkoMode === 'manual' }">MANUAL</button>
                        <button v-on:click="plinkoSetMode('auto')" class="button-mode"
                            v-bind:class="{ 'button-selected': plinkoMode === 'auto' }">AUTO</button>
                    </div>
                    <div class="controls-input">
                        <div class="input-title">PLACE YOUR BET</div>
                        <div class="input-content">
                            <img src="@/assets/img/coins.8ad8b473.png" />
                            <input v-model="plinkoAmount" v-on:input="plinkoValidateInput"
                                v-on:change="plinkoFormatInput" v-bind:disabled="plinkoGames.length >= 1" type="text"
                                value="0.00" />
                            <div class="content-buttons">
                                <button v-on:click="plinkoSetAmount('1/2')" class="button-amount"
                                    v-bind:class="{ 'button-active': plinkoGames.length === 0 }">1/2</button>
                                <button v-on:click="plinkoSetAmount('x2')" class="button-amount"
                                    v-bind:class="{ 'button-active': plinkoGames.length === 0 }">x2</button>
                                <button v-on:click="plinkoSetAmount('max')" class="button-amount"
                                    v-bind:class="{ 'button-active': plinkoGames.length === 0 }">MAX</button>
                            </div>
                        </div>
                    </div>
                    <div class="controls-rows">
                        <div class="rows-title">NUMBER OF ROWS</div>
                        <div class="rows-content">
                            <PlinkoFilterRows />
                        </div>
                    </div>
                    <div class="controls-risk">
                        <button v-on:click="plinkoSetRisk('easy')" class="button-risk"
                            v-bind:class="{ 'button-selected': plinkoRisk === 'easy', 'button-active': plinkoGames.length === 0 }">EASY</button>
                        <button v-on:click="plinkoSetRisk('medium')" class="button-risk"
                            v-bind:class="{ 'button-selected': plinkoRisk === 'medium', 'button-active': plinkoGames.length === 0 }">MEDIUM</button>
                        <button v-on:click="plinkoSetRisk('hard')" class="button-risk"
                            v-bind:class="{ 'button-selected': plinkoRisk === 'hard', 'button-active': plinkoGames.length === 0 }">HARD</button>
                    </div>
                    <div v-if="plinkoMode === 'auto'" class="controls-count">
                        <div class="count-title">NUMBER OF BETS</div>
                        <div class="count-content">
                            <input v-model="plinkoCount" type="number" min="0" max="1000" />
                            <font-awesome-icon v-if="Number(plinkoCount) === 0" v-bind:icon="['fas', 'infinity']" />
                        </div>
                    </div>
                    <div class="controls-bet">
                        <button v-if="plinkoMode !== 'auto' || plinkoAutoActive === false"
                            v-on:click="plinkoCreateButton" class="button-create">{{ plinkoMode === 'auto' ? 'START AUTOBET' : 'PLACE BE'}}T</button>
                        <button v-else v-on:click="plinkoStopAuto" class="button-stop">STOP AUTOBET</button>
                    </div>
                </div>
                <div class="actions-info">
                    <router-link to="/fair/plinko" class="link-fair">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512">
                            <path
                                d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288H584.4L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320H199.3L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z">
                            </path>
                        </svg>
                        FAIRNESS
                    </router-link>
                    <button v-on:click="plinkoMuteButton" class="button-sound">
                        <svg v-if="soundPlinko === 1" xmlns="http://www.w3.org/2000/svg" height="16" width="18"
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
                        {{ soundPlinko === 1 ? 'MUTE' : 'UNMUTE' }}
                    </button>
                </div>
            </div>

            <PlinkoGame v-bind:risk="plinkoRisk" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PlinkoFilterRows from '@/components/gamePlinko/PlinkoFilterRows';
import PlinkoGame from '@/components/gamePlinko/PlinkoGame';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: 'Plinko',
    metaInfo: {
        title: 'Plinko gooncasino.live'
    },
    components: {
        PlinkoFilterRows,
        PlinkoGame,
        // FontAwesomeIcon
    },
    data() {
        return {
            plinkoMode: 'manual',
            plinkoAutoActive: false,
            plinkoAutoInfinite: false,
            plinkoAmount: '0.00',
            plinkoRisk: 'easy',
            plinkoCount: 0
        }
    },
    methods: {
        ...mapActions(['notificationShow', 'plinkoSendCreateSocket', 'plinkoClearGames', 'soundSetPlinko', 'socketConnectPlinko']),
        plinkoValidateInput() {
            this.plinkoAmount = this.plinkoAmount.replace(',', '.').replace(/[^\d.]/g, '');
            this.plinkoAmount = this.plinkoAmount.indexOf('.') >= 0 ? this.plinkoAmount.substr(0, this.plinkoAmount.indexOf('.')) + '.' + this.plinkoAmount.substr((this.plinkoAmount.indexOf('.') + 1), 2).replace('.', '') : this.plinkoAmount;
        },
        plinkoFormatInput() {
            this.plinkoAmount = Number(this.plinkoAmount).toFixed(2);
        },
        plinkoSetMode(mode) {
            if (mode === 'manual') {
                this.plinkoAutoInfinite = false;
                this.plinkoAutoActive = false;
            }

            this.plinkoMode = mode;
        },
        plinkoSetAmount: function (action) {
            if (this.plinkoGames.length >= 1) { return; }

            let amount = Math.floor(this.plinkoAmount * 1000);

            if (action === '1/2') {
                amount = Math.floor(amount / 2);
            } else if (action === 'x2') {
                amount = Math.floor(amount * 2);
            } else if (action === 'max') {
                amount = this.authUser.user.balance <= 500000 ? this.authUser.user.balance : 500000;
            }

            if (amount >= Math.floor(this.authUser.user.balance)) {
                amount = Math.floor(this.authUser.user.balance);
            }

            this.plinkoAmount = parseFloat(Math.floor(amount / 10) / 100).toFixed(2);
        },
        plinkoSetRisk(risk) {
            if (this.plinkoGames.length >= 1) { return; }

            this.plinkoRisk = risk;
        },
        plinkoCreateButton() {
            if (this.plinkoMode === 'auto') {
                if (Math.floor(this.plinkoCount) === 0) {
                    this.plinkoAutoInfinite = true;
                }

                this.plinkoAutoActive = true;
            }

            this.plinkoSendCreate();
        },
        plinkoStopAuto() {
            this.plinkoAutoInfinite = false;
            this.plinkoAutoActive = false;
        },
        async plinkoSendCreate() {
            if (this.socketSendLoading !== null) { return; }

            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                this.plinkoStopAuto();
                return;
            }

            const amount = Math.floor(Number(this.plinkoAmount).toFixed(2) * 1000);
            this.plinkoAmount = Number(this.plinkoAmount).toFixed(2);
            this.plinkoCount = Math.floor(this.plinkoCount);

            if (amount === null || isNaN(amount) === true || amount <= 0) {
                this.notificationShow({ type: 'error', message: 'Please enter a valid bet amount.' });
                this.plinkoStopAuto();
                return;
            }

            if (this.plinkoMode === 'auto' && (this.plinkoCount === null || isNaN(this.plinkoCount) === true || this.plinkoCount < 0)) {
                this.notificationShow({ type: 'error', message: 'Please enter a valid bet number.' });
                this.plinkoStopAuto();
                return;
            }

            const data = { amount: amount, rows: this.plinkoFilterRows, risk: this.plinkoRisk };
            await this.plinkoSendCreateSocket(data);

            if (this.plinkoMode === 'auto') {
                if (this.plinkoAutoInfinite === false) this.plinkoCount = this.plinkoCount - 1;

                if (this.plinkoCount >= 1 || this.plinkoAutoInfinite === true) {
                    setTimeout(() => {
                        if (this.plinkoAutoActive === true) { this.plinkoSendCreate(); }
                    }, 750);
                } else {
                    this.plinkoStopAuto();
                }
            }
        },
        plinkoMuteButton() {
            if (this.soundPlinko === 1) {
                this.soundSetPlinko(0);
            } else {
                this.soundSetPlinko(1);
            }
        }
    },
    computed: {
        ...mapGetters(['generalSettings', 'authUser', 'plinkoGames', 'soundPlinko', 'plinkoFilterRows', 'socketSendLoading'])
    },
    beforeRouteLeave(to, from, next) {
        this.plinkoAutoInfinite = false;
        this.plinkoAutoActive = false;

        this.plinkoClearGames();
        next();
    },
    created() {
        this.socketConnectPlinko();
    },
    // created() {
    //     if(this.generalSettings.games.plinko.enabled === false) {
    //         // this.$router.push({ name: 'Blackjack' });
    //     }
    // }
}
</script>

<style scoped>
.plinko {
    width: 1300px;
    padding: 70px 0 70px 0;
    overflow: hidden;
}

.plinko .plinko-container {
    width: 100%;
    display: flex;
}

.plinko .container-actions {
    width: 380px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 32px 24px;
    border-radius: 18px;
    background: #292137;
}

.plinko .actions-controls {
    width: 100%;
}

.plinko .controls-mode {
    width: 100%;
    display: flex;
}

.plinko .controls-mode button.button-mode {
    width: calc(50% - 7.5px);
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    background-color: #1e1927;
    box-shadow: 0px 2px 0px 0px #30293d;
}

.plinko .controls-mode button:last-of-type {
    margin-right: 0;
}

.plinko .controls-mode button.button-mode.button-selected {
    color: #D4AF3C;
    background-color: #252129;
    box-shadow: 0px 0px 0px 1px #977920;
}

.plinko .controls-input {
    width: 100%;
    margin-top: 24px;
}

.plinko .input-title {
    width: 100%;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    color: #CABFDD;
}

.plinko .input-content {
    width: 100%;
    position: relative;
    margin-top: 12px;
    border-radius: 8px;
    background-color: #181420;
    border: 1px solid #383146;
}

.plinko .input-content img {
    width: 17px;
    position: absolute;
    top: 50%;
    left: 18px;
    transform: translate(0, -50%);
}

.plinko .input-content input {
    width: 100%;
    height: 58px;
    padding: 0 160px 0 48px;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    background-color: transparent;
}

.plinko .input-content input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.plinko .content-buttons {
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
}

.plinko .content-buttons button.button-amount {
    margin: 0 15px;
    padding: 0;
    font-size: 14px;
    font-weight: 700;
    color: #CABFDD;
    background-color: transparent;
    transition: all 0.3s ease;
    cursor: not-allowed;
}

.plinko .content-buttons button.button-amount.button-active {
    cursor: pointer;
}

.plinko .content-buttons button.button-amount.button-active:hover {
    color: #ffffff;
}


.plinko .controls-rows {
    width: 100%;
    margin-top: 24px;
}

.plinko .rows-title {
    width: 100%;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    color: #CABFDD;
}

.plinko .rows-content {
    width: 100%;
    margin-top: 12px;
}

.plinko .controls-risk {
    width: 100%;
    display: flex;
    margin-top: 18px;
}

.plinko .controls-risk button.button-risk {
    width: calc(33.33% - 10px);
    height: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    background-color: #2f293b;
    box-shadow: 0px 2px 0px 0px #201a2b;
    cursor: not-allowed;
}

.plinko .controls-risk button.button-risk.button-active {
    cursor: pointer;
}

.plinko .controls-risk button:last-of-type {
    margin-right: 0;
}

.plinko .controls-risk button.button-risk.button-selected {
    color: #D4AF3C;
    background-color: #252129;
    box-shadow: 0px 0px 0px 1px #af8d25;
}

.plinko .controls-count {
    width: 100%;
    margin-top: 24px;
}

.plinko .count-title {
    width: 100%;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 700;
    color: #CABFDD;
}

.plinko .count-content {
    width: 100%;
    position: relative;
    margin-top: 12px;
}

.plinko .count-content input {
    width: 100%;
    height: 58px;
    padding: 0 17px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    background-color: #2f293b;
    -moz-appearance: textfield;
}

.plinko .count-content svg {
    position: absolute;
    top: 50%;
    right: 17px;
    transform: translate(0, -50%);
}

.plinko .count-content input::-webkit-outer-spin-button,
.plinko .count-content input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.plinko .controls-bet {
    width: 100%;
    margin-top: 32px;
}

.plinko .controls-bet button.button-create,
.plinko .controls-bet button.button-stop {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    transition: all 0.3s ease;
}

.plinko .controls-bet button.button-create:disabled,
.plinko .controls-bet button.button-stop:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.plinko .controls-bet button.button-create {
    background-color: #00c74d;
    border-bottom: 2px solid #00732c;
}

.plinko .controls-bet button.button-stop {
    background-color: #fd3b31;
    border-bottom: 2px solid #97302b;
}

.plinko .controls-bet button.button-create:hover {
    background-color: #00de56;
}

.plinko .controls-bet button.button-create:hover {
    background-color: #00de56;
}

.plinko .controls-bet button.button-create:disabled:hover {
    background-color: #00c74d;
}

.plinko .controls-bet button.button-button-stop:hover {
    background-color: #fe524a;
}

.plinko .controls-bet button.button-button-stop:disabled:hover {
    background-color: #fd3b31;
}

.plinko .controls-bet button.button-active {
    opacity: 1;
    cursor: pointer;
}

.plinko .actions-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
}

.plinko .actions-info a.link-fair,
.plinko .actions-info button.button-sound {
    width: calc(50% - 8px);
    height: 41px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #b9abd1;
    background-color: #211b2b;
    border-bottom: 2px solid #191422;
    transition: all 0.3s ease;
}

.plinko .actions-info a.link-fair:hover,
.plinko .actions-info button.button-sound:hover {
    color: #ffffff;
}

.plinko .actions-info a.link-fair svg,
.plinko .actions-info button.button-sound svg {
    width: 16px;
    margin-right: 8px;
    fill: #767c8b;
    transition: fill .3s ease
}

.plinko .actions-info a.link-fair:hover svg,
.plinko .actions-info button.button-sound:hover svg {
    fill: #fff
}


@media only screen and (max-width: 1330px) {

    .plinko {
        width: 100%;
        padding: 20px 10px;
    }

}

@media only screen and (max-width: 1100px) {
    
    .plinko .plinko-container {
        flex-direction: column-reverse;
    }
    
    .plinko .container-actions {
        width: 100%;
        height: auto;
        margin-top: 15px;
    }    
}
@media only screen and (max-width: 640px) {
    .plinko .container-actions {
        padding: 19px 17px;
        border-radius: 12px;
    }
    .plinko .controls-mode button.button-mode {
        height: 30px;
        margin-right: 10px;        
        font-size: 12px;
    }
    .plinko .controls-input {        
        margin-top: 14px;
    }
    .plinko .input-title {
        font-size: 12px;
    }

    .plinko .input-content {
        margin-top: 2px;
    }
    
    .plinko .input-content img {
        width: 14px;
    }
    
    .plinko .input-content input {
        height: 46px;
        padding: 0 160px 0 38px;
        font-size: 13px;       
    }
    .plinko .content-buttons button.button-amount {
        margin: 0 15px;
        font-size: 12px;
    }
    .plinko .controls-rows {
        margin-top: 10px;
    }
    .plinko .rows-title {
        font-size: 12px;
    }

    .plinko .rows-content {
        width: 100%;
        margin-top: 4px;
    }
    
    .plinko .controls-risk {
        margin-top: 8px;
    }

    .plinko .controls-risk button.button-risk {
        width: calc(33.33% - 1px);
        height: 30px;
        margin-right: 3px;
        font-size: 12px;
    }
    .plinko .controls-count {
        margin-top: 14px;
    }

    .plinko .count-title {
        width: 100%;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 700;
        color: #CABFDD;
    }

    .plinko .count-content {
        width: 100%;
        position: relative;
        margin-top: 12px;
    }
    .plinko .count-content input {      
        height: 46px;
        padding: 0 17px;
        border-radius: 8px;
        font-size: 13px;
    }
    .plinko .controls-bet {
        margin-top: 15px;
    }
    .plinko .controls-bet button.button-create,
    .plinko .controls-bet button.button-stop {
        height: 45px;
        font-size: 13px;
    }
}
</style>