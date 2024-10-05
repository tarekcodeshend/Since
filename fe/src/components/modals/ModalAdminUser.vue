<template>
    <div class="modal-admin-user">
        <div class="modal-close">
            <button v-on:click="modalsSetShow(null)"><svg width="11" height="11" viewBox="0 0 11 11"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.0005 1.22222L9.77827 0L5.50019 4.27808L1.22222 0.000111474L0 1.22233L4.27797 5.5003L0.000501987 9.77776L1.22272 11L5.50019 6.72252L9.77776 11.0001L11 9.77788L6.72241 5.5003L11.0005 1.22222Z">
                    </path>
                </svg> CLOSE
            </button>
        </div>
        <div class="modal-title">Admin User</div>
        <div class="modal-content">
            <div class="user-nav">
                <button v-on:click="modalSetTab('Profile')" class="button-nav"
                    v-bind:class="{ 'button-active': modalTab === 'Profile' }">
                    <div class="button-inner">
                        <span>PROFILE</span>
                    </div>
                </button>
                <button v-on:click="modalSetTab('Transactions')" class="button-nav"
                    v-bind:class="{ 'button-active': modalTab === 'Transactions' }">
                    <div class="button-inner">
                        <span>TRANSACTIONS</span>
                    </div>
                </button>
                <button v-on:click="modalSetTab('Games')" class="button-nav"
                    v-bind:class="{ 'button-active': modalTab === 'Games' }">
                    <div class="button-inner">
                        <span>GAMES</span>
                    </div>
                </button>
                <button v-on:click="modalSetTab('Addresses')" class="button-nav"
                    v-bind:class="{ 'button-active': modalTab === 'Addresses' }">
                    <div class="button-inner">
                        <span>ADDRESSES</span>
                    </div>
                </button>
                <button v-on:click="modalSetTab('Settings')" class="button-nav"
                    v-bind:class="{ 'button-active': modalTab === 'Settings' }">
                    <div class="button-inner">
                        <span>SETTINGS</span>
                    </div>
                </button>
            </div>
            <div class="user-content">

                <component v-bind:is="'AdminUser' + modalTab" />

            </div>
        </div>
    </div>
</template>

<script>
import AdminUserProfile from '@/components/admin/user/AdminUserProfile';
import AdminUserTransactions from '@/components/admin/user/AdminUserTransactions';
import AdminUserGames from '@/components/admin/user/AdminUserGames';
import AdminUserAddresses from '@/components/admin/user/AdminUserAddresses';
import AdminUserSettings from '@/components/admin/user/AdminUserSettings';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ModalAdminUser',
    components: {
        AdminUserProfile,
        AdminUserTransactions,
        AdminUserGames,
        AdminUserAddresses,
        AdminUserSettings
    },
    data() {
        return {
            modalTab: 'Profile'
        }
    },
    methods: {
        ...mapActions(['modalsSetShow']),
        modalSetTab(tab) {
            this.modalTab = tab;
        }
    }
}
</script>

<style scoped>
.modal-admin-user {
    width: 770px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 20px 44px 20px;
    border-radius: 18px;
    background: linear-gradient(180deg, #1a1e29, #1c202c);
    border-top: 32px solid #1e212e;
    border-bottom: 32px solid #1e212e
}

.modal-close {
    position: absolute;
    top: -14px;
    right: 12px
}

.modal-close button {
    height: 27px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    color: #767c8b;
    background: #212732
}

.modal-close button:hover {
    color: #fff
}

.modal-close button svg {
    margin-right: 8px;
    fill: #767c8b;
    transition: all .3s ease
}

.modal-close button:hover svg {
    fill: #fff
}

.modal-title {
    text-transform: uppercase;
    font-size: 26px;
    font-weight: 800;
    color: #323743
}

.modal-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
}

.modal-admin-user .user-nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
}

.modal-admin-user .user-nav button.button-nav {
    width: calc(20% - 16px);
    height: 54px;
    position: relative;
    margin-right: 10px;
    transition: all 0.3s ease;
}

.modal-admin-user .user-nav button.button-nav:last-of-type {
    margin-right: 0;
}

.modal-admin-user .user-nav button.button-nav .button-inner {
    width: calc(100% - 2px);
    height: 42px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 1px;
    left: 1px;
    background: #212732;
    box-shadow: 0 2px 0 0 #191e27;
    border-radius: 5px;
    transition: all .3s ease;
    z-index: 1;
}

.modal-admin-user .user-nav button.button-nav.button-active .button-inner {
    background: #282f3b;
}

.modal-admin-user .user-nav button.button-nav .button-inner span {
    font-size: 13px;
    font-weight: 700;
    color: #767c8b;
}

.modal-admin-user .user-nav button.button-nav.button-active .button-inner span {
    color: #fff;
}

.modal-admin-user .user-content {
    width: 100%;
    margin-top: 35px;
}

@media only screen and (max-width: 790px) {

    .modal-admin-user {
        width: calc(100vw - 20px);
        padding: 35px 10px 30px 10px;
    }

}

@media only screen and (max-width: 600px) {

    .modal-admin-user .user-nav {
        flex-wrap: wrap;
    }

    .modal-admin-user .user-nav button.button-nav {
        width: calc(50% - 5px);
        margin-top: 10px;
        margin-right: 10px;
    }

    .modal-admin-user .user-nav button.button-nav:nth-child(1),
    .modal-admin-user .user-nav button.button-nav:nth-child(2) {
        margin-top: 0;
    }

    .modal-admin-user .user-nav button.button-nav:nth-child(2n) {
        margin-right: 0;
    }

}
</style>
