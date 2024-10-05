<template>
    <aside id="chat" v-bind:class="{
        'chat-hidden': generalSidebarMobile !== 'Chat',
        'chat-rain': generalRain.active !== null
    }">
        <div v-bind:class="{ 'chat-toggle-show': generalSidebarMobile !== 'Chat', 'chat-toggle': true }">
            <button v-on:click="generalSetSidebarMobile('Chat')">
                <svg data-v-91702dd6="" width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                    <path data-v-91702dd6=""
                        d="M23.214,0H2.786A2.786,2.786,0,0,0,0,2.788V17.645a2.786,2.786,0,0,0,2.786,2.786h3.3l-.505,4.541a.929.929,0,0,0,1.544.792l5.926-5.333H23.214A2.786,2.786,0,0,0,26,17.645V2.788A2.786,2.786,0,0,0,23.214,0Z">
                    </path>
                </svg>
            </button>
        </div>
        <div class="chat-header">
            <div class="header-online">
                <div class="online-dot">
                    <div class="dot-wave"></div>
                </div>
                {{ chatGetOnline }} Online
            </div>
            <div class="header-socials">
                <a href="https://discord.gg/Byuxek5eBY" target="_blank" class="socials-discord">
                    <svg data-v-91702dd6="" width="16" height="12" viewBox="0 0 16 12"
                        xmlns="http://www.w3.org/2000/svg">
                        <path data-v-91702dd6=""
                            d="M13.9049 1.44856C13.9049 1.44856 12.7586 0.183144 10.1557 0V0.399561C10.1557 0.399561 11.5833 0.313087 13.3505 2.12683C12.0166 1.12621 10.1137 0.499383 8 0.499383C5.88633 0.499383 3.98342 1.12611 2.64951 2.12683C4.41668 0.313087 5.84428 0.399561 5.84428 0.399561V0C3.24144 0.183144 2.09509 1.44856 2.09509 1.44856C0.111737 4.11231 0 9.93965 0 9.93965C1.86824 12.2872 4.21561 11.9876 4.21561 11.9876L5.07786 10.689C3.96591 10.3754 3.17184 9.65529 2.69458 9.09455C4.02609 10.0758 5.90989 10.689 8 10.689C10.0901 10.689 11.9739 10.0759 13.3054 9.09455C12.8282 9.6552 12.0341 10.3754 10.9221 10.689L11.7844 11.9876C11.7844 11.9876 14.1318 12.2873 16 9.93965C16.0002 9.93956 15.8884 4.11231 13.9049 1.44856ZM5.50907 8.29135C4.75945 8.29135 4.15178 7.61818 4.15178 6.78764C4.15178 5.95719 4.75945 5.28393 5.50907 5.28393C6.2587 5.28393 6.86636 5.95719 6.86636 6.78764C6.86636 7.61809 6.2587 8.29135 5.50907 8.29135ZM10.4911 8.29135C9.74148 8.29135 9.13381 7.61818 9.13381 6.78764C9.13381 5.95719 9.74148 5.28393 10.4911 5.28393C11.2407 5.28393 11.8484 5.95719 11.8484 6.78764C11.8484 7.61809 11.2408 8.29135 10.4911 8.29135Z">
                        </path>
                    </svg>
                </a>
                <a href="https://x.com/GoonCoin_SOL" target="_blank" class="socials-twitter">
                    <svg data-v-91702dd6="" width="16" height="14" viewBox="0 0 16 14"
                        xmlns="http://www.w3.org/2000/svg">
                        <path data-v-91702dd6=""
                            d="M16 1.69446C15.405 1.97358 14.771 2.1586 14.11 2.24843C14.79 1.81424 15.309 1.13193 15.553 0.309528C14.919 0.713778 14.219 0.99932 13.473 1.15867C12.871 0.473154 12.013 0.048584 11.077 0.048584C9.261 0.048584 7.799 1.62495 7.799 3.55743C7.799 3.83549 7.821 4.10285 7.875 4.35738C5.148 4.21514 2.735 2.81738 1.114 0.688112C0.831 1.21321 0.665 1.81424 0.665 2.46125C0.665 3.67614 1.25 4.75307 2.122 5.37656C1.595 5.36586 1.078 5.20224 0.64 4.9445C0.64 4.95519 0.64 4.9691 0.64 4.983C0.64 6.68769 1.777 8.10364 3.268 8.42982C3.001 8.50789 2.71 8.54532 2.408 8.54532C2.198 8.54532 1.986 8.53249 1.787 8.48543C2.212 9.87464 3.418 10.896 4.852 10.9291C3.736 11.8627 2.319 12.4253 0.785 12.4253C0.516 12.4253 0.258 12.4124 0 12.3771C1.453 13.3792 3.175 13.9514 5.032 13.9514C11.068 13.9514 14.368 8.60414 14.368 3.96917C14.368 3.8141 14.363 3.66438 14.356 3.51572C15.007 3.02164 15.554 2.40457 16 1.69446Z">
                        </path>
                    </svg>
                </a>
                <a href="https://t.me/GoonCoin_SOL" target="_blank" class="socials-telegram">
                    <img src="@/assets/img/telegram.png" alt="telegram" />
                </a>
                <a href="https://www.gooncoinsol.com/" target="_blank" class="socials-telegram">
                    <img src="@/assets/img/site.png" alt="telegram" />
                </a>
            </div>
        </div>
        <div class="chat-room">
            <ChatRoomDropdown />
            <RainTipDropdown />
        </div>
        <div class="chat-content" v-bind:class="{ 'rain-join-layout': generalRain.active !== null }">
            <div v-on:scroll="chatHandleScroll()" class="content-messages" ref="chatMessages">
                <transition name="fade" mode="out-in">
                    <div v-if="chatMessages.data === null || chatMessages.loading === true" class="messages-loading"
                        key="loading">

                        <div v-for="index in 4" v-bind:key="index" class="loading-placeholder">
                            <div class="placeholder-user">
                                <div class="user-avatar"></div>
                                <div class="user-username"></div>
                            </div>
                            <div class="placeholder-text"></div>
                        </div>

                    </div>
                    <div v-else class="messages-list" key="list">

                        <ChatMessageElement v-for="message in chatMessages.data" v-bind:key="message._id"
                            v-bind:message="message" />

                    </div>
                </transition>
            </div>
            <div class="content-rain">
                <transition name="fade-slide" mode="out-in">
                    <RainJoin v-if="generalRain.active !== null" />
                </transition>
            </div>
        </div>
        <div class="chat-footer">
            <div class="footer-input">
                <input v-model="chatMessage" v-on:keyup.enter="chatMessageButton" type="text"
                    placeholder="Enter your message here..." />
                <button v-on:click="chatMessageButton()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path
                            d="M6.54457 9.43516L3.31747 8.59404C2.08897 8.27384 1.99193 6.56699 3.17622 6.1096L12.7509 2.41176C13.5551 2.10114 14.3462 2.8922 14.0356 3.69648L10.3378 13.2711C9.88037 14.4554 8.17352 14.3584 7.85332 13.1299L7.01221 9.9028C6.9525 9.67374 6.77363 9.49486 6.54457 9.43516Z"
                            fill="white" />
                    </svg>
                </button>
            </div>
            <div class="footer-actions">
                <button v-on:click="modalsSetShow('ChatRules')">
                    <svg data-v-91702dd6="" width="11" height="17" viewBox="0 0 11 17"
                        xmlns="http://www.w3.org/2000/svg">
                        <path data-v-91702dd6="" fill-rule="evenodd" clip-rule="evenodd"
                            d="M11 0H0V16.0827L5.5 12L11 16.0827V0Z"></path>
                    </svg>
                    CHAT RULES
                </button>
                <button v-on:click="generalSetSidebarMobile('hidden')">
                    <svg data-v-91702dd6="" width="15" height="15" viewBox="0 0 15 15"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M1.01041 1.71762C0.619883 2.10814 0.619884 2.74131 1.01041 3.13183L5.6066 7.72803L1.01041 12.3242C0.619883 12.7147 0.619883 13.3479 1.01041 13.7384L1.71751 14.4455C2.10804 14.8361 2.7412 14.8361 3.13173 14.4455L7.72792 9.84935L12.3241 14.4455C12.7146 14.8361 13.3478 14.8361 13.7383 14.4455L14.4454 13.7384C14.836 13.3479 14.836 12.7147 14.4454 12.3242L9.84924 7.72803L14.4454 3.13183C14.836 2.74131 14.836 2.10814 14.4454 1.71762L13.7383 1.01051C13.3478 0.619988 12.7146 0.619988 12.3241 1.01051L7.72792 5.60671L3.13173 1.01051C2.7412 0.619989 2.10804 0.619988 1.71751 1.01051L1.01041 1.71762Z">
                        </path>
                    </svg>
                    HIDE CHAT
                </button>
            </div>
        </div>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconChatGradient from '@/components/icons/IconChatGradient';
