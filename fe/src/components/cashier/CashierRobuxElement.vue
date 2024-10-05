<template>
    <div class="cashier-robux-element">
        <div class="element-section section-amount">
            <div class="section-title">AMOUNT</div>
            <div class="section-content">
                <img src="@/assets/img/coins.8ad8b473.png" alt="icon" />
                <span>{{ cashierFormatValue(offer.amountProcessed) }} /</span> {{ cashierFormatValue(offer.amount) }}            
            </div>
        </div>
        <div class="element-section section-state" v-bind:class="['state-' + offer.state]">
            <div class="section-title">STATE</div>
            <div class="section-content">
                {{ cashierGetState }}
            </div>
        </div>
        <div class="element-section section-action">
            <div class="section-title">ACTION</div>
            <div class="section-content">
                <div v-if="['canceled', 'failed', 'completed'].includes(offer.state) === true"
                    class="action-placeholder">-</div>
                <button v-else v-on:click="cashierCancelButton()" class="button-cancel"
                    v-bind:disabled="socketSendLoading !== null">
                    <div class="button-inner">CANCEL</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CashierRobuxElement',
    props: [
        'offer'
    ],
    methods: {
        ...mapActions([
            'cashierSendRobuxCancelSocket'
        ]),
        cashierFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        cashierCancelButton() {
            const data = { offerId: this.offer._id };
            this.cashierSendRobuxCancelSocket(data);
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'modalsShow',
            'modalsData',
            'generalUserInfo'
        ]),
        cashierGetState() {

            let state = this.offer.state.charAt(0).toUpperCase() + this.offer.state.slice(1);

            if (['created', 'pending'].includes(this.offer.state) === true) { state = 'Active'; }

            return state;
        }
    }
}
</script>

<style scoped>
.cashier-robux-element {
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

.cashier-robux-element:first-of-type {
    margin-top: 0
}

.cashier-robux-element .element-section {
    display: flex;
    flex-direction: column;
}

.cashier-robux-element .element-section.section-date,
.cashier-robux-element .element-section.section-amount {
}

.cashier-robux-element .element-section.section-state {
}

.cashier-robux-element .element-section.section-action {
    align-items: flex-end;
}

.cashier-robux-element .section-title {
    display: none;
    font-size: 13px;
    font-weight: 600;
    color: #8bacc8;
}

.cashier-robux-element .section-content {
    display: flex;
    align-items: center;
}

.cashier-robux-element .element-section.section-amount .section-content {
    font-size: 12px;
    font-weight: 800;
    color: #ffffff;
    max-width: 170px;
    overflow: hidden;
    white-space: nowrap;
}

.cashier-robux-element .element-section.section-amount .section-content img {
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

.cashier-robux-element .element-section.section-amount .section-content span {
    margin-right: 5px;
    color: rgba(255, 255, 255, 0.5);
}

.cashier-robux-element .element-section.section-state .section-content {
    font-size: 14px;
    font-weight: 400;
}

.cashier-robux-element .element-section.section-state.state-created .section-content,
.cashier-robux-element .element-section.section-state.state-pending .section-content,
.cashier-robux-element .element-section.section-state.state-completed .section-content {
    color: #00c74d;
}

.cashier-robux-element .element-section.section-state.state-canceled .section-content,
.cashier-robux-element .element-section.section-state.state-failed .section-content {
    color: #f55046;
}

.cashier-robux-element .element-section.section-action .action-placeholder {
    width: 74px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #bbbfd0;
}

.cashier-robux-element button.button-cancel {
    width: 60px;
    height: 25px;
}

.cashier-robux-element button.button-cancel .button-inner {
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

    .cashier-robux-element {
        height: auto;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px;
    }

    .cashier-robux-element .element-section.section-date,
    .cashier-robux-element .element-section.section-amount,
    .cashier-robux-element .element-section.section-state,
    .cashier-robux-element .element-section.section-action {
        width: 100%;
        margin-top: 10px;
    }

    .cashier-robux-element .element-section.section-date {
        margin-top: 0;
    }

    .cashier-robux-element .element-section.section-action {
        align-items: flex-start;
    }

    .cashier-robux-element .section-title {
        display: block;
    }

    .cashier-robux-element .section-content {
        margin-top: 5px;
    }

    .cashier-robux-element .element-section.section-action .action-placeholder {
        width: auto;
    }

}
</style>