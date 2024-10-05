<template>
    <div v-bind:class="{ 'crypto-deposit-element': true, 'element-open': cryptoElement === currency }">
        <button class="element-toggle" v-on:click="$parent.setCryptoElement(currency)">
            <div class="button-info">
                <img v-bind:src="require('@/assets/img/cashier/' + currency + '.png')" /> {{ cashierGetName
                }}
            </div>
            <svg width="11" height="8" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" class="icon-toggle">
                <path d="M5.5 9L10.2631 0.75H0.73686L5.5 9Z"></path>
            </svg>
        </button>
        <div class="element-accordion">
            <div class="accordion-inner">
                <div class="accordin-header">
                    <div class="inner-barcode">
                        <img src="@/assets/img/qr-temp.png" alt="" />
                    </div>
                    <div class="inner-info">
                        <div class="currency-info">
                            <img v-bind:src="require('@/assets/img/cashier/' + currency + '.png')" /> {{ cashierGetName
                            }}
                        </div>
                        <div class="info-text">
                            Withdrawals are typically processed instantly unless flagged as suspicious. <br>
                            Please double-check that the address you provide is correct, as we are not responsible for any lost funds due to incorrect addresses. If you have any questions, please open a ticket on our Discord server, and we will assist you as soon as possible.
                        </div>                
                    </div>
                </div>
                <div class="withdraw-addresss">
                    <div>Withdraw Address</div>
                    <input v-model="cashierAddress" />
                </div>
                <div class="currency-conversion">
                    <div>Currency conversion</div>
                    <div class="currency-conversion-inner">
                        <div class="currency-input">
                            <transition name="fade" mode="out-in">
                                <div v-if="cashierCryptoData.loading === true" class="element-loading" key="loading">
                                </div>
                                <div v-else class="currency-input-inner">
                                    <img src="@/assets/img/coins.8ad8b473.png" alt="currency" />
                                    <input v-model="cashierCoinAmount" v-on:input="cashierCoinInput" />
                                </div>
                            </transition>
                        </div>
                        <span>=</span>
                        <div class="currency-input">
                            <transition name="fade" mode="out-in">
                                <div v-if="cashierCryptoData.loading === true" class="element-loading" key="loading">
                                </div>
                                <div v-else class="currency-input-inner">
                                    <img v-bind:src="require('@/assets/img/cashier/' + currency + '.png')" />
                                    <input v-model="cashierCryptoAmount" v-on:input="cashierCryptoInput" />
                                </div>
                            </transition>
                        </div>
                        <span>=</span>
                        <div class="currency-input">
                            <transition name="fade" mode="out-in">
                                <div v-if="cashierCryptoData.loading === true" class="element-loading" key="loading">
                                </div>
                                <div v-else class="currency-input-inner">
                                    <span>$</span>
                                    <input v-model="cashierFiatAmount" v-on:input="cashierFiatInput" />
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="withdraw-submit">
                    <button v-on:click="cashierWithdrawButton()" v-bind:disabled="socketSendLoading !== null">Submit
                        Withdraw</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import QRCode from '@/components/QRCode';
import { COIN_RATE, WITHDRAW_LIMIT } from '../../utils';

export default {
    name: 'CashierCryptoWithdrawItem',
    components: {
        QRCode
    },
    props: ['currency', 'cryptoElement'],
    data() {
        return {
            cashierCurrency: (this.currency === 'usdt_erc20' || this.currency === 'usdt_trc20') ? 'usdt' : this.currency,
            cashierCoinAmount: 0,
            cashierCryptoAmount: 0,
            cashierFiatAmount: 0,
            cashierAddress: null
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'cashierSendCryptoWithdrawDepositSocket'
        ]),
        setCryptoElement(value) {
            this.cryptoElement = (this.cryptoElement === value) ? null : value;
        },
        cashierCoinInput() {
            this.cashierFiatAmount = parseFloat(this.cashierCoinAmount * COIN_RATE).toFixed(2);
            this.cashierCryptoAmount = parseFloat(1 / (this.cashierCryptoData.prices[this.currency].price / 1000) * this.cashierFiatAmount).toFixed(8);
        },
        cashierCryptoInput() {
            this.cashierFiatAmount = parseFloat(this.cashierCryptoAmount * (this.cashierCryptoData.prices[this.currency].price / 1000)).toFixed(2);
            this.cashierCoinAmount = parseFloat(this.cashierFiatAmount / COIN_RATE).toFixed(2);
        },
        cashierFiatInput() {
            this.cashierCoinAmount = parseFloat(this.cashierFiatAmount / COIN_RATE).toFixed(2);
            this.cashierCryptoAmount = parseFloat(1 / (this.cashierCryptoData.prices[this.currency].price / 1000) * this.cashierFiatAmount).toFixed(8)
        },
        cashierWithdrawButton() {
            const amount = Math.floor(this.cashierCoinAmount * 1000);

            if (this.cashierAddress === null || this.cashierAddress.trim() === '') {
                this.notificationShow({ type: 'error', message: 'You need to enter a valid ' + this.cashierCurrency + ' withdraw address.' });
                return;
            }
            
            if(this.cashierCoinAmount < WITHDRAW_LIMIT.all ){
                this.notificationShow({ type: 'error', message: 'Amount is below the minimum withdrawal limit: ' + WITHDRAW_LIMIT.all + ' Goonbux.'});
                return;
            }

            const data = { currency: this.currency, amount: amount, address: this.cashierAddress };
            this.cashierSendCryptoWithdrawDepositSocket(data);
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'cashierCryptoData'
        ]),
        cashierGetName() {
            let name = this.currency.toUpperCase();

            if (this.currency === 'sol') {
                name = 'Solana';
            } else if (this.currency === 'btc') {
                name = 'Bitcoin';
            } else if (this.currency === 'eth') {
                name = 'Ethereum';
            } else if (this.currency === 'ltc') {
                name = 'Litecoin';
            } else if (this.currency === 'usdt_erc20') {
                name = 'USDT (ERC20)';
            } else if (this.currency === 'usdt_trc20') {
                name = 'USDT (TRC20)';
            } else if (this.currency === 'trx') {
                name = 'TRX';
            }

            return name;
        },
    },
}
</script>