import IconClose from '@/components/icons/IconClose';
import IconUsers from '@/components/icons/IconUsers';
import IconMessage from '@/components/icons/IconMessage';
import IconRules from '@/components/icons/IconRules';
import ChatRoomDropdown from '@/components/chat/ChatRoomDropdown';
import ChatMessageElement from '@/components/chat/ChatMessageElement';
import ChatEmojisDropdown from '@/components/chat/ChatEmojisDropdown';
import RainTipDropdown from '@/components/rain/RainTipDropdown';
import RainJoin from '@/components/rain/RainJoin';

export default {
    name: 'Chat',
    components: {
        IconChatGradient,
        IconClose,
        IconUsers,
        IconMessage,
        IconRules,
        ChatRoomDropdown,
        ChatMessageElement,
        ChatEmojisDropdown,
        RainTipDropdown,
        RainJoin
    },
    data() {
        return {
            chatMessage: ''
        }
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'modalsSetShow',
            'modalsSetData',
            'generalSetSidebarMobile',
            'chatSetScroll',
            'chatGetMessagesSocket',
            'chatSendMessageSocket',
            'chatSendClearSocket',
            'chatSendLockSocket',
            'generalSetUserInfoData',
            'generalGetUserInfoSocket',
            'generalSendRainCreateSocket'
        ]),
        chatScrollToBottom() {
            this.$nextTick(() => {
                let container = this.$refs.chatMessages;
                container.scrollTop = container.scrollHeight;
            });
        },
        chatAddEmoji(emoji) {
            this.chatMessage = this.chatMessage + emoji;
        },
        chatHandleScroll() {
            let container = this.$refs.chatMessages;
            this.chatSetScroll((container.scrollHeight - (container.scrollTop + container.clientHeight)) < 100);
        },
        chatHandleCommand(command) {
            this.generalSetUserInfoData(null);
            const args = command.split(' ');

            if (args[0] === '/tip' || (['/mute', '/ban'].includes(args[0]) === true && ['admin', 'mod'].includes(this.authUser.user.rank) === true)) {
                if (args[1] === undefined || args[1].trim() === '' || args[1].match(/^[0-9a-fA-F]{24}$/) === null) {
                    this.notificationShow({ type: 'error', message: 'You need to provide a valid user id.' });
                    return;
                }

                const data = { userId: args[1] };
                this.generalGetUserInfoSocket(data);

                if (args[0] === '/tip') { this.modalsSetShow('Tip'); }
                else if (args[0] === '/mute') { this.modalsSetShow('Mute'); }
                else if (args[0] === '/ban') { this.modalsSetShow('Ban'); }
            } else if (args[0] === '/rain') {
                const data = { amount: Math.floor(args[1] * 1000) };
                this.generalSendRainCreateSocket(data);
            } else if (args[0] === '/clear') {
                const data = {};
                this.chatSendClearSocket(data);
            } else if (args[0] === '/lock') {
                const data = { value: false };
                this.chatSendLockSocket(data);
            } else if (args[0] === '/unlock') {
                const data = { value: true };
                this.chatSendLockSocket(data);
            }
        },
        chatMessageButton() {
            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            if (this.generalSettings.chat.enabled === false && this.authUser.user.rank !== 'admin') {
                this.notificationShow({ type: 'error', message: 'You can not send a chat message.' });
                return;
            }

            if (this.generalSettings.chat.mode === 'normal' && this.authUser.user.rank !== 'admin' && (new Date().getTime() - this.chatLastMessage) < 3000) {
                this.notificationShow({ type: 'error', message: 'You can only send 1 message every 3 seconds.' });
                return;
            }

            if (this.generalSettings.chat.mode === 'slow' && this.authUser.user.rank !== 'admin' && (new Date().getTime() - this.chatLastMessage) < 6000) {
                this.notificationShow({ type: 'error', message: 'You can only send 1 message every 6 seconds because the chat is in slow mode.' });
                return;
            }

            const message = this.chatMessage.trim();

            if (message === '') {
                this.notificationShow({ type: 'error', message: 'Please enter a message.' });
                return;
            }

            if (['/tip', '/rain'].includes(message.split(' ')[0]) === true) {
                this.chatHandleCommand(message);
            } else if (
                ['mod', 'admin'].includes(this.authUser.user.rank) === true &&
                ['/clear', '/lock', '/unlock', '/mute', '/ban'].includes(message.split(' ')[0]) === true
            ) {
                this.chatHandleCommand(message);
            } else {
                const data = { message: message };
                this.chatSendMessageSocket(data);
            }

            this.chatMessage = '';
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'generalSidebarMobile',
            'generalSettings',
            'authUser',
            'chatScroll',
            'chatRoom',
            'chatOnline',
            'chatMessages',
            'chatLastMessage',
            'generalRain'
        ]),
        chatGetOnline() {
            let online = 0;

            for (const [key, value] of Object.entries(this.chatOnline)) {
                online = online + value;
            }

            return online;
        }
    },
    watch: {
        'chatMessages.data': {
            handler(state, oldState) {
                const message = this.chatMessages.data[this.chatMessages.data.length - 1];
                if (
                    this.chatScroll === true ||
                    this.chatMessages.data.length === 0 ||
                    (this.authUser.user !== null && message !== undefined && message.type === 'user' && message.user._id === this.authUser.user._id)
                ) {
                    setTimeout(() => { this.chatScrollToBottom(); }, 200);
                }
            },
            deep: true
        },
        'generalRain.active': {
            handler(state, oldState) {
                setTimeout(() => { this.chatScrollToBottom(); }, 125);
            },
            deep: true
        },
        'generalSidebarMobile': {
            handler(state, oldState) {
                if (this.generalSidebarMobile === 'Chat') { this.chatScrollToBottom(); }
            }
        }
    },
    mounted() {
        this.chatScrollToBottom();
    }
}
</script>

