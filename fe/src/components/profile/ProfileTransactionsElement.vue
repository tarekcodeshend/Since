<template>
    <div class="profile-transactions-element">
        <div class="element-section section-type">
            <div class="section-title">TYPE</div>
            <div class="section-content"> {{ profileGetType }} </div>
        </div>
        <div class="element-section section-amount">
            <div class="section-title">AMOUNT</div>
            <div class="section-content"><img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                <div class="amount-value" v-bind:class="{ 'value-positive': profileGetAmount > 0 }">
                    <span>{{ profileFormatValue(profileGetAmount).split('.')[0] }}</span>.{{ profileFormatValue(profileGetAmount).split('.')[1] }}
                </div>
            </div>
        </div>
        <div class="element-section section-date">
            <div class="section-title">DATE</div>
            <div class="section-content"> {{ new Date(transaction.createdAt).toLocaleString('en-US', {
                hour12: true,
                year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit' }) }} </div>
        </div>
        <div v-if="transaction.method === 'crypto'" class="element-section section-transaction">
            <div class="section-title">TRANSACTION</div>
            <div class="section-content">
                <div class="content-crypto">
                    <a :href="`https://blockchair.com/de/${getNetwork()}/transaction/${transaction.data.transaction}`"
                        target="_blank"
                        class="link-explorer">{{ transaction.data.transaction }}</a>
                </div>
            </div>
        </div>
        <div v-else class="element-section section-transaction">
            <div class="section-title">METHOD</div>
            <div class="section-content">
                <div class="content-crypto">
                    {{ profileGetMethod }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ProfileTransactionsElement',
    props: [
        'transaction'
    ],
    methods: {
        profileFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        getNetwork () {
            let network = "";
            network = this.transaction.data.currency;
            if(network === 'eth' || network === 'usdc_erc20' || network === 'usdt_erc20' || network === 'usdt') network = 'ethereum';
            else if(network === 'btc') network = 'bitcoin';
            else if(network === 'ltc') network = 'litecoin';
            else if(network === 'doge') network = 'dogecoin';
            else if(network === 'sol') network = 'solana';
            else if(network === 'trx' || network ==='usdt_trc20') network = 'tron';
            return network;
        }
    },
    computed: {
        ...mapGetters([
            'authUser'
        ]),
        profileGetMethod() {
            let method = this.transaction.method.charAt(0).toUpperCase() + this.transaction.method.slice(1);

            if (this.transaction.method === 'tip') { method = this.authUser.user._id === this.transaction.sender.user ? 'Tip Sent' : 'Tip Received'; }
            else if (this.transaction.type === 'affiliateCodeClaim') { method = 'Affiliate Code'; }
            else if (this.transaction.type === 'affiliateEarningClaim') { method = 'Affiliate Earnings'; }
            else if (this.transaction.type === 'promoCodeClaim') { method = 'Promo Code'; }
            else if (this.transaction.type === 'rakebackClaim') { method = 'Rakeback Earnings'; }
            else if (this.transaction.type === 'rainCreate') { method = 'Rain Host'; }
            else if (this.transaction.type === 'rainTip') { method = 'Rain Tip'; }
            else if (this.transaction.type === 'rainPayout') { method = 'Rain Payout'; }
            else if (this.transaction.type === 'adminAdjust') { method = 'Admin Adjustment'; }

            return method;
        },
        profileGetType() {
            let type = null;

            if (this.transaction.method === 'robux' || this.transaction.method === 'limited') { type = this.authUser.user._id === this.transaction.deposit.user ? 'Deposit' : 'Withdraw'; }
            else if (this.transaction.method === 'balance' || this.transaction.method === 'tip') { type = 'Currency'; }
            else { type = this.transaction.type.charAt(0).toUpperCase() + this.transaction.type.slice(1) }

            return type;
        },
        profileGetAmount() {
            let amount = this.transaction.amount;

            if (this.transaction.method === 'tip' && this.authUser.user._id === this.transaction.sender.user) { amount = -this.transaction.amount; }

            return amount;
        }
    }
}
</script>

<style scoped>
.profile-transactions-element {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px
}

.profile-transactions-element:nth-child(odd) {
    border-radius: 8px;
    background: #1e1927 !important
}

.profile-element-element .element-section {
    display: flex;
    flex-direction: column
}

.profile-transactions-element .element-section.section-date,
.profile-transactions-element .element-section.section-type {
    width: 25%
}

.profile-transactions-element .element-section.section-amount {
    width: 15%
}

.profile-transactions-element .element-section.section-transaction {
    width: 35%
}

.profile-transactions-element .section-title {
    display: none;
    font-size: 12px;
    font-weight: 700;
    color: #767c8b
}

.profile-transactions-element .section-content {
    display: flex;
    align-items: center
}

.profile-transactions-element .element-section.section-date .section-content,
.profile-transactions-element .element-section.section-type .section-content {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.profile-transactions-element .element-section.section-amount .section-content img {
    width: 17px;
    margin-right: 10px
}

.profile-transactions-element .amount-value {
    font-size: 12px;
    font-weight: 700;
    color: #00c74d
}

.profile-transactions-element .amount-value span {
    font-size: 15px;
    font-weight: 700
}

.profile-transactions-element .content-steam {
    display: flex;
    align-items: center
}

.profile-transactions-element .content-steam img {
    width: 30px;
    margin-right: 5px
}

.profile-transactions-element .content-steam img:last-of-type {
    margin-right: 0
}

.profile-transactions-element .content-steam span {
    margin-left: 5px;
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.profile-transactions-element .content-crypto {
    width: 100%;
    display: flex;
    align-items: center;
    color: #bbb
}

.profile-transactions-element a.link-explorer {
    display: block;
    font-size: 15px;
    font-weight: 700;
    color: #fd3b31;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

@media only screen and (max-width: 1300px) {
    .profile-transactions-element {
        height: auto;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px
    }

    .profile-transactions-element .element-section {
        width: 100% !important;
        margin-top: 10px
    }

    .profile-transactions-element .element-section.section-type {
        margin-top: 0
    }

    .profile-transactions-element .element-section.section-actions {
        align-items: flex-start
    }

    .profile-transactions-element .section-title {
        display: block
    }

    .profile-transactions-element .section-content {
        margin-top: 5px
    }
}
</style>
