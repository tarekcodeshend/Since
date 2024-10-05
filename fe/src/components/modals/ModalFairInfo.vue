<template>
    <div class="modal-fair-info">
        <div class="info-title"> FAIRNESS </div>
        <div class="info-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE </button>
        </div>
        <div class="info-content">
            <div class="content-element">
                <div class="element-title">GAME ID</div>
                <div class="element-value">666d880a54d9184f4c76b71e</div>
            </div>
            <div class="content-element">
                <div class="element-title"> SERVER SEED <!----></div>
                <div class="element-value">5837f7c1ceec92799b39018ca43753aa6a92ce7c2c145efb</div>
            </div>
            <div class="content-group group-full">
                <div class="group-element">
                    <div class="element-title">PUBLIC SEED</div>
                    <div class="element-value">
                        168f0827df28b146c0f1ef92675916bd4e8cf35e645df19f8b3de8ca3db8abab</div>
                </div><!----><!---->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ModalFairInfo',
    methods: {
        ...mapActions([
            'modalsSetShow',
        ]),
    },
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
    background: #222635
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
    color: #767c8b;
    background: #191e27
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
    background: #1c202c
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
    color: #596076
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
    color: #767c8b;
    background: #12161d;
    overflow: hidden
}

@media only screen and (max-width: 740px) {
    .modal-fair-info {
        width: 100%
    }
}
</style>
