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
                <div class="inner-barcode">
                    <transition name="fade" mode="out-in">
                        <div v-if="cashierCryptoData.loading === true" class="qrcode-loading" key="loading">
                        </div>
                        <div v-else class="qrcode-content" key="data">
                            <QRCode v-bind:value="cashierCryptoData.addresses[currency]"
                                v-bind:options="{ width: 140, height: 140, margin: 0 }" />
                        </div>
                    </transition>
                </div>
                <div class="inner-info">
                    <div class="info-title">Your {{ cashierGetName }} deposit address</div>
                    <transition name="fade" mode="out-in">
                        <div v-if="cashierCryptoData.loading === true" class="input-loading" key="loading"></div>
                        <div v-else class="info-address" key="data">
                            <div class="address-value">{{ cashierCryptoData.addresses[currency] }}</div>
                            <button class="button-copy" v-on:click="addressCopyButton()">COPY</button>
                        </div>
                    </transition>
                    <div v-if="currency === 'sol'" class="info-text">
                        Only transfer SOL to this wallet using the Solana network. You will
                        receive your funds after 30 confirmation(s). Minimum required deposit amount is 0.0001
                        SOL after fees. Depositing less than the minimum requirement amount will result in a
                        permanent loss.
                    </div>
                    <div v-else-if="currency === 'btc'" class="info-text">
                        Only transfer BTC to this wallet using the BTC network. You will
                        receive your funds after 2 confirmation(s). Minimum required deposit amount is 0.0003
                        BTC after fees. Depositing less than the minimum requirement amount will result in a
                        permanent loss.
                    </div>
                    <div v-else-if="currency === 'eth'" class="info-text">
                        Only transfer ETH to this wallet using the ERC20 network. You will receive your funds after 10
                        confirmation(s). Minimum required deposit amount is 0.0001 ETH after fees. Depositing less than
                        the minimum requirement amount will result in a permanent loss.
                    </div>
                    <div v-else-if="currency === 'ltc'" class="info-text">
                        Only transfer LTC to this wallet using the LTC network. You will receive your funds after 3
                        confirmation(s). Minimum required deposit amount is 0.0001 LTC after fees. Depositing less than
                        the minimum requirement amount will result in a permanent loss.
                    </div>
                    <div v-else-if="currency === 'doge'" class="info-text">
                        Only transfer DOGE to this wallet using the DOGE network. You will receive your funds after 12
                        confirmation(s). Minimum required deposit amount is 30 DOGE after fees. Depositing less than the
                        minimum requirement amount will result in a permanent loss.
                    </div>
                    <div v-else-if="currency === 'trx'" class="info-text">
                        Only transfer TRX to this wallet using the TRX network. You will receive your funds after 10
                        confirmation(s). Minimum required deposit amount is 20 TRX after fees. Depositing less than the
                        minimum requirement amount will result in a permanent loss.
                    </div>
                    <div v-else-if="currency === 'usdt'" class="info-text">
                        Only transfer USDT to this wallet using the ERC20 network. You will receive your funds after 15
                        confirmation(s). Minimum required deposit amount is 3.5 USDT after fees. Depositing less than
                        the minimum requirement amount will result in a permanent loss.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import QRCode from '@/components/QRCode';

export default {
    name: 'CashierCryptoDepositItem',
    components: {
        QRCode
    },
    props: ['currency', 'cryptoElement'],
    methods: {
        ...mapActions([
            'notificationShow',
            'cashierGetCryptoDataSocket'
        ]),
        setCryptoElement(value) {
            this.cryptoElement = (this.cryptoElement === value) ? null : value;
        },
        addressCopyButton() {
            const el = document.createElement('textarea');
            el.value = this.cashierCryptoData.addresses[this.currency];
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            this.notificationShow({ type: 'success', message: 'Copied to your clipboard.' });
        },
    },
    computed: {
        ...mapGetters([
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
            } else if (this.currency === 'usdt') {
                name = 'Tether';
            } else if (this.currency === 'trx') {
                name = 'TRX';                                  
            } else if (this.currency === 'usdt_erc20') {
                name = 'USDT (ERC20)';        
            } else if (this.currency === 'usdt_trc20') {
                name = 'USDT (TRC20)';
            }

            return name;
        },
    },
}
</script>

