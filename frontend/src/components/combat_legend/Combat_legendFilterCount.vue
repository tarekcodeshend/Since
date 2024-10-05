<template>
    <div class="combat_legend-filter-count" v-bind:class="{ 'count-open': combat_legendDropdown === true }">
        <button v-on:click="combat_legendToggleDropdown" class="button-toggle">
            <IconUserGradient />
            {{combat_legendFilterCount}}
            <IconDropdown />
        </button>
        <div class="count-menu">
            <div class="menu-inner">
                <button v-on:click="combat_legendSetValue(2)">2</button>
                <button v-on:click="combat_legendSetValue(3)">3</button>
                <button v-on:click="combat_legendSetValue(4)">4</button>
                <button v-on:click="combat_legendSetValue(5)">5</button>
                <button v-on:click="combat_legendSetValue(6)">6</button>
                <button v-on:click="combat_legendSetValue(7)">7</button>
                <button v-on:click="combat_legendSetValue(8)">8</button>
                <button v-on:click="combat_legendSetValue(9)">9</button>
                <button v-on:click="combat_legendSetValue(10)">10</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import IconUserGradient from '@/components/icons/IconUserGradient';
    import IconDropdown from '@/components/icons/IconDropdown';

    export default {
        name: 'Combat_legendFilterCount',
        components: {
            IconUserGradient,
            IconDropdown
        },
        data() {
            return {
                combat_legendDropdown: false
            }
        },
        methods: {
             ...mapActions([
                'combat_legendSetFilterCount'
            ]),
            combat_legendToggleDropdown() {
                this.combat_legendDropdown = !this.combat_legendDropdown;
            },
            combat_legendSetValue(value) {
                this.combat_legendSetFilterCount(value);
                this.combat_legendDropdown = false;
            }
        },
        computed: {
            ...mapGetters([
                'combat_legendFilterCount'
            ])
        },
        created() {
            let self = this;
            document.addEventListener('click', function(event) {
                if(!self.$el.contains(event.target) && self.combat_legendDropdown == true) {
                    self.combat_legendToggleDropdown();
                }
            });
        }
    }
</script>

<style scoped>
    .combat_legend-filter-count {
        position: relative;
        margin-right: 25px;
    }

    .combat_legend-filter-count button.button-toggle {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 700;
        color: #ffffff;
    }

    .combat_legend-filter-count button.button-toggle svg:first-of-type {
        margin-right: 8px;
    }

    .combat_legend-filter-count button.button-toggle svg:last-of-type {
        width: 10px;
        margin-left: 8px;
        fill: #ffffff;
        transition: all 0.3s ease;
    }

    .combat_legend-filter-count.count-open button.button-toggle svg:last-of-type {
         transform: rotate(180deg);
    }

    .combat_legend-filter-count .count-menu {
        width: 90px;
        height: 0;
        position: absolute;
        top: 27px;
        right: -5px;
        padding: 0 10px;
        transition: height 0.2s ease;
        overflow: hidden;
        z-index: 1;
    }

    .combat_legend-filter-count.count-open .count-menu {
       height: 400px;
       padding: 0 10px 10px 10px;
    }

    .combat_legend-filter-count .menu-inner {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 7px;
        border-radius: 10px 0 10px 10px;
        background: radial-gradient(163.2% 161.48% at 50% -31.12%, rgba(255, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(255deg, #07263d 0%, #07243a 100%);
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
    }

    .combat_legend-filter-count .menu-inner::before {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: -7px;
        right: 0px;
        border-left: 11px solid transparent;
        border-bottom: 7px solid #064550;
    }

    .combat_legend-filter-count .menu-inner button {
        width: 100%;
        height: 36px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-size: 12px;
        font-weight: 600;
        color: #bbbfd0;
        border-bottom: 1px solid rgba(24, 72, 109, 0.5);
        transition: color 0.3s ease;
    }

    .combat_legend-filter-count .menu-inner button:first-of-type {
        border-radius: 10px 0 0 0;
    }

    .combat_legend-filter-count .menu-inner button:last-of-type {
        border-radius: 0 0 10px 10px;
        border-bottom: none;
    }

    .combat_legend-filter-count .menu-inner button:hover {
        color: #ffffff;
    }

    @media only screen and (max-width: 650px) {

        .combat_legend-filter-count {
            margin-right: 0;
        }

    }
</style>
