<template>
    <div class="modal-fair-info">
        <div class="info-title"> FAIRNESS </div>
        <div class="info-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg>
                CLOSE
            </button>
        </div>
        <div class="info-content">
            <div class="content-element">
                <div class="element-title">GAME ID</div>
                <div class="element-value">{{ modalsData.game._id }}</div>
            </div>
            <div v-if="modalsData.method !== 'roulette'" class="content-element">
                <div class="element-title"> SERVER SEED <span>(HASHED)</span>
                </div>
                <div class="element-value">
                    {{ modalGetHash }}</div>
            </div>
            <div v-if="modalGetSeedServer !== ''" class="content-element">
                <div class="element-title"> SERVER SEED
                </div>
                <div class="element-value">
                    {{ modalGetSeedServer }}</div>
            </div>
            <div v-if="modalGetSeedPublic !== ''" class="content-group group-full">
                <div class="group-element">
                    <div class="element-title">PUBLIC SEED</div>
                    <div class="element-value">{{ modalGetSeedPublic }}</div>
                </div>
            </div>
            <div v-if="['towers', 'mines', 'unbox', 'upgrader', 'plinko'].includes(modalsData.game.method) === true" class="content-group">
                <div class="group-element">
                    <div class="element-title">NONCE</div>
                    <div class="element-value">{{ modalsData.game.fair.nonce }}</div>
                </div>
                <div v-if="modalsData.game.fair.seed.seedClient !== null" class="group-element">
                    <div class="element-title">CLIENT SEED</div>
                    <div class="element-value">{{ modalsData.game.fair.seed.seedClient }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ModalFairGame',
    methods: {
        ...mapActions([
            'notificationShow',
            'modalsSetShow'
        ]),
        modalCopyButton(value) {
            const el = document.createElement('textarea');
            el.value = value;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            this.notificationShow({ type: 'success', message: 'Copied to your clipboard.' });
        }
    },
    computed: {
        ...mapGetters([
            'modalsData'
        ]),
        modalGetHash() {
            let hash = '';
            if (this.modalsData.game.fair.seed !== undefined) { hash = this.modalsData.game.fair.seed.hash; }
            else { hash = this.modalsData.game.fair.hash; }
            return hash;
        },
        modalGetSeedServer() {
            let seed = '';

            if (this.modalsData.game.fair.seed !== undefined && this.modalsData.game.fair.seed.seedServer !== undefined) { seed = this.modalsData.game.fair.seed.seedServer; }
            else if (this.modalsData.game.fair.seedServer !== undefined) { seed = this.modalsData.game.fair.seedServer; }
            return seed;
        },
        modalGetSeedPublic() {
            let seed = '';
            if (this.modalsData.game.fair.seedPublic !== undefined) { seed = this.modalsData.game.fair.seedPublic; }

            return seed;
        }
    }
}
</script>

<style scoped>
.modal-fair-info {
    width: 720px;
    position: relative;
    display: flex;
    justify-content: center;
    padding: 60px 0 10px 0;
    border-radius: 8px;
    background: #1f1a2b
}

.modal-fair-info .info-title {
    height: 60px;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    padding-left: 22px;
    font-size: 18px;
    font-weight: 700;
    color: #596076
}

.modal-fair-info .info-close {
    position: absolute;
    top: 17px;
    right: 12px
}

.modal-fair-info .info-close button {
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

.modal-fair-info .info-close button:hover {
    color: #fff
}

.modal-fair-info .info-close button svg {
    margin-right: 8px;
    fill: #767c8b;
    transition: all .3s ease
}

.modal-fair-info .info-close button:hover svg {
    fill: #fff
}

.modal-fair-info .info-content {
    width: 100%;
    padding: 15px 12px;
    background: #1D1826
}

.modal-fair-info .content-element,
.modal-fair-info .content-group {
    width: 100%;
    margin-top: 12px
}

.modal-fair-info .content-group {
    display: flex;
    justify-content: space-between
}

.modal-fair-info .content-element:first-child,
.modal-fair-info .content-group:first-child {
    margin-top: 0
}

.modal-fair-info .group-element {
    width: calc(50% - 6px)
}

.modal-fair-info .content-group.group-full .group-element {
    width: 100%
}

.modal-fair-info .element-title {
    padding: 0 5px;
    font-size: 14px;
    font-weight: 600;
    color: #CABFDD
}

.modal-fair-info .element-title span {
    color: #fd3b31
}

.modal-fair-info .element-value {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    padding: 0 12px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 600;
    color: #796f88;
    background: #181420;
    overflow: hidden
}

@media only screen and (max-width: 740px) {
    .modal-fair-info {
        width: 100%
    }
}
</style>
