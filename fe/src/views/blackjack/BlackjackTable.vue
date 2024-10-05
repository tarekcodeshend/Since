<template>
    <div class="blackjack-table">
        <div v-if="blackjackTable !== null" class="table-header">
            <div class="header-left">
                <div class="left-title">
                    <router-link to="/blackjack" class="link-back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9.70711 5.29289C10.0976 5.68342 10.0976 6.31658 9.70711 6.70711L5.41421 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H5.41421L9.70711 17.2929C10.0976 17.6834 10.0976 18.3166 9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289Z"
                                fill="white" />
                        </svg>
                    </router-link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                        <path
                            d="M17.0417 16.1874C16.9869 16.2825 16.908 16.3614 16.8129 16.4162C16.7179 16.4711 16.6101 16.5 16.5003 16.4999H1.50034C1.39068 16.4998 1.28298 16.4709 1.18806 16.416C1.09314 16.3611 1.01433 16.2821 0.95955 16.1872C0.904771 16.0922 0.875948 15.9844 0.875977 15.8748C0.876005 15.7651 0.904883 15.6574 0.959711 15.5624C2.14955 13.5054 3.98315 12.0304 6.12299 11.3312C5.06453 10.7011 4.24217 9.74093 3.7822 8.59821C3.32223 7.45548 3.25009 6.19337 3.57685 5.00568C3.90361 3.81798 4.61121 2.77039 5.59098 2.02378C6.57075 1.27716 7.76851 0.872803 9.00034 0.872803C10.2322 0.872803 11.4299 1.27716 12.4097 2.02378C13.3895 2.77039 14.0971 3.81798 14.4238 5.00568C14.7506 6.19337 14.6784 7.45548 14.2185 8.59821C13.7585 9.74093 12.9361 10.7011 11.8777 11.3312C14.0175 12.0304 15.8511 13.5054 17.041 15.5624C17.0959 15.6574 17.1249 15.7651 17.1251 15.8748C17.1252 15.9845 17.0965 16.0923 17.0417 16.1874Z"
                            fill="#CFCFCF" />
                    </svg>
                    <div v-if="blackjackTable.game.type === 'standard'" class="title-standard">
                        BLACKJACK TABLE
                    </div>
                    <div v-else class="title-whale">
                        HIGHROLLER TABLE
                    </div>
                </div>
                <div class="left-info">LOBBY {{ blackjackTable.table + 1 }}, GAME ID = {{ blackjackTable.game._id }}
                </div>
            </div>
            <!-- <button v-on:click="modalsSetShow('BlackjackRules')" class="button-rules">
                <IconInfo />
                <span class="gradient-yellow">GAME RULES</span>
            </button> -->
        </div>

        <BlackjackGame v-if="blackjackTable !== null" v-bind:table="blackjackTable" />
        <Bets />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import IconInfo from '@/components/icons/IconInfo';
import Bets from '@/components/bets/Bets';
import BlackjackGame from '@/components/blackjack/BlackjackGame';

export default {
    name: 'Blackjack',
    components: {
        IconInfo,
        Bets,
        BlackjackGame
    },
    data() {
        return {
            blackjackTable: null
        }
    },
    methods: {
        ...mapActions([
            'modalsSetShow'
        ])
    },
    computed: {
        ...mapGetters([
            'socketBlackjack',
            'blackjackTables'
        ])
    },
    watch: {
        'blackjackTables': {
            handler(data, oldData) {
                if (this.blackjackTables.length >= 1) {
                    this.blackjackTable = this.blackjackTables[this.$route.params.tableId - 1];
                }
            },
            deep: true
        }
    },
    created() {
        if (this.blackjackTables.length >= 1) {
            this.blackjackTable = this.blackjackTables[this.$route.params.tableId - 1];
        }
    }
}
</script>

<style scoped>
.blackjack-table {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 10px;
}

.blackjack-table .table-header {
    width: 1090px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.blackjack-table .left-title {
    display: flex;
    align-items: center;
}
.blackjack-table .left-title svg{
    margin-right: 10px;
}

.blackjack-table .title-standard,
.blackjack-table .title-whale {
    display: flex;
    align-items: center;
    /* font-family: 'Rubik'; */
    font-size: 24px;
    font-weight: 600;
    color: #CFCFCF;
}

.blackjack-table .left-title a.link-back {
    margin-right: 10px;
}

.blackjack-table .left-title a.link-back svg {
    fill: #c1c1c1;
    width: 23px;
    height: 23px;
    margin-top: 4px;
}

.blackjack-table .title-limits {
    display: flex;
    align-items: center;
    margin-left: 15px;
    font-weight: 400;
    font-size: 28px;
    color: #c1c1c1;
}

.blackjack-table .limits-value {
    /* font-family: 'Open Sans'; */
    font-size: 12px;
    font-weight: 600;
    color: #c1c1c1;
}

.blackjack-table .title-limits img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.blackjack-table .limits-value span {
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
}

.blackjack-table .left-info {
    margin-top: 1px;
    /* font-family: 'Rubik'; */
    font-size: 14px;
    font-weight: 600;
    color: #c1c1c1;
}

.blackjack-table .table-header button.button-rules {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
}

.blackjack-table .table-header button.button-rules svg {
    margin-right: 8px;
    fill: #ffb703;
}

@media only screen and (max-width: 1700px) {

    .blackjack-table .table-header {
        width: 100%;
    }

}

@media only screen and (max-width: 950px) {

    .blackjack-table {
        padding: 25px 10px 443px 10px;
    }

}

@media only screen and (max-width: 850px) {

    .blackjack-table .table-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .blackjack-table .table-header button.button-rules {
        margin-top: 20px;
    }

    .bets {
        margin-top: 10px;
    }

}
</style>
