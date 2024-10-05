<template>
    <div class="cashier-crypto-element">
        <div class="element-section section-amount">
            <div class="section-title">AMOUNT</div>
            <div class="section-content">
                <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                <span>{{ cashierFormatValue(profileGetAmount).split('.')[0]
                    }}</span>.{{ cashierFormatValue(profileGetAmount).split('.')[1] }}
            </div>
        </div>
        <div class="element-section section-type">
            <div class="section-title">TYPE</div>
            <div class="section-content">
                {{ transaction.type }}
            </div>
        </div>
        <div class="element-section section-state" v-bind:class="['state-' + transaction.state]">
            <div class="section-title">STATE</div>
            <div class="section-content">
                {{ transaction.state }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CashierCryptoElement',
    props: [
        'transaction'
    ],
    methods: {
        ...mapActions([
            'cashierSendRobuxCancelSocket'
        ]),
        cashierFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'modalsShow',
            'modalsData',
            'generalUserInfo'
        ]),
        cashierGetState() {
            let state = this.transaction.state.charAt(0).toUpperCase() + this.transaction.state.slice(1);

            if (['created', 'pending'].includes(this.transaction.state) === true) { state = 'Active'; }

            return state;
        },
        profileGetAmount() {
            let amount = this.transaction.amount;

            return amount;
        }
    }
}
</script>

<style scoped>
.cashier-crypto-element {
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 11px;
    padding: 0 12px;
    border-radius: 5px;
    background: #100D14
}

.cashier-crypto-element:first-of-type {
    margin-top: 0
}

.cashier-crypto-element .element-section {
    display: flex;
    flex-direction: column;
}

.cashier-crypto-element .element-section.section-date,
.cashier-crypto-element .element-section.section-amount {}

.cashier-crypto-element .element-section.section-state {}

.cashier-crypto-element .element-section.section-action {
    align-items: flex-end;
}

.cashier-crypto-element .section-title {
    display: none;
    font-size: 13px;
    font-weight: 600;
    color: #8bacc8;
}

.cashier-crypto-element .section-content {
    display: flex;
    align-items: center;
}

.cashier-crypto-element .element-section.section-amount .section-content {
    font-size: 12px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.5);;
    max-width: 170px;
    overflow: hidden;
    white-space: nowrap;
}
.cashier-crypto-element .element-section.section-type .section-content {
    font-size: 12px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.8);
    max-width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-transform: capitalize;
}

.cashier-crypto-element .element-section.section-amount .section-content img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

.cashier-crypto-element .element-section.section-amount .section-content span {
    margin-right: 5px;
    color: #fff;
    font-size: 13px;
    margin-right: -1px;
}

.cashier-crypto-element .element-section.section-state .section-content {
    font-size: 13px;
    font-weight: 400;
    text-transform: capitalize;
}

.cashier-crypto-element .element-section.section-state.state-created .section-content,
.cashier-crypto-element .element-section.section-state.state-pending .section-content,
.cashier-crypto-element .element-section.section-state.state-completed .section-content {
    color: #00c74d;
}

.cashier-crypto-element .element-section.section-state.state-canceled .section-content,
.cashier-crypto-element .element-section.section-state.state-failed .section-content {
    color: #f55046;
}

.cashier-crypto-element .element-section.section-action .action-placeholder {
    width: 74px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #bbbfd0;
}

.cashier-crypto-element button.button-cancel {
    width: 60px;
    height: 25px;
}

.cashier-crypto-element button.button-cancel .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: 800;
    border-radius: 5px;
    background: #FF372F;
    color: #ffffff;
    text-shadow: 0px 3.833px 3.833px rgba(0, 0, 0, 0.23);
}

@media only screen and (max-width: 800px) {

    .cashier-crypto-element {
        height: auto;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px;
    }

    .cashier-crypto-element .element-section.section-date,
    .cashier-crypto-element .element-section.section-amount,
    .cashier-crypto-element .element-section.section-state,
    .cashier-crypto-element .element-section.section-type,
    .cashier-crypto-element .element-section.section-action {
        width: 100%;
        margin-top: 10px;
    }

    .cashier-crypto-element .element-section.section-date {
        margin-top: 0;
    }

    .cashier-crypto-element .element-section.section-action {
        align-items: flex-start;
    }

    .cashier-crypto-element .section-title {
        display: block;
    }

    .cashier-crypto-element .section-content {
        margin-top: 0px;
    }

    .cashier-crypto-element .element-section.section-action .action-placeholder {
        width: auto;
    }

}
</style>