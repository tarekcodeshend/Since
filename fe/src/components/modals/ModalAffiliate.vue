<template>
    <div class="modal-affiliates">
        <div class="affiliates-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE
            </button>
        </div>
        <div class="affiliates-content">
            <div class="content-title">AFFILIATE STATS</div>
            <div class="content-code">
                <div class="code-inner">
                    <div class="inner-left-arrow"><img src="@/assets/img/arrow.b5e39a3d.webp" alt="arrow"></div>
                    <div class="inner-right-arrow"><img src="@/assets/img/arrow.b5e39a3d.webp" alt="arrow"></div>
                    <input v-model="affiliatesCode" type="text" placeholder="Set Affiliate Code..." />
                    <button v-on:click="affiliatesCodeButton" v-bind:disabled="socketSendLoading !== null"
                        class="button-save">
                        <transition name="fade" mode="out-in">
                            <ButtonLoading v-if="socketSendLoading === 'AffiliatesCode'" key="loading" />
                            <div v-else class="button-content" key="content">SAVE CODE</div>
                        </transition>
                    </button>
                </div>
            </div>
            <div class="content-link">
                <div class="link-inner"><span class="inner-value"> {{ host_url }}/?ref={{
                    affiliatesData.data !==
                        null && affiliatesData.data.code !== undefined ? affiliatesData.data.code : '' }}</span>
                    <button v-on:click="affiliatesCopyButton" class="button-copy">
                        <svg width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.3101 18.397H6.84717C5.69605 18.397 4.75977 17.4607 4.75977 16.3096V6.84668C4.75977 5.69556 5.69605 4.75928 6.84717 4.75928H16.3101C17.4612 4.75928 18.3975 5.69556 18.3975 6.84668V16.3096C18.3975 17.4607 17.4612 18.397 16.3101 18.397ZM6.84717 6.15088C6.4635 6.15088 6.15137 6.46301 6.15137 6.84668V16.3096C6.15137 16.6932 6.4635 17.0054 6.84717 17.0054H16.3101C16.6937 17.0054 17.0059 16.6932 17.0059 16.3096V6.84668C17.0059 6.46301 16.6937 6.15088 16.3101 6.15088H6.84717ZM3.36816 12.8306H2.67236C2.28869 12.8306 1.97656 12.5184 1.97656 12.1348V2.67188C1.97656 2.28821 2.28869 1.97607 2.67236 1.97607H12.1353C12.5189 1.97607 12.8311 2.28821 12.8311 2.67188V3.33289H14.2227V2.67188C14.2227 1.52076 13.2864 0.584473 12.1353 0.584473H2.67236C1.52125 0.584473 0.584961 1.52076 0.584961 2.67188V12.1348C0.584961 13.2859 1.52125 14.2222 2.67236 14.2222H3.36816V12.8306Z">
                            </path>
                        </svg> CLICK TO COPY
                    </button>
                </div>
            </div>
            <div class="content-stats">
                <div class="stats-element element-affiliates">
                    <div class="element-title">TOTAL AFFILIATES</div>
                    <div class="element-value">
                        <div class="value-content">
                            <img src="@/assets/img/user.d1946e31.webp" alt="user-icon">
                            <div v-if="affiliatesData.data !== null && affiliatesData.loading === false"
                                class="value-content">
                                <span>{{
                                    affiliatesData.data.referred }}</span>
                            </div>
                            <span v-else>0</span>
                        </div>
                    </div>
                </div>
                <div class="stats-element">
                    <div class="element-title">TOTAL WAGERED</div>
                    <div class="element-value">
                        <div class="value-content">
                            <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                            <div v-if="affiliatesData.data !== null && affiliatesData.loading === false"
                                class="content-amount">
                                <span>{{ affiliatesFormatValue(affiliatesData.data.earned /
                                    0.005).split('.')[0] }}</span>.{{ affiliatesFormatValue(affiliatesData.data.earned /
                                        0.005).split('.')[1] }}
                            </div>
                            <span v-else>0</span>
                        </div>
                    </div>
                </div>
                <div class="stats-element">
                    <div class="element-title">TOTAL EARNINGS</div>
                    <div class="element-value">
                        <div class="value-content">
                            <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                            <div v-if="affiliatesData.data !== null && affiliatesData.loading === false"
                                class="content-amount">
                                <span>{{ affiliatesFormatValue(affiliatesData.data.earned).split('.')[0] }}</span>.{{
                                    affiliatesFormatValue(affiliatesData.data.earned).split('.')[1] }}
                            </div>
                            <span v-else>0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-claim">
                <div class="claim-inner">
                    <div class="inner-coin"><img src="@/assets/img/coins.8ad8b473.png" alt="coin-icon"></div>
                    <div class="inner-text">Affiliate earnings are generated through the amount wagered from your
                        affiliated users.</div>
                    <div class="inner-info">
                        <div class="info-content">
                            <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                            <div v-if="affiliatesData.data !== null && affiliatesData.loading === false"
                                class="content-amount">
                                <span>{{ affiliatesFormatValue(affiliatesData.data.available).split('.')[0] }}</span>.{{
                                    affiliatesFormatValue(affiliatesData.data.available).split('.')[1] }}
                            </div>
                            <div v-else class="content-amount"><span>0</span>.00</div>
                        </div>
                        <button v-on:click="affiliatesClaimButton"
                            v-bind:disabled="socketSendLoading === 'AffiliatesClaimEarnings'" class="button-claim">
                            <div class="button-content">CLAIM</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';

