<template>
    <div class="modal-redeem">
        <div class="redeem-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE
            </button>
        </div>
        <div class="redeem-content">
            <div class="content-title">REDEEM CODE</div>
            <div class="content-info"> 
                Use Code 
                <span class="info-code">"Goon"</span> if you don't have any.
                <!-- <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                <div class="info-amount"><span >10</span>.00 </div> -->
            </div>
            <div class="content-input">
                <input v-model="rewardsCode" type="text" placeholder="Enter code...">
            </div>
            <div class="content-button">
                <button class="button-redeem" v-on:click="rewardsClaimButton()">REDEEM CODE</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'ModalRedeem',
    data() {
        return {
            rewardsCode: null
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'modalsSetShow',
            'modalsSetData'
        ]),
        rewardsClaimButton() {
            if (this.rewardsCode === null || this.rewardsCode.trim() === '') {
                this.notificationShow({ type: 'error', message: 'Your entered code is invalid.' });
                return;
            }

            this.modalsSetData({ typeCaptcha: 'affiliatesClaim', data: { code: this.rewardsCode } });
            this.modalsSetShow('Captcha');
        }
    }
}
</script>

<style scoped>
.modal-redeem {
    width: 620px;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 25px 0 44px 0;
    border-radius: 18px;
    background: #1D1826;
    border-top: 32px solid #1f1a2b;
    border-bottom: 32px solid #1f1a2b
}

.modal-redeem .redeem-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-redeem .redeem-close button {
    height: 27px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    color: #CABFDD;
    background: #382F48
}

.modal-redeem .redeem-close button:hover {
    color: #fff
}

.modal-redeem .redeem-close button svg {
    margin-right: 8px;
    fill: #CABFDD;
    transition: all .3s ease
}

.modal-redeem .redeem-close button:hover svg {
    fill: #fff
}

.modal-redeem .redeem-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-redeem .content-title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 800;
    color: #323743
}

.modal-redeem .content-info {
    display: flex;
    align-items: center;
    margin-top: 7px;
    font-size: 14px;
    font-weight: 700;
    color: #fff
}

.modal-redeem .content-info span.info-code {
    margin: 0 5px;
    color: #fd3b31
}

.modal-redeem .content-info img {
    width: 17px;
    margin-left: 10px;
    margin-right: 4px
}

.modal-redeem .info-amount {
    font-size: 12px;
    font-weight: 700;
    color: #00c74d
}

.modal-redeem .info-amount span {
    font-size: 15px
}

.modal-redeem .content-input {
    width: 370px;
    position: relative;
    margin-top: 25px
}

.modal-redeem .content-input input {
    width: 100%;
    height: 54px;
    padding: 0 17px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #181420;
    border: 1px solid #1f1b29
}

.modal-redeem .content-input input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #515457
}

.modal-redeem .content-input input::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #515457
}

.modal-redeem .content-button {
    width: 370px;
    margin-top: 18px
}

.modal-redeem .content-button button.button-redeem {
    width: 100%;
    height: 55px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #D4AF3C;
    border-bottom: 2px solid #856917
}

.modal-redeem .content-button button.button-redeem:hover {
    background: #dbba56
}

@media only screen and (max-width: 650px) {
    .modal-redeem {
        width: 100%
    }
}

@media only screen and (max-width: 450px) {
    .modal-redeem .redeem-content {
        padding: 0 20px
    }

    .modal-redeem .content-button,
    .modal-redeem .content-input {
        width: 100%
    }
}
</style>
