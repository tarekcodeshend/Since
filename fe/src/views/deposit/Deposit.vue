<template>
    <div class="deposit">
        <div class="deposit-nav">
            <router-link to="/deposit/crypto" @click.native="setCurrentTab('crypto')">
                <svg width="15" height="27" viewBox="0 0 15 27" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.51483 17.5912L0.117188 14.072L7.51483 27L14.9127 14.072L7.51483 17.5912Z"></path>
                    <path d="M14.1069 11.4495L7.51466 0L0.915039 11.4627L7.51466 8.33203L14.1069 11.4495Z"></path>
                    <path d="M1.4873 12.9482L7.51488 15.8033L13.5526 12.9435L7.51488 10.0886L1.4873 12.9482Z"></path>
                </svg>
                CRYPTO
            </router-link>
        </div>
        <div class="deposit-content">
            <transition name="slide-fade" mode="out-in">
                <router-view />
            </transition>
        </div>
        <div v-bind:class="{ 'deposit-sidebar': true, 'sidebar-open': sidebarToggle === true }">
            <div class="sidebar-toggle">
                <button v-on:click="setSidebarToggle(true)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
                        </path>
                    </svg>
                </button>
            </div>
            <div class="crypto-sidebar-transactions">
                <div class="transactions-header">
                    RECENT TRANSACTIONS
                    <button class="button-close" v-on:click="setSidebarToggle(false)">
                        <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M1.01041 1.71762C0.619883 2.10814 0.619884 2.74131 1.01041 3.13183L5.6066 7.72803L1.01041 12.3242C0.619883 12.7147 0.619883 13.3479 1.01041 13.7384L1.71751 14.4455C2.10804 14.8361 2.7412 14.8361 3.13173 14.4455L7.72792 9.84935L12.3241 14.4455C12.7146 14.8361 13.3478 14.8361 13.7383 14.4455L14.4454 13.7384C14.836 13.3479 14.836 12.7147 14.4454 12.3242L9.84924 7.72803L14.4454 3.13183C14.836 2.74131 14.836 2.10814 14.4454 1.71762L13.7383 1.01051C13.3478 0.619988 12.7146 0.619988 12.3241 1.01051L7.72792 5.60671L3.13173 1.01051C2.7412 0.619989 2.10804 0.619988 1.71751 1.01051L1.01041 1.71762Z">
                            </path>
                        </svg>
                    </button>
                </div>
                <CashierRobuxTransaction v-if="currentTab === 'robux'" :cashierType="'deposit'" />
                <CashierCryptoTransaction v-else-if="currentTab === 'crypto'" :cashierType="'deposit'" />
            </div>
        </div>
    </div>
</template>

<script>
import CashierRobuxTransaction from '@/components/cashier/CashierRobuxTransaction';
import CashierCryptoTransaction from '@/components/cashier/CashierCryptoTransaction';
import { mapGetters } from 'vuex';

export default {
    name: 'Deposit',
    components: {
        CashierRobuxTransaction, CashierCryptoTransaction
    },
    metaInfo: {
        title: 'Deposit - gooncasino'
    },
    data() {
        return {
            sidebarToggle: false,
            currentTab: 'crypto'
        }
    },
    methods: {
        setSidebarToggle(value) {
            this.sidebarToggle = value;
        },
        setCurrentTab(tab) {
            this.currentTab = tab;
        }
    },
    computed: {
        ...mapGetters([
            'generalSidebarMobile'
        ]),
    }
}
</script>

<style scoped>
.deposit {
    width: 100%;
    padding: 40px 415px 40px 40px;
    position: relative;
}

@media only screen and (min-width: 850px) {
    .deposit {
        min-height: calc(100vh - 112px);
    }
}

.deposit .deposit-nav {
    width: 100%;
    display: flex;
    align-items: center
}