<style scoped>
aside#chat {
    width: 300px;
    height: calc(100% - 67px);
    position: fixed;
    top: 67px;
    left: 0;
    background: #16121E;
    z-index: 50;
    transition: transform ease 0.3s;
}

aside#chat.chat-hidden {
    transform: translateX(-300px);
}

aside#chat .chat-toggle {
    position: absolute;
    display: none;
    right: -52px;
    bottom: 35px;
}

aside#chat .chat-toggle-show {
    display: block;
}

aside#chat .chat-toggle button {
    width: 52px;
    height: 52px;
    border-radius: 0 5px 5px 0;
    background: #16121E;
}

aside#chat .chat-toggle button svg {
    width: 21px;
    margin-top: 6px;
    fill: #CABFDD;
    transition: all .2s ease;
}

aside#chat .chat-toggle button:hover svg {
    scale: 1.1;
    fill: #fff;
}

aside#chat .chat-header {
    width: 100%;
    height: 45px;
    padding: 0 18px;
    display: flex;
    z-index: 100;
    justify-content: space-between;
    align-items: center;
    background: #2B2339;
    box-shadow: 0px 28px 58.3px 0px rgba(0, 0, 0, 0.15);
}


aside#chat .header-online {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
}

aside#chat .online-dot {
    width: 15px;
    height: 15px;
    position: relative;
    margin-right: 6px;
}

