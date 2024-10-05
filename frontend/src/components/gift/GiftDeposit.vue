<template>
    <div class="gift-deposit">
        <div class="deposit-input">
            <input v-model="giftCode" type="text" placeholder="ENTER YOUR GIFTCARD CODE" />
            <button v-on:click="giftRedeemButton()">
                <div class="button-inner">REDEEM CARD</div>
            </button>
        </div>
        <div class="deposit-list">

            <GiftDepositElement v-bind:href="giftGetLink(1.5)" amount="1.5" />
            <GiftDepositElement v-bind:href="giftGetLink(3)" amount="3" />
            <GiftDepositElement v-bind:href="giftGetLink(9)" amount="9" />
            <GiftDepositElement v-bind:href="giftGetLink(30)" amount="30" />
            <GiftDepositElement v-bind:href="giftGetLink(75)" amount="75" />

        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import GiftDepositElement from '@/components/gift/GiftDepositElement';

    export default {
        name: 'GiftDeposit',
        components: {
            GiftDepositElement
        },
        data() {
            return {
                giftCode: null
            }
        },
        methods: {
            ...mapActions([
                'notificationShow', 
                'modalsSetShow', 
                'modalsSetData'
            ]),
            giftGetLink(amount) {
                let link = null;

                if(this.modalsData.provider === 'kinguin') {
                    if(amount === 1.5) { link = 'https://www.kinguin.net/category/237401/rbxjoker-r-500-gift-card'; } 
                    else if(amount === 3) { link = 'https://www.kinguin.net/category/237399/rbxjoker-r-1000-gift-card'; }
                    else if(amount === 9) { link = 'https://www.kinguin.net/category/237396/rbxjoker-r-3000-gift-card'; }
                    else if(amount === 30) { link = 'https://www.kinguin.net/category/237395/rbxjoker-r-10000-gift-card'; }
                    else if(amount === 75) { link = 'https://www.kinguin.net/category/237392/rbxjoker-r-25000-gift-card'; }
                } else {
                    if(amount === 1.5) { link = 'https://www.g2a.com/BLOXFlame-gift-card-3-usd-BLOXFlame-key-global-i10000338991001'; }
                    else if(amount === 3) { link = 'https://www.g2a.com/BLOXFlame-gift-card-3-usd-BLOXFlame-key-global-i10000338991001'; } 
                    else if(amount === 5) { link = 'https://www.g2a.com/BLOXFlame-gift-card-5-usd-BLOXFlame-key-global-i10000338991008'; }
                    else if(amount === 10) { link = 'https://www.g2a.com/BLOXFlame-gift-card-10-usd-BLOXFlame-key-global-i10000338991007'; }
                    else if(amount === 25) { link = 'https://www.g2a.com/BLOXFlame-gift-card-25-usd-BLOXFlame-key-global-i10000338991005'; }
                    else if(amount === 50) { link = 'https://www.g2a.com/BLOXFlame-gift-card-50-usd-BLOXFlame-key-global-i10000338991006'; }
                    else if(amount === 100) { link = 'https://www.g2a.com/BLOXFlame-gift-card-100-usd-BLOXFlame-key-global-i10000338991004'; }
                    else if(amount === 250) { link = 'https://www.g2a.com/BLOXFlame-gift-card-250-usd-BLOXFlame-key-global-i10000338991003'; }
                    else if(amount === 500) { link = 'https://www.g2a.com/BLOXFlame-gift-card-500-usd-BLOXFlame-key-global-i10000338991002'; }
                }

                return link;
            },
            giftRedeemButton() {
                if(this.giftCode === null || this.giftCode.trim() === '') {
                    this.notificationShow({ type: 'error', message: 'Your entered gift code is invalid.' });
                    return;
                }

                this.modalsSetShow(null);

                setTimeout(() => {
                    this.modalsSetData({ typeCaptcha: 'giftRedeem', data: { code: this.giftCode.replaceAll('-', '') } });
                    this.modalsSetShow('Captcha');
                }, 200);
            }
        },
        computed: {
            ...mapGetters([
                'modalsShow', 
                'modalsData'
            ])
        }
    }
</script>

<style scoped>
    .gift-deposit {
        width: 100%;
        margin-top: 35px;
    }

    .gift-deposit .deposit-input {
        width: 100%;
        height: 72px;
        position: relative;
        padding: 1px;
    }

    .gift-deposit .deposit-input::before {
        content: '';
        width: 100%;
        height: 72px;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, #04131f 0%, #223a4e 100%);
        clip-path: polygon(14px 0, calc(100% - 14px) 0, 100% 25%, 100% 75%, calc(100% - 14px) 100%, 14px 100%, 0 75%, 0 25%);
    }

    .gift-deposit .deposit-input input {
        width: 100%;
        height: 70px;
        padding: 0 47px 0 15px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        background-color: #072e3d;
        clip-path: polygon(14px 0, calc(100% - 14px) 0, 100% 25%, 100% 75%, calc(100% - 14px) 100%, 14px 100%, 0 75%, 0 25%);
    }

    .gift-deposit .deposit-input input::placeholder {
        color: #49687d;
    }

    .gift-deposit .deposit-input button {
        width: 147px;
        height: 47px;
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translate(0, -50%);
    }

    .gift-deposit .deposit-input button .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;
        background: linear-gradient(255deg, #f00 0%, #f00 100%);
        clip-path: polygon(8px 0, calc(100% - 8px) 0, 100% 25%, 100% 75%, calc(100% - 8px) 100%, 8px 100%, 0 75%, 0 25%);
    }

    .gift-deposit .deposit-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
    }

    @media only screen and (max-width: 500px) {

        .gift-deposit .deposit-input {
            height: auto;
        }

        .gift-deposit .deposit-input button {
            width: 100%;
            position: static;
            margin-top: 10px;
            transform: translate(0, 0);
        }

    }
</style>