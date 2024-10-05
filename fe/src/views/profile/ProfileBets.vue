<template>
    <div class="profile-bets">
        <div class="bets-content">
            <div class="content-header">
                <div class="header-element element-type">TYPE</div>
                <div class="header-element element-amount">AMOUNT</div>
                <div class="header-element element-date">DATE</div>
                <div class="header-element element-bet">BET ID</div>
                <div class="header-element element-actions">ACTIONS</div>
            </div>
            <div class="content-list">
                <transition name="fade" mode="out-in">
                    <div v-if="userBetsData.bets === null || userBetsData.loading === true" class="content-loading" key="loading">
                        <LoadingAnimation />
                    </div>
                    <div v-else-if="userBetsData.bets.length > 0" class="list-data" key="data">

                        <ProfileGamesElement v-for="bet in userBetsData.bets" v-bind:key="bet._id" v-bind:bet="bet" />

                    </div>
                    <div v-else class="list-empty" key="empty">NO BETS FOUND.</div>
                </transition>
            </div>
        </div>
        <Pagination v-on:setPage="profileSetPage" v-bind:page="userBetsData.page" v-bind:count="userBetsData.count" countPage="8" />       
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation';
import Pagination from '@/components/Pagination';
import IconLeftGradient from '@/components/icons/IconLeftGradient';
import IconRightGradient from '@/components/icons/IconRightGradient';
import ProfileGamesElement from '@/components/profile/ProfileGamesElement';

export default {
    name: 'ProfileBets',
    components: {
        LoadingAnimation,
        Pagination,
        IconLeftGradient,
        IconRightGradient,
        ProfileGamesElement
    },
    methods: {
        ...mapActions(['userSetBetsDataPage', 'userGetBetsSocket']),
        profileSetPage(page) {
            // if (this.userBetsData.page === page) { return; }
            // if (page < 1 || page > Math.ceil(this.userBetsData.count / 8)) { return; }

            this.userSetBetsDataPage(page);

            const data = { page: this.userBetsData.page };
            this.userGetBetsSocket(data);
        }
    },
    computed: {
        ...mapGetters(['userBetsData']),
    },
    created() {
        if (this.userBetsData.loading === false) {
            const data = { page: this.userBetsData.page };
            this.userGetBetsSocket(data);
        }
    }
}
</script>

<style scoped>
.profile-bets {
    width: 100%
}

.profile-bets .bets-content {
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    background: #1a1622
}

.profile-bets .content-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px
}

.profile-bets .header-element {
    font-size: 12px;
    font-weight: 700;
    color: #85818b
}

.profile-bets .header-element.element-bet,
.profile-bets .header-element.element-date,
.profile-bets .header-element.element-type {
    width: 25%
}

.profile-bets .header-element.element-amount {
    width: 15%
}

.profile-bets .header-element.element-actions {
    width: 10%;
    display: flex;
    justify-content: flex-end
}

.profile-bets .content-list {
    width: 100%;
    margin-top: 8px
}

.profile-bets .content-loading {
    width: 100%;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center
}

.profile-bets .content-loading.fade-leave-active {
    transition: opacity .5s
}

.profile-bets .content-loading.fade-leave-to {
    opacity: 0
}

.profile-bets .list-data {
    width: 100%
}

.profile-bets .list-empty {
    width: 100%;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #85818b
}

.profile-bets .list-data.fade-enter-active,
.profile-bets .list-empty.fade-enter-active {
    transition: opacity .5s
}

.profile-bets .list-data.fade-enter-from,
.profile-bets .list-empty.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 1300px) {
    .profile-bets .bets-content {
        padding: 10px
    }

    .profile-bets .content-header {
        display: none
    }

    .profile-bets .content-list {
        width: 100%;
        margin-top: 0
    }
}

.pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 18px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none
}

.pagination button {
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    padding: 0 16px;
    border-radius: 5px;
    font-size: 13px;
    font-weight: 700;
    color: #767c8b;
    background: #212732;
    border-bottom: 2px solid #191e27
}

.pagination button:not([disabled]):hover {
    color: #fff
}

.pagination button:last-of-type {
    margin-right: 0
}

.pagination button svg {
    width: 8px;
    fill: #767c8b;
    transition: fill .3s ease
}

.pagination button:not([disabled]):hover svg {
    fill: #fff
}
</style>