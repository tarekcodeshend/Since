<template>
    <div class="combat_legend-controls">
        <div class="controls-title">
            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.90698 20.2069L15.7558 27.0733L13.0174 29.8191L15.7597 32.5668L13.0194 35.3126L8.22287 30.5065L2.74031 36L0 33.2542L5.48256 27.7588L0.686047 22.9546L3.42636 20.2089L6.16667 22.9527L8.90504 20.2069H8.90698ZM1.05814 0L7.93023 0.0058256L30.8314 22.9546L33.5736 20.2089L36.314 22.9546L31.5194 27.7607L37 33.2542L34.2597 36L28.7771 30.5065L23.9806 35.3126L21.2403 32.5668L23.9806 29.8191L1.06395 6.85668L1.05814 0ZM29.0756 0L35.9419 0.0058256L35.9457 6.84697L28.0911 14.7154L21.2384 7.85091L29.0756 0Z" fill="url(#icon-combat_legend-gradient)"/>
                <defs>
                    <linearGradient id="icon-combat_legend-gradient" x1="37" y1="0" x2="-6.31937" y2="10.9114" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f00"/>
                        <stop offset="1" stop-color="#f00"/>
                    </linearGradient>
                </defs>
            </svg>
            <span>COMBAT LEGEND</span>
        </div>
        <div class="controls-actions">
            <div class="actions-amount">
                <input v-model="combat_legendAmount" v-on:input="combat_legendValidateInput" type="text" placeholder="BET AMOUNT" />
                <img src="@/assets/img/icons/coin.svg" alt="icon" />
                <div class="amount-buttons">
                    <button v-on:click="combat_legendSetAmount('clear')">
                        <div class="button-inner">CLEAR</div>
                    </button>
                    <button v-on:click="combat_legendSetAmount('2x')">
                        <div class="button-inner">2x</div>
                    </button>
                    <button v-on:click="combat_legendSetAmount('max')" class="button-max">
                        <div class="button-inner">MAX</div>
                    </button>
                </div>
            </div>
            <Combat_legendFilterCount />
            <button v-on:click="combat_legendCreateButton" class="button-create">
                <div class="button-inner">CREATE BATTLE</div>
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import Combat_legendFilterCount from '@/components/combat_legend/Combat_legendFilterCount';

    export default {
        name: 'Combat_legendControls',
        components: {
            Combat_legendFilterCount
        },
        data() {
            return {
                combat_legendAmount: null
            }
        },
        methods: {
            ...mapActions([
                'notificationShow', 
                'combat_legendSendCreateSocket'
            ]),
            combat_legendValidateInput() {
                this.combat_legendAmount = this.combat_legendAmount.replace(',', '.').replace(/[^\d.]/g, '');
                this.combat_legendAmount = this.combat_legendAmount.indexOf('.') >= 0 ? this.combat_legendAmount.substr(0, this.combat_legendAmount.indexOf('.')) + '.' + this.combat_legendAmount.substr((this.combat_legendAmount.indexOf('.') + 1), 2).replace('.', '') : this.combat_legendAmount;
            },
            combat_legendSetAmount(action) {
                let amount = Math.floor(this.combat_legendAmount * 100);

                if(action === 'clear') {
                    amount = 0;
                } else if(action === '2x') {
                    amount = Math.floor(amount * 2);
                } else if(action === 'max') {
                    amount = Math.floor(this.authUser.user.balance / 10);
                }

                this.combat_legendAmount = parseFloat(amount / 100).toFixed(2);
            },
            combat_legendCreateButton() {
                if(this.socketSendLoading !== null) { return; }

                if(this.authUser.user === null) {
                    this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                    return;
                }

                const amount = Math.floor(this.combat_legendAmount * 1000);

                if(amount === null || isNaN(amount) === true || amount <= 0) {
                    this.notificationShow({type: 'error', message: 'Your entered bet amount is invalid.'});
                    return;
                }

                const data = { amount: amount, playerCount: this.combat_legendFilterCount };
                this.combat_legendSendCreateSocket(data);
            }
        },
        computed: {
            ...mapGetters([
                'socketSendLoading', 
                'authUser', 
                'combat_legendFilterCount'
            ])
        }
    }
</script>

<style scoped>
    .combat_legend-controls {
        width: 1160px;
        height: 76px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 25px;
        border-radius: 10px;
        background-color: #011828;
        border: 1px solid #0c304c;
    }

    .combat_legend-controls .controls-title {
        height: 50px;
        display: flex;
        align-items: center;
    }

    .combat_legend-controls .controls-title svg {
        margin-right: 12px;
    }

    .combat_legend-controls .controls-title span {
        font-size: 28px;
        font-weight: 900;
        background: linear-gradient(255deg, #f00 0%, #f00 100%), #ffffff;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }

    .combat_legend-controls .controls-actions {
        display: flex;
        align-items: center;
    }

    .combat_legend-controls .actions-amount {
        width: 350px;
        height: 50px;
        position: relative;
        margin-right: 25px;
    }

    .combat_legend-controls .actions-amount::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, #04131f 0%, #223a4e 100%);
        clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 25%, 100% 75%, calc(100% - 10px) 100%, 10px 100%, 0 75%, 0 25%);
    }

    .combat_legend-controls .actions-amount input {
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        padding: 0 175px 0 43px;
        font-size: 12px;
        font-weight: 600;
        color: #ffffff;
        background-color: #07253a;
        clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 25%, 100% 75%, calc(100% - 10px) 100%, 10px 100%, 0 75%, 0 25%);
    }

    .combat_legend-controls .actions-amount input::placeholder {
        color: #5e768e;
    }

    .combat_legend-controls .actions-amount img {
        width: 19px;
        height: 19px;
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translate(0, -50%);
    }

    .combat_legend-controls .amount-buttons {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translate(0, -50%);
    }

    .combat_legend-controls .amount-buttons button {
        min-width: 45px;
        height: 31px;
        margin-right: 8px;
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1));
    }

    .combat_legend-controls .amount-buttons button.button-max {
        filter: drop-shadow(0px 4px 25px rgba(1, 230, 169, 0.15)) drop-shadow(0px 4px 25px rgba(15, 41, 63, 0.35));
    }

    .combat_legend-controls .amount-buttons button:last-of-type {
        margin-right: 0;
    }

    .combat_legend-controls .amount-buttons button .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        font-size: 12px;
        font-weight: 700;
        color: #bbbfd0;
        background-color: #214059;
        clip-path: polygon(4px 0, calc(100% - 4px) 0, 100% 25%, 100% 75%, calc(100% - 4px) 100%, 4px 100%, 0 75%, 0 25%);
    }

    .combat_legend-controls .amount-buttons button.button-max .button-inner {
        color: #ffffff;
        background: linear-gradient(255deg, #f00 0%, #f00 100%);
    }

    .combat_legend-controls .controls-actions button.button-create {
        width: 130px;
        height: 50px;
        filter: drop-shadow(0px 4px 25px rgba(1, 230, 169, 0.15)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.35));
    }

    .combat_legend-controls .controls-actions button.button-create .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;
        background: linear-gradient(255deg, #f00 0%, #f00 100%);
        clip-path: polygon(7px 0, calc(100% - 7px) 0, 100% 25%, 100% 75%, calc(100% - 7px) 100%, 7px 100%, 0 75%, 0 25%);
    }

    @media only screen and (max-width: 1180px) {

        .combat_legend-controls {
            width: 100%;
            padding: 12px 10px;
        }

    }

    @media only screen and (max-width: 950px) {

        .combat_legend-controls {
            height: auto;
            flex-direction: column;
            align-items: flex-start;
        }

        .combat_legend-controls .controls-actions {
            width: 100%;
            justify-content: space-between;
            margin-top: 10px;
        }

        .combat_legend-controls .actions-amount {
            width: calc(100% - 237px);
        }

    }

    @media only screen and (max-width: 650px) {

        .combat_legend-controls .controls-actions {
            flex-wrap: wrap;
        }

        .combat_legend-controls .actions-amount {
            width: calc(100% - 92px);
        }

        .combat_legend-controls .controls-actions button.button-create {
            width: 100%;
            margin-top: 10px;
        }

    }

    @media only screen and (max-width: 500px) {

        .combat_legend-controls .actions-amount input {
            padding: 0 70px 0 43px;
        }

        .combat_legend-controls .amount-buttons button {
            display: none;
            margin-right: 0;
        }

        .combat_legend-controls .amount-buttons button:first-child {
            display: block;
        }

    }
</style>
