<template>
    <div class="deposit-crypto">
        <div class="crypto-title">
            <div class="title-value">
                <span>CRYPTO</span>CURRENCY
            </div>
            <div class="title-bonus">$1 RATE PER 1 Goonbux</div>
        </div>
        <div class="crypto-content">
            <CashierCryptoWithdrawItem v-bind:currency="'sol'" v-bind:cryptoElement="cryptoElement" />
            <CashierCryptoWithdrawItem v-bind:currency="'btc'" v-bind:cryptoElement="cryptoElement" />
            <CashierCryptoWithdrawItem v-bind:currency="'eth'" v-bind:cryptoElement="cryptoElement" />
            <CashierCryptoWithdrawItem v-bind:currency="'ltc'" v-bind:cryptoElement="cryptoElement" />
            <CashierCryptoWithdrawItem v-bind:currency="'doge'" v-bind:cryptoElement="cryptoElement" />
            <CashierCryptoWithdrawItem v-bind:currency="'trx'" v-bind:cryptoElement="cryptoElement" />
            <CashierCryptoWithdrawItem v-bind:currency="'usdt_trc20'" v-bind:cryptoElement="cryptoElement" />
            <CashierCryptoWithdrawItem v-bind:currency="'usdt_erc20'" v-bind:cryptoElement="cryptoElement" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CashierCryptoWithdrawItem from '@/components/cashier/CashierCryptoWithdrawItem';

export default {
    name: 'DepositCypto',
    components: {
        CashierCryptoWithdrawItem
    },
    data() {
        return {
            cryptoElement: null,
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'cashierGetCryptoDataSocket'
        ]),
        setCryptoElement(value) {
            this.cryptoElement = (this.cryptoElement === value) ? null : value;
        },
    },
    computed: {
        ...mapGetters([
            'modalsShow',
            'modalsData',
            'cashierCryptoData'
        ]),
    },
    created() {
        if (this.cashierCryptoData.loading === false) {
            const data = {};
            this.cashierGetCryptoDataSocket(data);
        }
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
    color: #626c7e;
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
    background: #fff
}

.crypto-deposit-element .inner-barcode img {
    width: 87%;
    height: 87%;
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
    background: #D4AF3C
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

    .deposit-crypto .title-bonus {
        height: 26px;
        display: flex;
        align-items: center;
        margin-left: 12px;
        padding: 0 8px;
        border-radius: 5px;
        font-size: 11px;
        font-weight: 700;
        color: #fff;
        background: #D4AF3C
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
</style>