aside#chat .online-dot:before {
    content: "";
    width: 5px;
    height: 5px;
    position: absolute;
    top: 5px;
    left: 5px;
    border-radius: 50%;
    background: #00c74d;
}

aside#chat .dot-wave {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    animation: online-counter-91702dd6 2s linear infinite forwards;
}

@keyframes online-counter-91702dd6 {
    0% {
        transform: scale(.2);
        background: rgba(0, 199, 77, .2);
    }

    50% {
        transform: scale(.7);
        background: rgba(0, 199, 77, .2);
    }

    100% {
        transform: scale(1.2);
        background: rgba(0, 199, 77, 0);
    }
}

aside#chat .header-socials {
    display: flex;
}

aside#chat .header-socials a.socials-twitter {
    background: #234965;
}

aside#chat .header-socials a.socials-twitter svg {
    fill: #53b5ff;
}

aside#chat .header-socials a {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    z-index: 100;
    background: #2f3762;
}

aside#chat .header-socials a.socials-twitter,
aside#chat .header-socials a.socials-telegram {
    margin-left: 10px;
}

aside#chat .header-socials a.socials-telegram img {
    width: 15px;
    height: 15px;
}

aside#chat .header-socials a.socials-discord svg {
    fill: #a4b1ff;
}

aside#chat .chat-room {
    width: 100%;
    padding: 15px 15px 0 15px;
    background: #16121E;
}



