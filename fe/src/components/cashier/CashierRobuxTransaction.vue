<template>
    <div class="transactions-content">
        <transition name="fade" mode="out-in">
            <div v-if="cashierRobuxData.offers === null || cashierRobuxData.loading === true" class="content-loading"
                key="loading">
                <LoadingAnimation />
            </div>
            <div v-else-if="cashierRobuxData.offers.length > 0" class="content-data" key="data">

                <CashierRobuxElement v-for="offer in cashierRobuxData.offers" v-bind:key="offer._id"
                    v-bind:offer="offer" />

            </div>
        </transition>
    </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';
import LoadingAnimation from '@/components/LoadingAnimation';
import CashierRobuxElement from '@/components/cashier/CashierRobuxElement';

export default {
    name: 'CashierRobuxTransaction',
    components: {
        ButtonLoading, LoadingAnimation, CashierRobuxElement
    },
    props: ['cashierType'],
    methods: {
        ...mapActions([
            'notificationShow',
            'cashierGetRobuxDataSocket',
            'cashierSendRobuxDepositSocket',
            'cashierSendRobuxWithdrawSocket'
        ]),
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'cashierRobuxData'
        ]),
    },
    created() {
        if (this.cashierRobuxData.loading === false) {
            const data = { page: this.cashierRobuxData.page, type: this.cashierType };
            this.cashierGetRobuxDataSocket(data);
        }
    }
}
</script>

<style scoped>
.crypto-sidebar-transactions .transactions-content {
    width: 100%;
    margin-top: 16px
}

.crypto-sidebar-transactions .content-loading {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
}

.crypto-sidebar-transactions .content-loading.fade-leave-active {
    transition: opacity .5s
}

.crypto-sidebar-transactions .content-loading.fade-leave-to {
    opacity: 0
}

.crypto-sidebar-transactions .loading-element {
    width: 100%;
    height: 41px;
    position: relative;
    margin-top: 11px;
    border-radius: 5px;
    background: #212732;
    overflow: hidden
}

.crypto-sidebar-transactions .loading-element:first-of-type {
    margin-top: 0
}

.crypto-sidebar-transactions .loading-element:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    animation-name: loading_animation-372f420f;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, .1) 50%, hsla(0, 0%, 100%, 0))
}

@keyframes loading_animation-372f420f {
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

.crypto-sidebar-transactions .content-data {
    width: 100%
}

.crypto-sidebar-transactions .content-data.fade-enter-active {
    transition: opacity .5s
}

.crypto-sidebar-transactions .content-data.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 1300px) {
    .crypto-sidebar-transactions .transactions-header {
        justify-content: space-between
    }

    .crypto-sidebar-transactions button.button-close {
        display: flex;
        align-items: center
    }
}

.crypto-transaction-element {
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 11px;
    padding: 0 12px;
    border-radius: 5px;
    background: #212732
}

.crypto-transaction-element:first-of-type {
    margin-top: 0
}

.crypto-transaction-element .element-amount {
    display: flex;
    align-items: center
}

.crypto-transaction-element .element-amount img {
    width: 21px;
    margin-right: 10px
}

.crypto-transaction-element .amount-value {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.crypto-transaction-element .amount-value span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.crypto-transaction-element .element-state {
    font-size: 14px;
    font-weight: 700
}

.crypto-transaction-element .element-state.state-pending {
    color: #ffc93d
}

.crypto-transaction-element .element-state.state-completed {
    color: #00c74d
}

.crypto-sidebar-transactions {
    width: 100%;
    height: 100%;
    padding: 18px
}

.crypto-sidebar-transactions .transactions-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 600;
    color: #626c7e
}

.crypto-sidebar-transactions button.button-close {
    width: 15px;
    height: 15px;
    display: none;
    margin: 0;
    padding: 0
}

.crypto-sidebar-transactions button.button-close svg {
    fill: #626c7e;
    transition: all .3s ease
}

.crypto-sidebar-transactions button.button-close:hover svg {
    fill: #fff
}

.crypto-sidebar-transactions .transactions-content {
    width: 100%;
    margin-top: 16px
}

.crypto-sidebar-transactions .content-loading {
    width: 100%
}

.crypto-sidebar-transactions .content-loading.fade-leave-active {
    transition: opacity .5s
}

.crypto-sidebar-transactions .content-loading.fade-leave-to {
    opacity: 0
}

.crypto-sidebar-transactions .loading-element {
    width: 100%;
    height: 41px;
    position: relative;
    margin-top: 11px;
    border-radius: 5px;
    background: #212732;
    overflow: hidden
}

.crypto-sidebar-transactions .loading-element:first-of-type {
    margin-top: 0
}

.crypto-sidebar-transactions .loading-element:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    animation-name: loading_animation-372f420f;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, .1) 50%, hsla(0, 0%, 100%, 0))
}

@keyframes loading_animation-372f420f {
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

.crypto-sidebar-transactions .content-data {
    width: 100%
}

.crypto-sidebar-transactions .content-data.fade-enter-active {
    transition: opacity .5s
}

.crypto-sidebar-transactions .content-data.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 1300px) {
    .crypto-sidebar-transactions .transactions-header {
        justify-content: space-between
    }

    .crypto-sidebar-transactions button.button-close {
        display: flex;
        align-items: center
    }
}

.gift-transaction-element {
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 11px;
    padding: 0 12px;
    border-radius: 5px;
    background: #212732
}

.gift-transaction-element:first-of-type {
    margin-top: 0
}

.gift-transaction-element .element-amount {
    display: flex;
    align-items: center
}

.gift-transaction-element .element-amount img {
    width: 21px;
    margin-right: 10px
}

.gift-transaction-element .amount-value {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.gift-transaction-element .amount-value span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.gift-transaction-element .element-state {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700
}

.gift-transaction-element .element-state.state-completed {
    color: #00c74d
}

.gift-sidebar-transactions {
    width: 100%;
    height: 100%;
    padding: 18px
}

.gift-sidebar-transactions .transactions-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 600;
    color: #626c7e
}

.gift-sidebar-transactions button.button-close {
    width: 15px;
    height: 15px;
    display: none;
    margin: 0;
    padding: 0
}

.gift-sidebar-transactions button.button-close svg {
    fill: #626c7e;
    transition: all .3s ease
}

.gift-sidebar-transactions button.button-close:hover svg {
    fill: #fff
}

.gift-sidebar-transactions .transactions-content {
    width: 100%;
    margin-top: 16px
}

.gift-sidebar-transactions .content-loading {
    width: 100%
}

.gift-sidebar-transactions .content-loading.fade-leave-active {
    transition: opacity .5s
}

.gift-sidebar-transactions .content-loading.fade-leave-to {
    opacity: 0
}

.gift-sidebar-transactions .loading-element {
    width: 100%;
    height: 41px;
    position: relative;
    margin-top: 11px;
    border-radius: 5px;
    background: #212732;
    overflow: hidden
}

.gift-sidebar-transactions .loading-element:first-of-type {
    margin-top: 0
}

.gift-sidebar-transactions .loading-element:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    animation-name: loading_animation-4bcd11f5;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, .1) 50%, hsla(0, 0%, 100%, 0))
}

@keyframes loading_animation-4bcd11f5 {
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

.gift-sidebar-transactions .content-data {
    width: 100%
}

.gift-sidebar-transactions .content-data.fade-enter-active {
    transition: opacity .5s
}

.gift-sidebar-transactions .content-data.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 1300px) {
    .gift-sidebar-transactions .transactions-header {
        justify-content: space-between
    }

    .gift-sidebar-transactions button.button-close {
        display: flex;
        align-items: center
    }
}
</style>