.deposit .deposit-nav a {
    height: 41px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    padding: 0 16px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #767c8b;
    background: #212732;
    box-shadow: 0 2px 0 0 #191e27;
    transition: all .3s ease
}

.deposit .deposit-nav a:last-of-type {
    margin-right: 0
}

.deposit .deposit-nav a:hover {
    color: #fff
}

.deposit .deposit-nav a.link-creditcard {
    color: #00c74d;
    box-shadow: 0 0 0 1px #00732c
}

.deposit .deposit-nav a.router-link-exact-active {
    color: #D4AF3C;
    background: #252129;
    box-shadow: 0 0 0 1px #ac8a27
}

.deposit .deposit-nav a svg {
    margin-right: 10px;
    fill: #767c8b;
    transition: all .3s ease
}

.deposit .deposit-nav a img {
    margin-right: 10px;
    fill: #767c8b;
    width: 20px;
    transition: all .3s ease
}

.deposit .deposit-nav a.link-creditcard svg {
    fill: #00c74d
}

.deposit .deposit-nav a.router-link-exact-active svg {
    fill: #D4AF3C
}

.deposit .deposit-nav a .link-tag {
    height: 20px;
    display: flex;
    align-items: center;
    margin-left: 9px;
    padding: 0 6px;
    border-radius: 3px;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
    background: #00c74d;
    transition: background .3s ease
}

.deposit .deposit-nav a.router-link-exact-active .link-tag {
    background: #fd3b31
}

.deposit .deposit-content {
    width: 100%
}

.deposit .deposit-content .slide-fade-enter-active {
    transition: all .3s ease-out
}

.deposit .deposit-content .slide-fade-enter {
    opacity: 0
}

.deposit .deposit-sidebar {
    width: 360px;
    height: calc(100vh - 142px);
    position: fixed;
    top: 127px;
    right: 15px;
    border-radius: 18px;
    background: #1D1826;
    transition: all .3s ease;
    z-index: 5
}

.deposit .sidebar-toggle {
    position: absolute;
    display: none;
    left: -56px;
    bottom: 30px
}

.deposit .sidebar-toggle button {
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px 0 0 5px;
    background: #16121E;
}

.deposit .sidebar-toggle button svg {
    height: 20px;
    fill: #CABFDD;
    transition: fill .2s ease
}

.deposit .sidebar-toggle button:hover svg {
    fill: #fff
}

@media only screen and (max-width: 1850px) {
    .deposit {
        padding: 40px 390px 40px 15px
    }
}

@media only screen and (max-width: 1300px) {
    .deposit {
        padding: 40px 15px
    }

    .deposit .deposit-sidebar {
        width: 400px;
        height: calc(100% - 67px);
        position: fixed;
        top: 67px;
        right: -400px;
        border-radius: 0
    }

    .deposit .deposit-sidebar.sidebar-open {
        right: 0
    }

    .deposit .sidebar-toggle {
        display: block
    }

    .deposit .deposit-sidebar.sidebar-open .sidebar-toggle {
        display: none
    }
}

@media only screen and (max-width: 650px) {
    .deposit {
        padding: 10px 15px
    }

    .deposit .deposit-nav {
        flex-direction: column;
        align-items: flex-start
    }

    .deposit .deposit-nav a {
        width: 100%;
        justify-content: center;
        margin-top: 8px;
        margin-right: 0
    }

    .deposit .deposit-nav a:first-of-type {
        margin-top: 0
    }
}

@media only screen and (max-width: 400px) {
    .deposit .deposit-sidebar.sidebar-open {
        width: 100%
    }
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
    color: #CABFDD
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
    color: #CABFDD
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

@media only screen and (max-width: 640px) {
    .deposit .sidebar-toggle {
        left: -45px;
        bottom: 25px
    }

    .deposit .sidebar-toggle button {
        width: 46px;
        height: 46px;
    }

    .deposit .sidebar-toggle button svg {
        height: 15px;
        fill: #767c8b;
    }
}
</style>