<style scoped>
.crypto-deposit-element {
    width: 100%
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
    height: 168px !important;
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
    width: 100%;
    display: flex;
    align-items: center;
    padding: 18px 0
}

.crypto-deposit-element .inner-barcode {
    width: 132px;
    height: 132px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #fff;
    padding: 7px;
}

.crypto-deposit-element .inner-barcode .qrcode-content {
    width: 100%;
    height: 100%;
}

.crypto-deposit-element .inner-barcode .qrcode-content canvas {
    width: 100% !important;
    height: 100% !important;
}

.crypto-deposit-element .inner-info {
    width: calc(100% - 132px);
    padding-left: 25px
}

.crypto-deposit-element .info-title {
    font-size: 14px;
    font-weight: 700;
    color: #767c8b
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
    font-size: 12px;
    font-weight: 700;
    color: #464b57
}

@media only screen and (max-width: 975px) {

    .crypto-deposit-element .element-accordion.slide-enter-to,
    .crypto-deposit-element .element-accordion.slide-leave {
        height: 304px
    }

    .crypto-deposit-element .accordion-inner {
        flex-direction: column
    }

    .crypto-deposit-element .inner-info {
        width: 100%;
        margin-top: 25px;
        padding-left: 0
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

.deposit-crypto .crypto-loading {
    width: 100%
}

.deposit-crypto .crypto-loading.fade-leave-active {
    transition: opacity .5s
}

.deposit-crypto .crypto-loading.fade-leave-to {
    opacity: 0
}

.deposit-crypto .loading-element {
    width: 100%;
    height: 66px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #212732
}

.deposit-crypto .element-image {
    width: 34px;
    height: 34px;
    position: relative;
    margin-right: 12px;
    border-radius: 50%;
    background: #212732;
    overflow: hidden
}

.deposit-crypto .element-name {
    width: 80px;
    height: 20px;
    position: relative;
    border-radius: 3px;
    background: #212732;
    overflow: hidden
}

.deposit-crypto .element-image:after,
.deposit-crypto .element-name:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    animation-name: loading_animation-f970d946;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, .1) 50%, hsla(0, 0%, 100%, 0))
}

@keyframes loading_animation-f970d946 {
    0% {
        transform: translateX(-100%)
    }

    50% {
        transform: translateX(100%)
    }

    to {
        transform: translateX(100%)
    }
}

.deposit-crypto .crypto-content {
    width: 100%
}

.deposit-crypto .crypto-content.fade-enter-active {
    transition: opacity .5s
}

.deposit-crypto .crypto-content.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 425px) {
    .deposit-crypto {
        height: calc(100% - 180px)
    }
}

@media only screen and (max-width: 650px) {
    .deposit-crypto .title-value {
        font-size: 15px;
    }

    .deposit-crypto .title-value span {
        font-size: 25px
    }

    .crypto-deposit-element .inner-barcode {
        display: none;
    }

    .crypto-deposit-element .info-title {
        display: none;
    }

    .crypto-deposit-element .inner-info {
        margin-top: 5px;  
    }
    .crypto-deposit-element .info-text {
        display: none;
    }
    .crypto-deposit-element .info-address button.button-copy {
        width: 100%;
        height: 40px;
        margin-top: 12px;
        margin-left: 0
    }

}

.inner-barcode .qrcode-loading {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.inner-barcode .qrcode-loading::after {
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
    background: linear-gradient(to right, #dddddd 0%, #aaaaaa 50%, #dddddd 100%);
}

.inner-barcode .qrcode-loading.fade-leave-active {
    transition: opacity 0.5s;
}

.inner-barcode .qrcode-loading.fade-leave-to {
    opacity: 0;
}

.inner-info .input-loading {
    width: 100%;
    height: 100%;
    min-height: 30px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    clip-path: polygon(13px 0, calc(100% - 13px) 0, 100% 25%, 100% 75%, calc(100% - 13px) 100%, 13px 100%, 0 75%, 0 25%);
}

.inner-info .input-loading::after {
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

.inner-info .input-loading.fade-leave-active {
    transition: opacity 0.5s;
}

.inner-info .input-loading.fade-leave-to {
    opacity: 0;
}
</style>
