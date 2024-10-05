<template>
    <div class="combat_legend-filter-sort">
        <div class="sort-title">SORT BY</div>
        <div class="sort-dropdown" v-bind:class="{ 'dropdown-open': combat_legendDropdown === true }">
            <button v-on:click="combat_legendToggleDropdown" class="button-toggle">
                {{combat_legendFilterSort}}
                <IconDropdown />
            </button>
            <div class="dropdown-menu">
                <div class="menu-inner">
                    <button v-on:click="combat_legendSetValue('HIGHEST PRICE')">HIGHEST PRICE</button>
                    <button v-on:click="combat_legendSetValue('LOWEST PRICE')">LOWEST PRICE</button>
                    <button v-on:click="combat_legendSetValue('PARTICIPANTS')">PARTICIPANTS</button>
                    <button v-on:click="combat_legendSetValue('RECENT')">RECENT</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import IconDropdown from '@/components/icons/IconDropdown';

    export default {
        name: 'Combat_legendFilterSort',
        components: {
            IconDropdown
        },
        data() {
            return {
                combat_legendDropdown: false
            }
        },
        methods: {
            ...mapActions([
                'combat_legendSetFilterSort'
            ]),
           combat_legendToggleDropdown() {
               this.combat_legendDropdown = !this.combat_legendDropdown;
           },
           combat_legendSetValue(value) {
               this.combat_legendSetFilterSort(value);
               this.combat_legendDropdown = false;
           }
        },
        computed: {
            ...mapGetters([
                'combat_legendFilterSort'
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
    .combat_legend-filter-sort {
        position: relative;
        display: flex;
        align-items: center;
        z-index: 5;
    }

    .combat_legend-filter-sort .sort-title {
        margin-right: 5px;
        font-size: 12px;
        font-weight: 700;
        color: #5e768e;
    }

    .combat_legend-filter-sort .sort-dropdown {
        position: relative;
    }

    .combat_legend-filter-sort .sort-dropdown button.button-toggle {
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: 800;
        color: #ffffff;
    }

    .combat_legend-filter-sort .sort-dropdown button.button-toggle svg {
        width: 10px;
        margin-left: 8px;
        fill: #ffffff;
        transition: all 0.3s ease;
    }

    .combat_legend-filter-sort .sort-dropdown.dropdown-open button.button-toggle svg {
         transform: rotate(180deg);
    }

    .combat_legend-filter-sort .dropdown-menu {
        width: 175px;
        height: 0;
        position: absolute;
        top: 23px;
        right: -5px;
        padding: 0 10px;
        transition: height 0.2s ease;
        overflow: hidden;
        z-index: 1;
    }

    .combat_legend-filter-sort .sort-dropdown.dropdown-open .dropdown-menu {
       height: 161px;
       padding: 0 10px 10px 10px;
    }

    .combat_legend-filter-sort .menu-inner {
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

    .combat_legend-filter-sort .menu-inner::before {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: -7px;
        right: 0px;
        border-left: 11px solid transparent;
        border-bottom: 7px solid #064550;
    }

    .combat_legend-filter-sort .menu-inner button {
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

    .combat_legend-filter-sort .menu-inner button:first-of-type {
        border-radius: 10px 0 0 0;
    }

    .combat_legend-filter-sort .menu-inner button:last-of-type {
        border-radius: 0 0 10px 10px;
        border-bottom: none;
    }

    .combat_legend-filter-sort .menu-inner button:hover {
        color: #ffffff;
    }
</style>
