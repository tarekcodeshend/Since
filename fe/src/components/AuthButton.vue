<template>
    <button v-on:click="modalsSetShow('Login')" class="auth-button">
        <div class="button-inner">
            LOG IN
            <!-- <svg width="23" height="23" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_2015_1599)">
                    <path
                        d="M9.05524 0.625854L4.25586 18.5706L22.2006 23.3742L27 5.42946L9.05524 0.625854ZM13.7954 8.86606L18.8021 10.2077L17.4605 15.2144L12.4495 13.8728L13.7954 8.86606Z"
                        fill="white" />
                </g>
                <defs>
                    <filter id="filter0_d_2015_1599" x="0.422743" y="0.625854" width="30.4104" height="30.4146"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dy="3.83312" />
                        <feGaussianBlur stdDeviation="1.91656" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2015_1599" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2015_1599" result="shape" />
                    </filter>
                </defs>
            </svg> -->
        </div>
    </button>
</template>

<script>
import { mapActions } from 'vuex';
import IconRoblox from '@/components/icons/IconRoblox';

export default {
    name: 'AuthButton',
    components: {
        IconRoblox
    },
    methods: {
        ...mapActions(['modalsSetShow'])
    }
}
</script>

<style scoped>
button.auth-button {
    height: 41px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 700;
    color: #FFF;
    text-shadow: 0px 3.833px 3.833px rgba(0, 0, 0, 0.23);
    background: #D4AF3C;
    box-shadow: 0px 2px 0px 0px #8E7525, 0px 8.609px 33.096px 0px rgba(0, 0, 0, 0.12);
    transition: all .3s ease;
}

button.auth-button .button-inner {
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-button:hover {
    background: #dbba56;
}

.auth-button:active {
    transition-duration: .2s;
    transform: translateY(2px);
}

button.auth-button .button-inner svg {
    margin-left: 5px;
    fill: #ffffff;
    margin-top: 3px;
}
</style>