export default {
    name: 'ModalAffiliate',
    components: {
        ButtonLoading
    },
    data() {
        return {
            affiliatesCode: '',
            host_url: process.env.VUE_APP_HOST_URL
        }
    },
    methods: {
        ...mapActions([,
            'modalsSetShow',
            'notificationShow',
            'affiliatesSendCodeSocket',
            'affiliatesSendClaimEarningsSocket',
            'affiliatesGetDataSocket'
        ]),
        affiliatesCopyButton() {
            const el = document.createElement('textarea');
            el.value = this.host_url + '/?a=' + (this.affiliatesData.data !== null && this.affiliatesData.data.code !== undefined ? this.affiliatesData.data.code : '');
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            this.notificationShow({ type: 'success', message: 'Copied to your clipboard.' });
        },
        affiliatesCodeButton() {
            if (this.affiliatesCode === null || this.affiliatesCode.trim() === '' || this.affiliatesCode.trim().length < 2) {
                this.notificationShow({ type: 'error', message: 'Your entered affiliate code is invalid.' });
                return;
            }

            const data = { code: this.affiliatesCode };
            this.affiliatesSendCodeSocket(data);
        },
        affiliatesFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        affiliatesClaimButton() {
            if (this.socketSendLoading !== null) { return; }

            if (this.affiliatesData.data === null || this.affiliatesData.data.available < 100) {
                this.notificationShow({ type: 'error', message: 'You’ll need a minimum of 0.1 Goonbux in earnings to claim.' });
                return;
            }

            const data = {};
            this.affiliatesSendClaimEarningsSocket(data);
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'affiliatesData'
        ])
    },
    watch: {
        'affiliatesData.data': {
            handler(data, oldData) {
                if (this.affiliatesData.data !== null) {
                    this.affiliatesCode = this.affiliatesData.data.code !== undefined ? this.affiliatesData.data.code : '';
                }
            },
            deep: true
        }
    },
    created() {
        if (this.affiliatesData.loading === false) {
            const data = {};
            this.affiliatesGetDataSocket(data);
        }
    }
}
</script>

<style scoped>
.modal-affiliates {
    width: 810px;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 25px 0;
    border-radius: 18px;
    background: #1D1826;
    border-top: 32px solid #1f1a2b;
    border-bottom: 32px solid #1f1a2b
}

