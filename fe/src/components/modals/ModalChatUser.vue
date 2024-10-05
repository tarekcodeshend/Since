<template>
    <div class="modal-chat-user">
        <div class="user-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE
            </button>
        </div>
        <div class="user-content">
            <div class="content-user user-bronze user-user">
                <AvatarImage v-bind:image="generalUserInfo.data.avatar" />
                <BoxLevel v-if="generalUserInfo.data !== null && ['admin', 'mod', 'partner'].includes(generalUserInfo.data.rank) === false"
                    v-bind:level="generalUserInfo.data.level" v-bind:color="userGetLevelColor" />
                <BoxRank v-else-if="generalUserInfo.data !== null && userGetRank !== null" v-bind:rank="userGetRank" />   
                <span v-html="generalUserInfo.data.username" class="user-username"></span>
            </div>
            <div class="content-actions">
                <a v-if="generalUserInfo.data.roblox !== undefined"
                    v-bind:href="'https://www.roblox.com/users/' + generalUserInfo.data.roblox.id + '/profile'"
                    target="_blank" class="link-account">
                    <div class="link-inner">VIEW
                        ROBLOX PROFILE</div>
                </a>
                <button class="button-send" v-on:click="modalTipButton">SEND TIP</button>
            </div>
            <div class="content-stats">
                <div class="stats-element">
                    <div class="element-title">TOTAL WAGERED</div>
                    <div class="element-value"><img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                        <div v-if="generalUserInfo.data.stats !== null" class="value-amount">
                            <span>{{ modalFormatValue(generalUserInfo.data.stats.bet).split('.')[0] }}</span>.{{
                                modalFormatValue(generalUserInfo.data.stats.bet).split('.')[1] }}
                        </div>
                        <div v-else class="amount-hidden">HIDDEN</div>
                    </div>
                </div>
                <div class="stats-element">
                    <div class="element-title">TOTAL DEPOSITED</div>
                    <div class="element-value"><img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                        <div v-if="generalUserInfo.data.stats !== null" class="value-amount">
                            <span>{{ modalFormatValue(generalUserInfo.data.stats.deposit).split('.')[0] }}</span>.{{
                                modalFormatValue(generalUserInfo.data.stats.deposit).split('.')[1] }}
                        </div>
                        <div v-else class="amount-hidden">HIDDEN</div>
                    </div>
                </div>
                <div class="stats-element">
                    <div class="element-title">TOTAL WITHDRAWN</div>
                    <div class="element-value"><img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                        <div v-if="generalUserInfo.data.stats !== null" class="value-amount">
                            <span>{{ modalFormatValue(generalUserInfo.data.stats.withdraw).split('.')[0] }}</span>.{{
                                modalFormatValue(generalUserInfo.data.stats.withdraw).split('.')[1] }}
                        </div>
                        <div v-else class="value-hidden">HIDDEN</div>
                    </div>
                </div>
                <div class="stats-element element-profit" v-bind:class="{'element-negative': generalUserInfo.data.stats === null || modalFormatValue(generalUserInfo.data.stats.withdraw -
                                generalUserInfo.data.stats.deposit).split('.')[0] <= 0}">
                    <div class="element-title">TOTAL PROFIT</div>
                    <div class="element-value">
                        <img src="@/assets/img/coins.8ad8b473.png" alt="coins-image">
                        <div v-if="generalUserInfo.data.stats !== null" class="value-amount">
                            <span>{{ modalFormatValue(generalUserInfo.data.stats.withdraw -
                                generalUserInfo.data.stats.deposit).split('.')[0] }}</span>.{{
                                    modalFormatValue(generalUserInfo.data.stats.withdraw
                                        - generalUserInfo.data.stats.deposit).split('.')[1]}}
                        </div>
                        <div v-else class="amount-hidden">HIDDEN</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AvatarImage from '@/components/AvatarImage';
import BoxLevel from '@/components/BoxLevel';
import BoxRank from '@/components/BoxRank';