aside#chat .chat-content {
    width: 100%;
    height: calc(100% - 322px);
    position: relative;
}

aside#chat .chat-content::before {
    content: "";
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #16121E, rgba(22, 18, 30, 0.5));
    z-index: 10;
}

aside#chat .chat-content .content-messages {
    height: 100%;
    padding: 10px 10px 12px 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    transition: height 0.2s ease;
}

aside#chat .chat-content.rain-join-layout .content-messages {
    height: calc(100% - 195px);
}

aside#chat .content-messages::-webkit-scrollbar-track {
    background-color: transparent;
}

aside#chat .content-messages::-webkit-scrollbar {
    width: 0;
    height: 0;
}

aside#chat .messages-loading {
    width: 100%;
    padding: 0 15px;
}

aside#chat .messages-loading.fade-leave-active {
    transition: opacity 0.2s;
}

aside#chat .messages-loading.fade-leave-to {
    opacity: 0;
}

aside#chat .content-lock {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translate(-50%, 0);
}

aside#chat.chat-rain .content-lock {
    bottom: 157px;
    z-index: 100;
}

aside#chat .content-lock button.button-lock {
    height: 30px;
    position: relative;
    padding: 1px;
    filter: drop-shadow(0px 2px 10px rgba(1, 230, 169, 0.15)) drop-shadow(0px 4px 25px rgba(15, 41, 63, 0.35));
    z-index: 1;
}

aside#chat .content-lock button.button-lock::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #01e1a4 100%);
    clip-path: polygon(7px 0, calc(100% - 7px) 0, 100% 25%, 100% 75%, calc(100% - 7px) 100%, 7px 100%, 0 75%, 0 25%);
    z-index: -1;
}

aside#chat .content-lock button.button-lock .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.128) 0%, rgba(0, 33, 24, 0.132) 25%, rgba(0, 99, 73, 0.144986) 60%, rgba(1, 193, 143, 0.0925409) 80%, rgba(1, 237, 176, 0.068) 100%) #064552;
    clip-path: polygon(7px 0, calc(100% - 7px) 0, 100% 25%, 100% 75%, calc(100% - 7px) 100%, 7px 100%, 0 75%, 0 25%);
}

aside#chat .content-rain {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 15px 15px 0 15px;
    z-index: 1;
}

aside#chat .content-rain .fade-slide-enter-active,
aside#chat .content-rain .fade-slide-leave-active {
    transition: all 0.3s ease;
}

