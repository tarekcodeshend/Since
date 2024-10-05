<template>
    <div class="modal-remove">
        <div class="remove-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE
            </button>
        </div>
        <div class="remove-content">
            <div class="content-title">REMOVE MESSAGE</div>            
            <div class="content-input">
               <div>{{ modalsData.message.message  }}</div>
            </div>
            <div class="content-button">
                <button class="button-remove" v-on:click="modalRemoveButton()" v-bind:disabled="socketSendLoading === 'ChatRemove'">remove CODE</button>
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
    name: 'ModalRemove',
    components: {
        AvatarImage,
        BoxLevel,
        BoxRank,
        ButtonLoading
    },
    methods: {
        ...mapActions([
            'notificationShow',
            'chatSendRemoveSocket',
            'modalsSetShow',
            'modalsSetData'
        ]),
        modalRemoveButton() {
            const data = { messageId: this.modalsData.message._id };
            this.chatSendRemoveSocket(data);
        }
    },
    computed: {
        ...mapGetters([
            'socketSendLoading',
            'modalsData'
        ])
    }
}
</script>

<style scoped>
.modal-remove {
    width: 620px;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 25px 0 44px 0;
    border-radius: 18px;
    background: linear-gradient(180deg, #1a1e29, #1c202c);
    border-top: 32px solid #1e212e;
    border-bottom: 32px solid #1e212e
}

.modal-remove .remove-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-remove .remove-close button {
    height: 27px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    color: #767c8b;
    background: #212732
}

.modal-remove .remove-close button:hover {
    color: #fff
}

.modal-remove .remove-close button svg {
    margin-right: 8px;
    fill: #767c8b;
    transition: all .3s ease
}

.modal-remove .remove-close button:hover svg {
    fill: #fff
}

.modal-remove .remove-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-remove .content-title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 800;
    color: #323743
}

.modal-remove .content-info {
    display: flex;
    align-items: center;
    margin-top: 7px;
    font-size: 14px;
    font-weight: 700;
    color: #fff
}

.modal-remove .content-info span.info-code {
    margin: 0 5px;
    color: #fd3b31
}

.modal-remove .content-info img {
    width: 21px;
    margin-left: 10px;
    margin-right: 8px
}

.modal-remove .info-amount {
    font-size: 12px;
    font-weight: 700;
    color: #00c74d
}

.modal-remove .info-amount span {
    font-size: 15px
}

.modal-remove .content-input {
    width: 370px;
    position: relative;
    margin-top: 25px
}

.modal-remove .content-input div {
    width: 100%;
    height: 54px;
    padding: 0 17px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    background: #191e27;
    border: 1px solid #262c3a;
    display: flex;
    align-items: center;
}

.modal-remove .content-button {
    width: 370px;
    margin-top: 18px
}

.modal-remove .content-button button.button-remove {
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

.modal-remove .content-button button.button-remove:hover {
    background: #00de56
}

@media only screen and (max-width: 650px) {
    .modal-remove {
        width: 100%
    }
}

@media only screen and (max-width: 450px) {
    .modal-remove .remove-content {
        padding: 0 20px
    }

    .modal-remove .content-button,
    .modal-remove .content-input {
        width: 100%
    }
}
</style>