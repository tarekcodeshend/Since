<template>
    <div class="plinko-filter-rows" v-bind:class="{ 'rows-open': plinkoDropdown === true }">
        <button v-on:click="plinkoToggleDropdown" class="button-toggle" v-bind:disabled="plinkoGames.length >= 1">
            {{plinkoFilterRows}}
            <div class="button-icon">
                <svg width="13" height="9" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2142 0.361328L6.5 5.07555L1.78577 0.361328L0 2.1471L6.5 8.6471L13 2.1471L11.2142 0.361328Z" />
                </svg>
            </div>
        </button>
        <transition name="slide">
            <div class="rows-menu" v-if="plinkoDropdown === true">
                <div class="menu-inner">
                    <button v-on:click="plinkoSetValue(8)">8</button>
                    <button v-on:click="plinkoSetValue(9)">9</button>
                    <button v-on:click="plinkoSetValue(10)">10</button>
                    <button v-on:click="plinkoSetValue(11)">11</button>
                    <button v-on:click="plinkoSetValue(12)">12</button>
                    <button v-on:click="plinkoSetValue(13)">13</button>
                    <button v-on:click="plinkoSetValue(14)">14</button>
                    <button v-on:click="plinkoSetValue(15)">15</button>
                    <button v-on:click="plinkoSetValue(16)">16</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'PlinkoFilterRows',
        data() {
            return {
                plinkoDropdown: false
            }
        },
        methods: {
            ...mapActions(['plinkoSetFilterRows']),
            plinkoToggleDropdown() {
                if(this.plinkoDropdown === false && this.plinkoGames.length >= 1) { return; }

                this.plinkoDropdown = !this.plinkoDropdown;
            },
            plinkoSetValue(value) {
                if(this.plinkoGames.length >= 1) { this.plinkoDropdown = false; return; }

                this.plinkoSetFilterRows(value);
                this.plinkoDropdown = false;
            }
        },
        computed: {
            ...mapGetters(['plinkoFilterRows', 'plinkoGames'])
        }
    }
</script>

<style scoped>
    .plinko-filter-rows {
        width: 100%;
        position: relative;
    }

    .plinko-filter-rows button.button-toggle {
        width: 100%;
        height: 58px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 17px;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 700;
        color: #ffffff;
        background-color: #2f293b;
    }

    .plinko-filter-rows button.button-toggle:disabled {
        cursor: not-allowed;
    }

    .plinko-filter-rows button.button-toggle svg {
        fill: #626c7e;
        transition: all 0.3s ease;
    }

    .plinko-filter-rows.rows-open button.button-toggle svg {
        transform: rotate(180deg);
    }

    .plinko-filter-rows .rows-menu {
        width: 100%;
        position: absolute;
        top: 62px;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 9;
    }

    .plinko-filter-rows .rows-menu.slide-enter-active,
    .plinko-filter-rows .rows-menu.slide-leave-active {
        overflow: hidden;
        transition: height 0.2s ease;
    }

    .plinko-filter-rows .rows-menu.slide-enter-to,
    .plinko-filter-rows .rows-menu.slide-leave {
        height: 370px;
    }

    .plinko-filter-rows .rows-menu.slide-enter,
    .plinko-filter-rows .rows-menu.slide-leave-to {
        height: 0;
    }

    .plinko-filter-rows .menu-inner {
        width: 100%;
        position: relative;
        padding: 5px 0;
        border-radius: 5px;
        background-color: #2f293b;
    }

    .plinko-filter-rows .menu-inner button {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 17px;
        border-radius: 0;
        font-size: 12px;
        font-weight: 600;
        color: #ffffff;
        background-color: transparent;
        border: none;
        transition: all 0.3s ease;
    }

    .plinko-filter-rows .menu-inner button:hover {
        background-color: #282235;
    }

    @media only screen and (max-width: 640px) {
        .plinko-filter-rows button.button-toggle {
            height: 42px;
            padding: 0 17px;
            font-size: 13px;   
        }
        .plinko-filter-rows .rows-menu {
            width: 100%;
            position: absolute;
            top: 47px;
        }
    }
</style>