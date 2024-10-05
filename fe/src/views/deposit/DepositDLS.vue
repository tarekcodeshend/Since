<template>
    <div class="deposit-robux">
        <div class="robux-title">
            <div class="title-value">
                <span>DIAMOND</span>LOCKS
            </div>
        </div>
        <div class="robux-sub-title">
            <img src="@/assets/img/coins.8ad8b473.png" alt="robux" />
            <span>DIAMOND LOCKS</span>
        </div>
        <div class="robux-withdraw-amount-title">GrowID</div>
        <div class="robux-amount">
            <input v-model="modalAmount" v-on:input="modalValidateInput()" type="text"
                placeholder="Fill in your GrowID carefully." />
            <button v-on:click="modalActionButton()" class="button-action" v-bind:disabled="socketSendLoading !== null">
                <div class="button-inner">
                    <transition name="fade" mode="out-in">
                        <ButtonLoading
                            v-if="socketSendLoading === 'RobuxDeposit' || socketSendLoading === 'RobuxWithdraw'" />
                        <div v-else class="inner-content">
                            DEPOSIT
                        </div>
                    </transition>
                </div>
            </button>
        </div>
        <div class="robux-info">
            <div class="info-deposit">
                Using gooncasino for saving (storing in order to avoid bans) or reselling DLs is strictly prohibited. Doing so will result in your balance getting removed without any warnings.
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';
import LoadingAnimation from '@/components/LoadingAnimation';
import IconLeftGradient from '@/components/icons/IconLeftGradient';
import IconRightGradient from '@/components/icons/IconRightGradient';

export default {
    name: 'DepositDLS',
    components: {
        ButtonLoading,
        LoadingAnimation,
        IconLeftGradient,
        IconRightGradient,
        // CashierRobuxElement
    },
    data() {
        return {
            modalAmount: null
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'cashierGetRobuxDataSocket',
            'cashierSendRobuxDepositSocket',
        ]),
        modalValidateInput() {
            this.modalAmount = this.modalAmount ; //this.modalAmount.replace(/[^0-9]/g, '');
        },
        modalActionButton() {
            const amount = Math.floor(this.modalAmount * 1000);

            if (amount === null || isNaN(amount) === true || amount <= 0) {
                this.notificationShow({ type: 'error', message: 'Your entered deposit amount is invalid.' });
                return;
            }

            const data = { amount: amount };
            this.cashierSendRobuxDepositSocket(data);
            this.modalAmount = null;
        },
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'cashierRobuxData'
        ]),
        modalGetAmount() {
            let amount = Math.floor(this.modalAmount * 100) / 100;

            if (amount === null || isNaN(amount) === true) {
                amount = 0;
            }

            return amount;
        }
    },
    created() {
        if (this.cashierRobuxData.loading === false) {
            const data = { page: this.cashierRobuxData.page, type: 'deposit' };
            this.cashierGetRobuxDataSocket(data);
        }
    }
}
</script>

<style scoped>
.deposit-robux {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 35px;
    /* padding: 35px 50px 35px 50px; */
    border-radius: 15px;
}

.deposit-robux .robux-title {
    display: flex;
    align-items: center
}

.deposit-robux .title-value {
    font-size: 20px;
    font-weight: 800;
    color: #323743
}

.deposit-robux .title-value span {
    font-size: 26px
}

.deposit-robux .robux-sub-title {
    display: flex;
    align-items: center;
    margin-top: 20px;
}

.deposit-robux .robux-sub-title img {
    width: 25px;
    height: 25px;
}

.deposit-robux .robux-sub-title span {
    color: #626C7E;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 10px;
}

/*  */
.deposit-robux .robux-amount {
    display: flex;
    align-items: center;
    margin-top: 9px;
    position: relative;
}

.deposit-robux .robux-amount input {
    width: 570px;
    height: 54px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    padding: 0 15px;
    border-radius: 5px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #181B23;
}

.deposit-robux .robux-amount input::-moz-placeholder {
    color: #323742;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.deposit-robux .robux-amount input::placeholder {
    color: #323742;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.deposit-robux .robux-amount img {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translate(0, -50%);
}

.deposit-robux .robux-info {
    width: 630px;
    margin-top: 17px;
}

