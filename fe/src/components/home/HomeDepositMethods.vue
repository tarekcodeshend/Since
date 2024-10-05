<template>
    <div class="home-methods">
        <div class="methods-title">
            <div class="methods-title-line"></div>
            <span>OUR DEPOSIT METHODS</span>
            <div class="methods-title-line"></div>
        </div>
        <div class="methods-list">
            <button class="home-method-element">
                <img src="@/assets/img/coins.8ad8b473.png" alt="" />
            </button>
            <button class="home-method-element">
                <img src="@/assets/img/deposits/deposit-bitcoin.webp" alt="" />
            </button>
            <button class="home-method-element">
                <img src="@/assets/img/deposits/deposit-eth.webp" alt="" />
            </button>
            <button class="home-method-element">
                <img src="@/assets/img/deposits/deposit-ll.webp" alt="" />
            </button>
            <button class="home-method-element">
                <img src="@/assets/img/deposits/deposit-visa.webp" alt="" />
            </button>
            <button class="home-method-element">
                <img src="@/assets/img/deposits/deposit-master.webp" alt="" />
            </button>
            <button class="home-method-element">
                <img src="@/assets/img/deposits/deposit-paypal.webp" alt="" />
            </button>
            <button class="home-method-element">
                <img src="@/assets/img/deposits/deposit-ss.webp" alt="" />
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'HomeDepositMethods',
    methods: {
        ...mapActions(['notificationShow', 'modalsSetShow']),
        homeCashierButton() {
            if (this.authUser.user === null) {
                this.notificationShow({ type: 'error', message: 'Please sign in to perform this action.' });
                return;
            }

            this.modalsSetShow('Cashier');
        }
    },
    computed: {
        ...mapGetters(['authUser'])
    }

}
</script>

<style scoped>
.home .home-methods {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding-top: 20px;
    /* border-top: 1px solid #20252d; */
}

.home .methods-title {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    display: flex;
    width: 100%;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
}

.home .methods-title .methods-title-line {
    flex: 1 1;
    background-color: #99999933;
    height: 3px;
    /* width: 50%; */
}

.home .methods-list {
    margin-top: 15px;
    padding: 12px 25px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #52436D;
    background: #2B2339;
    overflow: scroll;
}

button.home-method-element {
    height: 40px;
    margin-right: 30px;
}

button.home-method-element img {
    width: 40px;
    height: 40px;
    transition: transform .3s ease;
}
button.home-method-element img:hover {
    transform: scale(1.1);
}

button.home-method-element:last-child {
    margin-right: 0;
}

@media only screen and (max-width: 400px) {
    .home .methods-list {
        width: 100%;
        overflow-x: scroll;
    }
}
</style>
