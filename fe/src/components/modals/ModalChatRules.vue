<template>
    <div class="modal-chat-rules">
        <div class="rules-close"><button v-on:click="modalsSetShow(null)"><svg width="11" height="11"
                    viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE </button></div>
        <div class="rules-content">
            <div class="content-title">CHAT RULES</div>
            <div class="content-text">
                <div class="text-rule"><span>1.</span> Be respectful to all users
                </div>
                <div class="text-rule"><span>2.</span> Don’t impersonate staff
                    members </div>
                <div class="text-rule"><span>3.</span> Don’t beg </div>
                <div class="text-rule"><span>4.</span> Don’t promote your
                    affiliate code </div>
                <div class="text-rule"> Violators will be muted or banned from using gooncasino
                </div>
            </div>
            <div class="content-button"><button v-on:click="modalsSetShow(null)" class="button-accept">ACCEPT</button>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions } from 'vuex';


export default {
    name: 'ModalChatRules',
    methods: {
        ...mapActions([
            'modalsSetShow',
        ]),
    }
}
</script>

<style scoped>
.modal-chat-rules {
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

.modal-chat-rules .rules-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-chat-rules .rules-close button {
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

.modal-chat-rules .rules-close button:hover {
    color: #fff
}

.modal-chat-rules .rules-close button svg {
    margin-right: 8px;
    fill: #CABFDD;
    transition: all .3s ease
}

.modal-chat-rules .rules-close button:hover svg {
    fill: #fff
}

.modal-chat-rules .rules-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-chat-rules .content-title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 800;
    color: #323743
}

.modal-chat-rules .content-text {
    width: 410px;
    margin-top: 18px
}

.modal-chat-rules .text-rule {
    margin-top: 12px;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.modal-chat-rules .text-rule:first-of-type {
    margin-top: 0
}

.modal-chat-rules .text-rule span {
    color: #fd3b31
}

.modal-chat-rules .content-button {
    width: 370px;
    margin-top: 18px
}

.modal-chat-rules .content-button button.button-accept {
    width: 100%;
    height: 55px;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    background: #D4AF3C;
    border-bottom: 2px solid #856917
}

.modal-chat-rules .content-button button.button-accept:hover {
    background: #dbba56
}

@media only screen and (max-width: 650px) {
    .modal-chat-rules {
        width: 100%
    }

    .modal-chat-rules .rules-content {
        padding: 0 20px
    }

    .modal-chat-rules .content-button,
    .modal-chat-rules .content-text {
        width: 100%
    }
}
</style>