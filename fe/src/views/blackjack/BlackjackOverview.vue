<template>
    <div class="blackjack-overview">
        <div class="overview-standard">
            <div class="standard-header">
                <div class="header-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M18.0417 17.1874C17.9869 17.2825 17.908 17.3614 17.8129 17.4162C17.7179 17.4711 17.6101 17.5 17.5003 17.4999H2.50034C2.39068 17.4998 2.28298 17.4709 2.18806 17.416C2.09314 17.3611 2.01433 17.2821 1.95955 17.1872C1.90477 17.0922 1.87595 16.9844 1.87598 16.8748C1.876 16.7651 1.90488 16.6574 1.95971 16.5624C3.14955 14.5054 4.98315 13.0304 7.12299 12.3312C6.06453 11.7011 5.24217 10.7409 4.7822 9.59821C4.32223 8.45548 4.25009 7.19337 4.57685 6.00568C4.90361 4.81798 5.61121 3.77039 6.59098 3.02378C7.57075 2.27716 8.76851 1.8728 10.0003 1.8728C11.2322 1.8728 12.4299 2.27716 13.4097 3.02378C14.3895 3.77039 15.0971 4.81798 15.4238 6.00568C15.7506 7.19337 15.6784 8.45548 15.2185 9.59821C14.7585 10.7409 13.9361 11.7011 12.8777 12.3312C15.0175 13.0304 16.8511 14.5054 18.041 16.5624C18.0959 16.6574 18.1249 16.7651 18.1251 16.8748C18.1252 16.9845 18.0965 17.0923 18.0417 17.1874Z"
                            fill="#CFCFCF" />
                    </svg>
                    <span class="gradient-green">BLACKJACK TABLES</span>
                </div>
            </div>
            <div class="standard-content">
                <transition name="fade" mode="out-in">
                    <div v-if="socketBlackjack.connected === false" class="content-loading" key="loading">

                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>

                    </div>
                    <div v-else class="content-list" key="data">

                        <BlackjackTablesElement v-for="table of blackjackGetTables.standard.slice(0, 10)"
                            v-bind:key="table.table" v-bind:table="table" />

                    </div>
                </transition>
            </div>
        </div>
        <div class="overview-whale">
            <div class="whale-header">
                <div class="header-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M18.0417 17.1874C17.9869 17.2825 17.908 17.3614 17.8129 17.4162C17.7179 17.4711 17.6101 17.5 17.5003 17.4999H2.50034C2.39068 17.4998 2.28298 17.4709 2.18806 17.416C2.09314 17.3611 2.01433 17.2821 1.95955 17.1872C1.90477 17.0922 1.87595 16.9844 1.87598 16.8748C1.876 16.7651 1.90488 16.6574 1.95971 16.5624C3.14955 14.5054 4.98315 13.0304 7.12299 12.3312C6.06453 11.7011 5.24217 10.7409 4.7822 9.59821C4.32223 8.45548 4.25009 7.19337 4.57685 6.00568C4.90361 4.81798 5.61121 3.77039 6.59098 3.02378C7.57075 2.27716 8.76851 1.8728 10.0003 1.8728C11.2322 1.8728 12.4299 2.27716 13.4097 3.02378C14.3895 3.77039 15.0971 4.81798 15.4238 6.00568C15.7506 7.19337 15.6784 8.45548 15.2185 9.59821C14.7585 10.7409 13.9361 11.7011 12.8777 12.3312C15.0175 13.0304 16.8511 14.5054 18.041 16.5624C18.0959 16.6574 18.1249 16.7651 18.1251 16.8748C18.1252 16.9845 18.0965 17.0923 18.0417 17.1874Z"
                            fill="#FFC839" />
                        <path
                            d="M18.0417 17.1874C17.9869 17.2825 17.908 17.3614 17.8129 17.4162C17.7179 17.4711 17.6101 17.5 17.5003 17.4999H2.50034C2.39068 17.4998 2.28298 17.4709 2.18806 17.416C2.09314 17.3611 2.01433 17.2821 1.95955 17.1872C1.90477 17.0922 1.87595 16.9844 1.87598 16.8748C1.876 16.7651 1.90488 16.6574 1.95971 16.5624C3.14955 14.5054 4.98315 13.0304 7.12299 12.3312C6.06453 11.7011 5.24217 10.7409 4.7822 9.59821C4.32223 8.45548 4.25009 7.19337 4.57685 6.00568C4.90361 4.81798 5.61121 3.77039 6.59098 3.02378C7.57075 2.27716 8.76851 1.8728 10.0003 1.8728C11.2322 1.8728 12.4299 2.27716 13.4097 3.02378C14.3895 3.77039 15.0971 4.81798 15.4238 6.00568C15.7506 7.19337 15.6784 8.45548 15.2185 9.59821C14.7585 10.7409 13.9361 11.7011 12.8777 12.3312C15.0175 13.0304 16.8511 14.5054 18.041 16.5624C18.0959 16.6574 18.1249 16.7651 18.1251 16.8748C18.1252 16.9845 18.0965 17.0923 18.0417 17.1874Z"
                            fill="url(#paint0_linear_2368_957)" fill-opacity="0.3"
                            style="mix-blend-mode:plus-lighter" />
                        <defs>
                            <linearGradient id="paint0_linear_2368_957" x1="18" y1="18.5" x2="2" y2="2"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="white" stop-opacity="0" />
                                <stop offset="1" stop-color="white" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span class="gradient-yellow">HIGHROLLER TABLES</span>
                </div>
            </div>
            <div class="whale-content">
                <transition name="fade" mode="out-in">
                    <div v-if="socketBlackjack.connected === false" class="content-loading" key="loading">

                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>
                        <div class="loading-placeholder"></div>

                    </div>
                    <div v-else class="content-list" key="data">

                        <BlackjackTablesElement v-for="table of blackjackGetTables.whale" v-bind:key="table.table"
                            v-bind:table="table" />

                    </div>
                </transition>
            </div>
        </div>

        <Bets />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Bets from '@/components/bets/Bets';