export default {
    name: 'ModalChatUser',
    components: {
        AvatarImage,
        BoxLevel,
        BoxRank
    },
    methods: {
        ...mapActions([
            'modalsSetShow',
            'modalsSetData'
        ]),
        modalFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        modalTipButton() {
            this.modalsSetShow(null);

            setTimeout(() => { this.modalsSetShow('Tip'); }, 300);
        }
    },
    computed: {
        ...mapGetters([
            'generalUserInfo'
        ]),
        userGetLevelColor() {
            let color = '';

            if(this.generalUserInfo.data === null) return '';

            if (this.generalUserInfo.data.level >= 10 && this.generalUserInfo.data.level < 20) { color = 'blue'; }
            else if (this.generalUserInfo.data.level >= 20 && this.generalUserInfo.data.level < 30) { color = 'green'; }
            else if (this.generalUserInfo.data.level >= 30 && this.generalUserInfo.data.level < 50) { color = 'yellow'; }  
            else if (this.generalUserInfo.data.level >= 50) { color = 'purple'; }

            return color;
        },
        userGetRank() {
            if (this.generalUserInfo.data === null) return null;
            let rank = this.generalUserInfo.data.rakeback;
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
.modal-chat-user {
    width: 900px;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 70px 0 35px 0;
    border-radius: 18px;
    background: #1D1826;
    border-top: 32px solid #1f1a2b;
    border-bottom: 32px solid #1f1a2b
}

.modal-chat-user .user-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-chat-user .user-close button {
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

.modal-chat-user .user-close button:hover {
    color: #fff
}

.modal-chat-user .user-close button svg {
    margin-right: 8px;
    fill: #CABFDD;
    transition: all .3s ease
}

.modal-chat-user .user-close button:hover svg {
    fill: #fff
}

.modal-chat-user .user-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-chat-user .content-user {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    gap: 8px;
}

.modal-chat-user .content-user .avatar-image {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 12px
}

.modal-chat-user .content-user span.user-rank {
    margin-right: 5px
}

.modal-chat-user .user-rank {
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    padding: 0 5px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 700;
    color: #fff;
    background: #a1aeb5
}

.modal-chat-user .content-user.user-gold .user-rank {
    background: #f7d814
}

.modal-chat-user .content-user.user-diamond .user-rank {
    background: #1fb1ff
}

.modal-chat-user .content-user.user-pink .user-rank {
    background: #e614f7
}

.modal-chat-user .content-user.user-mod .user-rank {
    background: #00c74d
}

.modal-chat-user .content-user.user-admin .user-rank {
    background: #fd3b31
}

.modal-chat-user .user-rank svg {
    width: 11px;
    margin-right: 5px;
    margin-bottom: 1px;
    fill: #fff
}

.modal-chat-user .content-actions {
    display: flex;
    margin-top: 12px
}

.modal-chat-user .content-actions a {
    height: 35px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    padding: 0 16px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: #767c8b;
    background: #212732;
    border-bottom: 2px solid #191e27
}

.modal-chat-user .content-actions a:hover {
    color: #fff
}

.modal-chat-user .content-actions button.button-send {
    height: 35px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background: #D4AF3C;
    border-bottom: 2px solid #866f27
}

.modal-chat-user .content-actions button.button-send:hover {
    background: #dbba56
}

.modal-chat-user .content-stats {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 39px;
    padding: 0 90px
}

.modal-chat-user .stats-element.element-profit {
    width: 100%;
    margin-top: 16px
}

.modal-chat-user .stats-element {
    width: calc(33.33% - 16px);
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-chat-user .stats-element:last-of-type {
    margin-right: 0
}

.modal-chat-user .element-title {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    color: #afa6be
}

.modal-chat-user .stats-element.element-profit .element-title {
    color: #ebc553
}

.modal-chat-user .stats-element.element-profit.element-negative .element-title {
    color: #fd3b31
}

.modal-chat-user .element-hidden,
.modal-chat-user .element-value {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background: #2B2339
}

.modal-chat-user .stats-element.element-profit .element-hidden,
.modal-chat-user .stats-element.element-profit .element-value {
    color: #eec855;
    background: #3a321c
}

.modal-chat-user .stats-element.element-profit.element-negative .element-value {
    color: #fd3b31;
    background: rgba(253, 59, 49, .08)
}

.modal-chat-user .element-hidden {
    font-style: italic
}

.modal-chat-user .element-value img {
    width: 17px;
    margin-right: 10px;
    margin-bottom: 2px;
}

.modal-chat-user .value-amount {
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.modal-chat-user .stats-element.element-profit .value-amount {
    color: #ebbe36
}

.modal-chat-user .stats-element.element-profit.element-negative .value-amount {
    color: #fd3b31
}

.modal-chat-user .value-amount span {
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.modal-chat-user .stats-element.element-profit .value-amount span {
    color: #dbba56
}

.modal-chat-user .stats-element.element-profit.element-negative .value-amount span {
    color: #fd3b31
}

@media only screen and (max-width: 920px) {
    .modal-chat-user {
        width: 100%
    }
}

@media only screen and (max-width: 700px) {
    .modal-chat-user .content-stats {
        padding: 0 44px
    }
}

@media only screen and (max-width: 600px) {
    .modal-chat-user .content-stats {
        flex-wrap: wrap
    }

    .modal-chat-user .stats-element {
        width: calc(50% - 12px);
        margin-top: 16px
    }

    .modal-chat-user .stats-element:first-of-type {
        width: 100%;
        margin-right: 0
    }
}

@media only screen and (max-width: 500px) {
    .modal-chat-user .content-stats {
        padding: 0 20px
    }
}
</style>
