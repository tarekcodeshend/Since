<template>
    <div class="login-roblox">
        <div class="content-title">Roblox Cookie</div>
        <div class="cookie-content">
            <div class="cookie-title">.ROBLOSECURITY COOKIE</div>
            <div class="cookie-input">
                <input v-model="loginCookie" type="text" placeholder="Enter .ROBLOSECURITY Cookie...">
            </div>
        </div>
        <div class="content-info">By signing in you confirm that you are 18 years of age or over, of sound mind
            capable of taking responsibility for your own actions & agree with our tos.
        </div>
        <div class="content-buttons">
            <button v-on:click="loginActionButton()" class="button-login"
                v-bind:disabled="authSendLoginLoading === true">
                <transition name="fade" mode="out-in">
                    <ButtonLoading v-if="authSendLoginLoading === true" />
                    <div v-else class="inner-content">LOG IN</div>
                </transition>
            </button>
        </div>
        <button class="button-email" v-on:click="$parent.modalSetTab('login')">
            <span>LOG IN WITH EMAIL</span>
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonLoading from '@/components/ButtonLoading';

export default {
    name: 'LoginRobloxCookie',
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
            if (this.loginCookie === null || this.loginCookie.trim() === '') {
                return;
            }

            const data = { cookie: this.loginCookie.trim() };
            this.authSendRobloxCookie(data);
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

.modal-login .login-roblox {
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

.modal-login .cookie-content {
    width: 100%;
    margin-top: 20px;
}

.cookie-content .cookie-title {
    color: #767C8B;
    font-size: 14px;
}

.modal-login .cookie-input {
    width: 100%;
    position: relative;
    margin-top: 5px
}

.modal-login .cookie-input input {
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

.modal-login .cookie-input input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #596076
}

.modal-login .cookie-input input::placeholder {
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
    /* padding: 10px 30px; */
    width: 110px;
    height: 45px;
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

.modal-login .content-buttons .button-login:hover {
    background: #00de56
}

.modal-login .button-email {
    margin-top: 25px;
    padding: 12px 0px;
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

.modal-login .button-email:hover {
    color: #fff
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

    .modal-login .login-roblox {
        padding: 10px;
    }

    .modal-login .cookie-input input {
        height: 45px;
        padding: 0 17px;
        font-size: 12px;
    }

    .modal-login .content-buttons {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .modal-login .content-buttons .button-login {
        width: 90%;
        height: 40px;
        font-size: 14px;
    }

    .modal-login .button-email {
        width: 90%;
        font-size: 14px;
        padding: 10px 0px;
    }

    .modal-login .content-title {
        font-size: 24px;
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