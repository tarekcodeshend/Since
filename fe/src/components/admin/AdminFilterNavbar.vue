<template>
    <div class="admin-filter-navbar" v-bind:class="{ 'navbar-open': adminDropdown === true }">
        <button v-on:click="adminToggleDropdown()" class="button-toggle">
            <div class="button-value">{{ adminGetRoute }}</div>
            <svg data-v-34215f3a="" width="15" height="10" viewBox="0 0 13 9" xmlns="http://www.w3.org/2000/svg"
                class="icon-state">
                <path data-v-34215f3a=""
                    d="M11.2142 0.361328L6.5 5.07555L1.78577 0.361328L0 2.1471L6.5 8.6471L13 2.1471L11.2142 0.361328Z">
                </path>
            </svg>
        </button>
        <div class="navbar-menu">
            <div class="menu-inner">
                <router-link to="/admin" v-on:click.native="adminToggleDropdown()">Dashboard</router-link>
                <router-link to="/admin/users" v-on:click.native="adminToggleDropdown()">Users</router-link>
                <router-link to="/admin/affiliates" v-on:click.native="adminToggleDropdown()">Affiliates</router-link>
                <router-link to="/admin/promo" v-on:click.native="adminToggleDropdown()">Promo</router-link>
                <router-link to="/admin/cashier" v-on:click.native="adminToggleDropdown()">Cashier</router-link>
                <router-link to="/admin/boxes" v-on:click.native="adminToggleDropdown()">Boxes</router-link>
                <router-link to="/admin/rain" v-on:click.native="adminToggleDropdown()">Rain</router-link>
                <router-link to="/admin/leaderboard" v-on:click.native="adminToggleDropdown()">Leaderboard</router-link>
                <router-link to="/admin/filter" v-on:click.native="adminToggleDropdown()">Filter</router-link>
                <router-link to="/admin/stats" v-on:click.native="adminToggleDropdown()">Stats Book</router-link>
                <router-link to="/admin/settings" v-on:click.native="adminToggleDropdown()">Settings</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminFilterNavbar',
    data() {
        return {
            adminDropdown: false
        }
    },
    methods: {
        adminToggleDropdown() {
            this.adminDropdown = !this.adminDropdown;
        }
    },
    computed: {
        adminGetRoute() {
            let route = this.$route.name.replace('Admin', '');

            if (route === 'Stats') {
                route = 'Stats Book';
            }

            return route;
        }
    },
    created() {
        let self = this;
        document.addEventListener('click', function (event) {
            if (!self.$el.contains(event.target) && self.adminDropdown == true) {
                self.adminToggleDropdown();
            }
        });
    }
}
</script>

<style scoped>
.admin-filter-navbar {
    width: 250px;
    position: relative;
    z-index: 15;
}

.admin-filter-navbar button.button-toggle {
    width: 100%;
    height: 47px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-radius: 5px;
    background-color: #241D2E;
    box-shadow: 0 2px 0 0 #1D1826;
}

.admin-filter-navbar button.button-toggle svg {
    fill: #626c7e;
    transition: all 0.3s ease;
}

.admin-filter-navbar.navbar-open button.button-toggle svg {
    transform: rotate(180deg);
}

.admin-filter-navbar button.button-toggle .button-value {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
}

.admin-filter-navbar .navbar-menu {
    width: 100%;
    height: 0;
    position: absolute;
    top: 52px;
    left: 0;
    overflow: hidden;
    transition: height 0.2s ease;
}

.admin-filter-navbar.navbar-open .navbar-menu {
    height: 523px;
}

.admin-filter-navbar .menu-inner {
    width: 100%;
    padding: 3px;
    border-radius: 5px;
    background-color: #241D2E;
    border: 1px solid #1D1826;
}

.admin-filter-navbar .menu-inner a {
    width: 100%;
    height: 47px;
    display: flex;
    align-items: center;
    padding: 0 14px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    transition: 0.3s ease;
}

.admin-filter-navbar .menu-inner a:hover {
    background-color: #191d26;
}

@media only screen and (max-width: 650px) {

    .admin-filter-navbar {
        width: 100%;
        margin-top: 15px;
    }

}
</style>