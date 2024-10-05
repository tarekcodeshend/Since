<template>
    <div class="profile-transactions">
        <div class="transactions-content">
            <div class="content-header">
                <div class="header-element element-type">TYPE</div>
                <div class="header-element element-amount">AMOUNT</div>
                <div class="header-element element-date">DATE</div>
                <div class="header-element element-transaction">TRANSACTION</div>
            </div>
            <div class="content-list">
                <transition name="fade" mode="out-in">
                    <div v-if="userTransactionsData.transactions === null || userTransactionsData.loading === true"
                        class="content-loading" key="loading">
                        <LoadingAnimation />
                    </div>
                    <div v-else-if="userTransactionsData.transactions.length > 0" class="list-data" key="data">

                        <ProfileTransactionsElement v-for="transaction in userTransactionsData.transactions"
                            v-bind:key="transaction._id" v-bind:transaction="transaction" />

                    </div>
                    <div v-else class="list-empty" key="empty">NO TRANSACTIONS FOUND.</div>
                </transition>
            </div>
        </div>
        <Pagination v-on:setPage="profileSetPage" v-bind:page="userTransactionsData.page" v-bind:count="userTransactionsData.count"
            countPage="8" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation';
import Pagination from '@/components/Pagination';
import IconLeftGradient from '@/components/icons/IconLeftGradient';
import IconRightGradient from '@/components/icons/IconRightGradient';
import ProfileTransactionsElement from '@/components/profile/ProfileTransactionsElement';


export default {
    name: 'ProfileTransactions',
    components: {
        LoadingAnimation,
        Pagination,
        IconLeftGradient,
        IconRightGradient,
        ProfileTransactionsElement
    },
    methods: {
        ...mapActions([
            'userSetTransactionsDataPage',
            'userGetTransactionsSocket'
        ]),
        profileSetPage(page) {
            this.userSetTransactionsDataPage(page);

            const data = { page: this.userTransactionsData.page };
            this.userGetTransactionsSocket(data);
        }
    },
    computed: {
        ...mapGetters([
            'userTransactionsData'
        ])
    },
    created() {
        if (this.userTransactionsData.loading === false) {
            const data = { page: this.userTransactionsData.page };
            this.userGetTransactionsSocket(data);
        }
    }
}
</script>

<style scoped>
.profile-transactions-element {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px
}

.profile-transactions-element:nth-child(odd) {
    border-radius: 8px;
    background: #1d212d
}

.profile-element-element .element-section {
    display: flex;
    flex-direction: column
}

.profile-transactions-element .element-section.section-date,
.profile-transactions-element .element-section.section-type {
    width: 25%
}

.profile-transactions-element .element-section.section-amount {
    width: 15%
}

.profile-transactions-element .element-section.section-transaction {
    width: 35%
}

.profile-transactions-element .section-title {
    display: none;
    font-size: 12px;
    font-weight: 700;
    color: #767c8b
}

.profile-transactions-element .section-content {
    display: flex;
    align-items: center
}

.profile-transactions-element .element-section.section-date .section-content,
.profile-transactions-element .element-section.section-type .section-content {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 700;
    color: #fff
}

.profile-transactions-element .element-section.section-amount .section-content img {
    width: 21px;
    margin-right: 10px
}

.profile-transactions-element .amount-value {
    font-size: 12px;
    font-weight: 700;
    color: #00c74d
}

.profile-transactions-element .amount-value span {
    font-size: 15px;
    font-weight: 700
}

.profile-transactions-element .content-steam {
    display: flex;
    align-items: center
}

.profile-transactions-element .content-steam img {
    width: 30px;
    margin-right: 5px
}

.profile-transactions-element .content-steam img:last-of-type {
    margin-right: 0
}

.profile-transactions-element .content-steam span {
    margin-left: 5px;
    font-size: 12px;
    font-weight: 700;
    color: #bbb
}

.profile-transactions-element .content-crypto {
    width: 100%;
    display: flex;
    align-items: center
}

.profile-transactions-element a.link-explorer {
    display: block;
    font-size: 15px;
    font-weight: 700;
    color: #fd3b31;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

@media only screen and (max-width: 1300px) {
    .profile-transactions-element {
        height: auto;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 20px
    }

    .profile-transactions-element .element-section {
        width: 100% !important;
        margin-top: 10px
    }

    .profile-transactions-element .element-section.section-type {
        margin-top: 0
    }

    .profile-transactions-element .element-section.section-actions {
        align-items: flex-start
    }

    .profile-transactions-element .section-title {
        display: block
    }

    .profile-transactions-element .section-content {
        margin-top: 5px
    }
}

.profile-transactions {
    width: 100%
}

.profile-transactions .transactions-content {
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    background: #1a1622;
}

.profile-transactions .content-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px
}

.profile-transactions .header-element {
    font-size: 12px;
    font-weight: 700;
    color: #85818b
}

.profile-transactions .header-element.element-date,
.profile-transactions .header-element.element-type {
    width: 25%
}

.profile-transactions .header-element.element-amount {
    width: 15%
}

.profile-transactions .header-element.element-transaction {
    width: 35%
}

.profile-transactions .content-list {
    width: 100%;
    margin-top: 8px
}

.profile-transactions .content-loading {
    width: 100%;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center
}

.profile-transactions .content-loading.fade-leave-active {
    transition: opacity .5s
}

.profile-transactions .content-loading.fade-leave-to {
    opacity: 0
}

.profile-transactions .list-data {
    width: 100%
}

.profile-transactions .list-empty {
    width: 100%;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #85818b
}

.profile-transactions .list-data.fade-enter-active,
.profile-transactions .list-empty.fade-enter-active {
    transition: opacity .5s
}

.profile-transactions .list-data.fade-enter-from,
.profile-transactions .list-empty.fade-enter-from {
    opacity: 0
}

@media only screen and (max-width: 1300px) {
    .profile-transactions .transactions-content {
        padding: 10px
    }

    .profile-transactions .content-header {
        display: none
    }

    .profile-transactions .content-list {
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