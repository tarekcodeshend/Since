<template>
    <div class="upgrader-filter-amount" v-bind:class="{ 
        'amount-open': upgraderDropdown === true 
    }">
        <button  v-on:click="upgraderToggleDropdown()" class="button-toggle">
            <div class="button-inner">
                <div class="inner-value">
                    <img src="@/assets/img/icons/coin.svg" alt="icon" />
                    PRICE RANGE:
                    <span>{{upgraderFilterAmount}}</span>
                </div>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5176 1.66411e-06L0.482354 8.43375e-08C0.0547936 9.58042e-09 -0.16302 0.516304 0.143533 0.822859L4.66115 5.34052C4.8467 5.52607 5.15325 5.52607 5.33888 5.34052L9.8565 0.822861C10.163 0.516306 9.94516 1.73887e-06 9.5176 1.66411e-06Z" />
                </svg>
            </div>
        </button>
        <div class="amount-menu">
            <div class="menu-inner">
                <button v-on:click="upgraderAmountButton('ALL')">ALL</button>
                <button v-on:click="upgraderAmountButton('0 - 5K')">0 - 5K</button>
                <button v-on:click="upgraderAmountButton('5K - 25K')">5K - 25K</button>
                <button v-on:click="upgraderAmountButton('25K - 100K')">25K - 100K</button>
                <button v-on:click="upgraderAmountButton('+100K')">+100K</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'UpgraderFilterPrice',
        data() {
            return {
                upgraderDropdown: false
            }
        },
        methods: {
            ...mapActions([
                'upgraderSetFilterAmount'
            ]),
            upgraderToggleDropdown() {
                this.upgraderDropdown = !this.upgraderDropdown;
            },
            upgraderAmountButton(value) {
                this.upgraderSetFilterAmount(value);
                this.upgraderToggleDropdown();
            }
        },
        computed: {
            ...mapGetters([
                'upgraderFilterAmount'
            ])
        },
        created() {
            let self = this;
            document.addEventListener('click', function(event) {
                if(!self.$el.contains(event.target) && self.upgraderDropdown == true) {
                    self.upgraderToggleDropdown();
                }
            });
        }
    }
</script>

<style scoped>
    .upgrader-filter-amount {
        width: 220px;
        position: relative;
        margin-right: 12px;
        z-index: 5;
    }

    .upgrader-filter-amount button.button-toggle {
        width: 100%;
        height: 47px;
        position: relative;
        padding: 1px;
        filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.1));
    }

    .upgrader-filter-amount button.button-toggle::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #092a45;
        clip-path: polygon(9px 0, calc(100% - 9px) 0, 100% 25%, 100% 75%, calc(100% - 9px) 100%, 9px 100%, 0 75%, 0 25%);
    }

    .upgrader-filter-amount button.button-toggle .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        background-color: #000000;
        clip-path: polygon(9px 0, calc(100% - 9px) 0, 100% 25%, 100% 75%, calc(100% - 9px) 100%, 9px 100%, 0 75%, 0 25%);
    }

    .upgrader-filter-amount button.button-toggle .button-inner svg {
        width: 9px;
        fill: #bbbfd0;
        transition: all 0.3s ease;
    }

    .upgrader-filter-amount.amount-open button.button-toggle .button-inner svg {
        transform: rotate(180deg);
    }

    .upgrader-filter-amount button.button-toggle .inner-value {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 600;
        color: #49687d;
    }

    .upgrader-filter-amount button.button-toggle .inner-value img {
        width: 13px;
        height: 13px;
        margin-right: 7px;
    }

    .upgrader-filter-amount button.button-toggle .inner-value span {
        text-transform: uppercase;
        margin-left: 5px;
        font-size: 13px;
        font-weight: 800;
        color: #ffffff;
    }

    .upgrader-filter-amount .amount-menu {
        width: calc(100% - 18px);
        height: 0;
        position: absolute;
        top: 51px;
        left: 9px;
        overflow: hidden;
        transition: height 0.2s ease;
        z-index: -1;
    }

    .upgrader-filter-amount.amount-open .amount-menu {
        height: 237px;
    }

    .upgrader-filter-amount .menu-inner {
        width: 100%;
        background: #061d30;
        border: 1px solid #5f1c1c;
    }

    .upgrader-filter-amount .menu-inner button {
        width: 100%;
        height: 47px;
        display: flex;
        align-items: center;
        padding: 0 14px;
        font-size: 14px;
        font-weight: 600;
        color: #8bacc8;
        border-bottom: 1px solid #5f1c1c;
        transition: all 0.3s ease;
    }

    .upgrader-filter-amount .menu-inner button:last-child {
        border-bottom: none;
    }

    .upgrader-filter-amount .menu-inner button:hover {
        background: rgba(19, 66, 88, 0.15);
    }

    @media only screen and (max-width: 750px) {

        .upgrader-filter-amount {
            width: calc(50% - 5px);
            margin-top: 8px;
            margin-right: 10px;
        }

    }

    @media only screen and (max-width: 750px) {

        .upgrader-filter-amount {
            width: 100%;
            margin-right: 0;
        }

    }
</style>