<template>
    <div class="modal-tip">
        <div class="tip-close">
            <button v-on:click="modalsSetShow(null)">
                <svg width="11" height="11" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE
            </button>
        </div>
        <div class="tip-content">
            <div class="content-title">SEND TIP</div>
            <div class="content-info">
                <div class="info-user">You are about to tip
                    <span v-html="generalUserInfo.data.username" class="info-username username-user"></span>!
                </div> Please note that all tipped
                balance must be wagered before it is withdrawn.
            </div>
            <div class="content-input">
                <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image" class="input-icon">
                <input v-model="modalAmount" v-on:input="modalValidateInput" type="text">
                <transition name="fade" mode="out-in">
                    <div v-if="generalUserInfo.data === null || generalUserInfo.loading === true"
                        class="avatar-loading"></div>
                    <AvatarImage v-else v-bind:image="generalUserInfo.data.avatar" />
                </transition>
            </div>
            <div class="content-button">
                <button v-on:click="modalTipButton" class="button-tip" v-bind:disabled="socketSendLoading !== null">
                    <div class="button-content">SEND TIP</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AvatarImage from '@/components/AvatarImage';
import BoxLevel from '@/components/BoxLevel';
import BoxRank from '@/components/BoxRank';
import ButtonLoading from '@/components/ButtonLoading';

export default {
    name: 'ModalTip',
    components: {
        AvatarImage,
        BoxLevel,
        BoxRank,
        ButtonLoading
    },
    data() {
        return {
            modalAmount: 0.00
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'userSendUserTipSocket',
            'modalsSetShow',
        ]),
        modalValidateInput() {
            this.modalAmount = this.modalAmount.replace(/[^\d.]/g, '');
        },
        modalTipButton() {
            const amount = Math.floor(this.modalAmount * 1000);

            if (amount === undefined || isNaN(amount) === true || amount < 10) {
                this.notificationShow({ type: 'error', message: 'Your entered tip amount is invalid.' });
                return;
            }

            const data = { receiverId: this.generalUserInfo.data._id, amount: amount };
            this.userSendUserTipSocket(data);
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'modalsData',
            'generalUserInfo'
        ]),
        modalGetLevelColor() {
            let color = '';

            if (this.generalUserInfo.data.level >= 2 && this.generalUserInfo.data.level < 26) { color = 'blue'; }
            else if (this.generalUserInfo.data.level >= 26 && this.generalUserInfo.data.level < 51) { color = 'green'; }
            else if (this.generalUserInfo.data.level >= 51 && this.generalUserInfo.data.level < 76) { color = 'orange'; }
            else if (this.generalUserInfo.data.level >= 76 && this.generalUserInfo.data.level < 100) { color = 'red'; }
            else if (this.generalUserInfo.data.level >= 100) { color = 'purple'; }

            return color;
        },
        modalGetRank() {
            let rank = null;

            if (this.generalUserInfo.data.rank !== 'user') { rank = this.generalUserInfo.data.rank; }

            return rank;
        },
        modalGetDate() {
            const date = new Date(this.generalUserInfo.data.createdAt);
            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        }
    }
}
</script>

<style scoped>
.modal-tip {
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

.modal-tip .tip-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-tip .tip-close button {
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

.modal-tip .tip-close button:hover {
    color: #fff
}

.modal-tip .tip-close button svg {
    margin-right: 8px;
    fill: #CABFDD;
    transition: all .3s ease
}

.modal-tip .tip-close button:hover svg {
    fill: #fff
}

.modal-tip .tip-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-tip .content-title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 800;
    color: #323743
}

.modal-tip .content-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7px;
    font-size: 12px;
    font-weight: 700;
    color: #aba2b9
}

.modal-tip .info-user {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #fff
}

.modal-tip .info-user span.info-username {
    margin-left: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #bbb
}

.modal-tip .info-user span.info-username.username-mod {
    color: #00c74d
}

.modal-tip .info-user span.info-username.username-admin {
    color: #fd3b31
}

.modal-tip .content-input {
    width: 370px;
    position: relative;
    margin-top: 25px
}

.modal-tip .content-input input {
    width: 100%;
    height: 54px;
    padding: 0 60px 0 50px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #181420;
    border: 1px solid #332d42
}

.modal-tip .content-input input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.modal-tip .content-input input::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.modal-tip .content-input img.input-icon {
    width: 18px;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%)
}

.modal-tip .content-input .avatar-image {
    width: 33px;
    height: 33px;
    position: absolute;
    top: 50%;
    right: 11px;
    transform: translateY(-50%);
    border-radius: 5px
}

.modal-tip .content-button {
    width: 370px;
    margin-top: 18px
}

.modal-tip .content-button button.button-tip {
    width: 100%;
    height: 55px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #D4AF3C;
    border-bottom: 2px solid #836c27
}

.modal-tip .content-button button.button-tip:hover {
    background: #dbba56
}

.modal-tip .content-button button.button-tip.button-loading {
    background: #D4AF3C;
    cursor: not-allowed
}

.modal-tip .content-button button.button-tip .button-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

.modal-tip .content-button button.button-tip .button-loading svg {
    font-size: 16px
}

.modal-tip .content-button button.button-tip .button-loading.fade-leave-active {
    transition: opacity .5s
}

.modal-tip .content-button button.button-tip .button-loading.fade-leave-to {
    opacity: 0
}

.modal-tip .content-button button.button-tip .button-content.fade-enter-active {
    transition: opacity .5s
}

.modal-tip .content-button button.button-tip .button-content.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 650px) {
    .modal-tip {
        width: 100%
    }
}

@media only screen and (max-width: 450px) {
    .modal-tip .tip-content {
        padding: 0 20px
    }

    .modal-tip .content-button,
    .modal-tip .content-input {
        width: 100%
    }
}
</style>