aside#chat .content-rain .fade-slide-enter,
aside#chat .content-rain .fade-slide-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}

aside#chat .loading-placeholder {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #2B2339;
}

aside#chat .loading-placeholder:first-of-type {
    margin-top: 0;
}

aside#chat .placeholder-user {
    display: flex;
    align-items: center;
}

aside#chat .user-avatar {
    width: 37px;
    height: 37px;
    position: relative;
    margin-right: 13px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #2B2339;
}

aside#chat .user-username {
    width: 75px;
    height: 20px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    background-color: #2B2339;
}

aside#chat .placeholder-text {
    width: 100%;
    height: 19px;
    position: relative;
    margin-top: 8px;
    border-radius: 5px;
    overflow: hidden;
    background-color: #2B2339;
}

aside#chat .user-avatar::after,
aside#chat .user-username::after,
aside#chat .placeholder-text::after {
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

aside#chat .messages-list {
    width: 100%;
    height: 100%;
}

aside#chat .messages-list.fade-enter-active {
    transition: opacity 0.1s;
}

aside#chat .messages-list.fade-enter-from {
    opacity: 0;
}

aside#chat .chat-footer {
    width: 100%;
}

aside#chat .footer-input {
    width: 100%;
    height: 56px;
    position: relative;
    background: #100D14;
}

aside#chat .footer-input input {
    width: 100%;
    height: 56px;
    padding: 0 56px 0 18px;
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    background: transparent;
}

aside#chat .footer-input input::placeholder {
    color: #746c83;
}

aside#chat .footer-input button {
    position: absolute;
    top: 50%;
    right: 18px;
    transform: translateY(-50%);
    padding: 7px 9px;
    margin: 0;
    z-index: 100;
    border-radius: 4.35px;
    background: #D4AF3C;
    box-shadow: 0px 2px 0px 0px #8E7525, 0px 8.609px 7.4px 0px rgba(142, 117, 37, 0.12);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
}

aside#chat .footer-input button:hover {
    background: #dbba56;
}

aside#chat .footer-input button svg {
    width: 18px;
    height: 18px;
}


aside#chat .footer-actions {
    width: 100%;
    height: 43px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    background: #100D14;
    border-top: 1px solid #1f1829;
}

aside#chat .footer-actions button {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: #CABFDD;
    background: transparent;
}

aside#chat .footer-actions button svg {
    margin-right: 6px;
    fill: #CABFDD;
    transition: all .3s ease;
}

@media only screen and (max-width: 640px) {

    aside#chat .chat-room {
        padding: 7px 15px 0 15px;
    }

    aside#chat .chat-content {
        height: calc(100% - 267px);
    }

    aside#chat .chat-content.rain-join-layout .content-messages {
        height: calc(100% - 133px);
    }

    aside#chat .footer-input {
        height: 40px;
    }

    aside#chat .footer-input input {
        height: 40px;
        padding: 0 56px 0 18px;
        font-size: 11px;
    }

    aside#chat .footer-input button {
        right: 18px;
        padding: 4px 5px;
    }

    aside#chat .footer-actions {
        height: 40px;
        padding: 0 18px;
    }

    aside#chat .footer-actions button {
        font-size: 10px;
    }

    aside#chat .footer-actions button svg {
        width: 11px;
        height: 11px;
        margin-right: 6px;
    }

    aside#chat .chat-header {
        height: 38px;
        padding: 0 18px;
    }

    aside#chat .header-socials a {
        width: 22px;
        height: 22px;
    }

    aside#chat .header-socials a svg {
        width: 12px;
        height: 12px;
    }

    aside#chat .header-socials a.socials-telegram img {
        width: 12px;
        height: 12px;
    }

    aside#chat .chat-toggle {
        right: -45px;
        bottom: 25px;
    }

    aside#chat .chat-toggle button {
        width: 44px;
        height: 44px;
    }

    aside#chat .chat-toggle button svg {
        width: 18px;
    }
}
</style>
