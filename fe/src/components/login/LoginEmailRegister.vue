<template>
    <div class="login-credientials">
        <div class="content-title">Register</div>
        <div class="email-content">
            <div class="email-title">Name</div>
            <div class="email-input">
                <input v-model="loginName" type="text" placeholder="Enter Name...">
            </div>
        </div>
        <div class="email-content">
            <div class="email-title">Email</div>
            <div class="email-input">
                <input v-model="loginEmail" type="email" placeholder="Enter Email...">
            </div>
        </div>
        <div class="password-content">
            <div class="password-title">Password</div>
            <div class="password-input">
                <input v-model="loginPassword" type="password" placeholder="Enter Password...">
            </div>
        </div>
        <div class="password-content">
            <div class="password-title">Confirm Password</div>
            <div class="password-input">
                <input v-model="loginPasswordConfirm" type="password" placeholder="Enter Password...">
            </div>
        </div>
        <div class="content-info">By signing in you confirm that you are 18 years of age or over, of sound mind capable
            of taking responsibility for your own actions & agree with our tos.
        </div>
        <div class="content-buttons">
            <button class="button-login" v-on:click="$parent.modalSetTab('login')">LOG IN</button>
            <button v-on:click="loginActionButton()" class="button-register">REGISTER</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'LoginEmailRegister',
    props: ['tab'],
    data() {
        return {
            loginName: null,
            loginEmail: null,
            loginPassword: null,
            loginPasswordConfirm: null
        }
    },
    methods: {
        ...mapActions([
            'modalsSetShow',
            'modalsSetData',
            'notificationShow',
            'authSendCredentialsLogin',
            'authSendCredentialsRegister'
        ]),
        loginActionButton() {
            if (this.loginName === null || this.loginName.trim() === '') {
                this.notificationShow({ type: 'error', message: 'Your entered name is invalid.' });
                return;
            }
            if (this.loginName.length < 3) {
                this.notificationShow({ type: 'error', message: 'Your entered name should be at least 3 charaters.' });
                return;
            }

            if (this.loginEmail === null || this.loginEmail.trim() === '') {
                this.notificationShow({ type: 'error', message: 'Your entered email is invalid.' });
                return;
            }

            if (this.loginPassword === null || this.loginPassword.trim() === '') {
                this.notificationShow({ type: 'error', message: 'Your entered password is invalid.' });
                return;
            }

            if (this.tab === 'register') {
                if (this.loginPassword !== this.loginPasswordConfirm) {
                    this.notificationShow({ type: 'error', message: 'Your entered passwords does not match.' });
                    return;
                }

                this.modalsSetData({ typeCaptcha: 'credentialsRegister', data: { username: this.loginName, email: this.loginEmail, password: this.loginPassword } });
            } else {
                this.modalsSetData({ typeCaptcha: 'credentialsLogin', data: { email: this.loginEmail, password: this.loginPassword } });
            }

            setTimeout(() => { this.modalsSetShow('Captcha'); }, 200);
        },
        loginTermsButton() {
            this.modalsSetShow(null);
            setTimeout(() => { this.modalsSetShow('Terms'); }, 300);
        }
    },
    computed: {
        ...mapGetters([
            'authSendLoginLoading'
        ])
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
    background: #181420;
    border: 1px solid #1f1b29
}

.modal-login .email-input input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #515457
}

.modal-login .email-input input::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #515457
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
    background: #181420;
    border: 1px solid #1f1b29
}

.modal-login .password-input input::-moz-placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #515457
}

.modal-login .password-input input::placeholder {
    font-size: 13px;
    font-weight: 700;
    color: #515457
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
    background: #D4AF3C;
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

.modal-login .content-buttons .button-register:hover {
    background: #dbba56
}

.modal-login .content-buttons .button-login {
    border-radius: 9.583px;
    background: #382F48;
    padding: 10px 22px;
    color: #CABFDD;
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
    color: #fff
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

    .modal-login .login-credientials {
        padding: 10px;
    }

    .modal-login .email-input input {
        height: 45px;
        padding: 0 17px;
    }

    .modal-login .password-input input {
        height: 45px;
        padding: 0 17px;
    }

    .modal-login .password-input button {
        height: 36px;
        padding: 0px 20px;
    }

    .modal-login .content-buttons .button-register {
        padding: 10px 38px;
        font-size: 14px;
    }

    .modal-login .content-buttons .button-login {
        padding: 10px 38px;
        font-size: 14px;
    }

    .modal-login .button-roblox {
        padding: 10px 0px;
        width: 100%;
        font-size: 14px;
        gap: 10px;
    }

    .modal-login .button-roblox svg {
        width: 20px;
        height: 20px;
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