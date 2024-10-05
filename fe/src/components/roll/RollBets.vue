<template>
    <div class="roll-bets">
        <div class="bets-highest">
            <div class="highest-title">Highest Bet</div>
            <div class="highest-content">

                <RollBetsElement v-if="rollGetBets[0] !== undefined" v-bind:bet="rollGetBets[0]" />

            </div>
        </div>
        <div class="bets-content">
            <div class="highest-title">Current Bets</div>
            <div class="content-list">

                <RollBetsElement v-for="bet of rollGetBets.slice(1, rollGetBets.length)" v-bind:key="bet._id"
                    v-bind:bet="bet" />

            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import IconUsers from '@/components/icons/IconUsers';
import RollBetsElement from '@/components/roll/RollBetsElement';

export default {
    name: 'RollBets',
    components: {
        IconUsers,
        RollBetsElement
    },
    methods: {
        rollFormatValue(value) {
            return parseFloat(Math.floor(value / 10) / 100).toFixed(2).toString();
        }
    },
    computed: {
        ...mapGetters(['rollGame', 'rollBets']),
        rollGetBets() {
            let bets = [];

            for (let bet of this.rollBets) {
                const index = bets.findIndex((element) => element.user._id === bet.user._id && element.baseAmount === bet.amount && element.multiplier === bet.multiplier);

                if (index !== -1) {
                    bets[index].amount = bets[index].amount + bet.amount;
                } else {
                    bet = { ...bet, baseAmount: bet.amount }
                    bets.push(bet);
                }
            }

            bets.sort(function (a, b) { return +b.amount - +a.amount; });

            return bets;
        },
        rollGetPlayerCount() {
            let players = [];

            for (const bet of this.rollBets) {
                if (players.includes(bet.user._id) === false) { players.push(bet.user._id); }
            }

            return players.length;
        },
        rollGetBetsAmount() {
            let amount = 0;

            for (const bet of this.rollBets) {
                amount = Math.floor(amount + bet.amount)
            }

            return amount;
        }
    }
}
</script>

<style scoped>
.roll-bets {
    width: 40%;
    margin-top: 15px;
    padding: 18px 15px;
    border-radius: 15px;
    background: #292137;
}

.roll-bets .bets-highest {
    width: 100%;
}

.roll-bets .highest-title {
    color: #CABFDD;
    font-family: Poppins;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.45px;
}

.roll-bets .highest-content {
    width: 100%;
    height: 47px;
    margin-top: 10px;
    border-radius: 5px;
    /* background-color: rgba(19, 66, 88, 0.25); */
}

.roll-bets .bets-content {
    width: 100%;
    margin-top: 15px;
}

.roll-bets .content-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.roll-bets .header-player {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    color: #7a93ac;
}

.roll-bets .header-player svg {
    width: 15px;
    height: 13px;
    margin-right: 8px;
    fill: #7a93ac;
}

.roll-bets .header-player svg path {
    fill: #7a93ac;
}

.roll-bets .header-player span {
    margin-left: 6px;
    font-size: 14px;
    background: #292137;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

.roll-bets .header-amount {
    display: flex;
    align-items: center;
}

.roll-bets .header-amount img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
}

.roll-bets .amount-value {
    font-size: 10px;
    font-weight: 600;
    color: #bbbfd0;
}

.roll-bets .amount-value span {
    font-size: 14px;
    font-weight: 800;
    color: #ffffff;
}

.roll-bets .content-list {
    width: 100%;
    margin-top: 10px;
}

@media only screen and (max-width: 1250px) {
    .roll-bets {
        width: 100%;
    }
}
</style>
