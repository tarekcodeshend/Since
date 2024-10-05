<template>
    <div class="profile-settings">
        <div class="settings-element element-username">
            <div class="element-title">USER NAME</div>
            <div class="element-username-input">    
                <input v-model="userName" type="text" v-bind:disabled="toggleUsername === false" />  
                <transition name="fade" mode="out-in">
                    <button v-if="authSendLoginLoading === true" ><ButtonLoading /></button>
                    <button v-else v-on:click="userToggleUsernameEdit"
                    v-bind:disabled="socketSendLoading !== null">{{ toggleUsername ? 'UPDATE' : 'EDIT' }}</button>
                </transition>
            </div>
        </div>
        <div class="settings-element element-toggle">
            <div class="element-title">ANONYMOUS MODE</div>
            <div class="element-input">
                <button v-on:click="userToggleAnonymous" class="button-toggle" v-bind:class="{
                    'button-active': authUser.user.anonymous === true
                }" v-bind:disabled="socketSendLoading !== null"></button>
            </div>
        </div>
        <div class="settings-element element-range">
            <div class="element-title">SOUND VOLUME</div>
            <div class="element-input">
                <input v-model="userVolume" v-on:input="soundSetVolume(userVolume)" type="range" v-bind:min="0.01"
                    v-bind:max="1" step="0.01" v-bind:style="{
                        'background-image': '-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(' + userVolume + ', #D4AF3C), color-stop(' + userVolume + ', rgba(0, 0, 0, 0.35)))'
                    }">
            </div>
        </div>
        <div class="settings-element element-button">
            <div class="element-title">LINK DISCORD</div>
            <div class="element-input">
                <button class="button-discord"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                        <path
                            d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z">
                        </path>
                    </svg> LINK DISCORD
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';

export default {
    name: 'ProfileSettings',
    components: {
        ButtonLoading
    },
    data() {
        return {
            modalCookie: null,
            userVolume: 1,
            userShowRoblox: false,
            toggleUsername: false,
            userName: null
        }
    },
    metaInfo: {
        title: 'Profile - gooncasino'
    },
    methods: {
        ...mapActions([
            'authSendRobloxCookie',
            'notificationShow',
            'soundSetVolume',
            'modalsSetShow',
            'userSendUserAnonymousSocket',
            'userSendUserDiscordSocket',
            'authSendCredentialsRequest',
            'authSendCredentialsUsername'
        ]),
        modalActionButton() {
            if (this.modalCookie === null || this.modalCookie.trim() === '') {
                return;
            }

            const data = { cookie: this.modalCookie.trim() };
            this.authSendRobloxCookie(data);
        },
        userToggleAnonymous() {
            const data = { anonymous: !this.authUser.user.anonymous };
            this.userSendUserAnonymousSocket(data);
        },
        userToggleShowRoblox() {
            this.userShowRoblox = !this.userShowRoblox;
        },
        userToggleUsernameEdit() {
            this.toggleUsername = !this.toggleUsername;
            if(!this.toggleUsername) {
                this.userUpdateUsername();
            }
        },
        userUpdateUsername() {
            if(this.userName === null || this.userName === ''){
                this.notificationShow({ type: 'error', message: 'You username is invalid.' });
                return;
            }    
            
            const data = { username:  this.userName};
            this.authSendCredentialsUsername(data);
        }
    },
    computed: {
        ...mapGetters([
            'authSendLoginLoading',
            'socketSendLoading',
            'authUser',
            'soundVolume',
        ]),
    },
    created() {
        this.userVolume = this.soundVolume;
        this.userName = this.authUser.user.username;
    },
}
</script>

<style scoped>
.profile-settings {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    background: #1a1622;
}

.profile-settings .settings-element {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    background: #231e2e;
    display: flex;
    flex-direction: row;
}

/* .profile-settings .settings-element:first-of-type {
    flex-direction: column;
    margin-top: 0;
}

.profile-settings .settings-element:first-of-type.roblox-element {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
} */

