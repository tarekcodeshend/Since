<template>
    <div class="rain-tip" v-bind:class="{ 'dropdown-open': rainDropdownTip === true }">
        <div class="rain-layout">
            <svg class="rain-back" xmlns="http://www.w3.org/2000/svg" width="100" height="104" viewBox="0 0 100 104"
                fill="none">
                <g style="mix-blend-mode:overlay" opacity="0.1">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M47.9238 49.4018L95.0268 36.8873C97.7881 36.1537 100.441 38.6456 99.9382 41.5L91.2288 90.9059C90.5982 94.4833 88.0122 97.3256 84.5514 98.2451L40.7955 109.87C38.0342 110.604 35.3809 108.112 35.8841 105.258L45.2033 52.3918C45.4603 50.9344 46.5138 49.7764 47.9238 49.4018ZM52.1525 85.9274C51.4834 88.8254 52.5031 91.5952 54.4323 92.112C56.3615 92.6287 58.4668 90.6961 59.1359 87.7981C59.805 84.9001 58.7853 82.1303 56.8561 81.6135C54.927 81.0967 52.8216 83.0293 52.1525 85.9274ZM56.5962 66.6802C55.9272 69.5782 56.9469 72.348 58.876 72.8648C60.8052 73.3816 62.9106 71.4489 63.5796 68.5509C64.2487 65.6529 63.229 62.8831 61.2999 62.3663C59.3707 61.8495 57.2653 63.7822 56.5962 66.6802ZM75.9305 79.2913C75.2614 82.1893 76.2811 84.9591 78.2103 85.4759C80.1395 85.9927 82.2448 84.06 82.9139 81.162C83.583 78.264 82.5633 75.4942 80.6341 74.9774C78.705 74.4606 76.5996 76.3933 75.9305 79.2913ZM80.3742 60.0441C79.7052 62.9422 80.7248 65.7119 82.654 66.2287C84.5832 66.7455 86.6885 64.8129 87.3576 61.9149C88.0267 59.0168 87.007 56.247 85.0779 55.7303C83.1487 55.2135 81.0433 57.1461 80.3742 60.0441Z"
                        fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M46.3742 -4.66892C49.3117 -5.47719 52.4996 -4.78564 54.9348 -2.81187L90.3791 22.4886C93.1023 24.4324 92.4598 28.6404 89.3122 29.4767L44.5563 41.3676C43.4003 41.6747 42.1517 41.4145 41.1778 40.6635L2.83934 11.0986C0.167137 9.03788 1.00512 4.82691 4.22136 4.15375L46.3742 -4.66892ZM39.401 15.1341C38.9345 17.78 41.7599 20.604 45.7079 21.4434C49.6559 22.2828 53.2368 20.8208 53.7032 18.1749C54.1696 15.5291 51.3443 12.705 47.3963 11.8656C43.4483 11.0262 39.8674 12.4883 39.401 15.1341Z"
                        fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M37.1295 50.472L27.7977 103.409C27.2969 106.25 24.014 107.48 21.6988 105.695L-16.0906 76.5536C-19.0284 74.288 -20.4887 70.5646 -19.8533 66.9598L-11.1368 17.5139C-10.636 14.673 -7.35317 13.4425 -5.03795 15.2279L35.5966 46.5634C36.7935 47.4864 37.3884 49.0034 37.1295 50.472ZM22.7852 52.0358L-1.43809 34.0189C-2.81475 32.995 -4.25182 32.6755 -5.43315 33.1307C-6.61448 33.586 -7.44332 34.7787 -7.73732 36.4465L-8.5995 41.3374C-8.93962 43.2668 -7.92426 45.7912 -6.33162 46.9758L2.03118 53.1959C2.50897 53.5513 2.97901 53.3702 3.08105 52.7913C3.18309 52.2125 3.65313 52.0314 4.13092 52.3867L12.7821 58.8214C13.2599 59.1767 13.5645 59.934 13.4625 60.5129C13.3604 61.0917 13.665 61.849 14.1428 62.2044L22.5056 68.4245C24.0983 69.6091 25.6651 69.0053 26.0052 67.0759L26.8674 62.1849C27.1614 60.5172 26.8965 58.5109 26.1309 56.6076C25.3653 54.7043 24.1618 53.0598 22.7852 52.0358ZM1.30333 55.0255L-6.70113 49.0719C-8.29376 47.8873 -9.86057 48.4911 -10.2007 50.4205L-11.9251 60.2024C-12.2652 62.1318 -11.2498 64.6562 -9.65718 65.8408L19.1801 87.2895C20.7727 88.4741 22.3395 87.8703 22.6796 85.9409L24.404 76.159C24.7441 74.2296 23.7288 71.7052 22.1361 70.5206L14.1317 64.567C13.456 64.0645 12.7912 64.3206 12.6469 65.1392C12.5776 65.5323 12.3823 65.8134 12.1038 65.9207L9.36421 66.9765C8.70791 67.2294 7.90954 67.0519 7.14473 66.4831L6.07322 65.6861C5.3084 65.1173 4.6398 64.2036 4.21449 63.1462L2.4391 58.7323C2.25866 58.2836 2.19621 57.8108 2.26551 57.4177C2.40981 56.5991 1.97903 55.5281 1.30333 55.0255ZM7.34799 61.8924C8.30357 62.6031 9.24366 62.2408 9.44773 61.0832C9.6518 59.9255 9.04258 58.4109 8.087 57.7002C7.13142 56.9894 6.19133 57.3517 5.98726 58.5093C5.78319 59.667 6.3924 61.1816 7.34799 61.8924Z"
                        fill="white" />
                </g>
            </svg>
            <div class="rain-amount">
                <div class="amount-title">RAIN AMOUNT</div>
                <div class="amount-number">
                    <img src="@/assets/img/coins.8ad8b473.png" />
                    <span>{{ rainFormatValue(generalRain.site.amount).split('.')[0] }}</span>.{{
                        rainFormatValue(generalRain.site.amount).split('.')[1] }}
                </div>
            </div>
            <div class="rain-controls">
                <div class="rain-remain">
                    <div class="rain-time-span">{{ parseInt(rainTimer.split(':')[0] / 10) }}</div>
                    <div class="rain-time-span">{{ rainTimer.split(':')[0] % 10 }}</div>
                    <span>:</span>
                    <div class="rain-time-span">{{ parseInt(rainTimer.split(':')[1] / 10) }}</div>
                    <div class="rain-time-span">{{ rainTimer.split(':')[1] % 10 }}</div>
                </div>
                <button v-on:click="rainSetDropdownTip(!rainDropdownTip)" class="button-toggle">
                    <div class="button-inner">
                        TIP RAIN
                        <svg width="13" height="9" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.2142 0.361328L6.5 5.07555L1.78577 0.361328L0 2.1471L6.5 8.6471L13 2.1471L11.2142 0.361328Z">
                            </path>
                        </svg>
                    </div>
                </button>
            </div>
        </div>
        <div class="rain-window">
            <div class="window-content">Half of the rain pot is split evenly amongst players while the other half is
                split amongst levels</div>
            <div class="window-input">
                <input v-model="rainAmount" v-on:input="rainValidateInput" type="text" placeholder="Tip Amount" />
                <img src="@/assets/img/coins.8ad8b473.png" />
                <button v-on:click="rainTipButton" class="button-tip">
                    <div class="button-content" key="content">TIP</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconRain from '@/components/icons/IconRain';
