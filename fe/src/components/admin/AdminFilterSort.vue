<template>
    <div class="admin-filter-sort" v-bind:class="{ 'sort-open': adminDropdown === true }">
        <button v-on:click="adminToggleDropdown" class="button-toggle">
            <div class="button-value">
                Sort by: <span>{{adminFilterSort}}</span>
            </div>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5176 1.66411e-06L0.482354 8.43375e-08C0.0547936 9.58042e-09 -0.16302 0.516304 0.143533 0.822859L4.66115 5.34052C4.8467 5.52607 5.15325 5.52607 5.33888 5.34052L9.8565 0.822861C10.163 0.516306 9.94516 1.73887e-06 9.5176 1.66411e-06Z" />
            </svg>
        </button>
        <div class="sort-menu">
            <div class="menu-inner">
                <button v-on:click="adminSetButton('Newest')">Newest</button>
                <button v-on:click="adminSetButton('Oldest')">Oldest</button>
                <button v-on:click="adminSetButton('Balance')">Balance</button>
                <button v-on:click="adminSetButton('Rank')">Rank</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'AdminFilterSort',
        data() {
            return {
                adminDropdown: false
            }
        },
        methods: {
            ...mapActions([
                'adminSetFilterSort', 
                'adminSetUserListPage', 
                'adminGetUserListSocket', 
                'adminSetAffiliateListPage', 
                'adminGetAffiliateListSocket'
            ]),
            adminToggleDropdown() {
                this.adminDropdown = !this.adminDropdown;
            },
            adminSetButton(value) {
                this.adminSetFilterSort(value);
                this.adminToggleDropdown();

                if(this.$route.name === 'AdminUsers') {
                    this.adminSetUserListPage(1);

                    const data = { page: 1, search: this.adminFilterSearch, sort: this.adminFilterSort.toLowerCase(), select: this.adminFilterSelect.toLowerCase() };
                    this.adminGetUserListSocket(data);
                } else if(this.$route.name === 'AdminAffiliates') {
                    this.adminSetAffiliateListPage(1);

                    const data = { page: 1, search: this.adminFilterSearch, sort: this.adminFilterSort.toLowerCase() };
                    this.adminGetAffiliateListSocket(data);
                }
            }
        },
        computed: {
            ...mapGetters([
                'adminFilterSort',
                'adminFilterSelect', 
                'adminFilterSearch'
            ])
        },
        created() {
            let self = this;
            document.addEventListener('click', function(event) {
                if(!self.$el.contains(event.target) && self.adminDropdown == true) {
                    self.adminToggleDropdown();
                }
            });
        }
    }
</script>

<style scoped>
    .admin-filter-sort {
        width: 100%;
        position: relative;
        margin-top: 12px;
        z-index: 12;
    }

    .admin-filter-sort button.button-toggle {
        width: 100%;
        height: 47px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        border-radius: 5px;
        background: #212732;
    }

    .admin-filter-sort button.button-toggle svg {
        fill: #5f6779;
        transition: all 0.3s ease;
    }

    .admin-filter-sort.sort-open button.button-toggle svg {
        transform: rotate(180deg);
    }

    .admin-filter-sort button.button-toggle .button-value {
        font-size: 16px;
        font-weight: 600;
        color: #5f6779;
    }

    .admin-filter-sort button.button-toggle .button-value span {
        color: #ffffff;
    }

    .admin-filter-sort .sort-menu {
        width: 100%;
        height: 0;
        position: absolute;
        top: 52px;
        left: 0;
        overflow: hidden;
        transition: height 0.2s ease;
    }

    .admin-filter-sort.sort-open .sort-menu {
        height: 194px;
    }

    .admin-filter-sort .menu-inner {
        width: 100%;
        padding: 3px;
        border-radius: 5px;
        background: #212732;
    }

    .admin-filter-sort .menu-inner button {
        width: 100%;
        height: 47px;
        display: flex;
        align-items: center;
        padding: 0 14px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        color: #ddd;
        transition: 0.3s ease;
    }

    .admin-filter-sort .menu-inner button:hover {
        background: rgba(19, 66, 88, 0.15);
    }
</style>
