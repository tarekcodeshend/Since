<template>
    <div class="modal-captcha">
        <div class="captcha-close">
            <button v-on:click="modalsSetShow(null)">
                <svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> 
                CLOSE 
            </button>
        </div>
        <div class="captcha-content">
            <div class="content-title">COMPLETE CAPTCHA</div>
            <div class="content-captcha">
                <VueHcaptcha ref="modalCaptcha" v-bind:sitekey="modalCaptchaKey" @verify="modalOnVerify"
                    @expired="modalOnExpire" @challengeExpired="modalOnExpire" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';

export default {
    name: 'ModalCaptcha',
    components: {
        VueHcaptcha
    },
    data() {
        return {
            modalCaptchaKey: process.env.VUE_APP_HCAPTCHA_KEY
        }
    },
    methods: {
        ...mapActions([
            'modalsSetShow',
            'authSendCredentialsLogin',
            'authSendCredentialsRegister',
            'authSendCredentialsRequest',
            'authSendCredentialsReset',
            'affiliatesSendClaimCodeSocket',
            'generalSendPromoClaimSocket',
            'cashierSendGiftRedeemSocket',
            'generalSendRainJoinSocket'
        ]),
        modalOnVerify(token, eKey) {
            const data = { ...this.modalsData.data, captcha: token };

            if (this.modalsData.typeCaptcha === 'credentialsLogin') {
                this.authSendCredentialsLogin(data);
            } else if (this.modalsData.typeCaptcha === 'credentialsRegister') {
                this.authSendCredentialsRegister(data);
            } else if (this.modalsData.typeCaptcha === 'credentialsRequest') {
                this.authSendCredentialsRequest(data);
            } else if (this.modalsData.typeCaptcha === 'credentialsReset') {
                this.authSendCredentialsReset(data);
            } else if (this.modalsData.typeCaptcha === 'affiliatesClaim') {
                this.affiliatesSendClaimCodeSocket(data);
            } else if (this.modalsData.typeCaptcha === 'promoClaim') {
                this.generalSendPromoClaimSocket(data);
            } else if (this.modalsData.typeCaptcha === 'giftRedeem') {
                this.cashierSendGiftRedeemSocket(data);
            } else if (this.modalsData.typeCaptcha === 'rainJoin') {
                this.generalSendRainJoinSocket(data);
            }

            this.modalsSetShow(null);
        },
        modalOnExpire() {
            this.modalsSetShow(null);
        }
    },
    computed: {
        ...mapGetters([
            'modalsData'
        ])
    },
    mounted() {
        this.$refs.modalCaptcha.reset();
    }
}
</script>

<style scoped>
.modal-captcha {
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

.modal-captcha .captcha-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-captcha .captcha-close button {
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

.modal-captcha .captcha-close button:hover {
    color: #fff
}

.modal-captcha .captcha-close button svg {
    margin-right: 8px;
    fill: #767c8b;
    transition: all .3s ease
}

.modal-captcha .captcha-close button:hover svg {
    fill: #fff
}

.modal-captcha .captcha-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-captcha .content-title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 800;
    color: #323743
}

.modal-captcha .content-captcha {
    width: 303px;
    height: 78px;
    margin-top: 25px;
    border-radius: 3px;
    background: #2B2339
}

@media only screen and (max-width: 650px) {
    .modal-captcha {
        width: 100%
    }
}

@media only screen and (max-width: 450px) {
    .modal-captcha .captcha-content {
        padding: 0 20px
    }
}
</style>