.profile-settings .settings-element.element-button,
.profile-settings .settings-element.element-range,
.profile-settings .settings-element.element-username,
.profile-settings .settings-element.element-toggle {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.profile-settings .element-title {
    padding: 1px 4px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    color: #fff
}

.profile-settings .roblox-info {
    width: 150px;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #191e27;
    border: 1px solid #262c3a;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.profile-settings .roblox-info button {
    width: 15px;
    height: 15px;
}

.profile-settings .roblox-info button svg {
    width: 15px;
    height: 15px;
    fill: white
}

.profile-settings .element-info {
    padding: 0 4px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    color: #767c8b
}

.profile-settings .element-info a {
    color: #fd3b31
}

.profile-settings .element-input {
    display: flex;
    align-items: center
}

.profile-settings .settings-element.element-text .element-input {
    width: 100%;
    position: relative;
    margin-top: 6px
}

.profile-settings .element-input input[type=text] {
    width: 100%;
    height: 54px;
    padding: 0 148px 0 17px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #191e27;
    border: 1px solid #262c3a
}

.profile-settings .element-input input[type=text]::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.profile-settings .element-input input[type=text]::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.profile-settings button.button-set {
    width: 136px;
    height: 41px;
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #fd3b31;
    border-bottom: 2px solid #97302b
}

.profile-settings button.button-set .button-loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
}

.profile-settings button.button-set .button-loading.fade-leave-active {
    transition: opacity .5s
}

.profile-settings button.button-set .button-loading.fade-leave-to {
    opacity: 0
}

.profile-settings button.button-set .button-content.fade-enter-active {
    transition: opacity .5s
}

.profile-settings button.button-set .button-content.fade-enter-from {
    opacity: 0
}

.profile-settings button.button-toggle {
    width: 56px;
    height: 30px;
    position: relative
}

.profile-settings button.button-toggle:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 34px;
    background: #7c6a34
}

.profile-settings button.button-toggle.button-active:before {
    background: rgba(0, 199, 77, .4)
}

.profile-settings button.button-toggle:after {
    content: "";
    width: 22px;
    height: 22px;
    position: absolute;
    left: 4px;
    top: 4px;
    border-radius: 50%;
    background: #dbba56;
    transition: transform .3s ease
}

.profile-settings button.button-toggle.button-active:after {
    transform: translateX(26px);
    background: #00c74d
}

.profile-settings .element-input input[type=range] {
    width: 250px;
    height: 6px;
    border-radius: 3px;
    -webkit-appearance: none;
    -moz-apperance: none;
    background: #181420;
    border: 1px solid #2a2436
}

.profile-settings .element-input input[type=range]::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    -webkit-appearance: none;
    appearance: none;
    border-radius: 100%;
    background: #dbba56;
    cursor: pointer
}

.profile-settings .element-input input[type=range]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background: #dbba56;
    cursor: pointer
}

.profile-settings button.button-discord {
    width: 160px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #5865f2;
    border-bottom: 2px solid #454fc4
}

.profile-settings button.button-discord svg {
    width: 24px;
    margin-right: 8px;
    fill: #fff
}

.profile-settings .element-username-input {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
}

.profile-settings .element-username-input input {
    width: 150px;
    height: 100%;
    border-radius: 7px;
    padding: 0px 20px;
    background: #181420;
    color: white;
    transition: all 0.3s ease;
}

.profile-settings .element-username-input button {
    border-radius: 5px;
    background: #382F48;
    box-shadow: 0 3px 0 0 #1e172b;
    color: white;
    transition: all 0.3s ease;
    width: 90px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
}
@media only screen and (max-width: 450px) {
    .profile-settings .element-username-input input {
        width: 100px;
        border-radius: 4px;
        padding: 0px 12px;
    }
    .profile-settings .element-username-input button {
        border-radius: 4px;       
        width: 70px;       
        font-size: 11px;
    }
}

</style>