<style scoped>
.crypto-deposit-element {
    width: 100%;
}

.crypto-deposit-element button.element-toggle {
    width: 100%;
    height: 66px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #212732
}

.crypto-deposit-element button.element-toggle svg {
    height: 9px;
    fill: #626c7e;
    transition: all .3s ease
}

.crypto-deposit-element.element-open button.element-toggle svg {
    fill: #fff;
    transform: rotate(180deg)
}

.crypto-deposit-element button.element-toggle .button-info {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
    color: #9c94aa;
    transition: all .3s ease
}

.crypto-deposit-element.element-open button.element-toggle .button-info {
    color: #fff
}

.crypto-deposit-element button.element-toggle .button-info img {
    width: 34px;
    height: 34px;
    margin-right: 12px;
    transition: all .3s ease;
    opacity: .5
}

.crypto-deposit-element.element-open button.element-toggle .button-info img {
    opacity: 1
}

.crypto-deposit-element .element-accordion {
    width: 100%;
    height: 0px;
    overflow: hidden;
    transition: all .3s ease;
}

.element-open .element-accordion {
    height: 460px !important;
}

.crypto-deposit-element .element-accordion.slide-enter-active,
.crypto-deposit-element .element-accordion.slide-leave-active {
    overflow: hidden;
    transition: height .2s ease
}

.crypto-deposit-element .element-accordion.slide-enter-to,
.crypto-deposit-element .element-accordion.slide-leave {
    height: 168px
}

.crypto-deposit-element .element-accordion.slide-enter,
.crypto-deposit-element .element-accordion.slide-leave-to {
    height: 0
}

.crypto-deposit-element .accordion-inner {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px 0
}

.crypto-deposit-element .accordion-inner .accordin-header {
    width: 100%;
    display: flex;
    align-items: center;
}

.crypto-deposit-element .inner-barcode {
    width: 132px;
    height: 132px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #fff
}

.crypto-deposit-element .inner-barcode img {
    width: 87%;
    height: 87%;
}

.crypto-deposit-element .inner-info {
    flex: 1 1;
    margin-left: 20px;
    padding: 20px;
    border-radius: 5px;
    background: #1c1724;
}

.crypto-deposit-element .info-title {
    font-size: 14px;
    font-weight: 700;
    color: #CABFDD
}

.crypto-deposit-element .info-address {
    margin-top: 6px;
    display: flex;
    align-items: center
}

.crypto-deposit-element button.button-copy {
    height: 32px;
    margin-left: 12px;
    padding: 0 10px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background: #fd3b31;
    border-bottom: 2px solid #97302b
}

.crypto-deposit-element button.button-copy:hover {
    background: #fe524a
}

.crypto-deposit-element .address-value {
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    text-decoration: underline;
    font-size: 18px;
    font-weight: 600;
    color: #fd3b31
}