.modal-affiliates .affiliates-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-affiliates .affiliates-close button {
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

.modal-affiliates .affiliates-close button:hover {
    color: #fff
}

.modal-affiliates .affiliates-close button svg {
    margin-right: 8px;
    fill: #CABFDD;
    transition: all .3s ease
}

.modal-affiliates .affiliates-close button:hover svg {
    fill: #fff
}

.modal-affiliates .affiliates-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-affiliates .content-title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 800;
    color: #323743
}

.modal-affiliates .content-code {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 18px;
    padding: 0 44px
}

.modal-affiliates .code-inner {
    width: 370px;
    position: relative
}

.modal-affiliates .inner-left-arrow {
    position: absolute;
    top: 50%;
    left: -174px;
    transform: translateY(-50%)
}

.modal-affiliates .inner-right-arrow {
    position: absolute;
    top: 50%;
    right: -174px;
    transform: translateY(-50%) rotate(180deg)
}

.modal-affiliates .code-inner input {
    width: 100%;
    height: 54px;
    padding: 0 126px 0 17px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #181420;
    border: 1px solid #1f1b29
}

.modal-affiliates .code-inner input:disabled {
    opacity: .5;
    cursor: not-allowed
}

.modal-affiliates .code-inner input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #515457
}

.modal-affiliates .code-inner input::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #515457
}

.modal-affiliates button.button-save {
    width: 112px;
    height: 41px;
    position: absolute;
    top: 50%;
    right: 7px;
    transform: translateY(-50%);
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #fd3b31;
    border-bottom: 2px solid #97302b
}

.modal-affiliates button.button-save:not([disabled]):hover {
    background: #fe524a
}

.modal-affiliates button.button-save .button-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

.modal-affiliates button.button-save .button-loading svg {
    font-size: 16px
}

.modal-affiliates button.button-save .button-loading.fade-leave-active {
    transition: opacity .5s
}

.modal-affiliates button.button-save .button-loading.fade-leave-to {
    opacity: 0
}

.modal-affiliates button.button-save .button-content.fade-enter-active {
    transition: opacity .5s
}

.modal-affiliates button.button-save .button-content.fade-enter-from {
    opacity: 0
}

.modal-affiliates .content-link {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 18px;
    padding: 0 44px
}

.modal-affiliates .link-inner {
    width: 564px;
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    border-radius: 8px;
    background: #2b2436
}

.modal-affiliates .link-inner span.inner-value {
    width: calc(100% - 153px);
    text-decoration: underline;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    font-weight: 700;
    color: #fff
}

.modal-affiliates button.button-copy {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 700;
    color: #CABFDD
}

.modal-affiliates button.button-copy:hover {
    color: #fff
}

.modal-affiliates button.button-copy svg {
    margin-right: 9px;
    fill: #CABFDD;
    transition: all .3s ease
}

.modal-affiliates button.button-copy:hover svg {
    fill: #fff
}

.modal-affiliates .content-stats {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    padding: 24px 44px 0 44px;
    border-top: 1px solid #262131
}

.modal-affiliates .stats-element {
    width: calc(33.33% - 16px);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 24px
}

.modal-affiliates .stats-element:last-of-type {
    margin-right: 0
}

.modal-affiliates .element-title {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: #CABFDD
}

.modal-affiliates .element-value {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    border-radius: 8px;
    background: #2b2436
}

.modal-affiliates .value-loading {
    display: flex
}

.modal-affiliates .value-content {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #fff
}

.modal-affiliates .value-content img {
    width: 17px;
    margin-right: 10px
}

.modal-affiliates .stats-element.element-affiliates .value-content img {
    width: 15px
}

