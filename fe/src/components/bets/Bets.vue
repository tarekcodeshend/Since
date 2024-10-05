<template>
    <div class="bets">
        <div class="bets-nav">
            <button v-if="authUser.user !== null" v-on:click="betsSetTab('my')" class="nav-link"
                v-bind:class="{ 'link-active': betsTab === 'my' }">My Bets</button>
            <button v-on:click="betsSetTab('all')" class="nav-link"
                v-bind:class="{ 'link-active': betsTab === 'all' }">All Bets</button>
            <button v-on:click="betsSetTab('lucky')" class="nav-link"
                v-bind:class="{ 'link-active': betsTab === 'lucky' }">Lucky Wins</button>
        </div>
        <transition name="fade" mode="out-in">
            <div v-if="generalBets.bets === null || generalBets.loading === true" class="bets-content">
                <div class="content-loading" key="loading">
                    <LoadingAnimation />
                </div>
            </div>
            <div v-else-if="betsGetList.length > 0" class="bets-content">
                <BetsElement v-for="bet in betsGetList" v-bind:key="bet._id + betsTab" v-bind:bet="bet" />
            </div>
            <div v-else class="bets-content">
                <div class="bets-empty" key="empty">No bets found.</div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LoadingAnimation from '@/components/LoadingAnimation';
import BetsElement from '@/components/bets/BetsElement';

export default {
    name: 'Bets',
    components: {
        LoadingAnimation,
        BetsElement
    },
    data() {
        return {
            betsTab: 'all'
        }
    },
    methods: {
        ...mapActions([
            'generalGetBetsDataSocket'
        ]),
        betsSetTab(tab) {
            this.betsTab = tab;
        }
    },
    computed: {
        ...mapGetters([
            'authUser',
            'generalBets'
        ]),
        betsGetList() {
            let bets = [];
            if (this.generalBets.bets !== null && this.generalBets.bets[this.betsTab] !== undefined) {
                bets = this.generalBets.bets[this.betsTab].slice(0, 12);

                // its for avoiding plinko bets errors so it will be removed later..
                bets = bets.filter((bet, index, self) =>
                    index === self.findIndex((t) => (
                        t._id === bet._id
                    ))
                );
                ////////////////////////////////////////////////////////////////
            }
            return bets;
        }
    },
    created() {
        if (this.generalBets.bets === null && this.generalBets.loading === false) {
            const data = {};
            this.generalGetBetsDataSocket(data);
        }
    }
}
</script>

<style scoped>
.bets {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 90px;
}

.bets .bets-nav {
    position: relative;
    width: 100%;
}

.bets .bets-nav::after {
    content: "";
    width: 100%;
    height: 3px;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 1px;
    background: #312941;
}

.bets .bets-nav button.nav-link {
    position: relative;
    margin-right: 32px;
    padding: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #ddd;
    transition: all .3s ease;
    z-index: 1;
}

.bets .bets-nav button.nav-link:last-of-type {
    margin-right: 0;
}

.bets button.nav-link.link-active:after {
    opacity: 1;
}

.bets button.nav-link:after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 1px;
    background: #D4AF3C;
    transition: all .3s ease;
    opacity: 0;
}

.bets .bets-nav button.nav-link.link-active {
    color: #D4AF3C;
}

.bets .bets-nav button.nav-link.link-active::after {
    opacity: 1;
}

.bets .bets-content {
    width: 100%;
    margin-top: 23px;
    overflow-x: scroll;
    overflow-y: hidden;
    color: white
}

.bets .content-loading {
    width: 100%;
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center
}

.bets .content-loading.fade-leave-active {
    transition: opacity .5s
}

.bets .content-loading.fade-leave-to {
    opacity: 0
}

@media only screen and (max-width: 1100px) {

    .bets {
        width: 100%;
    }

}

@media only screen and (max-width: 950px) {

    .bets .bets-nav button.nav-link {
        padding-bottom: 8px;
    }

    .bets .bets-list {
        height: 388px;
        border-radius: 0;
    }

    .bets .list-head {
        display: none;
    }

    .bets .list-content {
        height: 100%;
    }

    .bets .bets-content {
        min-height: 300px;
        box-shadow: 0px 0px 10px 0px rgba(100, 100, 100, 0.05) inset;
        border-radius: 1.25rem;
    }

    .bets .bets-title {
        margin-bottom: 10px;
        font-size: 17px;
    }

    .bets .bets-title .bets-title-line {
        margin-left: 7px;
        height: 1px;
    }

    .bets .bets-nav {
        width: 100%;
        height: 32px;
        border-radius: 15px;
    }

    .bets .bets-nav button.nav-link {
        padding: 0px 20px;
        height: 100%;
    }

    .bets .bets-nav .bets-nav-mask {
        width: 33%;
        border-radius: 15px;
    }

    .bets .bets-nav .bets-nav-mask-no-auth {
        width: 50%;
    }

    .bets .bets-nav .bets-nav-mask.lucky-mask {
        left: 33%;
    }

    .bets .bets-nav .bets-nav-mask.my-mask {
        left: 67%;
    }

    .bets .bets-nav .bets-nav-mask-no-auth.lucky-mask {
        left: 50%;
    }

    .bets .bets-content .bets-header {
        margin-top: 10px;
        padding: 0px 5px 5px 5px;
        font-size: 12px;
    }

    .bets .bets-content .bets-header .header-time {
        display: none;
    }

    .bets .bets-content .bets-header .header-game {
        width: 18%;
    }

    .bets .bets-content .bets-header .header-player {
        width: 28%;
    }

    .bets .bets-content .bets-header .header-multiplier {
        width: 18%;
    }

    .bets .bets-content .bets-header .header-bet {
        width: 18%;
        display: flex;
        justify-content: flex-end;
        align-items: center
    }

    .bets .bets-content .bets-header .header-payout {
        width: 18%;
        display: flex;
        justify-content: flex-end;
        align-items: center
    }

    .bets .bets-content .bets-empty {
        margin-top: 60px;
        font-size: 15px;
    }

}

@media only screen and (max-width: 600px) {

    .bets {
        margin-top: 50px;
    }

    .bets .bets-nav button.nav-link {
        margin-right: 15px;
        font-size: 14px;
    }

}
</style>