.crypto-deposit-element .info-text {
    margin-top: 16px;
    color: #66686B;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

@media only screen and (max-width: 975px) {

    .crypto-deposit-element .element-accordion.slide-enter-to,
    .crypto-deposit-element .element-accordion.slide-leave {
        height: 304px
    }

    .crypto-deposit-element .accordion-inner .accordin-header {
        flex-direction: column
    }

    .crypto-deposit-element .inner-info {
        width: 100%;
        margin-top: 25px;
    }
}

@media only screen and (max-width: 600px) {

    .crypto-deposit-element .element-accordion.slide-enter-to,
    .crypto-deposit-element .element-accordion.slide-leave {
        height: 361px
    }

    .crypto-deposit-element .info-address {
        flex-direction: column;
        align-items: flex-start
    }

    .crypto-deposit-element .info-address button.button-copy {
        width: 100%;
        height: 32px;
        margin-top: 12px;
        margin-left: 0
    }
}

.deposit-crypto {
    width: 100%;
    margin-top: 35px
}

.deposit-crypto .crypto-title {
    display: flex;
    align-items: center
}

.deposit-crypto .title-value {
    font-size: 20px;
    font-weight: 800;
    color: #323743
}

.deposit-crypto .title-value span {
    font-size: 26px
}

.deposit-crypto .title-bonus {
    height: 26px;
    display: flex;
    align-items: center;
    margin-left: 12px;
    padding: 0 8px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background: #fd3b31
}


.crypto-deposit-element .currency-info {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    color: #626c7e;
    transition: all .3s ease
}

.crypto-deposit-element .currency-info img {
    width: 30px;
    height: 30px;
    margin-right: 12px;
    transition: all .3s ease;
}

.accordion-inner .withdraw-addresss {
    width: 100%;
    margin-top: 20px;
    color: #FFF;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.accordion-inner .withdraw-addresss input {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background: #17131f;
    color: #FFF;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.accordion-inner .withdraw-addresss input::placeholder {
    color: #323742;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.accordion-inner .currency-conversion {
    margin-top: 10px;
    width: 100%;
    color: #FFF;
}

.accordion-inner .currency-conversion .currency-conversion-inner {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
}

.accordion-inner .currency-conversion .currency-input {
    width: 30%;
    min-height: 50px;
    background: #17131f;
    border-radius: 5px;
    overflow: hidden;
}

.accordion-inner .currency-conversion .currency-input .currency-input-inner {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
}

.accordion-inner .currency-conversion .currency-input .currency-input-inner input {
    border-radius: 5px;
    background: #17131f;
    width: 100%;
    height: 50px;
    padding: 0px 20px;
    padding-left: 40px;
    color: #9ea1a7;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.accordion-inner .currency-conversion .currency-input .currency-input-inner img {
    position: absolute;
    left: 12px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    width: 20px;
    height: 20px
}

.accordion-inner .currency-conversion .currency-input .currency-input-inner span {
    position: absolute;
    left: 12px;
    top: 0px;
    width: 20px;
    height: fit-content;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    color: #FFF;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.accordion-inner .withdraw-submit {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.accordion-inner .withdraw-submit button {
    width: 300px;
    height: 50px;
    border-radius: 5px;
    background: #FF372F;
    color: #ffffff;
    text-shadow: 0px 3.833px 3.833px rgba(0, 0, 0, 0.23);
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.489px;
}

@media only screen and (max-width: 1000px) {
    .element-open .element-accordion {
        height: 250px !important;
    }

    .crypto-deposit-element .accordion-inner {
        width: 100%;
    }

    .crypto-deposit-element .accordion-inner .accordin-header {
        display: none;
    }
}

@media only screen and (max-width: 600px) {
    .accordion-inner .withdraw-submit button {
        width: 100%;
    }
    .accordion-inner .withdraw-addresss {
        margin-top: 0px;
        font-size: 13px;
    }
    .accordion-inner .withdraw-addresss input {
        margin-top: 5px;
        height: 40px;
        padding: 0px 15px;
        font-size: 13px;
    }
    .accordion-inner .currency-conversion {
        margin-top: 10px;
        font-size: 13px;
        font-family: Poppins;
        font-size: 13px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
    .accordion-inner .currency-conversion .currency-input {
        width: 30%;
        min-height: 40px;
    }
    .accordion-inner .currency-conversion .currency-input .currency-input-inner input {
        height: 40px;
        padding: 0px 20px;
        padding-left: 33px;
        padding-right: 15px;
        font-size: 12px;
    }
    .accordion-inner .currency-conversion .currency-input .currency-input-inner img {
        left: 11px;
        width: 17px;
        height: 17px
    }

    .accordion-inner .currency-conversion .currency-input .currency-input-inner span {
        left: 10px;
        width: 20px;
        font-size: 13px;
    }
}

.currency-conversion .element-loading {
    width: 100%;
    height: 50px;
    position: relative;
    overflow: hidden;
}

.currency-conversion .element-loading::after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    animation-name: loading_animation;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    background: linear-gradient(to right, #ffffff00 0%, rgba(255, 255, 255, 0.1) 50%, #ffffff00 100%);
}

.currency-conversion .element-loading.fade-leave-active {
    transition: opacity 0.5s;
}

.currency-conversion .element-loading.fade-leave-to {
    opacity: 0;
}
</style>
