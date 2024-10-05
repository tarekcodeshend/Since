<template>
    <div class="modal-login">
        <div class="login-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE
            </button>
        </div>
        <div class="login-content">
            <LoginEmailLogin v-if="modalTab === 'login'" v-bind:tab="modalTab" />
            <LoginEmailRegister v-else-if="modalTab === 'register'" v-bind:tab="modalTab" />
            <LoginRobloxCookie v-else-if="modalTab === 'roblox login'" v-bind:tab="modalTab" />
            <LoginRobloxCookie v-else-if="modalTab === 'roblox cookie'" v-bind:tab="modalTab" />
            <LoginForgot v-else-if="modalTab === 'forgot'" v-bind:tab="modalTab" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoginEmailLogin from '@/components/login/LoginEmailLogin';
import LoginEmailRegister from '@/components/login/LoginEmailRegister';
import LoginRobloxLogin from '@/components/login/LoginRobloxLogin';
import LoginRobloxCookie from '@/components/login/LoginRobloxCookie';
import LoginForgot from '@/components/login/LoginForgot';

export default {
    name: 'ModalLogin',
    components: {
        LoginEmailLogin,
        LoginEmailRegister,
        LoginRobloxLogin,
        LoginRobloxCookie,
        LoginForgot
    },
    data() {
        return {
            modalTab: 'login'
        }
    },
    methods: {
        ...mapActions([
            'modalsSetShow'
        ]),
        modalSetTab(tab) {
            this.modalTab = tab;
        },
        modalTermsButton() {
            this.modalsSetShow(null);
            setTimeout(() => { this.modalsSetShow('Terms'); }, 300);
        },
    },
}
</script>

<style scoped>
.modal-login {
    width: 620px;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 25px 0 25px 0;
    border-radius: 18px;
    background: #1D1826;
    border-top: 32px solid #1f1a2b;
    border-bottom: 32px solid #1f1a2b
}

.login-content {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
}

.modal-login .login-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-login .login-close button {
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

.modal-login .login-close button:hover {
    color: #fff
}

.modal-login .login-close button svg {
    margin-right: 8px;
    fill: #CABFDD;
    transition: all .3s ease
}

.modal-login .login-close button:hover svg {
    fill: #fff
}

@media only screen and (max-width: 700px) {

    .modal-login {
        width: 100%;
        padding: 25px 0 10px 0;
    }


}
</style>
