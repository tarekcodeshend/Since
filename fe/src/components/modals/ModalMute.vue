<template>
    <div class="modal-mute">
        <div class="mute-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE
            </button>
        </div>
        <div class="mute-content">
            <div class="content-title">MUTE USER</div>
            <div class="mute-avatar">
                <transition name="fade" mode="out-in">
                    <div v-if="generalUserInfo.data === null || generalUserInfo.loading === true"
                        class="avatar-loading"></div>
                    <div v-else class="avatar-content" v-bind:class="[
                        'content-' + modalGetLevelColor,
                        'content-' + generalUserInfo.data.rank
                    ]">
                        <AvatarImage v-bind:image="generalUserInfo.data.avatar" />
                    </div>
                </transition>
            </div>
            <div class="mute-username">
                <transition name="fade" mode="out-in">
                    <div v-if="generalUserInfo.data === null || generalUserInfo.loading === true"
                        class="username-loading"></div>
                    <div v-else class="username-content">
                        <span v-html="generalUserInfo.data.username"></span>
                        <BoxLevel v-if="['admin', 'mod', 'partner'].includes(generalUserInfo.data.rank) === false"
                            v-bind:level="generalUserInfo.data.level" v-bind:color="modalGetLevelColor" />
                        <BoxRank v-if="modalGetRank !== null" v-bind:rank="modalGetRank" />
                    </div>
                </transition>
            </div>
            <div class="mute-date">
                <transition name="fade" mode="out-in">
                    <div v-if="generalUserInfo.data === null || generalUserInfo.loading === true" class="date-loading">
                    </div>
                    <div v-else class="date-content">Member since {{ modalGetDate }}</div>
                </transition>
            </div>
            <div class="mute-reason">
                <select v-model="modalReason">
                    <option value="insulting">Insulting</option>
                    <option value="racism">Racism</option>
                    <option value="begging">Begging</option>
                    <option value="self promotion">Self promotion</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="mute-time">
                <select v-model="modalTime">
                    <option value="none">None</option>
                    <option value="15m">15 minutes</option>
                    <option value="30m">30 minutes</option>
                    <option value="1h">1 hours</option>
                    <option value="12h">12 hours</option>
                    <option value="24h">24 hours</option>
                    <option value="7d">7 days</option>
                </select>
            </div>
            <button v-on:click="modalMuteButton()" class="button-mute"
                v-bind:disabled="socketSendLoading === 'AdminUserMute'">
                <div class="button-inner">
                    <transition name="fade" mode="out-in">
                        <ButtonLoading v-if="socketSendLoading === 'AdminUserMute'" />
                        <div v-else class="inner-content">MUTE USER</div>
                    </transition>
                </div>
            </button>
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
    name: 'ModalMute',
    components: {
        AvatarImage,
        BoxLevel,
        BoxRank,
        ButtonLoading
    },
    data() {
        return {
            modalReason: 'insulting',
            modalTime: 'none'
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'adminSendUserMuteSocket',
            'modalsSetShow',
            'modalsSetData'
        ]),
        modalMuteButton() {
            let time = 0;
            if (this.modalTime === '15m') { time = 60 * 15; }
            else if (this.modalTime === '30m') { time = 60 * 30; }
            else if (this.modalTime === '1h') { time = 60 * 60; }
            else if (this.modalTime === '12h') { time = 60 * 60 * 12; }
            else if (this.modalTime === '24h') { time = 60 * 60 * 24; }
            else if (this.modalTime === '7d') { time = 60 * 60 * 24 * 7; }

            const data = { userId: this.generalUserInfo.data._id, time: time, reason: this.modalReason };
            this.adminSendUserMuteSocket(data);
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
.modal-mute {
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

.modal-mute .mute-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-mute .mute-close button {
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

.modal-mute .mute-close button:hover {
    color: #fff
}

.modal-mute .mute-close button svg {
    margin-right: 8px;
    fill: #CABFDD;
    transition: all .3s ease
}

.modal-mute .mute-close button:hover svg {
    fill: #fff
}

.modal-mute .mute-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-mute .content-title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 800;
    color: #323743
}

.modal-mute .mute-avatar {
    margin-top: 35px;
}

.modal-mute .avatar-loading,
.modal-mute .username-loading,
.modal-mute .date-loading {
    position: relative;
    overflow: hidden;
    background-color: #072435;
}

.modal-mute .avatar-loading {
    width: 95px;
    height: 95px;
    border-radius: 50%;
}

.modal-mute .username-loading {
    width: 150px;
    height: 30px;
    border-radius: 5px;
}

.modal-mute .date-loading {
    width: 110px;
    height: 19px;
    border-radius: 5px;
}

.modal-mute .avatar-loading::after,
.modal-mute .username-loading::after,
.modal-mute .date-loading::after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    animation-name: loading_animation;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    background: linear-gradient(to right, #ffffff00 0%, rgba(255, 255, 255, 0.1) 50%, #ffffff00 100%);
}

.modal-mute .avatar-loading.fade-leave-active,
.modal-mute .username-loading.fade-leave-active {
    transition: opacity 0.5s;
}

.modal-mute .avatar-loading.fade-leave-to,
.modal-mute .username-loading.fade-leave-to {
    opacity: 0;
}

.modal-mute .avatar-content {
    width: 95px;
    height: 95px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border-radius: 50%;
    border: 2px solid #9e9e9e;
    overflow: hidden;
}

.modal-mute .avatar-content.content-blue {
    border: 2px solid #559ee4;
}

.modal-mute .avatar-content.content-green {
    border: 2px solid #b8e92d;
}

.modal-mute .avatar-content.content-orange {
    border: 2px solid #fca311;
}

.modal-mute .avatar-content.content-red {
    border: 2px solid #ff4e4e;
}

.modal-mute .avatar-content.content-purple {
    border: 2px solid #6953f1;
}

.modal-mute .avatar-content.content-partner {
    border: 2px solid #eca822;
}

.modal-mute .avatar-content.content-mod {
    border: 2px solid #ffb703;
}

.modal-mute .avatar-content.content-admin {
    border: 2px solid #00ffc2;
}

.modal-mute .avatar-content .avatar-image {
    width: 100%;
    height: 100%;
}

.modal-mute .mute-username {
    margin-top: 18px;
}

.modal-mute .username-content {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
}

.modal-mute .username-content.fade-enter-active {
    transition: opacity 0.5s;
}

.modal-mute .username-content.fade-enter-from {
    opacity: 0;
}

.modal-mute .mute-date {
    margin-top: 5px;
}

.modal-mute .date-content {
    font-size: 14px;
    font-weight: 400;
    color: #b3afb9;
}

.modal-mute .date-content.fade-enter-active {
    transition: opacity 0.5s;
}

.modal-mute .date-content.fade-enter-from {
    opacity: 0;
}

.modal-mute .mute-reason,
.modal-mute .mute-time {
    width: 448px;
    height: 60px;
    position: relative;
    margin-top: 35px;
    padding: 1px;
}

.modal-mute .mute-time {
    margin-top: 15px;
}

.modal-mute .mute-reason select,
.modal-mute .mute-time select {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    background-color: #2B2339;
    box-shadow: 0 2px 0 0 #16121E;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 5px;
}

.modal-mute button.button-mute {
    width: 170px;
    height: 48px;
    margin-top: 20px;
}

.modal-mute button.button-mute .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 800;
    border-radius: 5px;
    color: #fff;
    background: #00c74d;
    border-bottom: 2px solid #00732c
}

.modal-mute button.button-mute .button-loading.fade-leave-active {
    transition: opacity 0.5s;
}

.modal-mute button.button-mute .button-loading.fade-leave-to {
    opacity: 0;
}

.modal-mute button.button-mute .inner-content.fade-enter-active {
    transition: opacity 0.5s;
}

.modal-mute button.button-mute .inner-content.fade-enter-from {
    opacity: 0;
}

@keyframes loading_animation {
    0% {
        transform: translateX(-100%);
    }

    50% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(100%);
    }
}

@media only screen and (max-width: 793px) {

    .modal-mute {
        width: calc(100vw - 20px);
    }

}

@media only screen and (max-width: 508px) {

    .modal-mute .mute-reason,
    .modal-mute .mute-time {
        width: 100%;
    }

}
</style>