import IconTables from '@/components/icons/IconTables';
import IconUserGradient from '@/components/icons/IconUserGradient';
import IconWhaleGradient from '@/components/icons/IconWhaleGradient';
import BlackjackTablesElement from '@/components/blackjack/BlackjackTablesElement';

export default {
    name: 'BlackjackOverview',
    components: {
        Bets,
        IconTables,
        IconUserGradient,
        IconWhaleGradient,
        BlackjackTablesElement
    },
    computed: {
        ...mapGetters(['socketBlackjack', 'blackjackTables']),
        blackjackGetTables() {
            let tables = { standard: [], whale: [] };

            for (const table of this.blackjackTables) {
                if (table.game.type === 'standard') { tables.standard.push(table); }
                else { tables.whale.push(table); }
            }

            return tables;
        }
    }
}
</script>

<style scoped>
.blackjack-overview {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 45px 10px;
}

.blackjack-overview .overview-standard,
.blackjack-overview .overview-whale {
    width: 1300px;
}

.blackjack-overview .overview-whale {
    margin-top: 40px;
}

.blackjack-overview .standard-header,
.blackjack-overview .whale-header {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.blackjack-overview .header-title {
    display: flex;
    align-items: center;
}

.blackjack-overview .header-title svg {
    margin-right: 12px;
}

.blackjack-overview .header-title span {
    color: #CFCFCF;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.6px;
    text-transform: uppercase;
}

.blackjack-overview .overview-whale .header-title span {
    color: #FFC839;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.6px;
    text-transform: uppercase;
}

.blackjack-overview .title-limits {
    display: flex;
    align-items: center;
    margin-left: 15px;
    /* font-family: 'Rubik', sans-serif; */
    font-weight: 400;
    font-size: 28px;
    color: #c1c1c1;
}

.blackjack-overview .limits-value {
    /* font-family: 'Open Sans', sans-serif; */
    font-size: 12px;
    font-weight: 600;
    color: #c1c1c1;
}

.blackjack-overview .limits-value span {
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
}

.blackjack-overview .title-limits img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.blackjack-overview .standard-header a.link-all {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #607c92;
}

.blackjack-overview .standard-header a.link-all svg {
    margin-right: 10px;
    display: flex;
    align-items: center;
    fill: #607c92;
}

.blackjack-overview .standard-content,
.blackjack-overview .whale-content {
    margin: 10px -25px 0 -25px;
}

.blackjack-overview .content-loading {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.blackjack-overview .content-loading.fade-leave-active {
    transition: opacity 0.5s;
}

.blackjack-overview .content-loading.fade-leave-to {
    opacity: 0;
}

.blackjack-overview .loading-placeholder {
    width: calc(20% - 8px);
    height: 150px;
    position: relative;
    margin-top: 10px;
    margin-right: 10px;
    overflow: hidden;
    background: #2B2339;
    border-radius: 10px;
}

.blackjack-overview .loading-placeholder:nth-child(1),
.blackjack-overview .loading-placeholder:nth-child(2),
.blackjack-overview .loading-placeholder:nth-child(3),
.blackjack-overview .loading-placeholder:nth-child(4),
.blackjack-overview .loading-placeholder:nth-child(5) {
    margin-top: 0;
}

.blackjack-overview .loading-placeholder:nth-child(5n) {
    margin-right: 0;
}

.blackjack-overview .loading-placeholder::after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    animation-name: loading_animation;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    background: linear-gradient(to right, #ffffff00 0%, rgba(255, 255, 255, 0.1) 50%, #ffffff00 100%);
}

.blackjack-overview .content-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.blackjack-overview .content-list.fade-enter-active {
    transition: opacity 0.5s;
}

.blackjack-overview .content-list.fade-enter-from {
    opacity: 0;
}

@keyframes loading_animation {
    0% {
        transform: translateX(-100%);
    }

    50% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(100%);
    }
}

@media only screen and (max-width: 1700px) {

    .blackjack-overview .overview-standard,
    .blackjack-overview .overview-whale {
        width: 100%;
    }

    .blackjack-overview .standard-content,
    .blackjack-overview .whale-content {
        margin: 25px 0 0 0;
    }

}

@media only screen and (max-width: 1050px) {

    .blackjack-overview .loading-placeholder {
        width: calc(25% - 7.5px);
    }

    .blackjack-overview .loading-placeholder:nth-child(5) {
        margin-top: 10px;
    }

    .blackjack-overview .loading-placeholder:nth-child(5n) {
        margin-right: 10px;
    }

    .blackjack-overview .loading-placeholder:nth-child(4n) {
        margin-right: 0;
    }

}

@media only screen and (max-width: 950px) {

    .blackjack-overview {
        padding: 25px 10px 443px 10px;
    }

}

@media only screen and (max-width: 900px) {

    .blackjack-overview .loading-placeholder {
        width: calc(33.33% - 6.66px);
    }

    .blackjack-overview .loading-placeholder:nth-child(4) {
        margin-top: 10px;
    }

    .blackjack-overview .loading-placeholder:nth-child(4n) {
        margin-right: 10px;
    }

    .blackjack-overview .loading-placeholder:nth-child(3n) {
        margin-right: 0;
    }

}

@media only screen and (max-width: 850px) {

    .blackjack-overview .standard-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .blackjack-overview .standard-header a.link-all {
        margin-top: 20px;
    }

}

@media only screen and (max-width: 700px) {

    .blackjack-overview .loading-placeholder {
        width: calc(50% - 5px);
    }

    .blackjack-overview .loading-placeholder:nth-child(3) {
        margin-top: 10px;
    }

    .blackjack-overview .loading-placeholder:nth-child(3n) {
        margin-right: 10px;
    }

    .blackjack-overview .loading-placeholder:nth-child(2n) {
        margin-right: 0;
    }

}
</style>