.deposit-robux .info-deposit,
.deposit-robux .info-withdraw {
    width: 100%;
    color: #66686B;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.deposit-robux button.button-action {
    height: 40px;
    margin-left: 20px;
}

.deposit-robux button.button-action .button-inner {
    width: 100%;
    min-width: 175px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    border-radius: 6.058px;
    background: #00C74D;
    box-shadow: 0px 1.264px 0px 0px #1E5634, 0px 5.442px 20.923px 0px rgba(0, 0, 0, 0.12);

    color: #FFF;
    text-shadow: 0px 2.423px 2.423px rgba(0, 0, 0, 0.23);
    font-family: Poppins;
    font-size: 9px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.309px;
    text-transform: uppercase;
}

.deposit-robux button.button-action .button-loading.fade-enter-active {
    transition: opacity 0.5s;
}

.deposit-robux button.button-action .button-loading.fade-enter-from {
    opacity: 0;
}

.deposit-robux button.button-action .inner-content {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
}

.deposit-robux button.button-action .content-amount {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
    margin-left: 8px;
    font-weight: 700;
}

.deposit-robux button.button-action .content-amount img {
    width: 16px;
    height: 16px;
    margin-right: 7px;
}

.deposit-robux .robux-offers {
    width: 100%;
    margin-top: 35px;
    padding-top: 25px;
    border-top: 1px solid rgba(24, 72, 109, 0.5);
}

.deposit-robux .offers-header {
    width: 100%;
    display: flex;
    padding: 0 20px;
}

.deposit-robux .header-date,
.deposit-robux .header-amount,
.deposit-robux .header-state,
.deposit-robux .header-action {
    font-size: 14px;
    font-weight: 700;
    color: #5f6779;
}

.deposit-robux .header-date,
.deposit-robux .header-amount {
    width: 30%;
}

.deposit-robux .header-state {
    width: 15%;
}

.deposit-robux .header-action {
    width: 25%;
    display: flex;
    justify-content: flex-end;
}

.deposit-robux .offers-content {
    width: 100%;
    margin-top: 25px;
}

.deposit-robux .content-loading {
    width: 100%;
    height: 235px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.deposit-robux .content-loading.fade-leave-active {
    transition: opacity 0.5s;
}

.deposit-robux .content-loading.fade-leave-to {
    opacity: 0;
}

.deposit-robux .content-list {
    width: 100%;
}

.deposit-robux .content-empty {
    width: 100%;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: #5f6779;
}

.deposit-robux .content-list.fade-enter-active,
.deposit-robux .content-empty.fade-enter-active {
    transition: opacity 0.5s;
}

.deposit-robux .content-list.fade-enter-from,
.deposit-robux .content-empty.fade-enter-from {
    opacity: 0;
}

.deposit-robux .offers-pagination {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(24, 72, 109, 0.5);
}

.deposit-robux .offers-pagination button {
    width: 52px;
    height: 37px;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    padding: 0 16px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 700;
    color: #767c8b;
    background: #212732;
    border-bottom: 2px solid #191e27
}

.deposit-robux .offers-pagination button:disabled {
    cursor: not-allowed;
}

.deposit-robux .offers-pagination button .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.deposit-robux .offers-pagination button.button-prev .button-inner svg {
    fill: url(#icon-left-gradient-1);
}

.deposit-robux .offers-pagination button.button-next .button-inner svg {
    fill: url(#icon-right-gradient-1);
}

.deposit-robux .offers-pagination button:disabled .button-inner svg {
    fill: #767c8b;
}

.deposit-robux .pagination-info {
    font-size: 12px;
    font-weight: 800;
    color: #767c8b;
}

@media only screen and (max-width: 800px) {
    .deposit-robux .robux-amount {
        flex-direction: column;
        ;
        gap: 20px;
    }

    .deposit-robux .robux-amount input {
        width: 100%;
        height: 42px;
        padding: 0 20px 0 20px;
    }

    .deposit-robux .robux-amount,
    .deposit-robux .robux-info {
        width: 100%;
    }

    .deposit-robux .offers-header {
        display: none;
    }

    .deposit-robux .offers-content {
        margin-top: 0;
    }

    .deposit-robux button.button-action {
        height: 40px;
        width: 100%;
        margin-left: 0px;
    }

}

.robux-withdraw-amount-title {
    margin-top: 30px;
    color: #FFF;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
</style>