import IconDropdown from '@/components/icons/IconDropdown';
import IconTimer from '@/components/icons/IconTimer';

export default {
    name: 'RainTipDropdown',
    components: {
        IconRain,
        IconDropdown,
        IconTimer
    },
    data() {
        return {
            rainTimerInterval: null,
            rainTimer: '00:00',
            rainAmount: '',
            rainDropdownTip: false
        }
    },
    methods: {
        ...mapActions(['notificationShow', 'rainSetDropdownTip', 'generalSendRainTipSocket']),
        rainSetDropdownTip(value) {
            this.rainDropdownTip = value;
        },
        rainFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        rainValidateInput() {
            this.rainAmount = this.rainAmount.replace(/[^\d.]/g, '');
        },
        rainStartTimer() {
            const endingTime = new Date(this.generalRain.site.updatedAt).getTime() + (1000 * 60 * (this.generalRain.site.state === 'running' ? 2 : 30));
            let timeLeft = Math.floor((endingTime - (new Date().getTime() + this.generalTimeDiff)) / 1000);
            timeLeft = this.generalRain.site.state === 'pending' ? 60 * 2 : timeLeft <= 0 ? 0 : timeLeft;

            let timeMinutes = Math.floor((timeLeft % (60 * 60)) / 60);
            timeMinutes = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes;
            let timeSeconds = Math.floor(timeLeft % 60);
            timeSeconds = timeSeconds < 10 ? '0' + timeSeconds : timeSeconds;

            this.rainTimer = timeMinutes.toString() + ':' + timeSeconds.toString();
        },
        rainTipButton() {
            if (this.socketSendLoading !== null) { return; }

            const amount = Math.floor(this.rainAmount * 1000);

            if (amount === undefined || isNaN(amount) === true || amount <= 0) {
                this.notificationShow({ type: 'error', message: 'Your entered rain tip amount is invalid.' });
                return;
            }

            const data = { amount: amount };
            this.generalSendRainTipSocket(data);

            this.rainAmount = null;
            this.rainSetDropdownTip(false);
        }
    },
    computed: {
        ...mapGetters(['socketSendLoading', 'authUser', 'generalTimeDiff', 'generalRain']),
    },
    created() {
        let self = this;
        document.addEventListener('click', function (event) {
            if (!self.$el.contains(event.target) && event.path !== undefined && event.path.some((element) => element._prevClass === 'button-tip') === false && self.rainDropdownTip === true) {
                self.rainSetDropdownTip(false);
            }
        });

        this.rainTimerInterval = setInterval(() => { this.rainStartTimer(); }, 500);
    }
}
</script>