.modal-affiliates .value-content .content-amount {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.modal-affiliates .value-content .content-amount span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.modal-affiliates .content-claim {
    width: 100%;
    margin-top: 38px;
    padding: 0 44px
}

.modal-affiliates .claim-inner {
    width: 100%;
    height: 68px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 7px 7px 78px;
    border-radius: 8px;
    background: #2b2436
}

.modal-affiliates .inner-coin {
    height: 68px;
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
}

.modal-affiliates .inner-coin img {
    width: 45px;
    height: 45px;
    margin-left: 13px;
    /* filter: drop-shadow(0 0 10px rgba(253, 59, 49, .5)) */
}

.modal-affiliates .inner-text {
    width: calc(100% - 257px);
    font-size: 12px;
    font-weight: 700;
    color: #fff
}

.modal-affiliates .inner-info {
    width: 250px;
    height: 100%;
    position: relative;
    padding: 0 91px 0 16px;
    border-radius: 8px;
    background: #211c2b
}

.modal-affiliates .info-loading {
    display: flex
}

.modal-affiliates .info-content {
    height: 100%;
    display: flex;
    align-items: center
}

.modal-affiliates .info-content img {
    width: 18px;
    margin-right: 10px
}

.modal-affiliates .info-content .content-amount {
    font-size: 12px;
    font-weight: 700;
    color: #dbba56
}

.modal-affiliates .info-content .content-amount span {
    font-size: 15px;
    font-weight: 700
}

.modal-affiliates .inner-info button.button-claim {
    width: 77px;
    height: 41px;
    position: absolute;
    top: 50%;
    right: 7px;
    transform: translateY(-50%);
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #D4AF3C;
    border-bottom: 2px solid #b69225
}

.modal-affiliates .inner-info button.button-claim:hover {
    background: #dbba56
}

.modal-affiliates .inner-info button.button-claim.button-loading {
    background: #D4AF3C;
    cursor: not-allowed
}

.modal-affiliates .inner-info button.button-claim .button-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

.modal-affiliates .inner-info button.button-claim .button-loading svg {
    font-size: 16px
}

.modal-affiliates .inner-info button.button-claim .button-loading.fade-leave-active {
    transition: opacity .5s
}

.modal-affiliates .inner-info button.button-claim .button-loading.fade-leave-to {
    opacity: 0
}

.modal-affiliates .inner-info button.button-claim .button-content.fade-enter-active {
    transition: opacity .5s
}

.modal-affiliates .inner-info button.button-claim .button-content.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 830px) {
    .modal-affiliates {
        width: 100%
    }
}

@media only screen and (max-width: 730px) {
    .modal-affiliates .code-inner {
        width: 100%
    }

    .modal-affiliates .inner-left-arrow,
    .modal-affiliates .inner-right-arrow {
        display: none
    }

    .modal-affiliates .link-inner {
        width: 100%
    }

    .modal-affiliates .content-stats {
        flex-wrap: wrap
    }

    .modal-affiliates .stats-element {
        width: calc(50% - 12px);
        margin-top: 12px;
        margin-right: 0
    }

    .modal-affiliates .stats-element:first-child {
        width: 100%;
        margin-top: 0
    }

    .modal-affiliates .stats-element:last-child {
        margin-left: 24px
    }

    .modal-affiliates .claim-inner {
        height: auto;
        flex-direction: column;
        align-items: flex-start;
        padding: 16px 7px 7px 7px
    }

    .modal-affiliates .inner-coin {
        display: none
    }

    .modal-affiliates .inner-text {
        width: 100%;
        display: flex;
        justify-content: center
    }

    .modal-affiliates .inner-info {
        width: 100%;
        height: 54px;
        margin-top: 12px
    }
}

@media only screen and (max-width: 650px) {

    .modal-affiliates .content-code,
    .modal-affiliates .content-link {
        padding: 0 20px
    }

    .modal-affiliates .link-inner span.inner-value {
        width: calc(100% - 37px)
    }

    .modal-affiliates .link-inner button.button-copy span {
        display: none
    }

    .modal-affiliates .link-inner button.button-copy svg {
        margin-right: 0
    }

    .modal-affiliates .content-stats {
        padding: 24px 20px 0 20px
    }

    .modal-affiliates .content-claim {
        padding: 0 20px
    }
}
</style>