<style scoped>
.rain-tip {
    width: 100%;
    min-height: 100px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
}

.rain-layout {
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-radius: 13px;
    border: 2px solid #D4AF3C;
    background: #16121E;
    z-index: 12;
}

.rain-layout .rain-back {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    fill: #FFF;
    mix-blend-mode: overlay;
}

.rain-tip.dropdown-open button.button-toggle .button-inner svg {
    transform: rotate(180deg);
}


.rain-layout .rain-amount {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.rain-amount .amount-title {
    color: #D4AF3C;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.48px;
}

.rain-amount .amount-number {
    display: flex;
    gap: 5px;
    align-items: center;
    overflow: hidden;
    color: #767C8B;
    text-overflow: ellipsis;
    text-shadow: 0px 3.833px 3.833px rgba(0, 0, 0, 0.23);
    font-family: Poppins;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.42px;
}

.rain-amount .amount-number img {
    width: 15px;
    height: 15px;
    margin-bottom: 2px;
}

.rain-amount .amount-number span {
    overflow: hidden;
    color: #FFF;
    text-overflow: ellipsis;
    text-shadow: 0px 3.833px 3.833px rgba(0, 0, 0, 0.23);
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.33px;
    margin-right: -2px;
}

.rain-layout .rain-controls {
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.rain-controls .rain-remain {
    width: 100%;
    border-radius: 7px;
    border: 1.5px dashed #D4AF3C;
    background: linear-gradient(180deg, rgba(0, 199, 76, 0.00) 0%, rgba(0, 199, 76, 0.10) 100%), #100D14;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 5px;
}

.rain-remain .rain-time-span {
    background: #D4AF3C;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    width: 17px;
    height: 23px;
}

.rain-controls button.button-toggle {
    width: 100%;
    height: 33px;
    position: relative;
    border-radius: 7px;
    background: #D4AF3C;
    box-shadow: 0px 2px 0px 0px #917521;
    transition: all 0.3s ease;
}

.rain-controls button.button-toggle:hover {
    background: #dfbb51;
}

.rain-controls button.button-toggle .button-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
}

.rain-controls button.button-toggle .button-inner svg {
    fill: white;
    filter: drop-shadow(0px 3.833px 3.833px rgba(0, 0, 0, 0.23));
    transition: all 0.2s ease;
}

.rain-tip .rain-window {
    position: absolute;
    width: 100%;
    height: 0px;
    top: 70px;
    left: 0px;
    padding: 0 15px;
    transition: height 0.2s ease;
    overflow: hidden;
    border-radius: 15px;
    border: 2px solid #261e36;
    background: #1D1826;
    z-index: 11;
}

.rain-tip.dropdown-open .rain-window {
    height: 190px;
    padding: 35px 10px 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
}

.rain-tip .rain-window .window-content {
    color: #FFF;
    font-family: Poppins;
    font-size: 11px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.rain-tip .rain-window .window-input {
    width: 100%;
    height: 48px;
    border-radius: 9.583px;
    border: 0.957px solid #1f1b29;
    background: #181420;
    box-shadow: 0px 0px 14.348px 0px rgba(0, 0, 0, 0.20) inset, 0px 8.609px 33.096px 0px rgba(0, 0, 0, 0.12);
    position: relative;
}

.rain-tip .rain-window .window-input input {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 9px 70px 9px 35px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    background: transparent;
    color: white;
}

.rain-tip .rain-window .window-input button {
    position: absolute;
    right: 5px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
    width: 50px;
    height: 30px;
    border-radius: 5.151px;
    background: #D4AF3C;
    box-shadow: 0px 1.472px 0px 0px #8a6f1f;
    color: #FFF;
    text-shadow: 0px 2.821px 2.821px rgba(0, 0, 0, 0.23);
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.331px;
    text-transform: uppercase;
}

.rain-tip .rain-window .window-input button:hover {
    background: #dbba56;
}

.rain-tip .rain-window .window-input img {
    width: 17.525px;
    height: 17.525px;
    position: absolute;
    left: 10px;
    top: 0px;
    bottom: 0px;
    margin-top: auto;
    margin-bottom: auto;
}

@media only screen and (max-width: 640px) {

    .rain-tip {
        margin-top: 0px;
    }

    .rain-layout {
        padding: 7px 9px;
    }

    .rain-layout .rain-amount {
        gap: 5px;
    }

    .rain-amount .amount-title {
        font-size: 12px;
    }

    .rain-amount .amount-number {
        gap: 5px;
        font-size: 10px;
    }

    .rain-amount .amount-number img {
        width: 13px;
        height: 13px;
        margin-bottom: 1px;
    }

    .rain-amount .amount-number span {
        font-size: 12px;
    }

    .rain-layout .rain-controls {
        gap: 5px;
    }

    .rain-controls .rain-remain {
        padding: 2px 3px;
    }

    .rain-remain .rain-time-span {
        font-size: 10px;
        width: 16px;
        height: 21px;
    }

    .rain-controls button.button-toggle {
        width: 100%;
        height: 31px;
    }

    .rain-controls button.button-toggle .button-inner {
        font-size: 12px;
    }

    .rain-tip.dropdown-open .rain-window {
        height: 135px;
        padding: 20px 10px 0px 10px;
        gap: 7px;
    }

    .rain-tip .rain-window .window-input {
        height: 42px;
    }

    .rain-tip .rain-window .window-input button {
        width: 50px;
        height: 28px;
        font-size: 11px;
    }
}
</style>
